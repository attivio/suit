// @flow
import React from 'react';
import PropTypes from 'prop-types';

import BarChartFacetContents from './BarChartFacetContents';
import Card from './Card';
import CollapsiblePanel from './CollapsiblePanel';
import DateFormat from '../api/DateFormat';
import DateUtils from '../util/DateUtils';
import FacetSearchBar from './FacetSearchBar';
import HierarchicalFacetContents from './HierarchicalFacetContents';
import ListWithBarsFacetContents from './ListWithBarsFacetContents';
import MapFacetContents from './MapFacetContents';
import MoreListFacetContents from './MoreListFacetContents';
import PieChartFacetContents from './PieChartFacetContents';
import SearchFacet from '../api/SearchFacet';
import SearchFacetBucket from '../api/SearchFacetBucket';
import SentimentFacetContents from './SentimentFacetContents';
import SentimentTagCloudFacetContents from './SentimentTagCloudFacetContents';
import TagCloudFacetContents from './TagCloudFacetContents';
import TimeSeriesFacetContents from './TimeSeriesFacetContents';

export type FacetType = 'barchart' | 'columnchart' | 'piechart' | 'barlist' |
  'tagcloud' | 'timeseries' | 'list' | 'sentiment' | 'geomap' |
  (facetName: string) => React$Element<*>;

type FacetProps = {
  /** The facet to display. */
  facet: SearchFacet;
  /** The facet for positive key phrases used in Sentiment TagCloud */
  positiveKeyphrases?: SearchFacet;
  /** The facet for negative key phrases used in Sentiment TagCloud */
  negativeKeyphrases?: SearchFacet;
  /** The way the facet information should be displayed. Defaults to 'list' */
  type: FacetType;
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
  type: FacetType;
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

  static isHierarchical(facet: SearchFacet): boolean {
    if (facet && facet.buckets) {
      // Look for a bucket that has child buckets
      const parentBucket = facet.buckets.find((bucket) => {
        return bucket.children && bucket.children.length > 0;
      });
      return !!parentBucket;
    }
    return false;
  }

  static displayName = 'Facet';

  constructor(props: FacetProps) {
    super(props);
    (this: any).addFacetFilter = this.addFacetFilter.bind(this);
    (this: any).addTimeSeriesFilter = this.addTimeSeriesFilter.bind(this);
  }

  addFacetFilter(bucket: SearchFacetBucket | any, customBucketLabel: ?string) {
    let bucketLabel;
    if (this.props.positiveKeyphrases || this.props.negativeKeyphrases) {
      bucketLabel = customBucketLabel || bucket.value.displayLabel();
      if (bucket.sentiment === 'positive' && this.props.positiveKeyphrases) {
        this.context.searcher.addFacetFilter(this.props.positiveKeyphrases.findLabel(), bucketLabel, bucket.value.filter);
      } else if (bucket.sentiment === 'negative' && this.props.negativeKeyphrases) {
        this.context.searcher.addFacetFilter(this.props.negativeKeyphrases.findLabel(), bucketLabel, bucket.value.filter);
      }
    } else if (this.props.facet) {
      bucketLabel = customBucketLabel || bucket.displayLabel();
      this.context.searcher.addFacetFilter(this.props.facet.findLabel(), bucketLabel, bucket.filter);
    }
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
    let facetColor;
    if (this.props.facet) {
      facetColor = facetColors.has(this.props.facet.field) ? facetColors.get(this.props.facet.field) : null;
    }

    let facetContents;
    if (this.props.type === 'sentimenttagcloud' && this.props.positiveKeyphrases && this.props.negativeKeyphrases) {
      if (this.props.positiveKeyphrases.buckets && this.props.negativeKeyphrases.buckets) {
        if (this.props.positiveKeyphrases.buckets.length > 0 || this.props.negativeKeyphrases.buckets.length > 0) {
          facetContents = (
            <SentimentTagCloudFacetContents
              positiveBuckets={this.props.positiveKeyphrases.buckets}
              negativeBuckets={this.props.negativeKeyphrases.buckets}
              maxBuckets={this.props.maxBuckets}
              addFacetFilter={this.addFacetFilter}
            />
          );
        }
      }
    }

    if (this.props.facet && this.props.facet.buckets && this.props.facet.buckets.length > 0) {
      if (Facet.isHierarchical(this.props.facet)) {
        // Hierarchical facets are a special case... ignore the type
        facetContents = (
          <HierarchicalFacetContents
            buckets={this.props.facet.buckets}
            addFacetFilter={this.addFacetFilter}
          />
        );
      } else {
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
            facetContents = (
              <TimeSeriesFacetContents
                buckets={this.props.facet.buckets}
                addFacetFilter={this.addTimeSeriesFilter}
              />
            );
            break;
          case 'sentiment':
            facetContents = <SentimentFacetContents buckets={this.props.facet.buckets} addFacetFilter={this.addFacetFilter} />;
            break;
          case 'geomap':
            facetContents = <MapFacetContents buckets={this.props.facet.buckets} addFacetFilter={this.addFacetFilter} />;
            break;
          case 'list':
          default: {
            facetContents = (
              <FacetSearchBar
                name={this.props.facet.field}
                label={this.props.facet.label}
                addFacetFilter={this.addFacetFilter}
              >
                <MoreListFacetContents buckets={this.props.facet.buckets} addFacetFilter={this.addFacetFilter} />
              </FacetSearchBar>
            );
            break;
          }
        }
      }
    } else if (!this.props.positiveKeyphrases && !this.props.negativeKeyphrases) {
      facetContents = <span className="none">No values for this facet.</span>;
    }

    // Prefer the display name but fall back to the name field
    const label = this.props.facet ? this.props.facet.findLabel() : '';

    if (this.props.facet && this.props.collapse) {
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
