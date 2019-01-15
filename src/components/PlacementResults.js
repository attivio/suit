// @flow
import React from 'react';

import PlacementResult from './PlacementResult';
import Placement from '../api/Placement';
import Searcher from './Searcher';

/**
 * A container for showing a list of business center promotional placements from the search results.
 * These come from the parent Searcher component.
 */
export default class PlacementResults extends React.Component<{}, void> {
  static contextTypes = {
    searcher: typeof Searcher,
  };

  static displayName = 'PlacementResults';

  renderResults() {
    const searcher = this.context.searcher;
    const response = searcher.state.response;
    if (response && response.placements && response.documents.length > 0) {
      const placements = response.placements;
      const results = [];
      placements.forEach((placement: Placement) => {
        const key = `${placement.linkUrl || 'noUrl'}-${placement.linkText || 'noText'}-${placement.imageUrl || 'noImage'}`;
        results.push(
          <PlacementResult
            linkUrl={placement.linkUrl}
            linkText={placement.linkText}
            imageUrl={placement.imageUrl}
            markup={placement.markup}
            key={key}
          />,
        );
      });
      return results;
    }
    return null;
  }

  render() {
    const style = {
      listStyle: 'none',
      paddingLeft: 0,
    };

    return (
      <ul style={style}>
        {this.renderResults()}
      </ul>
    );
  }
}
