// flow

import React from 'react';
import type { Children } from 'react';
import PropTypes from 'prop-types';

import AuthUtils from '../util/AuthUtils';

type IfAllowedProps = {
  /**
   * The role to require from the user before displaying the provided contents.
   */
  requiredRole: string;
  /**
   * The IfAllowed wrapper contains arbitrary children, providing them with the
   * context necessary to decide what content to display.
   */
  children: Children;
};

/**
 * Only displays its children if the currently logged-in user has the required role.
 */
export default class IfAllowed extends React.Component<void, IfAllowedProps, void> {
  static displayName = 'IfAllowed';

  static contextTypes = {
    auth: PropTypes.any,
  };

  isAllowed(): boolean {
    let allowed: boolean = false;
    if (this.context.auth && this.context.auth.state && this.context.auth.state.user) {
      allowed = (
        this.context.auth.state.user.roles.indexOf(this.props.requiredRole) >= 0 ||
        this.context.auth.state.user.roles.indexOf(AuthUtils.ADMIN_ROLE) >= 0
      );
    }
    return allowed;
  }

  render() {
    if (this.isAllowed()) {
      return (
        <div>
          {this.props.children}
        </div>
      );
    }
    return null;
  }
}
