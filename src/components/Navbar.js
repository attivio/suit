// @flow
import React from 'react';
import type { Node } from 'react';

type NavbarProps = {
  /**
   * Any children can live inside the Navbar but those components whose
   * names start with "Navbar" are designed explicitly to be there.
   */
  children: Node;
};

/** A navigation bar that's under the main Masthead. */
export default class Navbar extends React.Component<NavbarProps> {
  static displayName = 'Navbar';

  render() {
    return (
      <div className="attivio-navbar navbar">
        {this.props.children}
      </div>
    );
  }
}
