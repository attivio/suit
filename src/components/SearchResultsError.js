// @flow
import React from 'react';

type SearchResultsErrorProps = {
  error: string,
};

/**
 * An indicator of an error that occurred during the search.
 */
export default class SearchResultsError extends React.Component<void, SearchResultsErrorProps, void> {
  static displayName = 'SearchResultsError';

  render() {
    const style = {
      textAlign: 'center',
      width: '100%',
      height: '100%',
    };

    return <div style={style}>An error occurred while searching: {this.props.error}</div>;
  }
}
