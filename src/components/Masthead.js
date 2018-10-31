// @flow
import React from 'react';
import type { Children } from 'react';

import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Configurable from './Configurable';
import MastheadUser from './MastheadUser';
import AuthUtils from '../util/AuthUtils';

type MastheadProps = {
  location: PropTypes.object.isRequired;
  history: PropTypes.object.isRequired;
  /** The logo to display. Defaults to an Attivio logo. */
  logoUri: string | null;
  /** Alt text for the logo. Defaults to "Attivio Home". */
  logoAlt: string | null;
  /** The route to navigate to when the user clicks the logo. Defaults to '/' */
  homeRoute: string | null;
  /** The name of the application. */
  applicationName: string | null;
  /** If set, then the application name will wrap to two lines. */
  multiline: boolean;
  /**
   * The engine being used. Defaults to 'attivio.'
   */
  searchEngineType: 'attivio' | 'solr' | 'elastic';
  /** The URI to use for global on-line help. If not set, the help button won't be shown. */
  helpUri: string | null;
  /**
   * The username to use if not using AuthUtils to get it. Setting this
   * disables logging out as a side-effect.
   */
  username: string | null;
  /**
   * The function to call when the user chooses to log out. If this is not
   * set, then the logout menu item won't be shown for the current user.
   * NOTE: If the user is logged in via SAML authentication, the logout
   * menu item will always be hidden and this function will never be called.
   */
  logoutFunction: null | () => void,
  /** The contents of the Masthead can be arbitrary components. */
  children: Children;
};

type MastheadDefaultProps = {
  logoUri: string | null;
  logoAlt: string | null;
  homeRoute: string | null;
  applicationName: string | null;
  multiline: boolean;
  searchEngineType: 'attivio' | 'solr' | 'elastic';
  helpUri: string | null;
  username: string | null;
  logoutFunction: null | () => void,
};

type MastheadState = {
  userInfo: any | null;
};

/**
 * Display a masthead header at the top of your page. It displays a logo,
 * the name of the application, and the currently logged-in user. It can
 * contain arbitrary components, but components particularly suited for
 * being in masthead have names that start with "Masthead," such as
 * MastheadNavBar and MastheadNavTabs.
 */
class Masthead extends React.Component<MastheadDefaultProps, MastheadProps, MastheadState> {
  static defaultProps: MastheadDefaultProps = {
    logoUri: 'img/attivio-logo-reverse.png',
    logoAlt: 'Attivio Home',
    homeRoute: '/',
    logoutFunction: null,
    applicationName: 'Cognitive Search',
    multiline: false,
    searchEngineType: 'attivio',
    helpUri: null,
    username: null,
  }

  static contextTypes = {
    searcher: PropTypes.any,
  };

  static displayName = 'Masthead';

  constructor(props: MastheadProps) {
    super(props);
    this.state = {
      userInfo: null,
    };
    (this: any).navigateHome = this.navigateHome.bind(this);
    (this: any).updateUser = this.updateUser.bind(this);
  }

  state: MastheadState;

  componentWillMount() {
    this.updateUser();
  }

  componentWillReceiveProps() {
    this.updateUser();
  }

  updateUser() {
    if (this.props.username) {
      this.setState({
        userInfo: {
          userId: this.props.username,
        },
      });
    } else {
      const currentUser = AuthUtils.getSavedUser();
      if (currentUser) {
        this.setState({
          userInfo: currentUser,
        });
      } else {
        // If we need to, ask the server...
        AuthUtils.getLoggedInUserInfo((loggedInUserInfo) => {
          this.setState({
            userInfo: loggedInUserInfo,
          });
        });
      }
    }
  }

  navigateHome() {
    if (this.homeLink) {
      this.homeLink.blur();
    }
    this.context.searcher.reset();
    this.props.history.push({ pathname: this.props.homeRoute, search: this.props.location.search });
  }

  homeLink: ?HTMLAnchorElement;

  render() {
    let engineInfo = null;
    if (this.props.searchEngineType === 'solr') {
      engineInfo = (
        <span
          style={{
            display: 'inline-block',
            float: 'right',
            fontSize: '0.6875em',
            fontWeight: 100,
            color: '#fff',
            width: '100%',
            textAlign: 'right',
            padding: 0,
          }}
        >
          for Apache Solr
        </span>
      );
    } else if (this.props.searchEngineType === 'elastic') {
      engineInfo = (
        <span
          style={{
            display: 'inline-block',
            float: 'right',
            fontSize: '0.6875em',
            fontWeight: 100,
            color: '#fff',
            width: '100%',
            textAlign: 'right',
            padding: 0,
          }}
        >
          for Elasticsearch
        </span>
      );
    }

    let logoutFunction = this.props.logoutFunction;
    if (this.state.userInfo) {
      if (this.state.userInfo.saml) {
        // If the user is logged in via SAML, diable logging out.
        logoutFunction = null;
      }
    } else {
      // If there's no user logged in, then disable logging out.
      logoutFunction = null;
    }

    return (
      <header className="attivio-globalmast attivio-minwidth">
        <div className="attivio-container">
          <button
            style={{ backgroundColor: 'transparent', borderWidth: 0 }}
            onClick={this.navigateHome}
            className="attivio-globalmast-logo attivio-globalmast-separator after"

            ref={(c) => {
              this.homeLink = c;
            }}
          >
            <img src={this.props.logoUri} alt={this.props.logoAlt} className="attivio-globalmast-logo-img" />
            {engineInfo}
          </button>
          <div className={`attivio-globalmast-appname attivio-globalmast-separator after ${this.props.multiline ? '' : 'nowrap'}`}>
            {this.props.applicationName}
          </div>
          {this.props.children}
          <div className="attivio-globalmast-spacer" />
          <MastheadUser
            username={AuthUtils.getUserName(this.state.userInfo)}
            logoutFunction={logoutFunction}
            helpUri={this.props.helpUri}
          />
        </div>
      </header>
    );
  }
}

export default withRouter(Configurable(Masthead));
