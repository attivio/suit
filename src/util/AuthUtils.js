// @flow
import md5 from 'crypto-js/md5';

import StringUtils from './StringUtils';
import FetchUtils from './FetchUtils';

export default class AuthUtils {
  static USER_KEY = 'suit-user';
  static users;
  static config;

  /**
   * Called by the application to pass in configuration to the
   * library's utility and API classes.
   *
   * @property users    the contents of the users.xml file, converted to JavaScript objects
   * @property config   the contents of the configuration.properties.js file with any
   *                    maps converted already
   * @property simpleValidation if set to true, then a lot of the validation
   *                    specific to search applications won't be done
   */
  static configure(users: any, config: any, simpleValidation: boolean = false) {
    const configError = AuthUtils.validateConfiguration(config, simpleValidation);
    if (configError) {
      throw configError;
    }
    if (config.ALL.authType === 'XML') {
      // Only validate users if the auth type is XML
      const usersError = AuthUtils.validateUsers(users);
      if (usersError) {
        throw usersError;
      }
    }
    AuthUtils.users = users;
    AuthUtils.config = config;
  }

  /**
   * Logs the currently logged-in user out.
   */
  static logout() {
    // Remove the user we added to session storage
    sessionStorage.removeItem(AuthUtils.USER_KEY);

    // If it's just XML authentication, removing saved user (above) is good enough.
    // Otherwise, we need to also tell the server
    if (AuthUtils.config.authType !== 'XML') {
      // The servlet mimics the node's login endpoint with the logout action to log out of the SAML IdP
      // so regardless of how we're authenticated, we just need to access that to log out.

      const headers = new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      });
      const params = {
        method: 'GET',
        headers,
        credentials: 'include',
        mode: 'cors',
      };
      const fetchRequest = new Request('login?action=logout', params);
      fetch(fetchRequest).then((/* response: Response */) => {
        const baseUri = AuthUtils.getConfig().ALL.baseUri;
        // Tell the browser to delete the SessionId cookie
        document.cookie = `SessionId=; Path=${baseUri}; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
        document.cookie = `JSESSIONID=; Path=${baseUri}; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
        document.location.assign(baseUri);
      }).catch((error: any) => {
        console.warn('Failed to log out:', error);
      });
    }
  }

  /**
   * Implementation of the obfuscation algorithm from Jetty.
   */
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

  /**
   * Validate a password against a hashed one.
   */
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

  /**
   * Find the user info for a given user name.
   * This is only applicable in the case of XML authentication.
   */
  static findUser(username: string): any {
    if (this.config.ALL.authType === 'XML') {
      if (Array.isArray(AuthUtils.users.principals.user)) {
        return AuthUtils.users.principals.user.find((testUser) => {
          return testUser.$.id === username;
        });
      }
      // This will happen if there's only use user...
      if (AuthUtils.users.principals.user.$.id === username) {
        return AuthUtils.users.principals.user;
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
    if (AuthUtils.config.ALL.authType === 'XML') {
      const userObject = AuthUtils.findUser(username);
      if (userObject) {
        if (AuthUtils.passwordMatches(password, userObject.$.password)) {
          sessionStorage.setItem(AuthUtils.USER_KEY, JSON.stringify(userObject));
          return null;
        }
      }
      return new Error('Invalid log-in credentials.');
    }
    return null;
  }

  /**
   * Save the currently logged-in user's info into session storage for easy access.
   */
  static saveLoggedInUser(userInfo: any) {
    if (userInfo) {
      const userInfoCopy = JSON.parse(JSON.stringify(userInfo));
      sessionStorage.setItem(AuthUtils.USER_KEY, JSON.stringify(userInfoCopy));
    } else {
      sessionStorage.removeItem(AuthUtils.USER_KEY);
    }
  }

  /**
   * Check whether the user has a particular permission.
   */
  static hasPermission(user: any, permission: string): boolean {
    if (AuthUtils.config && AuthUtils.config.ALL && AuthUtils.config.ALL.authType === 'NONE') {
      // check if user is part of the role passed to this function.
      if (user.roles.includes(permission)) {
        return true;
      }
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

    const user = AuthUtils.getSavedUser();
    if (user) {
      if (permission) {
        return AuthUtils.hasPermission(user, permission);
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
  static getSavedUser(): any {
    const userObjectJson = sessionStorage.getItem(AuthUtils.USER_KEY);
    if (userObjectJson) {
      const userObject = JSON.parse(userObjectJson);
      return userObject;
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
    const userObject = AuthUtils.getSavedUser();
    if (userObject) {
      callback(userObject);
    } else if (AuthUtils.config.ALL.authType === 'SAML' || AuthUtils.config.ALL.authType === 'NONE') {
      // If the authentication is done on the front-end, we shouldn't
      // ever get here because if there's no saved user, then
      // no one is logged in yet...
      const fetchResponseCallback = (userInfo: any | null, error: string | null) => {
        if (userInfo) {
          AuthUtils.saveLoggedInUser(userInfo);
        }
        if (error) {
          console.error('Got an error retrieving the current user\'s details.', error);
        }
        callback(userInfo);
      };
      FetchUtils.fetch(
        `${AuthUtils.config.ALL.baseUri}/rest/serverDetailsApi/user`,
        null,
        fetchResponseCallback,
        'GET',
        'Got an error retrieving the current user\u2019s details.');
    } else {
      // If we're doing our own authentication, and nobody is logged in, pass null to the callback
      callback(null);
    }
  }

  static getLoggedInUserId(): string {
    const userInfo = AuthUtils.getSavedUser();
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

  /**
   * Validate the users object to make sure it won't cause us any
   * grief. Return null if it's good, or an error message otherwise.
   * This should only be called if auth type is 'XML'
   */
  static validateUsers(users: any): string | null {
    if (!users) {
      return 'The users.xml file was not properly loaded.';
    }
    if (!users.principals) {
      return 'The users.xml file is invalid; it must contain an outer <principals> element.';
    }
    if (!users.principals.user) {
      return 'The users.xml file is invalid; it must contain at least one <user> definition.';
    }
    if (Array.isArray(users.principals.user)) {
      for (let i = 0; i < users.principals.user.length; i += 1) {
        if (!users.principals.user[i].$ || !StringUtils.notEmpty(users.principals.user[i].$.id)) {
          return `The users.xml file is invalid; the user at position ${i} is missing an "id" attribute.`;
        }
      }
    } else if (!users.principals.user.$ || !StringUtils.notEmpty(users.principals.user.$.id)) {
      return 'The users.xml file is invalid; the user is missing an "id" attribute.';
    }
    return null;
  }

  /**
   * Validate the configuration object to make sure it won't cause us any
   * grief. Return null if it's good, or an error message otherwise.
   */
  static validateConfiguration(config: any, simpleValidation: boolean = false): string | null {
    if (!config) {
      return 'The configuration object must be specified.';
    }
    if (!config.ALL) {
      return 'The configuration object is missing the \'ALL\' value.';
    }
    if (config.ALL.baseUri === null || typeof config.ALL.baseUri === 'undefined') {
      // Note that baseUri can be the empty string, as in the case of running inside a node
      return 'The configuration object is missing the \'ALL.baseUri\' value.';
    }
    if (!StringUtils.notEmpty(config.ALL.basename)) {
      return 'The configuration object is missing the \'ALL.basename\' value.';
    }
    if (!StringUtils.notEmpty(config.ALL.authType)) {
      return 'The configuration object is missing the \'ALL.authType\' value.';
    }
    if (config.ALL.authType !== 'XML' && config.ALL.authType !== 'SAML' && config.ALL.authType !== 'NONE') {
      return `The configuration object has an invalid value for 'ALL.authType': it must be 'XML,' 'SAML,' or 'NONE' but it is '${config.ALL.authType}.'`; // eslint-disable-line max-len
    }
    if (config.ALL.authType === 'XML' && !config.ALL.loginPage) {
      return 'The configuration is missing the \'All.loginPage\' value whiich is required when authentication is set to XML.';
    }
    if (!StringUtils.notEmpty(config.ALL.defaultRealm)) {
      return 'The configuration object is missing the \'ALL.defaultRealm\' value.';
    }
    if (!simpleValidation) {
      if (!config.ALL.entityFields) {
        return 'The configuration object is missing the \'ALL.entityFields\' value.';
      }
      if (!(config.ALL.entityFields instanceof Map)) {
        return 'The configuration object\'s \'ALL.entityFields\' value should be a Map.';
      }
      if (!config.ALL.entityColors) {
        return 'The configuration object is missing the \'ALL.entityColors\' value.';
      }
      if (!(config.ALL.entityColors instanceof Map)) {
        return 'The configuration object\'s \'ALL.entityColors\' value should be a Map.';
      }
      if (!config.ALL.fields) {
        return 'The configuration object is missing the \'ALL.fields\' value.';
      }
      if (!Array.isArray(config.ALL.fields)) {
        return 'The configuration object\'s \'ALL.fields\' value should be an array with at least one value.';
      }
      if (config.ALL.fields.length < 1) {
        return 'The configuration object\'s \'ALL.fields\' value should be an array with at least one value.';
      }
      if (!StringUtils.notEmpty(config.ALL.title)) {
        return 'The configuration object is missing the \'ALL.title\' value.';
      }
      if (!StringUtils.notEmpty(config.ALL.uri)) {
        return 'The configuration object is missing the \'ALL.uri\' value.';
      }
      if (!StringUtils.notEmpty(config.ALL.table)) {
        return 'The configuration object is missing the \'ALL.table\' value.';
      }
      if (!StringUtils.notEmpty(config.ALL.latitude)) {
        return 'The configuration object is missing the \'ALL.latitude\' value.';
      }
      if (!StringUtils.notEmpty(config.ALL.longitude)) {
        return 'The configuration object is missing the \'ALL.longitude\' value.';
      }
      if (!StringUtils.notEmpty(config.ALL.mimetype)) {
        return 'The configuration object is missing the \'ALL.mimetype\' value.';
      }
      if (!StringUtils.notEmpty(config.ALL.sourcePath)) {
        return 'The configuration object is missing the \'ALL.sourcePath\' value.';
      }
      if (!StringUtils.notEmpty(config.ALL.previewImageUri)) {
        return 'The configuration object is missing the \'ALL.previewImageUri\' value.';
      }
      if (!StringUtils.notEmpty(config.ALL.thumbnailImageUri)) {
        return 'The configuration object is missing the \'ALL.thumbnailImageUri\' value.';
      }
      if (!StringUtils.notEmpty(config.ALL.moreLikeThisQuery)) {
        return 'The configuration object is missing the \'ALL.moreLikeThisQuery\' value.';
      }
      if (!StringUtils.notEmpty(config.ALL.teaser)) {
        return 'The configuration object is missing the \'ALL.teaser\' value.';
      }
      if (!StringUtils.notEmpty(config.ALL.text)) {
        return 'The configuration object is missing the \'ALL.text\' value.';
      }
    }
    return null;
  }

  static getEntityColors(): Map<string, any> {
    if (this.config && this.config.ALL && this.config.ALL.entityColors) {
      return this.config.ALL.entityColors;
    }
    // If it's not configured, return an empty map.
    return new Map();
  }

  static getConfig(): any {
    return this.config;
  }
}
