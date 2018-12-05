// @flow
import DataPoint from './DataPoint';

export default class DataSet {
  constructor(data: Array<DataPoint>, first: number = -1, last: number = -1,
    trend: number = NaN, trendFirst: number = NaN, trendLast: number = NaN) {
    this.data = data;
    this.first = first;
    this.last = last;
    this.trend = trend;
    this.trendFirst = trendFirst;
    this.trendLast = trendLast;
  }

  static fromJson(json: any): DataSet {
    let data = [];
    if (json.data && Array.isArray(json.data)) {
      data = json.data.map((dataPointJson) => {
        return DataPoint.fromJson(dataPointJson);
      });
    }
    const first = json.first || -1;
    const last = json.last || -1;
    const trend = json.trend || NaN;
    const trendFirst = json.trendFirst || NaN;
    const trendLast = json.trendLast || NaN;

    return new DataSet(data, first, last, trend, trendFirst, trendLast);
  }

  data: Array<DataPoint>;
  first: number;
  last: number;
  trend: number;
  trendFirst: number;
  trendLast: number;
}
