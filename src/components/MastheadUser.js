// @flow
import React from 'react';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';

// LJV TODO Move help link to configuration and don't show if not set.

type MastheadUserProps = {
  /**
   * The name of the user to display, if logged in.
   */
  username: string | null;
  /**
   * The function to call to log the user out. If not set, then no logout menu
   * will be shown.
   */
  logoutFunction: null | () => void;
  /**
   * The URI to use for global on-line help. If not set, the help button won't be shown.
   */
  helpUri: string | null;
};

type MastheadUserDefaultProps = {
  username: string | null;
  logoutFunction: null | () => void;
  helpUri: string | null;
};

/**
 * Displays the currently logged-in user inside the masthead.
 * The user can click on the name to pop-up a menu with a log-out command.
 */
export default class MastheadUser extends React.Component<MastheadUserDefaultProps, MastheadUserProps, void> {
  static defaultProps = {
    username: null,
    logoutFunction: null,
    helpUri: null,
  };

  static displayName = 'MastheadUser';

  constructor(props: MastheadUserProps) {
    super(props);
    (this: any).handleLogoutMenuItem = this.handleLogoutMenuItem.bind(this);
  }

  handleLogoutMenuItem() {
    // We shouldn't get here if there's no logout function, but double-check anyway
    if (this.props.logoutFunction) {
      this.props.logoutFunction();
    }
  }

  render() {
    let dropdown = null;
    // Only show the menu with the logout item if there's a function passed in.
    if (this.props.logoutFunction) {
      dropdown = (
        <span>
          {' '}
          <Dropdown id="attivio-globalmast-user-dropdown" pullRight>
            <Dropdown.Toggle
              noCaret
              useAnchor
              style={{
                background: 'transparent',
                color: '#fff',
              }}
            >
              <span className="attivio-globalmast-icon attivio-icon-arrow-down-blue" />
            </Dropdown.Toggle>
            <Dropdown.Menu onSelect={this.handleLogoutMenuItem}>
              <MenuItem>Log Out</MenuItem>
            </Dropdown.Menu>
          </Dropdown >
          {this.props.helpUri ? (
            <a href={this.props.helpUri} target="_blank" style={{ marginLeft: '8px' }} rel="noopener noreferrer">
              <img src="img/vector/help.svg" title="On-line Help" alt="On-line Help" />
            </a>
          ) : null}
        </span>
      );
    }
    if (this.props.username && this.props.username.length > 0) {
      return (
        <div className="attivio-globalmast-user attivio-globalmast-separator before">
          {this.props.username}
          {dropdown}
        </div>
      );
    }
    return null;
  }
}
