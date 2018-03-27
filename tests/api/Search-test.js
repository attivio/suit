import expect from 'expect';
import Search from 'src/api/Search';

describe('Test Search', () => {
  it('Converts valid map to object', () => {
    const map: Map<string, any> = new Map();
    map.set('key1', 'value1');

    // console.log('Hey');
    expect(Search.strMapToObj(map).key1).toEqual('value1');
  });
  it('Pulls error message from valid object', () => {
    const obj = {
      message: 'Bad things happened',
    };
    expect(Search.getErrorMessage(obj)).toEqual('Bad things happened');
  });
  it('Pulls generic error message from bad object', () => {
    const obj = {
      key: 'value',
      otherKey: 'value',
    };
    expect(Search.getErrorMessage(obj)).toEqual('There was an error executing the query.');
  });
});
