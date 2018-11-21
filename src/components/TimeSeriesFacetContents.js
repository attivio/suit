// @flow

import React from 'react';

import DataPoint from '../api/DataPoint';
import SearchFacetBucket from '../api/SearchFacetBucket';
import TimeSeries, { SeriesDataSource } from './TimeSeries';

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

  handleClick(start: Date | null, end: Date) {
    this.props.addFacetFilter(start, end);
  }

  render() {
    const validPoints = this.props.buckets.filter((bucket) => {
      return bucket.min && bucket.max;
    });
    const dataPoints = validPoints.map((bucket) => {
      const minMS = parseInt(bucket.min, 10);
      const maxMS = parseInt(bucket.max, 10);
      return new DataPoint(minMS, maxMS, bucket.count);
    });
    const series = [new SeriesDataSource('', 'AREA', dataPoints, '#cccccc', '0:1 document|{} documents', 'Documents', false, true)];

    return (
      <TimeSeries
        dataSources={series}
        onSelect={this.handleClick}
      />
    );
  }
}
