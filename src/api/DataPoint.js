// @flow

/**
 * A single point of data in a time-based series.
 */
export default class DataPoint {
  constructor(startTime: number, endTime: number, data: number | null) {
    this.startTime = startTime;
    this.endTime = endTime;
    this.data = data;
  }

  static fromJson(json: any): DataPoint {
    return new DataPoint(json.startTime || 0, json.endTime || 0, json.data || 0);
  }

  /** The start of the range the data point covers. */
  startTime: number;
  /** The end of the range the data point covers. */
  endTime: number;
  /** The value of the data point. If there is no data for this time, this will be null. */
  data: number | null;
}
