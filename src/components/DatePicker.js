// @flow
import React from 'react';

type DatePickerProps = {
  /**
   * The starting point to show when the picker is first
   * opened. Optional.
   */
  startingDate: Date | null,
  /**
   * The ending point to show when the picker is first
   * opened. Optional. (Only applies if range is set.)
   */
  endingDate: Date | null,
  /** If set, then choose a date range instead of a single date. */
  range: boolean,
  /**
   * Callback that will be called with the starting (and ending,
   * if specifying a range) date and which has no return value.
   */
  updateDate: (start: Date, end: Date) => void,
};

type DatePickerDefaultProps = {
  startingDate: Date | null,
  endingDate: Date | null,
  range: boolean,
};

/**
 * Component to let the user choose either a single
 * date or a starting/ending range.
 */
export default class DatePicker extends React.Component<DatePickerDefaultProps, DatePickerProps, void> {
  static defaultProps: DatePickerDefaultProps = {
    startingDate: null,
    endingDate: null,
    range: false,
  };

  static displayName = 'DatePicker';

  constructor(props: DatePickerProps) {
    super(props);
    (this: any).pickDate = this.pickDate.bind(this);
  }

  props: DatePickerProps;

  pickDate() {
    this.props.updateDate(new Date(), new Date());
  }

  render() {
    let label = this.props.range ? 'Range date picker' : 'Single date picker';
    const startingDate = this.props.startingDate ? this.props.startingDate.toDateString() : 'none';
    const endingDate = this.props.endingDate ? this.props.endingDate.toDateString() : 'none';

    if (this.props.startingDate && this.props.endingDate) {
      label = `${label} from ${startingDate} to ${endingDate}`;
    } else if (this.props.startingDate) {
      label = `${label} from ${startingDate}`;
    } else if (this.props.endingDate) {
      label = `${label} from ${endingDate}`;
    }
    return <div>{label}</div>;
  }
}
