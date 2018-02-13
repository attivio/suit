// @flow
import md5 from 'crypto-js/md5';

import ObjectUtils from './ObjectUtils';
import StringUtils from './StringUtils';

export default class AuthUtils {
  static USER_KEY = 'suit-user';
  static TIMEOUT = 30 * 60 * 1000;
  static users = {
    user: [],
  };
  static config = {
    /**
     * These properties are not specific to any page/component but may apply to any/all of them.
     */
    ALL: {
      // This is the prefix to use for routes in the application. For example, if it will
      // running under '/searchui', you will want to set this value to '/searchui' (note the leading slash
      // and lack of a trailing slash). For running directory at the root of the URL, simply set
      // this to '/'.
      basename: '/',
      // Set this to 'SAML' to enable SAML authentication from the front end (it must also be
      // enabled on the back end). Set to 'XML' to use the users.xml file to define users and use
      // the local login page to enter credentials. For demo or development purposes, you can set
      // this to 'NONE' to disable authentication altogether.
      authType: 'XML',

      // The location of the node through which to interact with Attivio
      baseUri: 'http://localhost:8080',

      // The default user to use when searching and no principal is specified.
      defaultUser: 'aieadmin',

      // The default principal realm to use when searching and no principal is specified
      defaultRealm: 'aie',

      // A map of document fields to display labels to use as entity mappings
      // Note this should be obsolete once the display names are in the schema
      // for FactBook and we start querying the schema to get this map.
      entityFields: ObjectUtils.toMap({
        people: 'People',
        company: 'Companies',
        location: 'Locations',
        languages: 'Languages',
        // Factbook fields - uncomment lines below if factbook module has been included in your project
        // spokenLanguage: 'Spoken Languages',
        // resource: 'Resources',
        // climate: 'Climate',
        // ethnicity: 'Ethnicities',
        // country: 'Country',
        date: 'Date',
        keyphrases: 'Key Phrases',
      }),
      // Controls the colors used to show various entity types (the value can be any valid CSS color)
      entityColors: ObjectUtils.toMap({
        location: '#007dbc',
        company: '#ed7a23',
        people: '#fedd0e',
        product: '#db2e75',
        religion: '#ef8baa',
        jobtitle: '#fcb62c',
        phonenum: '#c32026',
        email: '#a04ba0',
        url: '#767676',
        utm: '#e6e6e6',
        time: '#934900',
        extracteddate: '#d3cba9',
        keyphrase: '#037f70',
        hashtags: '#0caa93',
        mentions: '#38e5cc',
        creditcard: '#1b7735',
        money: '#6fbe44',
        nationality: '#77d5f3',
        distance: '#075484',
        coordinate: '#caeefa',
      }),
      // The default comprehensive list of fields to include in search results
      fields: [
        '*',
      ],
      // The field containing the document's title
      title: 'title',
      // The field containing the document's URI
      uri: 'uri',
      // The field containing the document's table
      table: 'table',
      // The field containing the document's latitude
      latitude: 'latitude',
      // The field containing the document's longitude
      longitude: 'longitude',
      // The field containing the document's MIME type (used by the browser when downloading files)
      mimetype: 'mimetype',
      // The field containing the document's sourcepath (used by the browser when downloading files)
      sourcePath: 'sourcepath',
      // The field containing the URI to the document's preview image
      previewImageUri: 'img.uri.preview',
      // The field containing the URI to the document's thumbnail image
      thumbnailImageUri: 'img.uri.thumbnail',
      // The field containing the 'more like this' query for a document
      moreLikeThisQuery: 'morelikethisquery',
      // The field containing the document's teaser text
      // (the default SCOPETEASER expression enables scope highlighting on results)
      teaser: 'SCOPETEASER(text, fragment=true, numFragments=4, fragmentScope=sentence)',
      // The field containing the document's full text
      // (the default SCOPETEASER expression enables scope highlighting on results)
      text: 'SCOPETEASER(text, fragment=true, numFragments=1, fragmentSize=2147483647)',
      // The public key with which to connect to the mapbox public apis
      mapboxKey: '',
    },

    /**
     * These properties configure only the default values for properties of any Masthead component(s).
     * The Masthead typically appears at the top of the page and contains a logo image, a page title, navigation breadcrumbs, and a
     * search input.
     */
    Masthead: {
      // The location of the logo image to render on the left side of the masthead
      logoUri: 'img/attivio-logo-reverse.png',
      // The alt text for the logo.
      logoAlt: 'Attivio Home',
      // The route to navigate to when the user clicks the logo.
      homeRoute: '/',
      // The name of the application.
      applicationName: 'Cognitive Search',
    },

    /**
     * These properties configure only the default values for properties of any SearchBar component(s).
     * The SearchBar is the input dom element through which the user can type and enter queries.
     */
    SearchBar: {
      // The placeholder text to display when the input field is empty.
      placeholder: 'Search…',
      // The placeholder text to display when the input field is empty and the language is advanced.
      placeholderAdvanced: 'Enter an advanced query…',
      // If true, the "microphone" button is displayed beside the search bar and the user can use speech recognition to input the
      // query
      allowVoice: true,
      // Whether to show a toggle for simple/advanced language in the search bar
      allowLanguageSelect: true,
      autoCompleteUri: 'rest/autocompleteApi/richCgi/dictionaryProvider',
    },

    /**
     * These properties configure only the default values for properties of any Searcher component(s).
     * The Searcher is a simple interface used by all its children for any querying logic.
     */
    Searcher: {
      // The workflow to use for executing searches
      searchWorkflow: 'search',
      // The number of results to show per page
      resultsPerPage: 10,
      // An ordered list of facet requests to use for each query; facet expressions are also supported
      facets: [
        'position',
        'keyphrases(maxbuckets=15)',
        'table',
        'tags',
        'company',
        'people',
        'location',
        'date(sortby=VALUE,maxbuckets=60,dateIntervals=auto)',
      ],
      // The maximum number of facets the Facet Finder attempts to add to the query. Set this to 0 to turn off Facet Finder.
      facetFinderCount: 20,
      // Determines if primary results should be displayed as 'list', 'usercard', 'doccard', 'debug', or 'simple';
      format: 'list',
      // An optional filter to apply to all queries when using the advanced query language
      queryFilter: '',
      // The locale for queries; all linguistic processing is performed using this locale
      locale: '',
      // The name of the relevancy models to be able to switch between
      relevancyModels: [
        'default',
      ],
      // Highlight mode for the results of your query: 'on' enables highlighting
      // using your schema preferences and field expressions, 'off' disables
      // highlighting on the request, only highlighting field expressions specified, and
      // 'all' adds a teaser field expression to all your display fields when not in debug mode.
      highlightResults: 'all',
      // Determines how joined results are returned by the server, either as child
      // documents, or rolled up as a part of the parent/top level document. */
      joinRollupMode: 'tree',
      businessCenterProfile: 'Attivio',
    },
  };

