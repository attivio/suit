// flow

import React from 'react';
import type { Children } from 'react';
import PropTypes from 'prop-types';

import SecurityApi from '../api/SecurityApi';

type SecuredProps = {
  /**
   * The Secured wrapper contains arbitrary children, providing them with the
   * context necessary to decide what content to display.
   */
  children: Children;
};

type SecuredState = {
  roles: Array<string>;
};

/**
 * This component wraps an application to fetch and provide context to any
 * IfAllowed components declared therein.
 */
export default class Secured extends React.Component<void, SecuredProps, SecuredState> {
  static childContextTypes = {
    secured: PropTypes.any,
  }

  constructor(props: SecuredProps) {
    super(props);
    this.state = {
      roles: [],
    };

    (this: any).setRoles = this.setRoles.bind(this);
  }

  state: SecuredState;

  getChildContext() {
    return {
      secured: this,
    };
  }

  componentWillMount() {
    SecurityApi.getCurrentUserRoles().then(this.setRoles);
  }

  setRoles(roles: Array<string>) {
    this.setState({ roles });
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
