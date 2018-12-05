// @flow

import React from 'react';
import ReactHighcharts from 'react-highcharts';

import ObjectUtils from '../util/ObjectUtils';

export class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class ChartDataSource {
  name: string;
  type: 'BAR' | 'LINE' | 'AREA' | 'SPLINE';
  values: Array<Point>;
  color: string | null;
  valueSuffix: string | null;
  right: boolean;

  constructor(
    name: string,
    type: 'BAR' | 'LINE' | 'AREA' | 'SPLINE',
    values: Array<Point>,
    color: string | null = null,
    valueSuffix: string | null = null,
    right: boolean = false,
  ) {
    this.name = name;
    this.type = type;
    this.values = values;
    this.color = color;
    this.valueSuffix = valueSuffix;
    this.right = right;
  }
}

type LineBarChartProps = {
  /** The data to display */
  dataSources: Array<ChartDataSource>;
  /** The height of the chart, in pixels */
  height: number;
  /** The label to show for the Y-axis */
  yAxisLabel: string;
  /** If set, a format string to use when printing values along the Y-axis */
  yAxisLabelValueFormat: string | null;
  /** The label to show for the secondary (right-hand-side) Y-axis, if any */
  yAxis2Label: string | null;
  /** If set, a format string to use when printing values along the secondary Y-axis */
  yAxis2LabelValueFormat: string | null;
  /** If set, multiple bar data sources will be displayed side by side instead of stacked */
  barsSideBySide: boolean;
  /** Use colors from configuration if not specified in sources. */
  entityColors: Map<string, string>;
};

type LineBarChartDefaultProps = {
  height: number;
  yAxisLabelValueFormat: string | null;
  yAxis2Label: string | null;
  yAxis2LabelValueFormat: string | null;
  barsSideBySide: boolean;
  entityColors: Map<string, string>;
};

/**
 * Component to display a chart with one or more series of data points.
 */
export default class LineBarChart extends React.Component<LineBarChartDefaultProps, LineBarChartProps, void> {
  static defaultProps = {
    height: 185,
    yAxisLabelValueFormat: null,
    yAxis2Label: null,
    yAxis2LabelValueFormat: null,
    barsSideBySide: false,
    entityColors: new Map(),
  };

  static displayName = 'LineBarChart';

  static getDatasourceType(type: 'BAR' | 'LINE' | 'AREA' | 'SPLINE') {
    switch (type) {
      case 'SPLINE':
        return 'spline';
      case 'AREA':
        return 'area';
      case 'BAR':
        return 'column';
      case 'LINE':
      default:
        return 'line';
    }
  }

  static ChartDataSource;
  static Point;

  constructor(props: LineBarChartProps) {
    super(props);
    ReactHighcharts.Highcharts.setOptions({
      lang: {
        thousandsSep: ',',
      },
    });
  }

  shouldComponentUpdate(nextProps: LineBarChartProps) {
    return !ObjectUtils.deepEquals(this.props.dataSources, nextProps.dataSources);
  }

  getDatasourceColor(color: string | null, index: number) {
    if (color) {
      return color;
    }
    if (this.props.entityColors && this.props.entityColors.size > 0) {
      const colorArray = Array.from(this.props.entityColors.values());
      const realIndex = index % colorArray.length; // In case we need to wrap around
      return colorArray[realIndex];
    }
    return '#000'; // Default to black
  }

  render() {
    const series = this.props.dataSources.map((source: ChartDataSource, index) => {
      const color = this.getDatasourceColor(source.color, index);
      const data = source.values.map((value: Point) => {
        return {
          x: value.x,
          y: value.y,
        };
      });
      const seriesInfo = {
        type: LineBarChart.getDatasourceType(source.type),
        name: source.name,
        data,
        color,
        tooltip: {
          valueSuffix: source.valueSuffix,
        },
        yAxis: source.opposite ? 1 : 0,
        stacking: 'normal',
      };
      if (this.props.barsSideBySide) {
        seriesInfo.stacking = 'null';
      }
      return seriesInfo;
    });

    const plotOptions = {
      area: {
        lineWidth: 2,
        marker: {
          radius: 2,
        },
      },
      line: {
        lineWidth: 3,
        marker: {
          enabled: false,
        },
      },
      spline: {
        lineWidth: 3,
        marker: {
          enabled: false,
        },
      },
      column: {
        cursor: 'pointer',
        pointPlacement: 'between',
        pointPadding: 0,
        groupPadding: 0,
        grouping: false,
        borderWidth: 1,
      },
    };

    const yAxes = [{
      title: {
        text: this.props.yAxisLabel,
        color: '#000',
      },
      labels: {
        format: this.props.yAxisLabelValueFormat ? this.props.yAxisLabelValueFormat : '{value}',
      },
    }];
    if (this.props.yAxis2Label) {
      yAxes.push({
        title: {
          text: this.props.yAxis2Label,
          color: '#000',
        },
        labels: {
          format: this.props.yAxis2LabelValueFormat ? this.props.yAxis2LabelValueFormat : '{value}',
        },
        opposite: true,
      });
    }

    const config = {
      chart: {
        backgroundColor: null,
        borderWidth: null,
        shadow: false,
        height: this.props.height,
      },
      plotOptions,
      yAxis: yAxes,
      legend: {
        backgroundColor: '#fff',
        reversed: true,
        itemStyle: {
          'font-size': '.8em',
        },
      },
      tooltip: {
        shared: true,
      },
      title: {
        text: '',
      },
      series,
      credits: {
        enabled: false,
      },
    };
    return <ReactHighcharts config={config} />;
  }
}

LineBarChart.ChartDataSource = ChartDataSource;
LineBarChart.Point = Point;
