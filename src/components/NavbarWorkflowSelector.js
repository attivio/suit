// @flow
import React from 'react';
import PropTypes from 'prop-types';

import Menu, { MenuItemDef } from './Menu';

type NavbarWorkflowSelectorProps = {
  /** If set, the menu will be pulled to the right side of its parent. */
  right: boolean,
  /** The label to use for the menu. Defaults to "Sort:". */
  label: string,
  /** The names of the fields to include in the menu. */
  workflows: Array<string>,
};

type NavbarWorkflowSelectorDefaultProps = {
  right: boolean,
  label: string,
  workflows: Array<string>,
};

/**
 * A pop-up menu that lets the user choose which Business Center profile
 * they will search with. It must be a child of the Searcher component it
 * is controlling.
 */
export default class NavbarWorkflowSelector extends React.Component<
  NavbarWorkflowSelectorDefaultProps,
  NavbarWorkflowSelectorProps,
  void,
> {
  static defaultProps: NavbarWorkflowSelectorDefaultProps = {
    right: false,
    label: 'Workflow:',
    workflows: [],
  };

  static contextTypes = {
    searcher: PropTypes.any,
  };

  static displayName = 'NavbarWorkflowSelector';

  static makeMenuItem(workflowName: string, current: boolean) {
    const workflowNameElement = current ? <b>{workflowName}</b> : workflowName;
    const key = workflowName;
    return (
      <li key={key}>
        <a>{workflowNameElement}</a>
      </li>
    );
  }

  constructor(props: NavbarWorkflowSelectorProps) {
    super(props);
    (this: any).workflowChanged = this.workflowChanged.bind(this);
  }

  workflowChanged(item: MenuItemDef) {
    const searcher = this.context.searcher;
    if (searcher) {
      searcher.setSearchWorkflow(item.value);
    }
  }

  render() {
    let currentWorkflow = 'search';
    const searcher = this.context.searcher;
    if (searcher) {
      currentWorkflow = searcher.state.selectedSearchWorkflow;
    }

    const { workflows } = this.props;
    const menuItems = workflows.map((workflowName) => {
      return new MenuItemDef(workflowName, workflowName);
    });

    const leftRight = this.props.right ? 'attivio-globalmastnavbar-right' : '';

    return (
      <div className={leftRight}>
        <Menu label={this.props.label} selection={currentWorkflow} items={menuItems} onSelect={this.workflowChanged} />
      </div>
    );
  }
}
