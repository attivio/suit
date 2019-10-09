// @flow
import * as React from 'react';

import DateUtils from '../util/DateUtils';
import DateFormat from '../api/DateFormat';

type FormattedDateProps = {
  /** The date to format. */
  date: Date;
  /** The format to use for it. Defaults to SHORT_DATE */
  format: DateFormat;
  /** The locale to use when formatting the date. Defaults to 'en'. */
  locale: string;
};

type FormattedDateDefaultProps = {
  format: DateFormat;
  locale: string;
};

/**
 * Display a formatted Date object.
 */
export default class FormattedDate extends React.Component<FormattedDateProps, void> {
  static defaultProps = {
    format: DateFormat.SHORT_DATE,
    locale: 'en',
  };

  static displayName = 'FormattedDate';

  /* $FlowFixMe This comment suppresses an error found when upgrading Flow to
   * v0.107.0. To view the error, delete this comment and run Flow. */
  static DateFormat;

  render() {
    return <span>{DateUtils.formatDate(this.props.date, this.props.format, this.props.locale)}</span>;
  }
}

FormattedDate.DateFormat = DateFormat;
