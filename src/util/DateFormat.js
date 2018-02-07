// @flow

import { Enum } from 'enumify';

/**
 * Enumerated values for possible date formats used by the
 * formatDate() and formatDateString() methods.
 */
export default class DateFormat extends Enum {}

DateFormat.initEnum([
  /** The ISO-like format that the Attivio APIs expect. */
  'ATTIVIO',
  /** the ISO-8601 format, e.g., '2017-09-07T10:29-05:00' */
  'ISO_8601',
  /** a short date with just numbers, e.g., '09/07/2017' */
  'SHORT_DATE',
  /** a date using the abbreviated month name, e.g., 'Sep. 8, 2017' */
  'MEDIUM_DATE',
  /** a date including the day of the week and the full month name: e.g., 'Thursday, September 8 2017' */
  'LONG_DATE',
  /** A simple time format, e.g, '10:29 AM' */
  'SHORT_TIME',
  /** A full time format, with seconds: e.g., '10:29:52 AM' */
  'LONG_TIME',
  /** The month and year of the date: e.g., 'Sep. 2017' */
  'SHORT_MONTH',
  /** The month and year of the date: e.g., 'September 2017' */
  'LONG_MONTH',
  /** The abbreviated year: e.g. '17 */
  'SHORT_YEAR',
  /** The full year: e.g. 2017 */
  'LONG_YEAR',
  /** The short date and the short time, combined: e.g., '09/07/2017 10:29 AM' */
  'SHORT',
  /** The medium date and the short time, combined: e.g., 'Sep. 8 2017 10:29 AM' */
  'MEDIUM',
  /** The long date and the long time, combined: e.g., 'Thursday, September 8 2017 10:29 AM' */
  'LONG',
  /** A distance 'ago' in time before now: e.g., '2 days ago' */
  'AGO',
  /** A distance into the future from now: e.g., 'in 4 months' */
  'IN',
]);
