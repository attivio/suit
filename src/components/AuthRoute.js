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
  requiredRole?: FunctionStringCallback;
  /**
   * Location shouldn't ever be set by the containing component, only
   * by the router.
   */
  location?: any;
  /**
   * The authentication method being used
   */
  authType?: 'SAML' | 'XML' | 'NONE';
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
  static defaultProps: AuthRouteDefaultProps = {
    requiredRole: null,
    location: null, // This should be filled in by the router
    authType: 'NONE',
  };

  static childContextTypes = {
    user: PropTypes.any,
  };

  state: AuthRouteState = {
    user: null,
  };

  getChildContext() {
    const { user } = this.state;
    return {
      user,
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
    const { authType, requiredRole, location } = this.props;
    // if authentication is via XML, handled here in JavaScript, make sure the user is logged in.
    if (authType === 'XML') {
      if (AuthUtils.isLoggedIn(requiredRole)) {
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
              referrer: location,
            },
          }}
        />
      );
    }

    // If this route doesn't require any special credentials or it does and the currently logged-in user meets them
    if (!requiredRole || AuthUtils.isLoggedIn(requiredRole)) {
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
