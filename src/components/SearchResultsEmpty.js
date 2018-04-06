// @flow
import React from 'react';

/**
 * An indicator that there are no search results.
 */
export default class SearchResultsEmpty extends React.Component<void, {}, void> {
  static displayName = 'SearchResultsEmpty';

  render() {
    const style = {
      textAlign: 'center',
      width: '100%',
      height: '100%',
    };

    return <div style={style}>No search results yet.</div>;
  }
}
