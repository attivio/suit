// @flow

import Position from '../api/Position';

export default class PositionUtils {
  static calcBounds(values: Array<any>): Array<Array<number>> {
    // Set default bounds in case there are no values in the array
    let minLatitude = -90;
    let maxLatitude = 90;
    let minLongitude = -180;
    let maxLongitude = 180;
    let firstTime = true;
    values.forEach((value) => {
      if (firstTime) {
        minLatitude = value.latitude || 0;
        minLongitude = value.longitude || 0;
        maxLatitude = minLatitude;
        maxLongitude = minLongitude;
        firstTime = false;
      } else {
        const latitude = value.latitude || 0;
        const longitude = value.longitude || 0;
        minLatitude = Math.min(latitude, minLatitude);
        maxLatitude = Math.max(latitude, maxLatitude);
        minLongitude = Math.min(longitude, minLongitude);
        maxLongitude = Math.max(longitude, maxLongitude);
      }
    });
    const bounds = [[minLongitude, minLatitude], [maxLongitude, maxLatitude]];
    return bounds;
  }

  static calcCenter(values: Array<any>): Position {
    let result;

    if (values.length === 0) {
      result = new Position(0, 0);
    } else if (values.length === 1) {
      result = new Position(values[0].longitude || 0, values[0].latitude || 0);
    } else {
      let x = 0;
      let y = 0;
      let z = 0;

      values.forEach((value) => {
        // Some value objects may not have both longitude and latitude set...
        const latitudeDegrees = value.latitude || 0;
        const longitudeDegrees = value.longitude || 0;
        const latitude = (latitudeDegrees * Math.PI) / 180;
        const longitude = (longitudeDegrees * Math.PI) / 180;

        x += (Math.cos(latitude) * Math.cos(longitude));
        y += (Math.cos(latitude) * Math.sin(longitude));
        z += Math.sin(latitude);
      });
      const total = values.length;
      x /= total;
      y /= total;
      z /= total;

      const centralSquareRoot = Math.sqrt((x * x) + (y * y));
      const centerLatitudeRad = Math.atan2(z, centralSquareRoot);
      const centerLongitudeRad = Math.atan2(y, x);

      result = new Position((centerLongitudeRad * 180) / Math.PI, (centerLatitudeRad * 180) / Math.PI);
    }
    return result;
  }
}
