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
   * The authenticaton method being used
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
    // If the user is logged in and has permission for this
    // route, then just render the route.
    if (AuthUtils.isLoggedIn(this.props.required)) {
      return (
        <Route
          {...this.props}
        />
      );
    }

    // For local authentication, then just redirect to the login page.
    if (this.props.authType === 'XML') {
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: {
              referrer: this.props.location,
            },
          }}
        />
      );
    }
    return null;
  }
}

export default Configurable(AuthRoute);
