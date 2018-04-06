// @flow

import React from 'react';
import ReactHighcharts from 'react-highcharts';

import SearchFacetBucket from '../api/SearchFacetBucket';
import ObjectUtils from '../util/ObjectUtils';
import StringUtils from '../util/StringUtils';

type BarChartFacetContentsProps = {
  /** The facet’s buckets. */
  buckets: Array<SearchFacetBucket>;
  /** Callback to add a filter for this facet. */
  addFacetFilter: (bucket: SearchFacetBucket) => void;
  /** If set, the chart will contain columns (vertical bars) rather than horizontal bars */
  columns: boolean;
  /** If set, then the bars will be this color as opposed to the default blue */
  color: string;
};

type BarChartFacetContentsDefaultProps = {
  columns: boolean;
  color: string;
};

/**
 * Component to display the buckets of a facet using a Bar chart.
 */
export default class BarChartFacetContents extends React.Component<BarChartFacetContentsDefaultProps, BarChartFacetContentsProps, void> { // eslint-disable-line max-len
  static defaultProps = {
    columns: false,
    color: '#55B3E3',
  };

  static displayName = 'BarChartFacetContents';

  shouldComponentUpdate(nextProps: BarChartFacetContentsProps) {
    return !ObjectUtils.deepEquals(this.props.buckets, nextProps.buckets);
  }

  render() {
    const chartType = this.props.columns ? 'column' : 'bar';
    const dataSet = this.props.buckets.map((bucket) => {
      return {
        name: bucket.displayLabel(),
        y: bucket.count,
        events: {
          click: () => {
            this.props.addFacetFilter(bucket);
          },
        },
        description: StringUtils.fmt('occurrence|occurrences', bucket.count),
      };
    });
    const config = {
      chart: {
        type: chartType,
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
      },
      events: {
        selection: this.props.addFacetFilter,
      },
      tooltip: {
        headerFormat: '<span style="font-weight: 900">{point.key}</span><br/>',
        pointFormat: '{point.y} {point.description}',
      },
      plotOptions: {
        bar: {
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
          },
          color: this.props.color,
        },
        column: {
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
          },
          color: this.props.color,
        },
      },
      xAxis: {
        title: { text: '' },
        categories: this.props.buckets.map((bucket) => { return bucket.displayLabel(); }),
      },
      yAxis: { title: { text: '' } },
      legend: {
        enabled: false,
      },
      title: {
        text: null,
      },
      series: [
        {
          name: 'data',
          data: dataSet,
        },
      ],
      credits: {
        enabled: false,
      },
    };

    return <ReactHighcharts config={config} />;
  }
}
