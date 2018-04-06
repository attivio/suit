// @flow
import React from 'react';
import PropTypes from 'prop-types';

import NavbarFilter from './NavbarFilter';

export default class SearchResultsFacetFilters extends React.Component<void, {}, void> {
  static contextTypes = {
    searcher: PropTypes.any,
  };

  static displayName = 'SearchResultsFacetFilters';

  static getNavbarFilter(key: string, name: string, label: string, remove: () => void) {
    return (
      <NavbarFilter
        key={key}
        facetName={name}
        bucketLabel={label}
        removeCallback={remove}
      />
    );
  }

  render() {
    const filters = this.context.searcher.state.facetFilters;
    const filterComps = filters.map((filter) => {
      const key = `${filter.facetName}-${filter.bucketLabel}`;
      return SearchResultsFacetFilters.getNavbarFilter(key, filter.facetName, filter.bucketLabel, () => {
        this.context.searcher.removeFacetFilter(filter);
      });
    });
    const geoFilters = this.context.searcher.state.geoFilters;
    const geoFilterComps = geoFilters.map((filter) => {
      return SearchResultsFacetFilters.getNavbarFilter(filter, 'Position', 'Polygon Filter', () => {
        this.context.searcher.removeGeoFilter(filter);
      });
    });
    return (
      <div style={{ display: 'inline-block' }}>
        {geoFilterComps}
        {filterComps}
      </div>
    );
  }
}
