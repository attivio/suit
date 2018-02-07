// @flow
import md5 from 'crypto-js/md5';

export default class AuthUtils {
  static USER_KEY = 'suit-user';
  static TIMEOUT = 30 * 60 * 1000;
  static users = {
    user: [],
  };
  static config = {};

  static configure(users: any, config: any) {
    console.log('Setting the users and configuration', users, config);
    AuthUtils.users = users;
    AuthUtils.config = config;
  };

  /**
   * Logs the currently logged-in user out.
   */
  static logout(callback: () => void) {
    localStorage.removeItem(AuthUtils.USER_KEY);
    if (AuthUtils.backEndAuth()) {
      fetch(`${AuthUtils.config.ALL.baseUri}/saml/logout`, { method: 'POST' }).then(() => {
        callback();
      }).catch(() => {
        callback();
      });
    }
  }

  static backEndAuth(): boolean {
    return AuthUtils.config && AuthUtils.config.ALL && AuthUtils.config.ALL.authType === 'SAML';
  }

  static obfuscate(orig: string): string {
    const buf = [];
    const bytes = orig.split('').map((c) => { return c.charCodeAt(0); });
    bytes.forEach((b1, i) => {
      const b2 = bytes[orig.length - (i + 1)];
      const i1 = 127 + b1 + b2;
      const i2 = (127 + b1) - b2;
      const i0 = (i1 * 256) + i2;
      const newChar = i0.toString(36);
      switch (newChar.length) {
        case 1:
          buf.push(`000${newChar}`);
          break;
        case 2:
          buf.push(`00${newChar}`);
          break;
        case 3:
          buf.push(`0${newChar}`);
          break;
        default:
          buf.push(newChar);
          break;
      }
    });
    return buf.join('');
  }

  static passwordMatches(comp: string, compTo: string): boolean {
    if (compTo.startsWith('OBF:')) {
      const remainder = compTo.substring(4);
      const obfuscatedComp = AuthUtils.obfuscate(comp);
      return obfuscatedComp === remainder;
    } else if (compTo.startsWith('MD5:')) {
      const remainder = compTo.substring(4);
      const md5Comp = md5(comp).toString();
      return md5Comp === remainder;
    }
    return comp === compTo;
  }

  static findUser(username): any {
    if (AuthUtils.users && AuthUtils.users.user) {
      if (Array.isArray(AuthUtils.users.user)) {
        return AuthUtils.users.user.find((testUser) => {
          return testUser.$.id === username;
        });
      } else {
        // This will happen if there's only use user...
        return AuthUtils.users.user;
      }
    }
    return null;
  }

  /**
   * Attempt to log the specified user in. If an error
   * occurs logging in, then it is returned. Otherwise
   * this returns null. The log in is valid for the timeout
   * set in the authentication configuration.
   */
  static login(username: string, password: string): Error | null {
    if (!AuthUtils.config || !AuthUtils.config.ALL) {
      return null;
    }
      
    if (AuthUtils.config.ALL.authType === 'NONE') {
      return null;
    }
    if (!AuthUtils.backEndAuth()) {
      if (!AuthUtils.users) {
        return null;
      }
      
      const userObject = AuthUtils.findUser(username);
      if (userObject) {
        if (AuthUtils.passwordMatches(password, userObject.$.password)) {
          userObject.timeout = new Date().getTime() + AuthUtils.TIMEOUT;
          localStorage.setItem(AuthUtils.USER_KEY, JSON.stringify(userObject));
          return null;
        }
      }
      return new Error('Invalid log-in credentials.');
    }
    return null;
  }

  static saveLoggedInUser(userInfo: any) {
    if (userInfo) {
      const userInfoCopy = JSON.parse(JSON.stringify(userInfo));
      userInfoCopy.timeout = new Date().getTime() + AuthUtils.TIMEOUT;
      localStorage.setItem(AuthUtils.USER_KEY, JSON.stringify(userInfoCopy));
    } else {
      localStorage.removeItem(AuthUtils.USER_KEY);
    }
  }

