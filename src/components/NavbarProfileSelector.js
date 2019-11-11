// @flow
import React from 'react';
import PropTypes from 'prop-types';

import Menu, { MenuItemDef } from './Menu';

type NavbarProfileSelectorProps = {
  /** If set, the menu will be pulled to the right side of its parent. */
  right: boolean,
  /** The label to use for the menu. Defaults to "Profile:". */
  label: string,
  /** The names of the profiles to include in the menu. */
  profiles: Array<string>,
};

type NavbarProfileSelectorDefaultProps = {
  right: boolean,
  label: string,
  profiles: Array<string>,
};

/**
 * A pop-up menu that lets the user choose which Business Center profile
 * they will search with. It must be a child of the Searcher component it
 * is controlling.
 */
export default class NavbarProfileSelector extends React.Component<
  NavbarProfileSelectorDefaultProps,
  NavbarProfileSelectorProps,
  void,
> {
  static defaultProps: NavbarProfileSelectorDefaultProps = {
    right: false,
    label: 'Profile:',
    profiles: [],
  };

  static contextTypes = {
    searcher: PropTypes.any,
  };

  static displayName = 'NavbarProfileSelector';

  static makeMenuItem(profileName: string, current: boolean) {
    const profileNameElement = current ? (
        <b>
          {profileName}
        </b>
      ) : profileName;
    return (
      <li key={profileName}>
        <a>
          {profileNameElement}
        </a>
      </li>
    );
  }

  profileChanged = (item: MenuItemDef) => {
    const { searcher } = this.context;
    searcher.setSearchProfile(item.value);
  }

  render() {
    const { searcher } = this.context;
    if (searcher) {
      const { profile: currentProfile } = searcher.state;

      const { profiles, label, right } = this.props;
      const menuItems = profiles.map((profileName: string) => {
          return new MenuItemDef(profileName, profileName);
        });
      }

      const className = right ? 'attivio-globalmastnavbar-right' : '';

      return (
        <div className={className}>
          <Menu
            label={label}
            selection={currentProfile}
            items={menuItems}
            onSelect={this.profileChanged}
          />
        </div>
      );
    }
    // If there's no searcher, don't show anything
    return null;
  }    
}
