// @flow

import React from 'react';

import DateFormat from '../api/DateFormat';
import DateUtils from '../util/DateUtils';

type DateRangeDisplayProps = {
  /** The label to display before the date range. Defaults to "Date:" */
  label: string | null;
  /** The interval to show. Used if start is not set. Optional. */
  interval: number;
  /** The start of the range. If set, will take precedence over interval. Optional. */
  start: Date | null;
  /**
   * The end of the range. Only used if start is set. If not set, then start is used
   * as a point in time rather than a range.
   */
  end: Date | null;
  /** An optional CSS style. */
  style: any;
};

type DateRangeDisplayDefaultProps = {
  label: string | null;
  interval: number;
  start: Date | null;
  end: Date | null;
  style: any;
};

export default class DateRangeDisplay extends React.Component<DateRangeDisplayDefaultProps, DateRangeDisplayProps, void> {
  static defaultProps = {
    label: 'Date:',
    interval: 0,
    start: null,
    end: null,
    style: {},
  }

  static SECONDS_MS = 1000;
  static MINUTES_MS = 1000 * 60;
  static HOURS_MS = 1000 * 60 * 60;
  static DAYS_MS = 1000 * 60 * 60 * 24;
  static WEEKS_MS = 1000 * 60 * 60 * 24 * 7;
  static MONTHS_MS = 1000 * 60 * 60 * 24 * 30;
  static YEARS_MS = 1000 * 60 * 60 * 24 * 365;

  static getIntervalRange(interval: number): string {
    // Convert interval from milliseconds to a duration
    let range;

    // Try years...
    const years = Math.floor(interval / DateRangeDisplay.YEARS_MS);
    if (years >= 1) {
      range = years === 1 ? 'year' : `${years} years`;
    } else {
      const months = Math.floor(interval / DateRangeDisplay.MONTHS_MS);
      if (months >= 1) {
        range = months === 1 ? 'month' : `${months} months`;
      } else {
        const weeks = Math.floor(interval / DateRangeDisplay.WEEKS_MS);
        if (weeks >= 1) {
          range = weeks === 1 ? 'week' : `${weeks} weeks`;
        } else {
          const days = Math.floor(interval / DateRangeDisplay.DAYS_MS);
          if (days >= 1) {
            range = days === 1 ? 'day' : `${days} days`;
          } else {
            const hours = Math.floor(interval / DateRangeDisplay.HOURS_MS);
            if (hours >= 1) {
              range = hours === 1 ? 'hour' : `${hours} hours`;
            } else {
              const minutes = Math.floor(interval / DateRangeDisplay.MINUTES_MS);
              if (minutes >= 1) {
                range = minutes === 1 ? 'minute' : `${minutes} minutes`;
              } else {
                const seconds = Math.floor(interval / DateRangeDisplay.SECONDS_MS);
                if (seconds >= 1) {
                  range = seconds === 1 ? 'second' : `${seconds} seconds`;
                } else {
                  range = interval === 1 ? 'millisecond' : `${interval} milliseconds`;
                }
              }
            }
          }
        }
      }
    }
    return `The last ${range}`;
  }

  static displayName = 'DateRangeDisplay';

  render() {
    let range;
    let format;
    if (this.props.start) {
      const startMS = this.props.start.getTime();
      if (this.props.end) {
        const betweenMS = this.props.end.getTime() - startMS;
        if (betweenMS >= DateRangeDisplay.YEARS_MS) {
          format = DateFormat.LONG_YEAR;
        } else if (betweenMS >= DateRangeDisplay.MONTHS_MS) {
          format = DateFormat.LONG_MONTH;
        } else if (betweenMS >= DateRangeDisplay.DAYS_MS) {
          format = DateFormat.DAY_OF_MONTH;
        } else if (betweenMS > DateRangeDisplay.HOURS_MS) {
          format = DateFormat.HOUR;
        } else if (betweenMS > DateRangeDisplay.SECONDS_MS) {
          format = DateFormat.SHORT_TIME;
        } else {
          // If start and end are the same, show a full date and time.
          format = DateFormat.MEDIUM;
        }
      } else {
        format = DateFormat.MEDIUM;
      }

      let startDate = ''; // Crazy hoop-jumping to deal with flow not remembering the previous if (thius.props.start)
      if (this.props.start) {
        startDate = DateUtils.formatDate(this.props.start, format);
      }
      if (this.props.end) {
        const endDate = DateUtils.formatDate(this.props.end, format);
        if (startDate === endDate) {
          range = startDate;
        } else {
          range = `${startDate} - ${endDate}`;
        }
      } else {
        range = startDate;
      }
    } else if (this.props.interval > 0) {
      range = DateRangeDisplay.getIntervalRange(this.props.interval);
    } else {
      range = 'Not specified';
    }

    const style = Object.assign({ fontSize: '1.2em', fontWeight: 'bold' }, this.props.style);

    return (
      <span style={style}>
        {this.props.label}
        {' '}
        <span style={{ color: '#2e75b3' }}>
          {range}
        </span>
      </span>
    );
  }
}