  static configure(users: any, config: any) {
    const configError = AuthUtils.validateConfiguration(config);
    if (configError) {
      throw configError;
    }
    const usersError = AuthUtils.validateUsers(users);
    if (usersError) {
      throw usersError;
    }
    AuthUtils.users = users;
    AuthUtils.config = config;
  }

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

  static findUser(username: string): any {
    if (AuthUtils.users && AuthUtils.users.user) {
      if (Array.isArray(AuthUtils.users.user)) {
        return AuthUtils.users.user.find((testUser) => {
          return testUser.$.id === username;
        });
      }
      // This will happen if there's only use user...
      return AuthUtils.users.user;
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

  /**
   * Validate the users object to make sure it won't cause us any
   * grief. Return null if it's good, or an error messager otherwise.
   */
  static validateUsers(users: any): string | null {
    if (!users) {
      return 'The users object must be specified.';
    }
    if (!users.user) {
      return 'The users object is invalid; it must contain at least one user definition.';
    }
    if (Array.isArray(users.user)) {
      for (let i = 0; i < users.user.length; i += 1) {
        if (!users.user[i].$ || !StringUtils.notEmpty(users.user[i].$.id)) {
          return `The users object is invalid; the user at position ${i} is missing an ID.`;
        }
      }
    } else if (!users.user.$ || !StringUtils.notEmpty(users.user.$.id)) {
      return 'The users object is invalid; the single user is missing an ID.';
    }
    return null;
  }

  /**
   * Validate the configuration object to make sure it won't cause us any
   * grief. Return null if it's good, or an error messager otherwise.
   */
  static validateConfiguration(config: any): string | null {
    if (!config) {
      return 'The configuration object must be specified.';
    }
    if (!config.ALL) {
      return 'The configuration object is missing the \'ALL\' value.';
    }
    if (!StringUtils.notEmpty(config.ALL.baseUri)) {
      return 'The configuration object is missing the \'ALL.baseUri\' value.';
    }
    if (!StringUtils.notEmpty(config.ALL.basename)) {
      return 'The configuration object is missing the \'ALL.basename\' value.';
    }
    if (!StringUtils.notEmpty(config.ALL.authType)) {
      return 'The configuration object is missing the \'ALL.authType\' value.';
    }
    if (config.ALL.authType !== 'XML' && config.ALL.authType !== 'SAML' && config.ALL.authType !== 'NONE') {
      return `The configuration object has an invalid value for 'ALL.authType': i5 must be 'XML,' 'SAML,' or 'NONE' but it is '${config.ALL.authType}.'`; // eslint-disable-line max-len
    }
    if (!StringUtils.notEmpty(config.ALL.defaultRealm)) {
      return 'The configuration object is missing the \'ALL.defaultRealm\' value.';
    }
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
    // Don't check this for now... we'll probably make this optional
    // if (!StringUtils.notEmpty(config.ALL.mapboxKey)) {
    //   return 'The configuration object is missing the \'ALL.mapboxKey\' value.';
    // }
    return null;
  }
}