  static hasPermission(/* user: any, permission: string */): boolean {
    if (AuthUtils.config && AuthUtils.config.ALL && AuthUtils.config.ALL.authType === 'NONE') {
      return true;
    }
    return false;
  }

  /**
   * Check whether there is a user currently logged in.
   */
  static isLoggedIn(permission: string | null): boolean {
    if (!AuthUtils.config || !AuthUtils.config.ALL) {
      return false;
    }
    if (AuthUtils.config.ALL.authType === 'NONE') {
      return true;
    }
    const user = AuthUtils.getLocalStorageUser();
    if (user) {
      if (permission) {
        return AuthUtils.hasPermission(/* user, permission */);
      }
      return true;
    }
    return false;
  }

  /**
   * Get the full info object for a logged-in user we already know about.
   * If no user is logged in or if the logged-in user's login has expired,
   * then this method returns null.
   */
  static getLocalStorageUser(): any {
    const userObjectJson = localStorage.getItem(AuthUtils.USER_KEY);
    if (userObjectJson) {
      const userObject = JSON.parse(userObjectJson);
      if (userObject && userObject.timeout && userObject.timeout > new Date().getTime()) {
        return userObject;
      }
    }
    return null;
  }

  /**
   * Get the full info object for the logged-in user and call the passed-in
   * callback function with this info. If no user is logged in, the callback
   * is passed null.
   * 
   * @param callback a function which takes the user info as a parameter
   */
  static getLoggedInUserInfo(callback: (any) => void) {
    const userObject = AuthUtils.getLocalStorageUser();
    if (userObject && userObject.timeout && userObject.timeout > new Date().getTime()) {
      callback(userObject);
    } else if (AuthUtils.backEndAuth()) {
      // If the authentication is done on the front-end, we shouldn't
      // ever get here because if there's no local-storage user, then
      // no one is logged in yet...
      const headers = new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      });
      const params = {
        method: 'GET',
        headers,
        credentials: 'same-origin', // Need to do this to make sure the cookies are sent
      };
      const request = new Request(`${AuthUtils.config.ALL.baseUri}/user`, params);
      fetch(request).then((response: Response) => {
        if (response.ok) {
          response.json().then((userInfo) => {
            AuthUtils.saveLoggedInUser(userInfo);
            callback(userInfo);
          }).catch((error: any) => {
            // Catch errors from converting the response's JSON
            console.log('Got an error parsing the JSON', error);
            callback(null);
          });
        } else {
          // The request came back other than a 200-type response code
          const message = response.statusText ?
            `${response.statusText} (error code ${response.status})` :
            `Unknown error of type ${response.status}`;
          console.log(`Got an error trying to fetch the user info: ${message}`);
          callback(null);
        }
      }).catch((err: any) => {
        console.log(`Got an error trying to fetch the user info: ${err.toString()}`);
        callback(null);
      });
    } else {
      // If we're doing our own authentication, and nobody is logged in, pass null to the callback
      callback(null);
    }
  }

  static getLoggedInUserId(): string {
    const userInfo = AuthUtils.getLocalStorageUser();
    if (userInfo) {
      if (userInfo.$ && userInfo.$.id) {
        // Special case for XML-based user authentication
        return userInfo.$.id;
      }
      if (userInfo.userId) {
        return userInfo.userId;
      }
    }
    return '';
  }

  /**
   * Get the user name to display given the user info passed in.
   */
  static getUserName(userInfo: any): string {
    if (userInfo) {
      if (userInfo.$) {
        // Special case for XML-based user authentication
        if (userInfo.$.name && userInfo.$.name.length > 0) {
          return userInfo.$.name;
        }
        return userInfo.$.id;
      }
      if (userInfo.fullName) {
        return userInfo.fullName;
      }
      if (userInfo.firstName && userInfo.lastName) {
        return `${userInfo.firstName} ${userInfo.lastName}`;
      }
      if (userInfo.firstName) {
        return userInfo.firstName;
      }
      if (userInfo.lastName) {
        return userInfo.lastName;
      }
      if (userInfo.userId) {
        return userInfo.userId;
      }
    }
    return '';
  }
}
