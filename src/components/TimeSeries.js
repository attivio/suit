// @flow

import React from 'react';
import ReactHighcharts from 'react-highcharts';
import DateUtils from '../util/DateUtils';
import DateFormat from '../util/DateFormat';
import ObjectUtils from '../util/ObjectUtils';

/**
 * Class for defining plot points for the TimeSeries chart.
 */
export class TimeSeriesPoint {
  /** The date/time of the plot point for the x-axis */
  date: Date;
  /** The numerical value of the plot point for the y-axis */
  value: number;
  /** The end of the date range (optional) */
  endDate: Date;

  constructor(date: string | null, value: number, endDate: string | null = null) {
    this.date = date ? DateUtils.stringToDate(date) : new Date();
    this.value = value;
    this.endDate = endDate ? DateUtils.stringToDate(endDate) : new Date();
  }
}

type TimeSeriesProps = {
  /** The facet’s buckets. */
  data: Array<TimeSeriesPoint>;
  /** The callback to run when selecting a range on the timeline */
  onSelect: (start: Date | null, end: Date | null) => void;
  /** The name of the values represented in the y-axis. Optional */
  valueName: string;
  /**
   * If set, then an area chart will be drawn (a line with a filled
   * area below it. Otherwise, a column chart will be drawn.
   */
  area: boolean;
  /** The y-axis key. Optional */
  yKey: string | null;
  /** The x-axis key. Optional */
  xKey: string | null;
};

type TimeSeriesDefaultProps = {
  area: boolean;
  yKey: string | null;
  xKey: string | null;
};

/**
 * Component to display a chart of values over time
 */
export default class TimeSeries extends React.Component<TimeSeriesDefaultProps, TimeSeriesProps, void> {
  static defaultProps = {
    area: false,
    xKey: null,
    yKey: null,
  };

  static displayName = 'TimeSeries';

  static formatTooltip() {
    const self = (this: any);
    const yDisplay = `<br><b>${self.y} ${self.point.valueName}</b>`;
    const resolution = self.series.closestPointRange;
    // year
    if (resolution >= 365 * 24 * 60 * 60 * 1000) {
      return `${DateUtils.formatDate(self.point.x, DateFormat.LONG_YEAR)}${yDisplay}`;
    // month
    } else if (resolution >= 28 * 24 * 60 * 60 * 1000) {
      return `${DateUtils.formatDate(self.point.x, DateFormat.LONG_MONTH)}${yDisplay}`;
    // week
    } else if (resolution >= 7 * 24 * 60 * 60 * 1000) {
      return `${DateUtils.formatDate(self.x, DateFormat.MEDIUM_DATE)} - ${DateUtils.formatDate(self.point.endDate, DateFormat.MEDIUM_DATE)}${yDisplay}`; // eslint-disable-line max-len
    // day
    } else if (resolution >= 24 * 60 * 60 * 1000) {
      return `${DateUtils.formatDate(self.point.x, DateFormat.MEDIUM_DATE)}${yDisplay}`;
    }
    // default (time)
    return `${DateUtils.formatDate(self.x, DateFormat.MEDIUM)} - ${DateUtils.formatDate(self.point.endDate, DateFormat.MEDIUM)}${yDisplay}`; // eslint-disable-line max-len
  }

  constructor(props: TimeSeriesProps) {
    super(props);
    (this: any).onSelectRange = this.onSelectRange.bind(this);
  }

  shouldComponentUpdate(nextProps: TimeSeriesProps) {
    return !ObjectUtils.deepEquals(this.props.data, nextProps.data);
  }

  onSelectRange(event: any) {
    const start = typeof event.xAxis[0].min === 'undefined' ? null : new Date(event.xAxis[0].min);
    const end = typeof event.xAxis[0].max === 'undefined' ? null : new Date(event.xAxis[0].max);
    this.props.onSelect(start, end);
  }

  render() {
    ReactHighcharts.Highcharts.setOptions({
      global: {
        useUTC: false,
      },
    });

    const data = this.props.data.map((point: TimeSeriesPoint) => {
      return {
        x: point.date.getTime(),
        y: point.value,
        endDate: point.endDate ? point.endDate.getTime() : point.date.getTime(),
        valueName: this.props.valueName,
      };
    });

    let plotOptions;
    let chartType;
    if (this.props.area) {
      chartType = 'area';
      plotOptions = {
        series: {},
        area: {
          color: '#6db1de',
          fillColor: '#e2f0f8',
          lineWidth: 2,
          marker: {
            radius: 2,
          },
        },
      };
    } else {
      chartType = 'column';
      plotOptions = {
        series: {},
        column: {
          cursor: 'pointer',
          color: '#55b3e3',
          pointPlacement: 'between',
          pointPadding: 0,
          groupPadding: 0,
          grouping: false,
          borderWidth: 1,
          borderColor: '#a4d4ec',
          states: {
            hover: {
              color: '#203267',
              borderColor: '#5d6a90',
            },
          },
        },
      };
    }

    const config = {
      chart: {
        type: chartType,
        zoomType: 'x',
        resetZoomButton: {
          theme: {
            style: {
              display: 'none',
            },
          },
        },
        backgroundColor: null,
        borderWidth: null,
        shadow: false,

        height: 185,

        events: {
          selection: this.onSelectRange,
        },
      },
      plotOptions,
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          month: '%b',
          year: '%Y',
        },
        title: {
          text: `${this.props.xKey ? this.props.xKey : ''}`,
        },
        tickLength: 0,
        minorTickLength: 0,
      },
      yAxis: {
        title: {
          text: `${this.props.yKey ? this.props.yKey : ''}`,
        },
        min: 0,
      },
      tooltip: {
        formatter: TimeSeries.formatTooltip,
      },
      legend: {
        enabled: false,
      },
      title: {
        text: '',
      },
      series: [
        {
          data,
          turboThreshold: 0,
          valueName: this.props.valueName,
        },
      ],
      credits: {
        enabled: false,
      },
    };

    return <ReactHighcharts config={config} />;
  }
}
