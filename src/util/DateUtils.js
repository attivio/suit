// @flow
import moment from 'moment';

import DateFormat from '../api/DateFormat';

/**
 * Utility class with functions that help manipulate dates.
 */
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
        return m.format('MMMM, YYYY');
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
      case DateFormat.DAY_OF_MONTH:
        return m.format('MMMM D');
      case DateFormat.HOUR:
        return m.format('h:00A');
      case DateFormat.AGO:
        return m.fromNow();
      case DateFormat.ISO_8601:
      default:
        return m.format();
    }
  }

  /**
   * Given a JavaScript Date object, return a formatted date in the specified
   * locale using the moment.js format string specified.
   */
  static formatDateCustom(date: Date, formatString: string, locale: string = 'en'): string {
    const m = moment(date).locale(locale);
    return m.format(formatString);
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

  /**
 * Format the date range presented for display in places such as
 * tooltips on TimeSeries charts. Based on the difference in the
 * start and end times, it will display either a single value or
 * a range, with varying precision. For example, if the points are
 * an hour apart, it will format based on the halfway point with
 * precision to the hour, e.g., "March 14, 2017 2:00 AM." In some
 * cases, the result will be a range, such as if they're a week
 * apart, in which case you might get "June 14 - 21, 2018."
 *
 * The point is to not clutter the formatted value with unnecessary
 * information, essentially.
 *
 * Here is a complete list of the possible formats:
 *
 * * April 2, 2018 3:14 AM
 * * March 2, 2018 3:00PM
 * * March 2, 2018
 * * December 28, 2017 - January 4, 2018
 * * March 28 - April 4, 2018
 * * June 14 - 21, 2018
 * * March, 2018
 * * December, 2017 - January, 2018
 * * April - May, 2017
 * * 2016 - 2019
 */
  static formatDateRange(start, end) {
    const diff = end - start;
    const middle = (start + end) / 2;
    const startMoment = moment(start);
    const endMoment = moment(end);
    let result;

    if (diff <= 1000 * 60) {
      // If they're a minute apart, format tho the nearest minute (we never care about seconds...)
      // E.g., March 2, 2018 3:14PM
      result = moment(middle).format('LL LT');
    } else if (diff <= 1000 * 60 * 60 * 12) {
      // If they're an hour or up to 12 hours apart, format to the hour with minutes set to 00
      // E.g., March 2, 2018 3:00PM
      result = moment(middle).format('LL h:00 A');
    } else if (diff <= 1000 * 60 * 60 * 24) {
      // If they're a day apart, format to the date
      // E.g., March 2, 2018
      result = moment(middle).format('LL');
    } else if (diff <= 1000 * 60 * 60 * 24 * 7) {
      // If they're a week apart, format to the range of the first day to the last day
      if (startMoment.year() !== endMoment.year()) {
        // Need to include both years
        // E.g., Decembeer 28, 2017 - January 3, 2018
        const formattedStart = moment(start).format('LL');
        const formattedEnd = moment(end).format('LL');
        result = `${formattedStart} - ${formattedEnd}`;
      } else if (startMoment.month() !== endMoment.month()) {
        // Need to include both months but only one year
        // E.g., March 28 - April 3, 2018
        const formattedStart = startMoment.format('MMMM D');
        const formattedEnd = endMoment.format('LL');
        result = `${formattedStart} - ${formattedEnd}`;
      } else {
        // Otherwise, we can just include the momnth and year once
        // E.g., June 14 - 21, 2018
        const formattedStart = startMoment.format('MMMM D');
        const formattedEnd = endMoment.format('D, YYYY');
        result = `${formattedStart} - ${formattedEnd}`;
      }
    } else if (diff <= 1000 * 60 * 60 * 24 * 30) {
      // If they're a month apart, format to just the month
      // E.g., March, 2018
      result = moment(middle).format('MMMM, YYYY');
    } else if (diff <= 1000 * 60 * 60 * 24 * 366) {
      // If they'e a year apart, format to the range of months
      if (startMoment.year() !== endMoment.year()) {
        // If they're in different years, include both years
        // E.g., December, 2017 - January, 2018
        const formattedStart = startMoment.format('MMMM, YYYY');
        const formattedEnd = endMoment.format('MMMM, YYYY');
        result = `${formattedStart} - ${formattedEnd}`;
      } else if (startMoment.month() === 0 && endMoment.month() === 11) {
        // Special case of January - December of the same year...
        // Just show the year
        // E.g., 2017
        result = startMoment.format('YYYY');
      } else {
        // Otherwise show both months and include the year only once
        // E.g., March - April, 2018
        const formattedStart = startMoment.format('MMMM');
        const formattedEnd = endMoment.format('MMMM, YYYY');
        result = `${formattedStart} - ${formattedEnd}`;
      }
    } else {
      // If they're more than a year apart, format to the range of years...
      // E.g., 2017 - 2018
      const formattedStart = startMoment.format('YYYY');
      const formattedEnd = endMoment.format('YYYY');
      result = `${formattedStart} - ${formattedEnd}`;
    }
    return result;
  }
}
