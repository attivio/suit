// @flow
import React from 'react';
import PropTypes from 'prop-types';

import Menu, { MenuItemDef } from './Menu';

type SearchResultsPerPageProps = {
  /** The options to show. Defaults to 10, 25, 50, and 100. */
  options: Array<number>;
};

type SearchResultsPerPageDefaultProps = {
  /** The options to show. Defaults to 10, 25, 50, and 100. */
  options: Array<number>;
};

/**
 * A pop-up for choosing how many search results should be
 * on each page. It works with the parent Searcher component to
 * update its property and to show the current value.
 */
export default class SearchResultsPerPage extends React.Component<SearchResultsPerPageDefaultProps, SearchResultsPerPageProps, void> { // eslint-disable-line max-len
  static defaultProps = {
    options: [10, 25, 50, 100],
  };

  static contextTypes = {
    searcher: PropTypes.any,
  };

  static displayName = 'SearchResultsPerPage';

  constructor(props: any) {
    super(props);
    (this: any).onSelect = this.onSelect.bind(this);
  }

  onSelect(item: MenuItemDef) {
    const newValue = parseInt(item.value, 10);
    const searcher = this.context.searcher;
    if (searcher) {
      searcher.updateResultsPerPage(newValue);
    }
  }

  render() {
    const searcher = this.context.searcher;
    let value = 25;
    if (searcher) {
      value = searcher.state.resultsPerPage;
    }

    const items = this.props.options.map((count) => {
      const stringCount = count.toString();
      return new MenuItemDef(stringCount, stringCount);
    });

    return (
      <Menu
        label="Page Size:"
        items={items}
        selection={value.toString()}
        onSelect={this.onSelect}
      />
    );
  }
}
