// @flow
import React from 'react';
import PropTypes from 'prop-types';

/**
 * The count of search results or an indication
 * that a search hasn't yet happened.
 */
export default class SearchResultsCount extends React.Component<void, {}, void> {
  static contextTypes = {
    searcher: PropTypes.any,
  };

  render() {
    const searcher = this.context.searcher;
    let message;
    let countMessage;
    if (searcher) {
      const response = searcher.state.response;
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
      } else if (searcher.state.error) {
        // got an error...
        message = `Error: ${searcher.state.error}`;
      } else {
        message = ''; // Not yet searched...
      }
    } else {
      message = 'No searcher is configured.';
    }

    return (
      <div className="attivio-globalmastnavbar-results" {...this.props}>
        {message}
      </div>
    );
  }
}
