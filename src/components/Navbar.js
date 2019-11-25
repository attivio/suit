// @flow
import React, { Children } from 'react';

type NavbarProps = {
  /**
   * Any children can live inside the Navbar but those components whose
   * names start with "Navbar" are designed explicitly to be there.
   */
  /* $FlowFixMe This comment suppresses an error found when upgrading Flow to
   * v0.107.0. To view the error, delete this comment and run Flow. */
  children: Children;
};

/** A navigation bar that's under the main Masthead. */
export default class Navbar extends React.Component<NavbarProps, void> {
  static displayName = 'Navbar';

  render() {
    return (
      <div className="attivio-navbar navbar">
        {this.props.children}
      </div>
    );
  }
}
