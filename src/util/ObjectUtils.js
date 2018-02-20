// @flow

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
    if (objA === objB) {
      return true;
    }

    if (objA === null || objB === null) {
      // Since they're not the same object, then if one is null they're different
      return false;
    }

    if (objA === undefined || objB === undefined) {
      // Since they're not the same object, then if one is undefined they're different
      return false;
    }

    if (typeof objA !== typeof objB) {
      return false;
    }

    const aType = typeof objA;
    if (aType === 'boolean' || aType === 'number' || aType === 'string' || aType === 'symbol' || aType === 'function') {
      // For these types, the equality check would have already worked...
      return false;
    }

    if (Array.isArray(objA) && Array.isArray(objB)) {
      // Only need to check one since we already checked that they're the same type
      return ObjectUtils.arrayEquals((objA: Array<any>), (objB: Array<any>));
    }

    // Otherwise check for plain objects...
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
      return false;
    }

    // Test for A's keys different from B.
    const bHasOwnProperty = hasOwnProperty.bind(objB);
    let i;
    for (i = 0; i < keysA.length; i += 1) {
      if (!bHasOwnProperty(keysA[i])) {
        return false;
      }
      if (!ObjectUtils.deepEquals(objA[keysA[i]], objB[keysA[i]])) {
        return false;
      }
    }
    return true;
  }

  /**
   * Compare two arrays to see if they are equal. If the arrays contain
   * objects, the objects are compared `ly.
   */
  static arrayEquals(a: Array<any>, b: Array<any>): boolean {
    if (a === b) {
      return true;
    }
    if (a && b && a.length === b.length) {
      const mismatch = a.find((aElement, idx) => {
        const bElement = b[idx];
        // If the corresponding values aren't equal, then squawk.
        return !ObjectUtils.deepEquals(aElement, bElement);
      });
      if (mismatch) {
        return false;
      }
      return true;
    }
    return false;
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
