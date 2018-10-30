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
  required: string | null;
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
  required: string | null;
  location: any;
  authType: 'SAML' | 'XML' | 'NONE';
};

type AuthRouteState = {
  user: any;
};

// LJV TODO Create a no-permissions page to use for unauthorized users
class AuthRoute extends React.Component<AuthRouteDefaultProps, AuthRouteProps, AuthRouteState> {
  static defaultProps = {
    required: null,
    location: null, // This should be filled in by the router
    authType: 'NONE',
  };

  static displayName = 'AuthRoute';

  constructor(props: AuthRouteProps) {
    super(props);
    this.state = {
      user: null,
    };
  }

  state: AuthRouteState;

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
      if (AuthUtils.isLoggedIn(this.props.required)) {
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
            search: '?action=logout',
            state: {
              referrer: this.props.location,
            },
          }}
        />
      );
    }

    // If this route doesn't require any special credentials or it does and the currently logged-in user meets them
    if (!this.props.required || AuthUtils.isLoggedIn(this.props.required)) {
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
