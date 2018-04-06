// @flow
import React from 'react';

import DateUtils from '../util/DateUtils';
import DateFormat from '../util/DateFormat';

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
export default class FormattedDate extends React.Component<FormattedDateDefaultProps, FormattedDateProps, void> {
  static defaultProps = {
    format: DateFormat.SHORT_DATE,
    locale: 'en',
  };

  static displayName = 'FormattedDate';

  static DateFormat;

  render() {
    return <span>{DateUtils.formatDate(this.props.date, this.props.format, this.props.locale)}</span>;
  }
}

FormattedDate.DateFormat = DateFormat;
