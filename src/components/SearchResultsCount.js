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

  renderMessage = () => {
    const { response, error } = this.props;
    const { searcher } = this.context;
    const derivedResponse = response || searcher.state.response;

    let countMessage;

    if (derivedResponse) {
      const { totalHits: count } = response;
      if (count === 0 || typeof count !== 'number') {
        countMessage = 'No results found';
      } else if (count === 1) {
        countMessage = '1 result found';
      } else {
        countMessage = `${count} results found`;
      }
      return (
        <span>
          {countMessage}
          <span style={{ fontWeight: 'normal' }}>
            {' '}
            (in {response.totalTime}ms)
          </span>
        </span>
      );
    } else if (error) {
      return `Error: ${error}`;
    } else if (searcher.state.error) {
        // got an error...
      return `Error: ${searcher.state.error}`;
    }
    // Not yet searched...
    return '';
  }

  render() {
    return (
      <div className="attivio-globalmastnavbar-results">
        {this.renderMessage()}
      </div>
    );
  }
}
