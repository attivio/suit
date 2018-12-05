import expect from 'expect';
import ObjectUtils from 'src/util/ObjectUtils';

describe('Test ObjectUtils', () => {
  it('Checks array equality', () => {
    const firstArray = [1, 4, 23, 63];
    const secondArray = [1, 4, 23];
    const thirdArray = [4, 4, 3, 69933];
    const fourthArray = ['Fast', 'Furious', 'Two'];
    const fifthArray = ['Fast', 'Furious', 'Spam'];
    const randomObject = {
      a: 'foo',
      b: 12234,
    };
    const sixthArray = [1, 3, randomObject];
    const seventhArray = [1, 3, randomObject];
    expect(ObjectUtils.arrayEquals(firstArray, firstArray)).toBeTruthy();
    expect(ObjectUtils.arrayEquals(firstArray, secondArray)).toBeFalsy();
    expect(ObjectUtils.arrayEquals(firstArray, thirdArray)).toBeFalsy();
    expect(ObjectUtils.arrayEquals(fourthArray, fourthArray)).toBeTruthy();
    expect(ObjectUtils.arrayEquals(fourthArray, fifthArray)).toBeFalsy();
    expect(ObjectUtils.arrayEquals(sixthArray, seventhArray)).toBeTruthy();
  });

  it('Removes items from arrays', () => {
    const bigArray = ['Hello', 'Goodbye', 'What\'s Up?'];
    const smallerArray = ['Hello', 'What\'s Up?'];
    expect(ObjectUtils.arrayEquals(ObjectUtils.removeItem(bigArray, 'Goodbye'), smallerArray)).toBeTruthy();
  });

  it('Does a deep equality comparison of objects', () => {
    const object1 = 'hello';
    const object2 = 4;
    const object3 = [1, 4, 23, 63];
    const object4 = [1, 4, 23, 63];
    const object5 = [1, 4, 23];
    const object6 = [2, 5, 28, object1, object2];
    const object7 = {
      hello: 6,
      what: 19,
      big: 'string',
      arr: object6,
    };
    expect(ObjectUtils.deepEquals(object1, object1)).toBeTruthy();
    expect(ObjectUtils.deepEquals(object1, object2)).toBeFalsy();
    expect(ObjectUtils.deepEquals(object2, object2)).toBeTruthy();
    expect(ObjectUtils.deepEquals(null, null)).toBeTruthy();
    expect(ObjectUtils.deepEquals(object1, null)).toBeFalsy();
    expect(ObjectUtils.deepEquals(null, object1)).toBeFalsy();
    expect(ObjectUtils.deepEquals(object3, object3)).toBeTruthy();
    expect(ObjectUtils.deepEquals(object3, object4)).toBeTruthy();
    expect(ObjectUtils.deepEquals(object3, object5)).toBeFalsy();
    expect(ObjectUtils.deepEquals(object6, object6)).toBeTruthy();
    expect(ObjectUtils.deepEquals(object6, object7)).toBeFalsy();
    expect(ObjectUtils.deepEquals(object7, object7)).toBeTruthy();
  });

  it('Does an equality comparison of Map objects', () => {
    const map1: Map<string, any> = new Map();
    map1.set('greeting', 'goodbye');
    map1.set('nums', [4, 6, 2, 7]);
    map1.set('style', {
      color: 'red',
      height: 100,
    });
    const map2: Map<string, any> = new Map();
    map2.set('greeting', 'goodbye');
    map2.set('nums', [4, 6, 2, 7]);
    map2.set('style', {
      color: 'red',
      height: 101,
    });
    const map3: Map<string, any> = new Map();
    map3.set('firstName', 'Fred');
    map3.set('phoneNumber', '1-800-BYE-YALL');

    expect(ObjectUtils.mapEquals(map1, map1)).toBeTruthy();
    expect(ObjectUtils.mapEquals(map1, map2)).toBeFalsy();
    expect(ObjectUtils.mapEquals(map1, map3)).toBeFalsy();
    expect(ObjectUtils.mapEquals(map2, map3)).toBeFalsy();
  });

  it('Creates a JS object from a map', () => {
    const map: Map<string, any> = new Map();
    map.set('greeting', 'goodbye');
    map.set('nums', [4, 6, 2, 7]);
    map.set('style', {
      color: 'red',
      height: 100,
    });

    const obj1 = {
      greeting: 'goodbye',
      nums: [4, 6, 2, 7],
      style: { color: 'red', height: 100 },
    };
    const mapObj = ObjectUtils.strMapToObj(map);
    expect(ObjectUtils.deepEquals(mapObj, obj1)).toBeTruthy();
  });

  it('Creates a map from a JS object', () => {
    const obj1 = {
      greeting: 'goodbye',
      nums: [4, 6, 2, 7],
      style: { color: 'red', height: 100 },
    };

    const map: Map<string, any> = new Map();
    map.set('greeting', 'goodbye');
    map.set('nums', [4, 6, 2, 7]);
    map.set('style', {
      color: 'red',
      height: 100,
    });

    const objMap = ObjectUtils.toMap(obj1);
    expect(ObjectUtils.deepEquals(objMap, map)).toBeTruthy();
  });

  it('Removes items from arrays', () => {
    const bigArray = ['Hello', 'Goodbye', 'What\'s Up?'];
    const smallerArray = ['Hello', 'What\'s Up?'];
    expect(ObjectUtils.arrayEquals(ObjectUtils.removeItem(bigArray, 'Goodbye'), smallerArray)).toBeTruthy();
  });
});
