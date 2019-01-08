// @flow
import React from 'react';
import PropTypes from 'prop-types';

type SearchResultsCountProps = {
  /**
   * A response can be passed in from custom searches if you don't want
   *  to use the response on the searcher in this.context
   */
  response: QueryResponse | null;
  /**
   * If attempting to pass in a custom response, there may be queries that result in errors,
   * which can be passed in here. Otherwise the error from the searcher
   * on this.context will be used.
   */
  error: string | null;
}

type SearchResultsCountDefaultProps = {
  response: QueryResponse | null;
  error: string | null;
}

/**
 * The count of search results or an indication
 * that a search hasn't yet happened.
 */
export default class SearchResultsCount extends React.Component<SearchResultsCountProps, SearchResultsCountDefaultProps, void> {
  static defaultProps = {
    response: null,
    error: null,
  }

  static contextTypes = {
    searcher: PropTypes.any,
  };

  static displayName = 'SearchResultsCount';

  render() {
    let response;
    let message;
    let countMessage;
    if (this.props.response) {
      response = this.props.response;
    } else {
      const searcher = this.context.searcher;
      if (searcher) {
        response = searcher.state.response;
      }
    }
    if (response) {
      const count = response.totalHits;
      if (count === 0) {
        countMessage = 'No results found';
      } else if (count === 1) {
        countMessage = '1 result found';
      } else {
        const countStr = Number(count).toLocaleString();
        countMessage = `${countStr} results found`;
      }
      message = (
        <span>
          {countMessage}
          <span style={{ fontWeight: 'normal' }}>
            {' '}
            (in {response.totalTime}ms)
          </span>
        </span>
      );
    } else if (this.props.error) {
      message = `Error: ${this.props.error}`;
    } else if (this.context.searcher.state.error) {
        // got an error...
      message = `Error: ${this.context.searcher.state.error}`;
    } else {
      message = ''; // Not yet searched...
    }

    return (
      <div className="attivio-globalmastnavbar-results">
        {message}
      </div>
    );
  }
}
