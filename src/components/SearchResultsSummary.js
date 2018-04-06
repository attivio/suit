// @flow
import React from 'react';

type SearchResultsSummaryProps = {
  /** The current page number. */
  pageNumber: number,
  /** The total number of results from the searcher. */
  totalResults: number,
  /** The number of documents on each page. */
  resultsPerPage: number,
  /** Whether or not the searcher has been run yet. */
  haveSearched: boolean,
};

/**
 * A summary of the currently displayed search results.
 */
export default class SearchResultsSummary extends React.Component<void, SearchResultsSummaryProps, void> {
  static displayName = 'SearchResultsSummary';

  render() {
    if (this.props.haveSearched) {
      const pageNumber = this.props.pageNumber;
      const totalResults = this.props.totalResults;
      const resultsPerPage = this.props.resultsPerPage;
      const firstResult = (pageNumber * resultsPerPage) + 1;
      const lastResult = ((firstResult + resultsPerPage) - 1) > totalResults ? totalResults : (firstResult + resultsPerPage) - 1;

      const results = totalResults === 1 ? (
        <span>Your search returned 1 document.</span>
      ) : (
        <span>Your search returned {totalResults} documents.</span>
      );
      let range;
      if (firstResult !== 1 || lastResult < totalResults) {
        // Not showing the full range so let the user know
        range = <span>Currently showing documents {firstResult} through {lastResult}.</span>;
      } else {
        range = <span />;
      }

      return <div>{results} {range}</div>;
    }
    return <div />;
  }
}
