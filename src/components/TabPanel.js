// @flow

import React from 'react';

export class TabInfo {
  label: string;
  id: string;
  contents: any;

  constructor(label: string, id: string, contents: any) {
    this.label = label;
    this.id = id;
    this.contents = contents;
  }
}

type TabPanelProps = {
  /** Details for the tabs in the panel */
  tabInfos: Array<TabInfo>;
  /** The currently active tab */
  activeTabId: string;
  /** A callback for when the current tab is changed */
  tabChanged: (newTabId: string) => void;
  /** If set, this is a label that will appear before the first tab */
  tabLabel: string | null;
  /**
   * If set, then this will get the attivio-nested-search-tabpanel CSS
   * class assigned, for use in nested search results.
   */
  nested: boolean;
};

type TabPanelDefaultProps = {
  tabLabel: string | null;
  nested: boolean;
};

export default class TabPanel extends React.Component<TabPanelDefaultProps, TabPanelProps, void> {
  static defaultProps = {
    tabLabel: null,
    nested: false,
  };

  static displayName = 'TabPanel';

  static TabInfo;

  constructor(props: TabPanelProps) {
    super(props);
    (this: any).doClick = this.doClick.bind(this);
  }

  doClick(newTabId: string) {
    this.props.tabChanged(newTabId);
    this.tabElements.forEach((elem) => {
      if (elem) {
        elem.blur();
      }
    });
  }

  tabElements: Array<?HTMLAnchorElement> = [];

  render() {
    const tabTabs = this.props.tabInfos.map((tabInfo) => {
      const className = tabInfo.id === this.props.activeTabId ? 'active' : '';
      const clickHandler = () => { this.doClick(tabInfo.id); };
      return (
        <li key={tabInfo.id} role="presentation" className={className}>
          <a
            aria-controls={`id-${tabInfo.id}`}
            role="tab"
            data-toggle="tab"
            onClick={clickHandler}
            tabIndex={0}
            ref={(elem) => { this.tabElements.push(elem); }}
          >
            {tabInfo.label}
          </a>
        </li>
      );
    });
    const tabContents = this.props.tabInfos.map((tabInfo) => {
      const className = tabInfo.id === this.props.activeTabId ? 'tab-pane active' : 'tab-pane';
      return (
        <div key={tabInfo.id} role="tabpanel" className={className} id={`id-${tabInfo.id}`}>
          {tabInfo.contents}
        </div>
      );
    });

    const className = this.props.nested ? 'attivio-tabpanel attivio-nested-search-tabpanel' : 'attivio-tabpanel';

    return (
      <div role="tabpanel" className={className}>
        {/* -- Nav tabs */}
        <ul className="nav nav-tabs attivio-shadow" role="tablist">
          {this.props.tabLabel ? (
            <li className="attivio-nested-search-tabpanel-records">
              <strong>
                {this.props.tabLabel}
              </strong>
            </li>
          ) : ''}
          {tabTabs}
        </ul>
        {/* Tab panes */}
        <div className="tab-content">
          {tabContents}
        </div>
      </div>
    );
  }
}

TabPanel.TabInfo = TabInfo;
