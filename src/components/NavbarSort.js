// @flow
import React from 'react';
import PropTypes from 'prop-types';

import Menu, { MenuItemDef } from './Menu';

type NavbarSortProps = {
  /** If set, the menu will be pulled to the right side of its parent. */
  right: boolean;
  /** The label to use for the menu. Defaults to "Sort:". */
  label: string;
  /** The names of the fields to include in the menu. */
  fieldNames: Array<string>;
  /**
   * If set, a special Relevancy item will be added to the top of the
   * menu; it sorts on the ".score" field and only in descending order.
   */
  includeRelevancy: boolean;
};

type NavbarSortDefaultProps = {
  right: boolean;
  label: string;
  includeRelevancy: boolean;
};

/**
 * A pop-up menu that lets the user choose which field the
 * search results should be sorted by. It must be a child of
 * the Searcher component it is controlling.
 */
export default class NavbarSort extends React.Component<NavbarSortDefaultProps, NavbarSortProps, void> {
  static defaultProps: NavbarSortDefaultProps = {
    right: false,
    label: 'Sort:',
    includeRelevancy: false,
  };

  static contextTypes = {
    searcher: PropTypes.any,
  };

  static displayName = 'NavbarSort';

  static makeMenuItem(fieldName: string, ascending: boolean, current: boolean) {
    const arrowClass = ascending ? 'attivio-icon-sort-ascending' : 'attivio-icon-sort-descending';
    const fieldNameElement = current ? <b>{fieldName}</b> : fieldName;
    const key = `${fieldName}:${ascending ? 'ASC' : 'DESC'}`;
    return (
      <li key={key}>
        <a>
          {fieldNameElement}
          {' '}
          <span className={arrowClass} />
        </a>
      </li>
    );
  }

  static DESCENDING = 'attivio-icon-sort-descending';
  static ASCENDING = 'attivio-icon-sort-ascending';

  constructor(props: NavbarSortProps) {
    super(props);
    (this: any).sortChanged = this.sortChanged.bind(this);
  }

  sortChanged(item: MenuItemDef) {
    const searcher = this.context.searcher;
    if (searcher) {
      searcher.updateSort(item.value);
    }
  }

  render() {
    let currentSort;
    const searcher = this.context.searcher;
    if (searcher) {
      const currentSortArray = searcher.state.sort;
      if (currentSortArray && currentSortArray.length > 0) {
        currentSort = currentSortArray[0];
      }
    }
    if (!currentSort) {
      currentSort = this.props.includeRelevancy ? '.score:DESC' : `${this.props.fieldNames[0]}:ASC`;
    }

    const menuItems = [];
    if (this.props.includeRelevancy) {
      const relevancyDef = new MenuItemDef('Relevancy', '.score:DESC');
      relevancyDef.customIconClass = NavbarSort.DESCENDING;
      menuItems.push(relevancyDef);
    }
    this.props.fieldNames.forEach((fieldName) => {
      // Make an ascending menu item
      const ascDef = new MenuItemDef(fieldName, `${fieldName}:ASC`);
      ascDef.customIconClass = NavbarSort.ASCENDING;
      menuItems.push(ascDef);
      // And a descending one
      const descDef = new MenuItemDef(fieldName, `${fieldName}:DESC`);
      descDef.customIconClass = NavbarSort.DESCENDING;
      menuItems.push(descDef);
    });

    const leftRight = this.props.right ? 'attivio-globalmastnavbar-right' : '';

    return (
      <div className={leftRight}>
        <Menu
          label={this.props.label}
          selection={currentSort}
          items={menuItems}
          onSelect={this.sortChanged}
        />
      </div>
    );
  }
}
