// @flow
import React from 'react';
import PropTypes from 'prop-types';

type SearchResultsPagerProps = {
  /** If set, then the pager control will be "pulled right" in its parent. */
  right: boolean;
};

type SearchResultsPagerDefaultProps = {
  right: boolean;
};

/**
 * A simple control for paging through a set of results with
 * just forward and back buttons. It works with the parent
 * Searcher component to know about the page the user is currently
 * on and whether we can go forward or backward and also to
 * trigger a jump to the next or previous page.
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
    (this: any).back = this.back.bind(this);
    (this: any).next = this.next.bind(this);
  }

  backButton: ?HTMLAnchorElement;
  nextButton: ?HTMLAnchorElement;

  back(): void {
    if (this.backButton) {
      this.backButton.blur();
    }
    const searcher = this.context.searcher;
    if (searcher) {
      if (searcher.state.response) {
        const pageSize = searcher.state.resultsPerPage;
        if (pageSize > 0) {
          const currentPage = Math.floor(searcher.state.resultsOffset / pageSize);
          if (currentPage > 0) {
            // Can go backward...
            searcher.changePage(currentPage - 1);
          }
        }
      }
    }
  }

  next(): void {
    if (this.nextButton) {
      this.nextButton.blur();
    }
    const searcher = this.context.searcher;
    if (searcher) {
      if (searcher.state.response) {
        const pageSize = searcher.state.resultsPerPage;
        if (pageSize > 0) {
          const currentPage = Math.floor(searcher.state.resultsOffset / pageSize);
          const totalDocs = searcher.state.response.totalHits;
          const maxPage = Math.floor(totalDocs / pageSize);
          if (currentPage < maxPage) {
            // Can go forward...
            searcher.changePage(currentPage + 1);
          }
        }
      }
    }
  }

  render() {
    const searcher = this.context.searcher;
    if (searcher) {
      if (searcher.state.response) {
        const pageSize = searcher.state.resultsPerPage;
        if (pageSize > 0) {
          const currentPage = Math.floor(searcher.state.resultsOffset / pageSize);
          const currentDisplayPage = Number(currentPage + 1).toLocaleString();
          const totalHits = searcher.state.response.totalHits;
          const lastPage = Math.ceil(totalHits / pageSize);

          const canGoLeft = currentPage > 0;
          const leftButton = canGoLeft ? (
            <a
              role="button"
              tabIndex={0}
              className="attivio-globalmastnavbar-pagination-previous attivio-globalmastnavbar-btn attivio-icon-arrow-left-gray"
              onClick={this.back}
              ref={(c) => {
                this.backButton = c;
              }}
            >
              Previous
            </a>
          ) : (
            <a
              className="attivio-globalmastnavbar-pagination-previous attivio-globalmastnavbar-btn attivio-icon-arrow-left-gray disabled" // eslint-disable-line max-len
            >
              Previous
            </a>
          );
          const canGoRight = currentPage < (lastPage - 1);
          const rightButton = canGoRight ? (
            <a
              role="button"
              tabIndex={0}
              className="attivio-globalmastnavbar-pagination-next attivio-globalmastnavbar-btn attivio-icon-arrow-right-gray"
              onClick={this.next}
              ref={(c) => {
                this.nextButton = c;
              }}
            >
            Next
            </a>
          ) : (
            <a
              className="attivio-globalmastnavbar-pagination-next attivio-globalmastnavbar-btn attivio-icon-arrow-right-gray disabled" // eslint-disable-line max-len
            >
            Next
            </a>
          );

          const leftRight = this.props.right ? 'attivio-globalmastnavbar-right' : '';

          return (
            <div className={leftRight}>
              <div className="attivio-globalmastnavbar-pagination">
                {leftButton}
                <div className="attivio-globalmastnavbar-pagination-page">Page {currentDisplayPage}</div>
                {rightButton}
              </div>
            </div>
          );
        }
      }
    }
    // No searcher or no results... return nothing;
    return null;
  }
}
