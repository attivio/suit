import expect from 'expect';
import Comment from '../../src/api/Comment';
import SearchDocument from '../../src/api/SearchDocument';

// We don't need to lint the JSON data...
/* eslint-disable quote-props,comma-dangle,quotes,max-len */
const testDoc1 = {
  "fields": {
    ".score": [
      0.99652886
    ],
    ".id": [
      "docID1"
    ],
    ".zone": [
      "default"
    ],
    "comment_s": [
      "Interesting!"
    ],
    "username_s": [
      "Jack Donaghy"
    ],
    "title": [
      "Trade zone North America"
    ],
    "teaser": [
      "In August, Canada, the US and Mexico will sit down to begin to renegotiate Nafta."
    ],
    "language": [
      "English"
    ],
    "languages": [
      "English"
    ],
    "uri": [
      "http://www.bbc.co.uk/news/world-us-canada-40745235"
    ],
    "size": [
      480
    ],
    "table": [
      "news"
    ],
    "date": [
      "2017-08-14T16:03:48.000-0400"
    ],
    "tags": [
      "Foo"
    ],
    "text": [
      "In August, Canada, the US and Mexico will sit down to begin to renegotiate Nafta."
    ],
    "sourcepath": [
      "/home/lvaldez/dev/attivio/aie_5.5.1/conf/factbook/content/news.csv"
    ],
    "filename": [
      "news.csv"
    ],
    "parentid": [
      "news-NEWS-http://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml"
    ],
    "ancestorids": [
      "news-NEWS-http://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml"
    ],
    "source_s": [
      "BBC"
    ],
    "processing.feedback.level": [
      "WARN"
    ],
    "processing.feedback.message": [
      "Received 2 values for single value field table: news, news"
    ],
    "processing.feedback.component": [
      "index.writer"
    ],
    "processing.feedback.code": [
      "INDEX_ENGINE-36"
    ],
    "country": [
      "Canada"
    ],
    "sentiment": [
      "neg"
    ],
    "sentiment.score": [
      0.89892125
    ],
    "security.read": [
      "anonymous:anonymous"
    ]
  },
  "signal": {
    "principal": "Anonymous:Administrator:Administrator",
    "docId": "http://www.bbc.co.uk/news/world-us-canada-40745235",
    "docOrdinal": 1,
    "featureVector": "table_news=1.0,freshness=0.28346974,title=0.0584691,content=0.38349086",
    "query": "America",
    "locale": "en",
    "relevancyModelName": "default",
    "relevancyModelVersion": 0,
    "relevancyModelNames": [
      "default"
    ],
    "queryTimestamp": 1505504165774,
    "signalTimestamp": 1505504165832,
    "type": "click",
    "weight": 1.0,
    "ttl": true
  }
};

describe('Test Comment', () => {
  it('Can be constructed properly from a SearchDocument', () => {
    expect(Comment.fromDoc(SearchDocument.fromJson(testDoc1))).toEqual(
      new Comment('docID1', 'Interesting!', 'Posted on Mon Aug 14 2017 at 4:03:48 PM EDT', 'Jack Donaghy')
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
      'Posted on Mon Aug 14 2017 at 4:03:48 PM EDT'
    );
    expect(Comment.fromDoc(SearchDocument.fromJson(testDoc1)).username).toEqual(
      'Jack Donaghy'
    );
  });
});
