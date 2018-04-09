// @flow
import React from 'react';

type NavbarOrProps = {
  /** The "or" message to display. defaults to "OR" */
  message: string;
};

type NavbarOrDefaultProps = {
  message: string;
};

/**
 * A component to use in a navbar to interject a choice between two others.
 */
export default class NavbarOr extends React.Component<NavbarOrDefaultProps, NavbarOrProps, void> {
  static defaultProps = {
    message: 'OR',
  };

  static displayName = 'NavbarOr';

  render() {
    return (
      <li style={{ listStyle: 'none', paddingLeft: '4px' }}>
        <span className="attivio-or" style={{ lineHeight: '20px' }}>
          {this.props.message}
        </span>
      </li>
    );
  }
}
