// @flow
import React, { Children } from 'react';

type SecondaryNavBarProps = {
  /** The items to display in the nav bar. */
  /* $FlowFixMe This comment suppresses an error found when upgrading Flow to
   * v0.107.0. To view the error, delete this comment and run Flow. */
  children: Children;
}

/**
 * A row of subordinate navigation and/or controls under the masthead.
 */
export default class SecondaryNavBar extends React.Component<SecondaryNavBarProps, void> {
  static displayName = 'SecondaryNavBar';

  render() {
    return (
      <div className="attivio-globalmastnavbar attivio-minwidth">
        {this.props.children}
      </div>
    );
  }
}
