// @flow

import React from 'react';

type SmallTabsProps = {
  /** The list of tab labels for the control. */
  tabs: Array<string>;
  /** The currently selected tab, if any. Default is nothing selected. */
  currentTab: string;
  /** Callback that is invoked when the user clicks a tab. */
  changed: (string) => void;
};

type SmallTabsDefaultProps = {
  currentTab: string;
};

/**
 * A set of buttons for choosing among a series of mutually exclusive options.
 */
export default class SmallTabs extends React.Component<SmallTabsDefaultProps, SmallTabsProps, void> {
  static defaultProps = {
    currentTab: '',
  };

  static displayName = 'SmallTabs';

  constructor(props: SmallTabsProps) {
    super(props);
    (this: any).onClick = this.onClick.bind(this);
  }

  onClick(event: Event & { target: HTMLAnchorElement }) {
    const tabName = event.target.attributes.getNamedItem('data-tab-name').value;
    this.props.changed(tabName);
    event.target.blur();
  }

  render() {
    const currentTab = this.props.currentTab;
    const items = this.props.tabs.map((tab) => {
      if (tab === currentTab) {
        return <li key={tab}><a className="attivio-smalltabs-selected">{tab}</a></li>;
      }
      return <li key={tab}><a onClick={this.onClick} data-tab-name={tab} role="button" tabIndex={0}>{tab}</a></li>;
    });

    return (
      <ol className="attivio-smalltabs list-inline">
        {items}
      </ol>
    );
  }
}
