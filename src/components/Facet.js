// @flow
import React from 'react';
import PropTypes from 'prop-types';

import SearchFacet from '../api/SearchFacet';
import SearchFacetBucket from '../api/SearchFacetBucket';
import DateUtils from '../util/DateUtils';
import DateFormat from '../util/DateFormat';
import Card from './Card';
import CollapsiblePanel from './CollapsiblePanel';
import BarChartFacetContents from './BarChartFacetContents';
import PieChartFacetContents from './PieChartFacetContents';
import MoreListFacetContents from './MoreListFacetContents';
import ListWithBarsFacetContents from './ListWithBarsFacetContents';
import TagCloudFacetContents from './TagCloudFacetContents';
import TimeSeriesFacetContents from './TimeSeriesFacetContents';
import SentimentFacetContents from './SentimentFacetContents';
import MapFacetContents from './MapFacetContents';

type FacetProps = {
  /** The facet to display. */
  facet: SearchFacet;
  /** The way the facet information should be displayed. Defaults to 'list' */
  type: 'barchart' | 'columnchart' | 'piechart' | 'barlist' | 'tagcloud' | 'timeseries' | 'list' | 'sentiment' | 'geomap';
  /**
   * The maximum number of items to show in a facet. If there
   * are more than this many buckets for the facet, only this many, with
   * the highest counts, will be shown. Defaults to 15.
   */
  maxBuckets: number;
  /**
   * If set, then the facet will be displayed in a collapsible component. If
   * the facet is collapsible and has no buckets, it will be collapsed initially.
   */
  collapse: boolean;
  /** If set, then the facet will be displayed in a card which has a border around it */
  bordered: boolean;
  /** Controls the colors used to show various entity types (the value can be any valid CSS color) */
  entityColors: Map<string, string>;
}

type FacetDefaultProps = {
  type: 'barchart' | 'columnchart' | 'piechart' | 'barlist' | 'tagcloud' | 'timeseries' | 'list' | 'sentiment' | 'geomap';
  maxBuckets: number;
  collapse: boolean;
  bordered: boolean;
  entityColors: Map<string, string>;
};

/**
 * Display a single facet from the search results.
 */
export default class Facet extends React.Component<FacetDefaultProps, FacetProps, void> {
  static defaultProps = {
    type: 'list',
    maxBuckets: 15,
    collapse: false,
    bordered: false,
    entityColors: new Map(),
  };

  static contextTypes = {
    searcher: PropTypes.any,
  };

  static displayName = 'Facet';

  constructor(props: FacetProps) {
    super(props);
    (this: any).addFacetFilter = this.addFacetFilter.bind(this);
    (this: any).addTimeSeriesFilter = this.addTimeSeriesFilter.bind(this);
  }

  addFacetFilter(bucket: SearchFacetBucket, customBucketLabel: ?string) {
    const bucketLabel = customBucketLabel || bucket.displayLabel();
    this.context.searcher.addFacetFilter(this.props.facet.findLabel(), bucketLabel, bucket.filter);
  }

  /**
   * Create a facet filter for the starting and ending dates...
   * If start is set but end is not, filters on the specific time
   * set by start, otherwises filters on the range. (If start is not
   * set, this simply returns).
   */
  addTimeSeriesFilter(start: Date | null, end: Date | null) {
    if (start !== null) {
      let facetFilterString;
      let labelString;

      const startFacetFilterString = DateUtils.formatDate(start, DateFormat.ATTIVIO);
      const startLabelString = DateUtils.formatDate(start, DateFormat.MEDIUM);
      if (end !== null) {
        const endFacetFilterString = DateUtils.formatDate(end, DateFormat.ATTIVIO);
        const endLabelString = DateUtils.formatDate(end, DateFormat.MEDIUM);
        labelString = `${startLabelString} to ${endLabelString}`;

        facetFilterString = `${this.props.facet.name}:FACET(RANGE("${startFacetFilterString}", "${endFacetFilterString}", upper=inclusive))`; // eslint-disable-line max-len
      } else {
        labelString = startLabelString;
        facetFilterString = `${this.props.facet.name}:FACET(RANGE("${startFacetFilterString}", ${startFacetFilterString}, upper=inclusive))`; // eslint-disable-line max-len
      }
      this.context.searcher.addFacetFilter(this.props.facet.findLabel(), labelString, facetFilterString);
    }
  }

  render() {
    const facetColors = this.props.entityColors;
    const facetColor = facetColors.has(this.props.facet.field) ? facetColors.get(this.props.facet.field) : null;

    let facetContents;
    if (this.props.facet.buckets && this.props.facet.buckets.length > 0) {
      switch (this.props.type) {
        case 'barchart':
          facetContents = facetColor ? (
            <BarChartFacetContents
              buckets={this.props.facet.buckets}
              addFacetFilter={this.addFacetFilter}
              color={facetColor}
            />
          ) : (
            <BarChartFacetContents
              buckets={this.props.facet.buckets}
              addFacetFilter={this.addFacetFilter}
            />
          );
          break;
        case 'columnchart':
          facetContents = facetColor ? (
            <BarChartFacetContents
              buckets={this.props.facet.buckets}
              addFacetFilter={this.addFacetFilter}
              columns
              color={facetColor}
            />
          ) : (
            <BarChartFacetContents
              buckets={this.props.facet.buckets}
              addFacetFilter={this.addFacetFilter}
              columns
            />
          );
          break;
        case 'piechart':
          facetContents = (
            <PieChartFacetContents
              buckets={this.props.facet.buckets}
              addFacetFilter={this.addFacetFilter}
              entityColors={this.props.entityColors}
            />
          );
          break;
        case 'barlist':
          facetContents = facetColor ? (
            <ListWithBarsFacetContents
              buckets={this.props.facet.buckets}
              addFacetFilter={this.addFacetFilter}
              color={facetColor}
            />
          ) : (
            <ListWithBarsFacetContents
              buckets={this.props.facet.buckets}
              addFacetFilter={this.addFacetFilter}
            />
          );
          break;
        case 'tagcloud':
          facetContents = (
            <TagCloudFacetContents
              buckets={this.props.facet.buckets}
              maxBuckets={this.props.maxBuckets}
              addFacetFilter={this.addFacetFilter}
            />
          );
          break;
        case 'timeseries':
          facetContents = <TimeSeriesFacetContents buckets={this.props.facet.buckets} addFacetFilter={this.addTimeSeriesFilter} />;
          break;
        case 'sentiment':
          facetContents = <SentimentFacetContents buckets={this.props.facet.buckets} addFacetFilter={this.addFacetFilter} />;
          break;
        case 'geomap':
          facetContents = <MapFacetContents buckets={this.props.facet.buckets} addFacetFilter={this.addFacetFilter} />;
          break;
        case 'list':
        default:
          facetContents = <MoreListFacetContents buckets={this.props.facet.buckets} addFacetFilter={this.addFacetFilter} />;
          break;
      }
    } else {
      facetContents = <span className="none">No values for this facet.</span>;
    }

    // Prefer the display name but fall back to the name field (note special case for geomaps
    // where we always use the label "Map").
    const label = this.props.type === 'geomap' ? 'Map' : this.props.facet.findLabel();

    if (this.props.collapse) {
      const collapsed = this.props.facet.buckets.length === 0;
      return (
        <CollapsiblePanel title={label} id={`facet-${this.props.facet.field}`} collapsed={collapsed}>
          {facetContents}
        </CollapsiblePanel>
      );
    }
    return (
      <Card title={label} borderless={!this.props.bordered} className="attivio-facet">
        {facetContents}
      </Card>
    );
  }
}
