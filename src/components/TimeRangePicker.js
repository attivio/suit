// @flow

import React from 'react';

import Menu, { MenuItemDef } from './Menu';
import SmallTabs from './SmallTabs';

import DatePicker from './DatePicker';

export type TimeRangeGranularity = 'MINUTE' | 'HOUR' | 'DAY' | 'WEEK' | 'MONTH';

type TimeRangePickerProps = {
  /**
   * A map of button names to durations in milliseconds.
   */
  intervals: Map<string, number>;
  /**
   * The currently selected button. Should be one of the keys in the intervals map or null
   * for a custom value.
   */
  currentInterval: string | null;
  /**
   * The start of the currently selected custom range, if any. If the currentInterval property
   * is set, then the currentStart and currentEnd are ignored.
   */
  currentStart: Date | null;
  /**
   * The end of the currently selected custom range, if any. If the currentInterval property
   * is set, then the currentStart and currentEnd are ignored.
   */
  currentEnd: Date | null;
  /**
   * If true, then a custom button will be included to allow the user to choose a custom
   * date range instead of the built-in ones specified by the intervals map.
   */
  customRange: boolean;
  /**
   * If true, then a pop-up will be shown to allow the user to specify the granularity for
   * the time range. If not set, then the granularity will be chosen based on a maximum of
   * data points specified by the maxData property.
   */
  customGranularity: boolean;
  /**
   * The granularity that's currently shown.
   */
  currentGranularity: TimeRangeGranularity;
  /**
   * A callback to notify the parent when the values change. The currentInterval parameter
   * will be one of the keys in the intervals map or null if the interval is custom, in which
   * case the start and end parameters will be set. The granularity is the currently selected
   * value of the granularity pop-up. (Note that for any user action, only the interval or
   * granularity can change from the previous values.)
   */
  onChange: (
    currentInterval: string | null,
    intervalMS: number,
    start: Date | null,
    end: Date | null,
    granularity: TimeRangeGranularity
  ) => void;
  /** Any CSS style to apply to the outer div */
  style: any;
};

type TimeRangePickerDefaultProps = {
  currentStart: Date | null;
  currentEnd: Date | null;
  customRange: boolean;
  customGranularity: boolean;
  currentGranularity: TimeRangeGranularity;
  style: any;
};

type TimeRangePickerState = {
  start: Date | null;
  end: Date | null;
  showCustomDatePicker: boolean;
};

export default class TimeRangePicker extends React.Component<TimeRangePickerDefaultProps, TimeRangePickerProps, TimeRangePickerState> { // eslint-disable-line max-len
  static defaultProps = {
    currentStart: null,
    currentEnd: null,
    customRange: false,
    customGranularity: false,
    currentGranularity: 'DAY',
    style: {},
  };

  static displayName = 'TimeRangePicker';

  constructor(props: TimeRangePickerProps) {
    super(props);
    this.state = {
      showCustomDatePicker: false,
      start: null,
      end: null,
    };
    (this: any).tabChanged = this.tabChanged.bind(this);
    (this: any).granularityChanged = this.granularityChanged.bind(this);
    (this: any).showCustomDatePicker = this.showCustomDatePicker.bind(this);
    (this: any).hideCustomDatePicker = this.hideCustomDatePicker.bind(this);
    (this: any).updateDateRange = this.updateDateRange.bind(this);
  }

  state: TimeRangePickerState;

  calculateGranularity(intervalName: string | null): TimeRangeGranularity {
    if (this.props.customGranularity) {
      return this.props.currentGranularity;
    }
    let rangeMS;
    if (intervalName) {
      const potentialRangeMS = this.props.intervals.get(intervalName);
      if (potentialRangeMS) {
        rangeMS = potentialRangeMS;
      }
    } else if (this.state.end) {
      // We have a custom range...
      const endMS = this.state.end.getDate();
      if (this.state.start) {
        const startMS = this.state.start.getDate();
        rangeMS = endMS - startMS;
      }
    }
    if (rangeMS) {
      // Ranges longer than 3 months are done by month
      if (rangeMS > 3 * 30 * 24 * 60 * 60 * 1000) {
        return 'MONTH';
      }
      // Ranges longer than 1 month are done by week
      if (rangeMS > 30 * 24 * 60 * 60 * 1000) {
        return 'WEEK';
      }
      // Ranges longer than 1 day are done by day
      if (rangeMS > 24 * 60 * 60 * 1000) {
        return 'DAY';
      }
      // Ranges longer than 1 hour are done by hour
      if (rangeMS > 60 * 60 * 1000) {
        return 'HOUR';
      }
      // Ranges shorter than an hour are done by minute
      return 'MINUTE';
    }
    return 'MINUTE';
  }

