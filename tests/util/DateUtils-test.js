import DateFormat from '../../src/api/DateFormat';
import DateUtils from '../../src/util/DateUtils';

describe('Test DateUtils', () => {
  test('Can parse an Attivio date string to a date object', () => {
    const d = Date.UTC(1963, 10, 22, 18, 30);
    const parsed = DateUtils.stringToDate('1963-11-22T13:30:00-05:00');
    expect(parsed.getTime()).toEqual(d);
  });

  test('Can format a date starting from an Attivio date string', () => {
    expect(DateUtils.formatDateString('1963-11-22T13:30:00-05:00', DateFormat.DAY_OF_MONTH)).toEqual('November 22');
  });

  test('Can format date ranges', () => {
    let start;
    let end;

    start = new Date(2018, 3, 2, 3, 14, 13);
    end = new Date(2018, 3, 2, 3, 15, 13);
    expect(DateUtils.formatDateRange(start.getTime(), end.getTime())).toEqual('April 2, 2018 3:14 AM');

    start = new Date(2018, 2, 2, 3, 14);
    end = new Date(2018, 2, 2, 4, 14);
    expect(DateUtils.formatDateRange(start.getTime(), end.getTime())).toEqual('March 2, 2018 3:00 AM');

    start = new Date(2018, 2, 2, 3);
    end = new Date(2018, 2, 3, 3);
    expect(DateUtils.formatDateRange(start.getTime(), end.getTime())).toEqual('March 2, 2018');

    start = new Date(2017, 11, 28);
    end = new Date(2018, 0, 4);
    expect(DateUtils.formatDateRange(start.getTime(), end.getTime())).toEqual('December 28, 2017 - January 4, 2018');

    start = new Date(2018, 2, 28);
    end = new Date(2018, 3, 4);
    expect(DateUtils.formatDateRange(start.getTime(), end.getTime())).toEqual('March 28 - April 4, 2018');

    start = new Date(2018, 5, 14);
    end = new Date(2018, 5, 21);
    expect(DateUtils.formatDateRange(start.getTime(), end.getTime())).toEqual('June 14 - 21, 2018');

    start = new Date(2018, 1, 28);
    end = new Date(2018, 2, 28);
    expect(DateUtils.formatDateRange(start.getTime(), end.getTime())).toEqual('March, 2018');

    start = new Date(2017, 11, 15);
    end = new Date(2018, 0, 20);
    expect(DateUtils.formatDateRange(start.getTime(), end.getTime())).toEqual('December, 2017 - January, 2018');

    start = new Date(2017, 3, 1);
    end = new Date(2017, 4, 30);
    expect(DateUtils.formatDateRange(start.getTime(), end.getTime())).toEqual('April - May, 2017');

    start = new Date(2016, 11, 31);
    end = new Date(2019, 0, 1);
    expect(DateUtils.formatDateRange(start.getTime(), end.getTime())).toEqual('2016 - 2019');
  });
});
