// @flow
import React from 'react';
import PropTypes from 'prop-types';

import Pager from './Pager';

type SearchResultsPagerProps = {
  /** If set, then the pager control will be "pulled right" in its parent. */
  right: boolean;
};

type SearchResultsPagerDefaultProps = {
  right: boolean;
};

/**
 * A Searcher-aware wrapper around the Pager component that triggers the Searcher to return the
 * next/previous page of search results.
 */
export default class SearchResultsPager extends React.Component<SearchResultsPagerDefaultProps, SearchResultsPagerProps, void> {
  static defaultProps = {
    right: false,
  };

  static contextTypes = {
    searcher: PropTypes.any,
  };

  static displayName = 'SearchResultsPager';

  constructor(props: SearchResultsPagerProps) {
    super(props);
    (this: any).changePage = this.changePage.bind(this);
  }

  changePage(newPage: number): void {
    const searcher = this.context.searcher;
    if (searcher) {
      searcher.changePage(newPage);
    }
  }

  render() {
    const searcher = this.context.searcher;
    if (searcher) {
      if (searcher.state.response) {
        const pageSize = searcher.state.resultsPerPage;
        if (pageSize > 0) {
          const currentPage = Math.floor(searcher.state.resultsOffset / pageSize);
          const totalHits = searcher.state.response.totalHits;
          const numPages = Math.ceil(totalHits / pageSize);

          return (
            <Pager
              onPageChange={this.changePage}
              currentPage={currentPage}
              totalPages={numPages}
              right={this.props.right}
            />
          );
        }
      }
    }
    // No searcher or no results... return nothing;
    return null;
  }
}
