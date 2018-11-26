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
    user: PropTypes.any,
  };

  isAllowed(): boolean {
    let allowed: boolean = false;
    if (this.context.user) {
      allowed = (
        this.context.user.roles.includes(this.props.requiredRole) ||
        this.context.user.roles.includes(AuthUtils.ADMIN_ROLE)
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
