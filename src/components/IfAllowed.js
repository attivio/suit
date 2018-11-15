// flow

import React from 'react';
import type { Children } from 'react';
import PropTypes from 'prop-types';

import Configurable from './Configurable';

type IfAllowedProps = {
  /**
   * The role representing a top-level admin, allowed to view any available widget.
   * Optional, defaulting to "AIE_Administrator"
   */
  adminRole: string;
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

type IfAllowedDefaultProps = {
  adminRole: string;
};

/**
 * Only displays its children if the currently logged-in user has the required role.
 */
class IfAllowed extends React.Component<IfAllowedDefaultProps, IfAllowedProps, void> {
  static defaultProps: IfAllowedDefaultProps = {
    adminRole: 'AIE_Administrator',
  };

  static contextTypes = {
    auth: PropTypes.any,
  };

  isAllowed(): boolean {
    let allowed: boolean = false;
    if (this.context.auth && this.context.auth.state && this.context.auth.state.user) {
      allowed = (
        this.context.auth.state.user.roles.indexOf(this.props.requiredRole) >= 0 ||
        this.context.auth.state.user.roles.indexOf(this.props.adminRole) >= 0
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

export default Configurable(IfAllowed);
