// @flow
import React from 'react';
import PropTypes from 'prop-types';

import Menu, { MenuItemDef } from './Menu';
import FetchUtils from '../util/FetchUtils';

type NavbarProfileSelectorProps = {
  /** If set, the menu will be pulled to the right side of its parent. */
  right: boolean,
  /** The label to use for the menu. Defaults to "Sort:". */
  label: string,
  /** The names of the fields to include in the menu. */
  profiles?: Array<string>,
  /** The base URI is used to fetch available profiles if none are provided via props */
  baseUri: string,
};

type NavbarProfileSelectorDefaultProps = {
  right: boolean,
  label: string,
  profiles: Array<string>,
  baseUri: string,
};

type NavbarProfileSelectorState = {
  /** If not profiles are provided via props,
   * lookup and store a list of profiles that are defined in the Attivio project
   */
  definedProfiles: Array<string>,
};

/**
 * A pop-up menu that lets the user choose which Business Center profile
 * they will search with. It must be a child of the Searcher component it
 * is controlling.
 */
export default class NavbarProfileSelector extends React.Component<
  NavbarProfileSelectorDefaultProps,
  NavbarProfileSelectorProps,
  NavbarProfileSelectorState,
> {
  static defaultProps: NavbarProfileSelectorDefaultProps = {
    right: false,
    label: 'Profile:',
    profiles: [],
    baseUri: '',
  };

  static contextTypes = {
    searcher: PropTypes.any,
  };

  static displayName = 'NavbarProfileSelector';

  static makeMenuItem(profileName: string, current: boolean) {
    const profileNameElement = current ? <b>{profileName}</b> : profileName;
    const key = profileName;
    return (
      <li key={key}>
        <a>{profileNameElement}</a>
      </li>
    );
  }

  constructor(props: NavbarProfileSelectorProps) {
    super(props);
    this.state = {
      definedProfiles: [],
    };
    (this: any).profileChanged = this.profileChanged.bind(this);
  }

  componentDidMount() {
    if (this.props.baseUri) {
      const profilesUri = `${this.props.baseUri}rest/searchProfileApi/getSearchProfileNames`;
      const method = 'GET';
      const callback = (response: any | null, error: string | null) => {
        if (response) {
          // TODO
        } else if (error) {
          this.setState({ definedProfiles: [] });
        }
      };
      FetchUtils.fetch(profilesUri, null, callback, method);
    }
  }

  profileChanged(item: MenuItemDef) {
    const searcher = this.context.searcher;
    if (searcher) {
      searcher.setSearchProfile(item.value);
    }
  }

  render() {
    let currentProfile = 'Default';
    const searcher = this.context.searcher;
    if (searcher) {
      currentProfile = searcher.state.businessCenterProfile;
    }

    const profileList = this.props.profiles ? this.props.profiles : this.state.profiles;
    const menuItems = [];
    profileList.forEach((profileName) => {
      const menuItem = new MenuItemDef(profileName, profileName);
      menuItems.push(menuItem);
    });

    const leftRight = this.props.right ? 'attivio-globalmastnavbar-right' : '';

    return (
      <div className={leftRight}>
        <Menu label={this.props.label} selection={currentProfile} items={menuItems} onSelect={this.profileChanged} />
      </div>
    );
  }
}
