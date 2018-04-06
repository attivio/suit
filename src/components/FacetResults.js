// @flow
import React from 'react';
import PropTypes from 'prop-types';

import Facet from './Facet';
import SearchFacet from '../api/SearchFacet';

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
   * response.facets array of the parent Searcher compoinent.
   */
  orderHint: Array<string>;
  /** Controls the colors used to show various entity types (the value can be any valid CSS color) */
  entityColors: Map<string, string>;
};

type FacetResultsDefaultProps = {
  pieChartFacets: Array<string> | string | null;
  barChartFacets: Array<string> | string | null;
  columnChartFacets: Array<string> | string | null;
  barListFacets: Array<string> | string | null;
  tagCloudFacets: Array<string> | string | null;
  timeSeriesFacets: Array<string> | string | null;
  sentimentFacets: Array<string> | string | null;
  geoMapFacets: Array<string> | string | null;
  maxFacetBuckets: number;
  orderHint: Array<string>;
  entityColors: Map<string, string>;
};

/**
 * A container for showing facet results from a search.
 * It must be contained within a Searcher component and
 * will obtain the list of facets from there. Via properties,
 * you can specify how to display specific facets. Any facet
 * not coveed by one of these property's lists will be displayed
 * in a standard "More…" list.
 */
export default class FacetResults extends React.Component<FacetResultsDefaultProps, FacetResultsProps, void> {
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
    entityColors: new Map(),
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

  renderFacets() {
    const searcher = this.context.searcher;
    const facets = searcher.state.response ? searcher.state.response.facets : null;
    if (facets && facets.length > 0) {
      const facetsMap: Map<string, SearchFacet> = new Map();
      facets.forEach((facet: SearchFacet) => {
        facetsMap.set(facet.name, facet);
      });
      const results = [];
      this.props.orderHint.forEach((facetName) => {
        const facet = facetsMap.get(facetName);
        if (facet) {
          const type = this.getFacetDisplayType(facet.field);
          results.push(<Facet
            facet={facet}
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
          const type = this.getFacetDisplayType(facet.field);
          results.push(<Facet
            facet={facet}
            type={type}
            key={facet.name}
            maxBuckets={this.props.maxFacetBuckets}
            collapse
            entityColors={this.props.entityColors}
          />);
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
