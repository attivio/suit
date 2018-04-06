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
  /** The route of the initially active button, if any. */
  initialTab: string | null;
};

type MastheadNavTabsDefaultProps = {
  initialTab: string | null;
};

type MastheadNavTabsState = {
  currentTab: string | null;
};

/**
 * A set of buttons to use within the Masthead component for
 * navigation within the application. Clicking one will update
 * the application’s router with the button’s route.
 */
class MastheadNavTabs extends React.Component<MastheadNavTabsDefaultProps, MastheadNavTabsProps, MastheadNavTabsState> {
  static defaultProps = {
    initialTab: null,
  };

  static displayName = 'MastheadNavTabs';

  static NavTabInfo;

  constructor(props: MastheadNavTabsProps) {
    super(props);
    let initialTab = this.props.initialTab;
    if (!initialTab) {
      if (this.props.tabInfo && this.props.tabInfo.length > 0 && this.props.tabInfo[0]) {
        initialTab = this.props.tabInfo[0].route;
      }
    }
    this.state = {
      currentTab: initialTab,
    };
    (this: any).routeTo = this.routeTo.bind(this);
  }

  state: MastheadNavTabsState;
  props: MastheadNavTabsProps;

  routeTo(route: string) {
    this.setState({
      currentTab: route,
    }, () => {
      this.props.history.push({ pathname: route, search: this.props.location.search });
    });
  }

  render() {
    const tabs = [];
    this.props.tabInfo.forEach((tabInfo) => {
      const liClass = tabInfo.route === this.state.currentTab ? 'active' : '';
      const clickHandler = tabInfo.route === this.state.currentTab ? null : () => { this.routeTo(tabInfo.route); };

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
