import expect from 'expect';
import DateFormat from 'src/api/DateFormat';
import DateUtils from 'src/util/DateUtils';

describe('Test DateUtils', () => {
  it('Can format dates', () => {
    const d = Date.UTC(1963, 10, 22, 18, 30);
    expect(DateUtils.formatDate(d, DateFormat.ATTIVIO)).toEqual('1963-11-22T13:30:00-05:00');
    expect(DateUtils.formatDate(d, DateFormat.ISO_8601)).toEqual('1963-11-22T13:30:00-05:00');
    expect(DateUtils.formatDate(d, DateFormat.SHORT_DATE)).toEqual('11/22/1963');
    expect(DateUtils.formatDate(d, DateFormat.MEDIUM_DATE)).toEqual('Nov 22, 1963');
    expect(DateUtils.formatDate(d, DateFormat.MEDIUM_DATE, 'it')).toEqual('22 nov 1963');
    expect(DateUtils.formatDate(d, DateFormat.LONG_DATE)).toEqual('Friday, November 22, 1963');
    expect(DateUtils.formatDate(d, DateFormat.LONG_DATE, 'fr')).toEqual('vendredi, 22 novembre 1963');
    expect(DateUtils.formatDate(d, DateFormat.SHORT_TIME)).toEqual('1:30 PM');
    expect(DateUtils.formatDate(d, DateFormat.LONG_TIME)).toEqual('1:30:00 PM');
    expect(DateUtils.formatDate(d, DateFormat.SHORT_MONTH)).toEqual('Nov. 1963');
    expect(DateUtils.formatDate(d, DateFormat.LONG_MONTH)).toEqual('November 1963');
    expect(DateUtils.formatDate(d, DateFormat.SHORT_YEAR)).toEqual('\u201963');
    expect(DateUtils.formatDate(d, DateFormat.LONG_YEAR)).toEqual('1963');
    expect(DateUtils.formatDate(d, DateFormat.SHORT)).toEqual('11/22/1963 1:30 PM');
    expect(DateUtils.formatDate(d, DateFormat.MEDIUM)).toEqual('Nov 22, 1963 1:30 PM');
    expect(DateUtils.formatDate(d, DateFormat.LONG)).toEqual('Friday, November 22, 1963 1:30 PM');
    expect(DateUtils.formatDate(d, DateFormat.DAY_OF_MONTH)).toEqual('November 22');
    expect(DateUtils.formatDate(d, DateFormat.HOUR)).toEqual('1:00PM');
    const ago = DateUtils.formatDate(d, DateFormat.AGO);
    // Check a bunch of values so the test doesn't break as time passes...
    expect(
      ago === '55 years ago' ||
      ago === '56 years ago' ||
      ago === '57 years ago' ||
      ago === '58 years ago' ||
      ago === '59 years ago' ||
      ago === '60 years ago' ||
      ago === '61 years ago' ||
      ago === '62 years ago' ||
      ago === '63 years ago' ||
      ago === '64 years ago' ||
      ago === '65 years ago',
    ).toBeTruthy();

    const nowMS = new Date().getTime();
    const yesterday = new Date(nowMS - (1000 * 60 * 60 * 24));
    const twoYearsAgo = new Date(nowMS - (1000 * 60 * 60 * 24 * 366 * 2));
    expect(DateUtils.formatDate(yesterday, DateFormat.AGO)).toEqual('a day ago');
    expect(DateUtils.formatDate(twoYearsAgo, DateFormat.AGO)).toEqual('2 years ago');

    expect(DateUtils.formatDate(d)).toEqual('1963-11-22T13:30:00-05:00');
  });

  it('Can format dates in a custom way', () => {
    const d = Date.UTC(1963, 10, 22, 18, 30);
    expect(DateUtils.formatDateCustom(d, 'dddd, MMMM Do \\at HH:mm (Qo \\qu\\art\\er)')).toEqual('Friday, November 22nd at 13:30 (4th quarter)'); // eslint-disable-line max-len
  });

  it('Can parse an Attivio date string to a date object', () => {
    const d = Date.UTC(1963, 10, 22, 18, 30);
    const parsed = DateUtils.stringToDate('1963-11-22T13:30:00-05:00');
    expect(parsed.getTime()).toEqual(d);
  });

  it('Can format a date starting ferom an Attivio date string', () => {
    expect(DateUtils.formatDateString('1963-11-22T13:30:00-05:00', DateFormat.DAY_OF_MONTH)).toEqual('November 22');
  });
});
