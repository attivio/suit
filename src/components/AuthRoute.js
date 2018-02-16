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
  authType: 'SAML' | 'XML';
};

type AuthRouteDefaultProps = {
  required: string | null;
  location: any;
  authType: 'SAML' | 'XML' | 'NONE';
};

// LJV TODO Create a no-permissions page to use for unauthorized users
class AuthRoute extends React.Component<AuthRouteDefaultProps, AuthRouteProps, void> {
  static defaultProps = {
    required: null,
    location: null, // This should be filled in by the router
    authType: 'NONE',
  };

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

    // In the case where the user is not logged in...
    if (this.props.authType === 'SAML') {
      // In the case of SAML authentication, the back end will force
      // the user to log on first but we need to forceably redirect
      // to the "logged out" page so they don't automatically get
      // logged back in by the Identity Provider.
      return (
        <Redirect
          to={{
            pathname: '/loggedout',
          }}
        />
      );
    }
    // For local authentication, then just redirect to the login page.
    return (
      <Redirect
        to={{
          pathname: '/login',
        }}
        state={{
          from: this.props.location,
        }}
      />
    );
  }
}

export default Configurable(AuthRoute);
