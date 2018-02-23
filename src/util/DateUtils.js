// @flow
import moment from 'moment';

import DateFormat from './DateFormat';

export default class DateUtils {
  /**
   * Given a JavaScript Date object, return a formatted date in the specified
   * locale using the format specified.
   */
  static formatDate(date: Date, format: DateFormat, locale: string = 'en'): string {
    const m = moment(date).locale(locale);
    switch (format) {
      case DateFormat.ATTIVIO:
        return m.format();
      case DateFormat.SHORT_DATE:
        return m.format('L');
      case DateFormat.MEDIUM_DATE:
        return m.format('ll');
      case DateFormat.LONG_DATE:
        return m.format('dddd, LL');
      case DateFormat.SHORT_TIME:
        return m.format('LT');
      case DateFormat.LONG_TIME:
        return m.format('LTS');
      case DateFormat.SHORT_MONTH:
        return m.format('MMM. YYYY');
      case DateFormat.LONG_MONTH:
        return m.format('MMMM YYYY');
      case DateFormat.SHORT_YEAR:
        return m.format('\u2019YY');
      case DateFormat.LONG_YEAR:
        return m.format('YYYY');
      case DateFormat.SHORT:
        return m.format('L LT');
      case DateFormat.MEDIUM:
        return m.format('lll');
      case DateFormat.LONG:
        return m.format('LLLL');
      case DateFormat.AGO:
        return m.fromNow();
      case DateFormat.IN:
        return m.toNow();
      case DateFormat.ISO_8601:
      default:
        return m.format();
    }
  }

  /**
   * Given a string, return a Date object created by parsing it.
   */
  static stringToDate(dateString: string): Date {
    return moment(dateString).toDate();
  }

  /**
   * Given a string, return a formatted date in the specified locale using
   * the format specified.
   */
  static formatDateString(dateString: string | null, format: DateFormat, locale: string = 'en'): string {
    if (dateString) {
      const date = DateUtils.stringToDate(dateString);
      return DateUtils.formatDate(date, format, locale);
    }
    return '';
  }
}
