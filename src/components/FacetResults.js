// @flow
import * as React from 'react';
import PropTypes from 'prop-types';

import Facet from './Facet';
import SearchFacet from '../api/SearchFacet';
import FacetFilter from '../api/FacetFilter';
import SearchFacetBucket from '../api/SearchFacetBucket';

type FacetResultsProps = {
  /** The facet field names that should be displayed as pie charts */
  pieChartFacets: Array<string> | string | null;
  /** The facet field names that should be displayed as bar charts */
  barChartFacets: Array<string> | string | null;
  /** The facet field names that should be displayed as column charts */
  columnChartFacets: Array<string> | string | null;
  /** The facet field names that should be displayed as lists with bars */
  barListFacets: Array<string> | string | null;
  /** The facet field names that should be displayed as tag clouds */
  tagCloudFacets: Array<string> | string | null;
  /** The facet field names that should be displayed as time series */
  timeSeriesFacets: Array<string> | string | null;
  /** The facet field names that should be displayed with a sentiment bar */
  sentimentFacets: Array<string> | string | null;
  /** The facet field names that should be displayed with a geographic map */
  geoMapFacets: Array<string> | string | null;
  /**
   * The maximum number of items to show in a facet. If there
   * are more than this many buckets for the facet, only this many, with
   * the highest counts, will be shown. Defaults to 15.
   */
  maxFacetBuckets: number;
  /**
   * An optional list of facet field names which will be used to determine
   * the order in which the facets are shown. Any facets not named here will
   * appear after the called-out ones, in the order they are in in the
   * response.facets array of the parent Searcher component.
   */
  orderHint: Array<string>;
  /** Controls the colors used to show various entity types (the value can be any valid CSS color) */
  entityColors: Map<string, string>;
  /**
   * If set, then facets will appear in the results even if they contain no
   * buckets. By default, facets with no buckets will be hidden.
   */
  showEmptyFacets: boolean;
};

/**
 * A container for showing facet results from a search.
 * It must be contained within a Searcher component and
 * will obtain the list of facets from there. Via properties,
 * you can specify how to display specific facets. Any facet
 * not covered by one of these property's lists will be displayed
 * in a standard "More…" list.
 */
export default class FacetResults extends React.Component<FacetResultsProps, void> {
  static defaultProps = {
    pieChartFacets: null,
    barChartFacets: null,
    columnChartFacets: null,
    barListFacets: null,
    tagCloudFacets: null,
    timeSeriesFacets: null,
    sentimentFacets: null,
    geoMapFacets: null,
    maxFacetBuckets: 15,
    orderHint: [],
    /* $FlowFixMe This comment suppresses an error found when upgrading Flow to
     * v0.107.0. To view the error, delete this comment and run Flow. */
    entityColors: new Map(),
    showEmptyFacets: false,
  };

  static contextTypes = {
    searcher: PropTypes.any,
  };

  static displayName = 'FacetResults';

  static matchesFacetList(field: string, facetList: Array<string> | string | null): boolean {
    if (facetList) {
      if (typeof facetList === 'string') {
        return (facetList: string) === field;
      }
      return (facetList: Array<string>).includes(field);
    }
    return false;
  }

  getFacetDisplayType(field: string) {
    if (FacetResults.matchesFacetList(field, this.props.pieChartFacets)) {
      return 'piechart';
    }
    if (FacetResults.matchesFacetList(field, this.props.barChartFacets)) {
      return 'barchart';
    }
    if (FacetResults.matchesFacetList(field, this.props.columnChartFacets)) {
      return 'columnchart';
    }
    if (FacetResults.matchesFacetList(field, this.props.barListFacets)) {
      return 'barlist';
    }
    if (FacetResults.matchesFacetList(field, this.props.tagCloudFacets)) {
      return 'tagcloud';
    }
    if (FacetResults.matchesFacetList(field, this.props.timeSeriesFacets)) {
      return 'timeseries';
    }
    if (FacetResults.matchesFacetList(field, this.props.sentimentFacets)) {
      return 'sentiment';
    }
    if (FacetResults.matchesFacetList(field, this.props.geoMapFacets)) {
      return 'geomap';
    }

    return 'list';
  }

  shouldShow(facet: SearchFacet): boolean {
    if (this.props.showEmptyFacets || (facet && facet.buckets && facet.buckets.length > 0)) {
      return true;
    }
    return false;
  }

  /**
   * Filter Buckets in Facet that are already applied to the search filters.
   * Buckets of type tagcloud and timeseries do not need to be filtered.
   */
  filterFacetBuckets = (facet: SearchFacet, type: string, facetFiltersMap: Map<string, FacetFilter>): SearchFacet => {
    if (type === 'tagcloud' || type === 'timeseries') {
      return facet;
    }
    const filteredBuckets = [];
    facet.buckets.forEach((bucket: SearchFacetBucket) => {
      if (!facetFiltersMap.get(bucket.filter)) {
        filteredBuckets.push(bucket);
      }
    });
    return Object.assign(facet, { buckets: filteredBuckets });
  }

  renderFacets() {
    const { searcher } = this.context;
    const facets = searcher && searcher.state && searcher.state.response
      ? searcher.state.response.facets
      : null;
    if (facets && facets.length > 0) {
      const facetsMap: Map<string, SearchFacet> = new Map();
      facets.forEach((facet: SearchFacet) => {
        facetsMap.set(facet.name, facet);
      });
      const facetFilters = searcher.state.facetFilters;
      const facetFiltersMap: Map<string, FacetFilter> = new Map();
      facetFilters.forEach((facetFilter: FacetFilter) => {
        facetFiltersMap.set(facetFilter.filter, facetFilter);
      });
      const results = [];
      this.props.orderHint.forEach((facetName) => {
        const facet = facetsMap.get(facetName);
        if (facet && this.shouldShow(facet)) {
          const type = this.getFacetDisplayType(facet.field);
          const filteredFacet = this.filterFacetBuckets(facet, type, facetFiltersMap);
          results.push(<Facet
            facet={filteredFacet}
            type={type}
            key={facet.name}
            maxBuckets={this.props.maxFacetBuckets}
            collapse
            entityColors={this.props.entityColors}
          />);
        }
      });
      facets.forEach((facet: SearchFacet) => {
        if (!this.props.orderHint.includes(facet.name)) {
          if (this.shouldShow(facet)) {
            const type = this.getFacetDisplayType(facet.field);
            const filteredFacet = this.filterFacetBuckets(facet, type, facetFiltersMap);
            results.push(<Facet
              facet={filteredFacet}
              type={type}
              key={facet.name}
              maxBuckets={this.props.maxFacetBuckets}
              collapse
              entityColors={this.props.entityColors}
            />);
          }
        }
      });
      return results;
    }
    return null;
  }

  render() {
    return (
      <div className="facetResults">
        {this.renderFacets()}
      </div>
    );
  }
}
