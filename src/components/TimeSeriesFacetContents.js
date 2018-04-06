// @flow

import React from 'react';

import SearchFacetBucket from '../api/SearchFacetBucket';
import TimeSeries, { TimeSeriesPoint } from './TimeSeries';

type TimeSeriesFacetContentsProps = {
  /** The facet’s buckets. */
  buckets: Array<SearchFacetBucket>;
  /** Callback to add a filter for this facet. */
  addFacetFilter: (start: Date | null, end: Date | null) => void;
};

/**
 * Component to display the buckets of a facet using a
 * time-series-based area graph. The buckets should all
 * contain min and max values which are timestamps for
 * the ranges they represent.
 */
export default class TimeSeriesFacetContents extends React.Component<void, TimeSeriesFacetContentsProps, void> {
  static displayName = 'TimeSeriesFacetContents';

  constructor(props: TimeSeriesFacetContentsProps) {
    super(props);
    (this: any).handleClick = this.handleClick.bind(this);
  }

  handleClick(start: Date | null, end: Date | null) {
    this.props.addFacetFilter(start, end);
  }

  render() {
    const timeSeriesData = this.props.buckets.map((bucket) => {
      if (bucket.min && bucket.max) {
        return new TimeSeriesPoint(bucket.min, bucket.count, bucket.max);
      }
      return new TimeSeriesPoint('', 0);
    });

    return (
      <TimeSeries
        data={timeSeriesData}
        area
        valueName="documents"
        onSelect={this.handleClick}
      />
    );
  }
}
