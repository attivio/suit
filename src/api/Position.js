// @flow

/**
 * A geographic coordinate.
 */
export default class Position {
  static fromJson(json: any): Position {
    let longitude = 0;
    let latitude = 0;
    if (Object.prototype.hasOwnProperty.call(json, 'longitude')) {
      longitude = json.longitude;
    } else if (Object.prototype.hasOwnProperty.call(json, 'x')) {
      longitude = json.x;
    }
    if (Object.prototype.hasOwnProperty.call(json, 'latitude')) {
      latitude = json.latitude;
    } else if (Object.prototype.hasOwnProperty.call(json, 'y')) {
      latitude = json.y;
    }
    return new Position(longitude, latitude);
  }

  constructor(longitude: number, latitude: number) {
    this.longitude = longitude;
    this.latitude = latitude;
  }

  /** The coordinate's longitude */
  longitude: number;
  /** The coordinate's latitude */
  latitude: number;

  toString() {
    return `(${this.longitude}, ${this.latitude})`;
  }
}
