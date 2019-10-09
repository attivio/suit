// @flow
import * as React from 'react';
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
  (facetName: string) => React.Element<any>;

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

/**
 * Display a single facet from the search results.
 */
export default class Facet extends React.Component<FacetProps, void> {
  static defaultProps = {
    bordered: false,
    collapse: false,
    /* $FlowFixMe This comment suppresses an error found when upgrading Flow to
     * v0.107.0. To view the error, delete this comment and run Flow. */
    entityColors: new Map(),
    maxBuckets: 15,
    type: 'list',
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

  addFacetFilter = (bucket: SearchFacetBucket | any, customBucketLabel: ?string) => {
    const { positiveKeyphrases, negativeKeyphrases, facet } = this.props;
    if ((positiveKeyphrases || negativeKeyphrases) && this.context & this.context.searcher) {
      const bucketLabel = customBucketLabel || bucket.value.displayLabel();
      if (bucket.sentiment === 'positive' && positiveKeyphrases) {
        this.context.searcher.addFacetFilter(positiveKeyphrases.findLabel(), bucketLabel, bucket.value.filter);
      } else if (bucket.sentiment === 'negative' && negativeKeyphrases) {
        this.context.searcher.addFacetFilter(negativeKeyphrases.findLabel(), bucketLabel, bucket.value.filter);
      }
    } else if (facet) {
      const bucketLabel = customBucketLabel || bucket.displayLabel();
      this.context.searcher.addFacetFilter(facet.findLabel(), bucketLabel, bucket.filter);
    }
  }

  /**
   * Create a facet filter for the starting and ending dates...
   * If start is set but end is not, filters on the specific time
   * set by start, otherwises filters on the range. (If start is not
   * set, this simply returns).
   */
  addTimeSeriesFilter = (start: Date | null, end: Date | null) => {
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
      // If a timeseries filter for this facet is already applied,
      // remove it using removeFacetFilter() and repeatSearch = false.
      // And then add the new timeseries filter using addFacetFilter().
      // So, the search will not be repeated when the facet is removed,
      // but only when the new filter is added.
      // This would also ensure, signal for both removing and adding the filter is created.
      // Also, add the new filter only if the same filter is not already applied.
      const existingFilters = this.context.searcher.state.facetFilters;
      const label = this.props.facet ? this.props.facet.findLabel() : '';
      let sameFilterAlreadyExists = false;
      existingFilters.forEach((existingFilter) => {
        if (existingFilter.facetName === label) {
          if (existingFilter.filter === facetFilterString) {
            sameFilterAlreadyExists = true;
            return;
          }
          this.context.searcher.removeFacetFilter(existingFilter, false);
        }
      });
      if (!sameFilterAlreadyExists) {
        this.context.searcher.addFacetFilter(label, labelString, facetFilterString);
      }
    }
  }

  render() {
    const {
      bordered,
      collapse,
      entityColors,
      facet,
      maxBuckets,
      negativeKeyphrases,
      positiveKeyphrases,
      type,
    } = this.props;

    const facetColor = facet && entityColors.has(facet.field)
      ? entityColors.get(facet.field)
      : null;

    let facetContents;
    if (type === 'sentimenttagcloud' && positiveKeyphrases && negativeKeyphrases) {
      if (positiveKeyphrases.buckets && negativeKeyphrases.buckets) {
        if (positiveKeyphrases.buckets.length > 0 || negativeKeyphrases.buckets.length > 0) {
          facetContents = (
            <SentimentTagCloudFacetContents
              positiveBuckets={positiveKeyphrases.buckets}
              negativeBuckets={negativeKeyphrases.buckets}
              maxBuckets={maxBuckets}
              addFacetFilter={this.addFacetFilter}
            />
          );
        }
      }
    }

    if (facet && facet.buckets && facet.buckets.length > 0) {
      if (Facet.isHierarchical(facet)) {
        // Hierarchical facets are a special case... ignore the type
        facetContents = (
          <HierarchicalFacetContents
            buckets={facet.buckets}
            addFacetFilter={this.addFacetFilter}
          />
        );
      } else {
        switch (type) {
          case 'barchart':
            facetContents = facetColor ? (
              <BarChartFacetContents
                buckets={facet.buckets}
                addFacetFilter={this.addFacetFilter}
                color={facetColor}
              />
            ) : (
              <BarChartFacetContents
                buckets={facet.buckets}
                addFacetFilter={this.addFacetFilter}
              />
            );
            break;
          case 'columnchart':
            facetContents = facetColor ? (
              <BarChartFacetContents
                buckets={facet.buckets}
                addFacetFilter={this.addFacetFilter}
                columns
                color={facetColor}
              />
            ) : (
              <BarChartFacetContents
                buckets={facet.buckets}
                addFacetFilter={this.addFacetFilter}
                columns
              />
            );
            break;
          case 'piechart':
            facetContents = (
              <PieChartFacetContents
                buckets={facet.buckets}
                addFacetFilter={this.addFacetFilter}
                entityColors={entityColors}
              />
            );
            break;
          case 'barlist':
            facetContents = facetColor ? (
              <ListWithBarsFacetContents
                buckets={facet.buckets}
                addFacetFilter={this.addFacetFilter}
                color={facetColor}
              />
            ) : (
              <ListWithBarsFacetContents
                buckets={facet.buckets}
                addFacetFilter={this.addFacetFilter}
              />
            );
            break;
          case 'tagcloud':
            facetContents = (
              <TagCloudFacetContents
                buckets={facet.buckets}
                maxBuckets={maxBuckets}
                addFacetFilter={this.addFacetFilter}
              />
            );
            break;
          case 'timeseries':
            facetContents = (
              <TimeSeriesFacetContents
                buckets={facet.buckets}
                addFacetFilter={this.addTimeSeriesFilter}
              />
            );
            break;
          case 'sentiment':
            facetContents = <SentimentFacetContents buckets={facet.buckets} addFacetFilter={this.addFacetFilter} />;
            break;
          case 'geomap':
            facetContents = <MapFacetContents buckets={facet.buckets} addFacetFilter={this.addFacetFilter} />;
            break;
          case 'list':
          default: {
            facetContents = (
              <FacetSearchBar
                name={facet.field}
                label={facet.label}
                addFacetFilter={this.addFacetFilter}
              >
                <MoreListFacetContents buckets={facet.buckets} addFacetFilter={this.addFacetFilter} />
              </FacetSearchBar>
            );
            break;
          }
        }
      }
    } else if (!positiveKeyphrases && !negativeKeyphrases) {
      facetContents = <span className="none">No values for this facet.</span>;
    }

    // Prefer the display name but fall back to the name field
    const label = facet ? facet.findLabel() : '';

    if (facet && collapse) {
      const collapsed = facet.buckets.length === 0;
      return (
        <CollapsiblePanel title={label} id={`facet-${facet.field}`} collapsed={collapsed}>
          {facetContents}
        </CollapsiblePanel>
      );
    }
    return (
      <Card title={label} borderless={!bordered} className="attivio-facet">
        {facetContents}
      </Card>
    );
  }
}
