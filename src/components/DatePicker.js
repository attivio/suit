// @flow
import React from 'react';

import moment from 'moment';

import {
  DayPickerRangeController,
} from 'react-dates';

type FocusedInput = 'startDate' | 'endDate' | null;

type DatePickerProps = {
  /**
   * The starting date to show when the picker is first
   * opened. Optional.
   */
  startingDate: Date;
  /**
   * The ending date to show when the picker is first
   * opened.
   */
  endingDate: Date;
  /**
   * Callback that will be called with the starting and ending
   * dates.
   */
  updateDate: (start: Date, end: Date) => void;
  /**
   * Callback tell the parent we want to be closed.
   */
  onClose: () => void;
};

type DatePickerState = {
  focusedInput: FocusedInput;
};

/**
 * Component to let the user choose either a single
 * date or a starting/ending range.
 */
export default class DatePicker extends React.Component<void, DatePickerProps, DatePickerState> {

  static displayName = 'DatePicker';

  constructor(props: DatePickerProps) {
    super(props);
    this.state = {
      focused: false,
      focusedInput: null,
    };

    (this: any).setFocusedState = this.setFocusedState.bind(this);
    (this: any).setDate = this.setDate.bind(this);
  }

  state: DatePickerState;

  setFocusedState(focusedInput: FocusedInput) {
    this.setState({
      focusedInput,
    });
  }

  setDate(event: any) {
    this.props.updateDate(new Date(event.startDate), new Date(event.endDate));
  }

  render() {
    const startDate = moment(this.props.startingDate);
    const endDate = moment(this.props.endingDate);

    return (
      <DayPickerRangeController
        startDate={startDate}
        endDate={endDate}
        onDatesChange={this.setDate}
        focusedInput={this.state.focusedInput || 'startDate'}
        onFocusChange={this.setFocusedState}
        isOutsideRange={() => { return false; }}
        onOutsideClick={this.props.onClose}
        numberOfMonths={2}
      />
    );
  }
}