  tabChanged(newTab: string) {
    const intervalMS = this.props.intervals.get(newTab);
    if (intervalMS) { // This makes flow happy
      this.setState({
        showCustomDatePicker: false,
        start: null,
        end: null,
      }, () => {
        const granularity = this.calculateGranularity(newTab);
        this.props.onChange(newTab, intervalMS, null, null, granularity);
      });
    }
  }

  granularityChanged(item: MenuItemDef) {
    let intervalMS = 0;
    if (this.props.currentInterval) {
      intervalMS = this.props.intervals.get(this.props.currentInterval) || 0;
    }
    this.props.onChange(this.props.currentInterval, intervalMS, this.props.currentStart, this.props.currentEnd,
      ((item.value: any): TimeRangeGranularity));
  }

  updateDateRange(start: Date, end: Date) {
    this.setState({
      start,
      end,
    });
  }

  showCustomDatePicker() {
    this.setState({ showCustomDatePicker: true });
  }

  hideCustomDatePicker() {
    this.setState({ showCustomDatePicker: false });
  }

  calculateRange(): { startDate: Date, endDate: Date } {
    if (this.state.start && this.state.end) {
      return {
        startDate: this.state.start,
        endDate: this.state.end,
      };
    }
    let intervalMS = 0;
    if (this.props.currentInterval) {
      intervalMS = this.props.intervals.get(this.props.currentInterval) || 0;
    }
    const end = new Date();
    const start = new Date(end.getTime() - intervalMS);
    return {
      startDate: start,
      endDate: end,
    };
  }

  renderCustomRangeOption() {
    if (this.props.customRange) {
      const customRangeClass = this.state.currentInterval === null ? 'attivio-smalltabs-selected' : '';
      const { startDate, endDate } = this.calculateRange();
      return (
        <li className="DateRangePicker">
          <a
            className={customRangeClass}
            role="button"
            tabIndex={0}
            onClick={this.showCustomDatePicker}
          >
            Custom&hellip;
          </a>
          {this.state.showCustomDatePicker &&
            <div
              className="DateRangePicker__picker DateRangePicker__picker--direction-left DateRangePicker__picker--open-down DateRangePicker__picker--horizontal" // eslint-disable-line max-len
              style={{ left: '-542px', top: '35px' }}
            >
              <DatePicker
                startingDate={startDate}
                endingDate={endDate}
                updateDate={this.updateDateRange}
                onClose={this.hideCustomDatePicker}
              />
            </div>
          }
        </li>
      );
    }
    // No custom range
    return null;
  }

  render() {
    const intervals = Array.from(this.props.intervals.keys());
    const granularityMenuItems = [
      new MenuItemDef('Minute', 'MINUTE'),
      new MenuItemDef('Hour', 'HOUR'),
      new MenuItemDef('Day', 'DAY'),
      new MenuItemDef('Week', 'WEEK'),
      new MenuItemDef('Month', 'MONTH'),
    ];
    const currentTab = this.props.currentInterval || undefined;

    return (
      <div style={this.props.style}>
        <SmallTabs
          tabs={intervals}
          currentTab={currentTab}
          changed={this.tabChanged}
        >
          {this.renderCustomRangeOption()}
        </SmallTabs>
        {this.props.customGranularity ? (
          <Menu
            label="By:"
            items={granularityMenuItems}
            selection={this.props.currentGranularity}
            onSelect={this.granularityChanged}
            style={{ top: '10px' }}
          />
        ) : null}
      </div>
    );
  }
}
