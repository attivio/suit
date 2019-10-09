
// @flow

import React from 'react';
import ReactHighcharts from 'react-highcharts';

import DataPoint from '../api/DataPoint';
import LocalDateUtils from '../util/DateUtils';
import StringUtils from '../util/StringUtils';

export type TimeSeriesDataType = 'BAR' | 'LINE' | 'AREA';

/**
 * An individual series of points for the time series.
 */
export class SeriesDataSource {
  /** Name for the series */
  name: string;
  /** How to render this data set; it could be a BAR, LINE, or AREA chart. */
  type: TimeSeriesDataType;
  /** Data points to be rendered. */
  data: Array<DataPoint>;
  /** Color for the data on the chart (defaults to black)  */
  color: string;
  /**
   * Describes how to format the values for this data set in tool tips.
   * If not set, JavaScript's toLocaleString() method is called on the
   * value. If set, the format string must be an integer followed by a
   * colon followed by the formatting string. The integer before the colon
   * is the number of decimal places to use when formatting the value.
   * The remainder of the format string will have occurrences of '{}'
   * substituted with the formatted version of the value. It may consist
   * of multiple alternative format strings separated by pipe (|)
   * characters, similar to the fmt() method in SUIT's StringUtils
   * class—if just one string, it will be used for all values of the
   * point; if there are two strings, the first is used when the value
   * is exactly 1 and the second is used in all other cases; if there
   * are three strings, the first is used when the value is 0, the
   * second when it's 1, and the third in all other cases.
   * For example, it may be something like '2:${}' for formatting dollar
   * amounts or '0:None|1 instance|{} instances' for formatting countable
   * items, etc.
   */
  tooltipFormat: string | null;
  /**
   * Y-axis label on the chart, if any. Generally, at least the first
   * series should have a label. There should not be more than 2 labels.
   * The second label, if one exists, will be on the right-hand side of
   * the chart. Any series following the first one but not having their
   * own yAxisLabel will use the same Y-axis as the first series. Any
   * series following the one with the second yAxisLabel will use that
   * Y-axis.
   */
  yAxisLabel: string | null;
  /**
   * This should be set on time series that have percentage data.
   * It forces the Y-axis to range from 0-100, regardless of the values
   * in the data set. This only applies if this source has a Y-axis
   * label (and therefore has its own axis).
   */
  percentage: boolean;
  /**
   * This should be set on time series that have only integer data.
   * It forces the Y-axis to not show fractional values on its tick marks.
   * This only applies if this source has a Y-axis label (and therefore
   * has its own axis).
   */
  integer: boolean;

  constructor(
    name: string,
    type: 'BAR' | 'LINE' | 'AREA',
    data: Array<DataPoint>,
    color: string = '#000',
    tooltipFormat: string | null = null,
    yAxisLabel: string | null = null,
    percentage: boolean = false,
    integer: boolean = false,
  ) {
    this.name = name;
    this.type = type;
    this.data = data;
    this.color = color;
    this.tooltipFormat = tooltipFormat;
    this.yAxisLabel = yAxisLabel;
    this.percentage = percentage;
    this.integer = integer;
  }
}

type TimeSeriesProps = {
  /**
   * The data to display in the chart.
    */
  dataSources: Array<SeriesDataSource>;
  /**
   * The height, in pixels for the chart. Defaults to 300 pixels.
   */
  height: number;
  /**
   * If set, multiple bar charts will be displayed side-by-side instead of stacked.
   */
  barsSideBySide: boolean;
  /**
   * If set, the legend is drawn to the right of the chart, otherwise it's below it.
   */
  legendAtRight: boolean;
  /**
   * The callback to run when selecting a range on the timeline. If unset, then the
   * chart won't be selectable. This hasn't been fully tested yet.
  */
  onSelect: null | (date: Date, endingDate: Date) => void;
};

type TimeSeriesDefaultProps = {
  onSelect: null | (date: Date, endingDate: Date) => void;
  height: number;
  barsSideBySide: boolean;
  legendAtRight: boolean;
};

/**
 * Component to display a chart of values over time.
 */
export default class TimeSeries extends React.Component<TimeSeriesDefaultProps, TimeSeriesProps, void> {
  static defaultProps = {
    onSelect: null,
    height: 300,
    barsSideBySide: false,
    legendAtRight: false,
  };

  static displayName = 'TimeSeries';

  static SeriesDataSource;

  static getDataSourceType(type: TimeSeriesDataType) {
    switch (type) {
      case 'AREA':
        return 'area';
      case 'BAR':
        return 'column';
      case 'LINE':
      default:
        return 'line';
    }
  }

