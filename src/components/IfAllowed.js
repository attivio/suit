// flow

import React from 'react';
import type { Children } from 'react';
import PropTypes from 'prop-types';

import SecurityApi from '../api/SecurityApi';
import Secured from './Secured';

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

type IfAllowedState = {
  allowed: boolean;
};

/**
 * Only displays its children if the currently logged-in user has the required role.
 */
export default class IfAllowed extends React.Component<void, IfAllowedProps, IfAllowedState> {

  static contextTypes = {
    secured: PropTypes.any,
  };

  constructor(props: SecuredProps) {
    super(props);
    this.state = {
      allowed: false,
    };

    (this: any).setAllowed = this.setAllowed.bind(this);
  }

  state: IfAllowedState;

  componentWillMount() {
    if (this.context.secured && this.context.secured.state) {
      this.setAllowed(this.context.secured.state.roles.indexOf(this.props.requiredRole) >= 0);
    } else {
      SecurityApi.currentUserHasRole(this.props.requiredRole).then(this.setAllowed);
    }
  }

  setAllowed(allowed: boolean) {
    this.setState({ allowed });
  }

  render() {
    if (this.state.allowed) {
      return (
        <div>
          {this.props.children}
        </div>
      );
    }
    return null;
  }
}
