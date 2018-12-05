// @flow

import { Enum } from 'enumify';

/**
 * Enumerated values for possible date formats used by the
 * formatDate() and formatDateString() methods.
 */
export default class DateFormat extends Enum {
}

/** The ISO-like format that the Attivio APIs expect. */
const ATTIVIO = 'ATTIVIO';
/** the ISO-8601 format, e.g., '2017-09-07T10:29-05:00' */
const ISO_8601 = 'ISO_8601';
/** a short date with just numbers, e.g., '09/07/2017' */
const SHORT_DATE = 'SHORT_DATE';
/** a date using the abbreviated month name, e.g., 'Sep. 8, 2017' */
const MEDIUM_DATE = 'MEDIUM_DATE';
/** a date including the day of the week and the full month name: e.g., 'Thursday, September 8 2017' */
const LONG_DATE = 'LONG_DATE';
/** A simple time format, e.g, '10:29 AM' */
const SHORT_TIME = 'SHORT_TIME';
/** A full time format, with seconds: e.g., '10:29:52 AM' */
const LONG_TIME = 'LONG_TIME';
/** The month and year of the date: e.g., 'Sep. 2017' */
const SHORT_MONTH = 'SHORT_MONTH';
/** The month and year of the date: e.g., 'September 2017' */
const LONG_MONTH = 'LONG_MONTH';
/** The abbreviated year: e.g. '17 */
const SHORT_YEAR = 'SHORT_YEAR';
/** The full year: e.g. 2017 */
const LONG_YEAR = 'LONG_YEAR';
/** The short date and the short time, combined: e.g., '09/07/2017 10:29 AM' */
const SHORT = 'SHORT';
/** The medium date and the short time, combined: e.g., 'Sep. 8 2017 10:29 AM' */
const MEDIUM = 'MEDIUM';
/** The long date and the long time, combined: e.g., 'Thursday, September 8 2017 10:29 AM' */
const LONG = 'LONG';
/** The month and day of the month with no time or year: e.g., 'March 4' */
const DAY_OF_MONTH = 'DAY_OF_MONTH';
/** A simple hour, in 12-hour format with AM or PM: e.g., '2 days ago' */
const HOUR = 'HOUR';
/** A distance 'ago' in time before now: e.g., '2 days ago' */
const AGO = 'AGO';

DateFormat.initEnum([
  ATTIVIO,
  ISO_8601,
  SHORT_DATE,
  MEDIUM_DATE,
  LONG_DATE,
  SHORT_TIME,
  LONG_TIME,
  SHORT_MONTH,
  LONG_MONTH,
  SHORT_YEAR,
  LONG_YEAR,
  SHORT,
  MEDIUM,
  LONG,
  DAY_OF_MONTH,
  HOUR,
  AGO,
]);