  /**
   * Construct a tooltip containing the date and values for all of the data series.
   */
  static tooltipFormatter(): string | null {
    const pointInfo = (this: any);
    if (pointInfo.points && pointInfo.points.length > 0) {
      const firstPoint = pointInfo.points[0].point; // All of the points should have the same time range
      const formattedDate = LocalDateUtils.formatDateRange(firstPoint.startTime, firstPoint.endTime);

      const header = `<b>${formattedDate}</b>`;
      const rows = pointInfo.points.map((point) => {
        const formattedValue = point.series.tooltipOptions.formatter(point.y);
        return `<br /><span style="color: ${point.color}">●</span> ${point.series.name}: <b>${formattedValue}</b>`;
      });
      rows.unshift(header);
      return rows.join('');
    }
    // If there are no points, don't display a tooltip... shouldn't happen
    return null;
  }

  /**
   * Format the value for a single series as HTML.
   */
  static formatPointValue(value: number, formatString: string | null): string {
    if (value === null) {
      // If the value is null, then there's no data for this time point.
      // Note that currently Highcharts doesn't bother calling the tooltip
      // function if the data is null, so this is just in case they ever
      // change this (for maps, there's a parameter called "nullInteraction"
      // that can be set to true to make this work but it doesn't apply to
      // the chart types we use).
      return '<span style="font-style: italic; color: #ccc;">N/A</span>';
    }
    if (formatString) {
      return StringUtils.formatNumber(formatString, value);
    }
    return value.toLocaleString();
  }

  /**
   * Look at the maxValue passed in and see if it's greater than
   * the max set on the Y-axis. If so, make it be a round number and
   * update the Y-axis to use it instead. Return the new Y-axis
   * definition.
   */
  static normalizeYAxisMax(yAxis: any): any {
    const maxValue = yAxis.max;
    const roundUpTo = [10, 20, 25, 30, 40, 50, 100, 200, 250, 300, 400, 500, 750, 1000, 1500, 2000, 2500, 3000, 4000, 5000, 10000];
    let roundMax = -1;
    roundUpTo.forEach((cap: number) => {
      if (roundMax < 0 && maxValue <= cap) {
        roundMax = cap;
      }
    });
    if (roundMax < 0) {
      // We didn't find one... just round up to nearest multiple of 10,000
      roundMax = Math.floor((maxValue + 9999) / 10000) * 10000;
    }
    const newYAxis = Object.assign({}, yAxis);
    newYAxis.max = roundMax;
    return newYAxis;
  }

  constructor(props: TimeSeriesProps) {
    super(props);
    (this: any).onSelectRange = this.onSelectRange.bind(this);
    // (this: any).tooltipFormatter = this.tooltipFormatter.bind(this);
  }

  /**
   * Convert from the HighCharts select event to the callback passed into this component.
   */
  onSelectRange(event: any) {
    if (this.props.onSelect) {
      this.props.onSelect(new Date(event.xAxis[0].min), new Date(event.xAxis[0].max));
    }
  }

