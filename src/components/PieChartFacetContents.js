// @flow

import React from 'react';
import ReactHighcharts from 'react-highcharts';
import SearchFacetBucket from '../api/SearchFacetBucket';
import StringUtils from '../util/StringUtils';
import ObjectUtils from '../util/ObjectUtils';

type PieChartFacetContentsProps = {
  /** The facet’s buckets. */
  buckets: Array<SearchFacetBucket>;
  /** Callback to add a filter for this facet. */
  addFacetFilter: (bucket: SearchFacetBucket) => void;
  /**
   * Controls the colors used by the pie chart. The colors are used in the order they
   * are present in the map's list of values and the entity names that are the keys in
   * the map are ignored.
   */
  entityColors: Map<string, string>;
};

type PieChartFacetContentsDefaultProps = {
  entityColors: Map<string, string>;
};

/**
 * Component to display the buckets of a facet using a pie chart.
 */
export default class PieChartFacetContents extends React.Component<PieChartFacetContentsDefaultProps, PieChartFacetContentsProps, void> { // eslint-disable-line max-len
  static defaultProps = {
    entityColors: new Map(),
  }

  static displayName = 'PieChartFacetContents';

  constructor(props: PieChartFacetContentsProps) {
    super(props);
    (this: any).clickWedge = this.clickWedge.bind(this);
  }

  shouldComponentUpdate(nextProps: PieChartFacetContentsProps) {
    return !ObjectUtils.deepEquals(this.props.buckets, nextProps.buckets);
  }

  formatTooltip() {
    // Note that Flow gets upset because it thinks this will refer to the PieChartFacetContents object
    // so we cast it to "any" to avoid any brouhaha.
    const percentage = Number(`${Math.round(Number(`${(this: any).percentage.toString()}e2`))}e-2`);
    const docCount = StringUtils.fmt('no documents|one document|{} documents', (this: any).y.toLocaleString());
    const tooltip = `<b>${(this: any).point.name}</b><br>${docCount} (${percentage}%)`;
    return tooltip;
  }

  clickWedge(index: number) {
    const bucket = this.props.buckets[index];
    this.props.addFacetFilter(bucket);
  }

  render() {
    const dataSet = this.props.buckets.map((bucket) => {
      return {
        name: bucket.displayLabel(),
        y: bucket.count,
      };
    });

    const colors = [];
    this.props.entityColors.forEach((value: string) => {
      colors.push(value);
    });

    const config = {
      chart: {
        type: 'pie',
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
      },
      tooltip: {
        formatter: this.formatTooltip,
      },
      legend: {
        symbolRadius: 0,
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
          },
          events: {
            click: (event: Event) => {
              if (event.point) {
                this.clickWedge((event.point: any).index);
              }
            },
          },
          point: {
            events: {
              legendItemClick: (event: Event) => {
                event.preventDefault();
              },
            },
          },
          states: {
            hover: {
              halo: false,
            },
          },
          showInLegend: true,
          colors,
        },
      },
      title: {
        text: null,
      },
      series: [
        {
          name: 'data',
          data: [],
        },
      ],
      credits: {
        enabled: false,
      },
    };
    config.series[0].data = dataSet;

    return <ReactHighcharts config={config} />;
  }
}
