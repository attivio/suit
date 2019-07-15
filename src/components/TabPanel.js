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
  /**
   * Property that contains the prefix for data-test attribute
   * added to elements to be uniquely identified by testing tools
   * like Selenium. The prefix should contain information about
   * where the Tab is placed and the tab id (which contains the
   * name of the tab) will be appended to this prefix making it unique.
   * For example, if prefix like "InspectorDetails-TabPanel-" is provided,
   * the final data-test value would be "InspectorDetails-TabPanel-configuration"
   * for the configuration page.
   */
  dataTestPrefix?: string | null;
};

type TabPanelDefaultProps = {
  tabLabel: string | null;
  nested: boolean;
  dataTestPrefix : string | null;
};

export default class TabPanel extends React.Component<TabPanelDefaultProps, TabPanelProps, void> {
  static defaultProps = {
    tabLabel: null,
    nested: false,
    dataTestPrefix: null,
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
    const dataTestPrefix = this.props.dataTestPrefix;
    const tabTabs = this.props.tabInfos.map((tabInfo) => {
      const dataTestValue = dataTestPrefix ? dataTestPrefix.concat(tabInfo.id) : '';
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
            data-test={dataTestValue}
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
