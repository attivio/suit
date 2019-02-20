// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import Configurable from './Configurable';
import AuthUtils from '../util/AuthUtils';

type AuthRouteProps = {
  /**
   * The component for which to require authentication.
   */
  component: PropTypes.Component;
  /**
   * If a particular permission is required for this route, set it here.
   * Otherwise, any logged-in user can access the authenticated component.
   */
  requiredRole: string | null;
  /**
   * Location shouldn't ever be set by the containing component, only
   * by the router.
   */
  location: any;
  /**
   * The authentication method being used
   */
  authType: 'SAML' | 'XML' | 'NONE';
};

type AuthRouteDefaultProps = {
  requiredRole: string | null;
  location: any;
  authType: 'SAML' | 'XML' | 'NONE';
};

type AuthRouteState = {
  user: any;
};

// LJV TODO Create a no-permissions page to use for unauthorized users
class AuthRoute extends React.Component<AuthRouteDefaultProps, AuthRouteProps, AuthRouteState> {
  static defaultProps = {
    requiredRole: null,
    location: null, // This should be filled in by the router
    authType: 'NONE',
  };

  static displayName = 'AuthRoute';

  static childContextTypes = {
    user: PropTypes.any,
  }

  constructor(props: AuthRouteProps) {
    super(props);
    this.state = {
      user: null,
    };
  }

  state: AuthRouteState;

  getChildContext() {
    return {
      user: this.state.user,
    };
  }

  componentDidMount() {
    AuthUtils.getLoggedInUserInfo((userInfo: any) => {
      this.setState({
        user: userInfo,
      });
    });
  }

  render() {
    // if authentication is via XML, handled here in JavaScript, make sure the user is logged in.
    if (this.props.authType === 'XML') {
      if (AuthUtils.isLoggedIn(this.props.requiredRole)) {
        return (
          <Route
            {...this.props}
          />
        );
      }
      // insufficient credentials => redirect to our login page
      return (
        <Redirect
          to={{
            pathname: AuthUtils.config.ALL.loginPage,
            state: {
              referrer: this.props.location,
            },
          }}
        />
      );
    }

    // If this route doesn't require any special credentials or it does and the currently logged-in user meets them
    if (!this.props.requiredRole || AuthUtils.isLoggedIn(this.props.requiredRole)) {
      return (
        <Route
          {...this.props}
        />
      );
    }

    // insufficient credentials (provided by external authentication system) => don't let the user through
    return null;
  }
}

export default Configurable(AuthRoute);
