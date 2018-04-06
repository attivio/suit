// @flow
import React from 'react';
import PropTypes from 'prop-types';

import Facet from './Facet';

import SearchFacet from '../api/SearchFacet';
import ObjectUtils from '../util/ObjectUtils';

type FacetInsightsProps = {
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
  /** Controls the colors used to show various entity types (the value can be any valid CSS color) */
  entityColors: Map<string, string>;
};

type FacetInsightsDefaultProps = {
  pieChartFacets: Array<string> | string | null;
  barChartFacets: Array<string> | string | null;
  columnChartFacets: Array<string> | string | null;
  barListFacets: Array<string> | string | null;
  tagCloudFacets: Array<string> | string | null;
  timeSeriesFacets: Array<string> | string | null;
  sentimentFacets: Array<string> | string | null;
  geoMapFacets: Array<string> | string | null;
  maxFacetBuckets: number;
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
export default class FacetInsights extends React.Component<FacetInsightsDefaultProps, FacetInsightsProps, void> {
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
    entityColors: new Map(),
  };

  static contextTypes = {
    searcher: PropTypes.any,
  };

  static displayName = 'FacetInsights';

  static matchesFacetList(field: string, facetList: Array<string> | string | null): boolean {
    if (facetList) {
      if (typeof facetList === 'string') {
        return (facetList: string) === field;
      }
      return (facetList: Array<string>).includes(field);
    }
    return false;
  }

  componentDidMount() {
    // If the user hasn't yet done a search, do a search for
    // "*:*" so there will be something to display here. If the
    // user has already searched, show things based on the current
    // search results.
    const searcher = this.context.searcher;
    if (searcher && !searcher.state.haveSearched) {
      searcher.doSearch();
    }
  }

  getFacetDisplayType(field: string) {
    if (FacetInsights.matchesFacetList(field, this.props.pieChartFacets)) {
      return 'piechart';
    }
    if (FacetInsights.matchesFacetList(field, this.props.barChartFacets)) {
      return 'barchart';
    }
    if (FacetInsights.matchesFacetList(field, this.props.columnChartFacets)) {
      return 'columnchart';
    }
    if (FacetInsights.matchesFacetList(field, this.props.barListFacets)) {
      return 'barlist';
    }
    if (FacetInsights.matchesFacetList(field, this.props.tagCloudFacets)) {
      return 'tagcloud';
    }
    if (FacetInsights.matchesFacetList(field, this.props.timeSeriesFacets)) {
      return 'timeseries';
    }
    if (FacetInsights.matchesFacetList(field, this.props.sentimentFacets)) {
      return 'sentiment';
    }
    if (FacetInsights.matchesFacetList(field, this.props.geoMapFacets)) {
      return 'geomap';
    }
    return 'list';
  }

  facetForField(fieldName: string, facetMap: Map<string, SearchFacet>) {
    let result;
    const facet = facetMap.get(fieldName);
    if (facet) {
      const displayType = this.getFacetDisplayType(fieldName);
      result = (
        <Facet
          facet={facet}
          key={fieldName}
          maxBuckets={this.props.maxFacetBuckets}
          type={displayType}
          bordered
          entityColors={this.props.entityColors}
        />
      );
    } else {
      result = null;
    }
    return result;
  }

  render() {
    const searcher = this.context.searcher;
    const facets = searcher.state.response ? searcher.state.response.facets.slice() : [];

    const facetMap: Map<string, SearchFacet> = new Map();
    facets.forEach((facet: SearchFacet) => {
      facetMap.set(facet.field, facet);
    });

    facets.sort((f1: SearchFacet, f2: SearchFacet) => {
      const label1 = f1.findLabel();
      const label2 = f2.findLabel();
      return label1.localeCompare(label2);
    });

    const facetOrder = facets.map((facet) => { return facet.field; });

    // Remove special "first" facets...
    ObjectUtils.removeItem(facetOrder, 'table');
    ObjectUtils.removeItem(facetOrder, 'keyphrases');
    ObjectUtils.removeItem(facetOrder, 'date');

    const additionalFacets = facetOrder.map((facetField) => {
      const facet = facetMap.get(facetField);
      if (facet) {
        return (
          <div key={facetField} style={{ flex: 1 }}>
            {this.facetForField(facetField, facetMap)}
          </div>
        );
      }
      return null;
    });
    return (
      <div className="facet-insights">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gridGap: '20px',
            gridAutoRows: 'minmax(200px, auto)',
          }}
        >
          <div style={{ gridRow: 'span 2' }}>
            {this.facetForField('table', facetMap)}
          </div>
          <div>
            {this.facetForField('keyphrases', facetMap)}
          </div>
          <div style={{ gridColumn: 'span 3' }}>
            {this.facetForField('date', facetMap)}
          </div>
          {additionalFacets}
        </div>
      </div>
    );
  }
}