  render() {
    ReactHighcharts.Highcharts.setOptions({
      global: {
        useUTC: false,
      },
    });

    // Convert the data series passed to us into something HighCharts understands
    // At the same time, find the Y axes...
    let yAxes = [];
    const series = this.props.dataSources.map((source: SeriesDataSource) => {
      // Assume this series will have the same y axis as the most recent one
      // (or the first one, if no y axes exist yet)
      let currentYAxisIndex = Math.max(yAxes.length - 1, 0);

      if (source.yAxisLabel) {
        const yAxisInfo = {
          title: {
            text: source.yAxisLabel,
          },
          min: 0,
          opposite: false,
          visible: true,
          minRange: 0.1, // This makes sure the 0 is always at the bottom of the chart
          max: source.percentage ? 100 : null,
          alignTicks: !source.percentage,
          gridLineColor: source.percentage ? 'transparent' : undefined,
          allowDecimals: !source.integer,
        };
        if (yAxes.length === 1) {
          // This is the second label, put it on the right
          yAxisInfo.opposite = true;
        }
        if (yAxes.length < 2) {
          // Make sure we never have more than two labels...
          yAxes.push(yAxisInfo);
          currentYAxisIndex = yAxes.length - 1;
        } else {
          // We're configured for too many Y axes... we only deal with up to 2
          console.warn(`Ignoring Y-axis named ${yAxisInfo.title.text}`);
        }
      }

      const type = TimeSeries.getDataSourceType(source.type);
      let maxValue = 0;
      const dataPoints = source.data.map((point: DataPoint) => {
        if (point.data !== null && point.data > maxValue) {
          maxValue = point.data;
        }
        const dataPoint = {
          x: (point.startTime + point.endTime) / 2,
          y: point.data,
          startTime: point.startTime,
          endTime: point.endTime,
        };

        return dataPoint;
      });

      const previousMax = yAxes[currentYAxisIndex].max || 0;
      if (!source.percentage) {
        // If it's a percentage, we've already set the max to 100
        if (source.type === 'BAR' && !this.props.barsSideBySide) {
          // If there are multiple series for this y-axis, and they're bars, and the bars are stacked,
          // add the max values together since they'll be stacked.
          yAxes[currentYAxisIndex].max = previousMax + maxValue;
        } else {
          // Otherwise, find the bigger maxValue and use that.
          yAxes[currentYAxisIndex].max = Math.max(previousMax, maxValue);
        }
      }

      // Make sure bar charts are in front of area charts and line charts are in front of everything
      let zIndex;
      if (source.type === 'BAR') {
        zIndex = 1;
      } else if (source.type === 'LINE') {
        zIndex = 2;
      }

      // Ensure we always have something to show for non-empty data points in bar charts
      // Note that we use a height of 2 pixels instead of 1 because 1-pixel bars get hidden
      // by the X-axis' line.
      const minPointLength = type === 'column' ? 2 : 0;

      const seriesInfo = {
        type,
        data: dataPoints,
        name: source.name,
        showInLegend: source.name ? source.name : '',
        color: source.color,
        yAxis: currentYAxisIndex,
        stacking: (source.type === 'BAR' && !this.props.barsSideBySide) ? 'normal' : undefined,
        zIndex,
        tooltip: {
          formatter: (value: number) => {
            return TimeSeries.formatPointValue(value, source.tooltipFormat);
          },
        },
        minPointLength,
      };
      return seriesInfo;
    });

    // Go through the y axes and round up the max values in a consistent way, so they're pretty
    yAxes = yAxes.map((notNormal) => {
      return TimeSeries.normalizeYAxisMax(notNormal);
    });

    const chart = this.props.onSelect ? {
      backgroundColor: null,
      borderWidth: null,
      shadow: false,
      height: this.props.height,
      zoomType: 'x',
      resetZoomButton: {
        position: {
          x: 0,
          y: -40,
        },
      },
      events: {
        selection: this.onSelectRange,
      },
      ignoreHiddenSeries: true,
    } : {
      backgroundColor: null,
      borderWidth: null,
      shadow: false,
      marginTop: 40,
      height: this.props.height,
      ignoreHiddenSeries: true,
    };

    let legend;
    if (this.props.legendAtRight) {
      legend = {
        backgroundColor: '#fff',
        enabled: true,
        align: 'right',
        borderWidth: 1,
        layout: 'vertical',
        verticalAlign: 'bottom',
        y: -10,
        itemMarginBottom: 10,
        itemStyle: {
          'font-size': '.8em',
        },
      };
    } else {
      legend = {
        backgroundColor: '#fff',
        itemStyle: {
          'font-size': '.8em',
        },
      };
    }

    const config = {
      chart,
      plotOptions: {
        series: {
          animation: false,
        },
        area: {
          cursor: 'crosshair',
          pointPlacement: 'on',
          lineWidth: 2,
          marker: {
            radius: 3,
          },
        },
        line: {
          cursor: 'crosshair',
          pointPlacement: 'on',
          fillOpacity: 0.1,
          lineWidth: 3,
          marker: {
            radius: 3,
          },
          softThreshold: false,
        },
        column: {
          cursor: 'crosshair',
          pointPadding: 0.1,
          grouping: true,
          groupPadding: 0,
          borderWidth: 1,
          states: {
            hover: {
              color: '#203267',
              borderColor: '#5d6a90',
            },
          },
        },
      },
      legend,
      xAxis: {
        type: 'datetime',
        second: '%H:%M:%S',
        dateTimeLabelFormats: {
          minute: '%l:%M%p',
          hour: '%l%P',
          day: '%B %e',
          week: '%B %e',
          month: '%B, %Y',
          year: '%Y',
        },
        minorTickLength: 0,
        startOfWeek: 0,
        labels: {
          autoRotation: [45],
        },
      },
      yAxis: yAxes,
      tooltip: {
        shared: true,
        formatter: TimeSeries.tooltipFormatter,
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

TimeSeries.SeriesDataSource = SeriesDataSource;
