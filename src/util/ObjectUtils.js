// @flow

import { isEqual } from 'lodash';

/**
 * Utility class for working with various types of JavaScript objects.
 */
export default class ObjectUtils {
  /**
   * Remove an object from an array.
   */
  static removeItem<T>(a: Array<T>, o: T): Array<T> {
    if (a && a.length > 0) {
      const index = a.indexOf(o);
      if (index >= 0) {
        a.splice(index, 1);
      }
    }
    return a;
  }

  /**
   * Compare two objects to see if they are equal. Will handle primitive
   * types, arrays, and plain-old JavaScript objects.
   */
  static deepEquals(objA: any, objB: any): boolean {
    return isEqual(objA, objB);
  }

  /**
   * Convert a JavaScript Map object whose keys are
   * strings into a plain-old JavaScript object so it
   * can be converted to JSON.
   */
  static strMapToObj(strMap: Map<string, any>) {
    const obj = Object.create(null);
    strMap.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }

  /**
   * Convert a plain-old JavaScript object to an ES6-style map.
   * Only looks at the objects own properties.
   */
  static toMap(a: any): Map<string, any> {
    const result = new Map();
    if (typeof a === 'object') {
      Object.getOwnPropertyNames(a).forEach((property) => {
        result.set(property, a[property]);
      });
    }
    return result;
  }
}
