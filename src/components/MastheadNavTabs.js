// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import NavTabInfo from './NavTabInfo';

type MastheadNavTabsProps = {
  location: PropTypes.object.isRequired;
  history: PropTypes.object.isRequired;
  /**
   * An array of <code>NavTabInfo</code> objects describing the buttons to show.
   */
  tabInfo: Array<NavTabInfo>;
  /** The route of the currently active button, if any. */
  currentTab: string | null;
}

type MastheadNavTabsDefaultProps = {
  currentTab: string | null;
}

/**
 * A set of buttons to use within the Masthead component for
 * navigation within the application. Clicking one will update
 * the application’s router with the button’s route.
 */
class MastheadNavTabs extends React.Component<MastheadNavTabsDefaultProps, MastheadNavTabsProps, void> {
  static defaultProps = {
    currentTab: null,
  };

  static NavTabInfo;

  constructor(props: MastheadNavTabsProps) {
    super(props);
    (this: any).routeTo = this.routeTo.bind(this);
  }

  props: MastheadNavTabsProps;

  routeTo(route: string) {
    this.props.history.push({ pathname: route, search: this.props.location.search });
  }

  render() {
    const tabs = [];
    this.props.tabInfo.forEach((tabInfo) => {
      const liClass = tabInfo.route === this.props.currentTab ? 'active' : '';
      const clickHandler = tabInfo.route === this.props.currentTab ? null : () => { this.routeTo(tabInfo.route); };

      tabs.push((
        <li key={tabInfo.route} className={liClass}>
          <a onClick={clickHandler} role="button" tabIndex={0}>
            {tabInfo.label}
          </a>
        </li>
      ));
    });

    return (
      <div className="attivio-tabpanel-radio attivio-tabpanel-radio-navbar attivio-globalmast-tabpanel">
        <ul className="nav nav-tabs">
          {tabs}
        </ul>
      </div>
    );
  }
}

MastheadNavTabs.NavTabInfo = NavTabInfo;

export default withRouter(MastheadNavTabs);
