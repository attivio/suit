// @flow
import React from 'react';
import PropTypes from 'prop-types';

import PlacementResult from './PlacementResult';
import Placement from '../api/Placement';

/**
 * A container for showing a list of business center promotional placements from the search results.
 * These come from the parent Searcher component.
 */
export default class PlacementResults extends React.Component<void, {}, void> {
  static contextTypes = {
    searcher: PropTypes.any,
  };

  static displayName = 'PlacementResults';

  renderResults() {
    const searcher = this.context.searcher;
    const response = searcher.state.response;
    if (response && response.placements && response.documents.length > 0) {
      const placements = response.placements;
      const results = [];
      placements.forEach((placement: Placement) => {
        const key = `${placement.linkUrl ? placement.linkUrl : 'nourl'}-${placement.linkText ? placement.linkText : 'notext'}-${placement.imageUrl ? placement.imageUrl : 'noimg'}`; // eslint-disable-line max-len
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
