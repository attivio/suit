// eslint-disable-next-line import/no-extraneous-dependencies
import expect from 'expect';
import Comment from '../../src/api/Comment';
import SearchDocument from '../../src/api/SearchDocument';

// We don't need to lint the JSON data...
/* eslint-disable quote-props,comma-dangle,quotes,max-len */
const testDoc = date => ({
  "fields": {
    ".id": [
      "docID1"
    ],
    ".zone": [
      ".metadata"
    ],
    ".score": [
      "0.050350595"
    ],
    "comment_s": [
      "Interesting!"
    ],
    "username_s": [
      "Jack Donaghy"
    ],
    "language": [
      "English"
    ],
    "table": [
      ".comments"
    ],
    "date": [
      date,
    ],
  },
});

describe('Test Comment', () => {
  const date = new Date();
  const testDoc1 = testDoc(date);
  const formattedDate = Comment.createTimestamp(date);
  it('Can be constructed properly from a SearchDocument', () => {
    expect(Comment.fromDoc(SearchDocument.fromJson(testDoc1))).toEqual(
      new Comment('docID1', 'Interesting!', formattedDate, 'Jack Donaghy')
    );
  });
  it('Populates fields correctly when instantiated', () => {
    expect(Comment.fromDoc(SearchDocument.fromJson(testDoc1)).text).toEqual(
      'Interesting!'
    );
    expect(Comment.fromDoc(SearchDocument.fromJson(testDoc1)).id).toEqual(
      'docID1'
    );
    expect(Comment.fromDoc(SearchDocument.fromJson(testDoc1)).timestamp).toEqual(
      formattedDate
    );
    expect(Comment.fromDoc(SearchDocument.fromJson(testDoc1)).username).toEqual(
      'Jack Donaghy'
    );
  });
});
