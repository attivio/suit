// @flow

/* eslint-disable max-len */
import SearchFacet from '../../src/api/SearchFacet';
import SearchFacetBucket from '../../src/api/SearchFacetBucket';

const relevancyScoreFacetBuckets = [
  new SearchFacetBucket('Bucket1', '.95-1.0', 278, 'filter string'),
  new SearchFacetBucket('Bucket2', '.90-.95', 81, 'filter string'),
  new SearchFacetBucket('Bucket3', '.85-.95', 58, 'filter string'),
  new SearchFacetBucket('Bucket4', '.80-.85', 85, 'filter string'),
  new SearchFacetBucket('Bucket5', '.75-.80', 93, 'filter string'),
  new SearchFacetBucket('Bucket6', '.70-.75', 102, 'filter string'),
  new SearchFacetBucket('Bucket7', '.65-.70', 176, 'filter string'),
  new SearchFacetBucket('Bucket8', '.60-.65', 158, 'filter string'),
  new SearchFacetBucket('Bucket9', '.55-.60', 195, 'filter string'),
  new SearchFacetBucket('Bucket10', '.50-.55', 242, 'filter string'),
];
const relevancyScoreFacetCount = relevancyScoreFacetBuckets.reduce((acc, bucket) => {
  return acc + bucket.count;
}, 0);
const relevancyScoreFacet = new SearchFacet('relevancy', '.score', 'Relevancy', relevancyScoreFacetCount, relevancyScoreFacetBuckets);

const sentimentFacetBuckets = [
  new SearchFacetBucket('pos', 'pos', 239, 'filter string'),
  new SearchFacetBucket('neg', 'neg', 21, 'filter string'),
];
const sentimentFacetCount = sentimentFacetBuckets.reduce((acc, bucket) => {
  return acc + bucket.count;
}, 0);
const sentimentFacet = new SearchFacet('sentiment', 'sentiment', 'Sentiment', sentimentFacetCount, sentimentFacetBuckets);

const locationFacetBuckets = [
  new SearchFacetBucket('Caribbean, Island Between the Caribbean Sea and North Atlantic Ocean, North Of Trinidad and Tobago', 'Caribbean, Island Between the Caribbean Sea and North Atlantic Ocean, North Of Trinidad and Tobago', 5, 'filter string'),
  new SearchFacetBucket('Central Africa, East Of Democratic Republic Of the Congo', 'Central Africa, East Of Democratic Republic Of the Congo', 3, 'filter string'),
  new SearchFacetBucket('Central Asia, West of China', 'Central Asia, West of China', 2, 'filter string'),
  new SearchFacetBucket('Eastern Asia, Bordering the South China Sea and China', 'Eastern Asia, Bordering the South China Sea and China', 2, 'filter string'),
  new SearchFacetBucket('Archipelago in the Indian Ocean, Northeast of Madagasca', 'Archipelago in the Indian Ocean, Northeast of Madagasca', 1, 'filter string'),
];
const locationFacetCount = locationFacetBuckets.reduce((acc, bucket) => {
  return acc + bucket.count;
}, 0);
const locationFacet = new SearchFacet('location', 'location', 'Location', locationFacetCount, locationFacetBuckets);

const positionFacetBuckets = [
  new SearchFacetBucket({ longitude: -86.5, latitude: 15.0 }, 'Honduras', 32, 'filter string'),
  new SearchFacetBucket({ longitude: -80.5, latitude: 19.5 }, 'Cayman Islands', 7, 'filter string'),
  new SearchFacetBucket({ longitude: -88.91666666666667, latitude: 13.833333333333334 }, 'El Salvador', 32, 'filter string'),
  new SearchFacetBucket({ longitude: -65.0, latitude: -17.0 }, 'Bolivia', 32, 'filter string'),
  new SearchFacetBucket({ longitude: -55.0, latitude: -10.0 }, 'Brazil', 32, 'filter string'),
  new SearchFacetBucket({ longitude: -63.416666666666664, latitude: 18.5 }, 'Saint Barthelemy', 32, 'filter string'),
];
const positionFacetCount = positionFacetBuckets.reduce((acc, bucket) => {
  return acc + bucket.count;
}, 0);
const positionFacet = new SearchFacet('position', 'position', 'Position', positionFacetCount, positionFacetBuckets);

const regionFacetBuckets = [
  new SearchFacetBucket('China', 'China', 310, 'filter string'),
  new SearchFacetBucket('United States', 'United States', 241, 'filter string'),
  new SearchFacetBucket('Brazio', 'Brazil', 191, 'filter string'),
  new SearchFacetBucket('Russia', 'Russia', 174, 'filter string'),
  new SearchFacetBucket('United Kingdom', 'United Kingdom', 135, 'filter string'),
  new SearchFacetBucket('Germany', 'Germany', 94, 'filter string'),
  new SearchFacetBucket('India', 'India', 83, 'filter string'),
  new SearchFacetBucket('Mexico', 'Mexico', 75, 'filter string'),
  new SearchFacetBucket('Nigeria', 'Nigeria', 60, 'filter string'),
  new SearchFacetBucket('Spain', 'Spain', 60, 'filter string'),
];
const regionFacetCount = regionFacetBuckets.reduce((acc, bucket) => {
  return acc + bucket.count;
}, 0);
const regionFacet = new SearchFacet('region', 'region', 'Region', regionFacetCount, regionFacetBuckets);

const dateFacetBuckets = [
  new SearchFacetBucket('', 'August 14, 2017', 55, 'date:FACET(RANGE(\'2017-08-14T00:00:00\', \'2017-08-15T00:00:00\', upper=exclusive))', '2017-08-13T20:00:00.000-0400', '2017-08-14T20:00:00.000-0400'),
  new SearchFacetBucket('', 'August 15, 2017', 34, 'date:FACET(RANGE(\'2017-08-15T00:00:00\', \'2017-08-16T00:00:00\', upper=exclusive))', '2017-08-14T20:00:00.000-0400', '2017-08-15T20:00:00.000-0400'),
  new SearchFacetBucket('', 'August 16, 2017', 18, 'date:FACET(RANGE(\'2017-08-16T00:00:00\', \'2017-08-17T00:00:00\', upper=exclusive))', '2017-08-15T20:00:00.000-0400', '2017-08-16T20:00:00.000-0400'),
  new SearchFacetBucket('', 'August 17, 2017', 1, 'date:FACET(RANGE(\'2017-08-17T00:00:00\', \'2017-08-18T00:00:00\', upper=exclusive))', '2017-08-16T20:00:00.000-0400', '2017-08-17T20:00:00.000-0400'),
  new SearchFacetBucket('', 'August 18, 2017', 0, 'date:FACET(RANGE(\'2017-08-18T00:00:00\', \'2017-08-19T00:00:00\', upper=exclusive))', '2017-08-17T20:00:00.000-0400', '2017-08-18T20:00:00.000-0400'),
  new SearchFacetBucket('', 'August 19, 2017', 5, 'date:FACET(RANGE(\'2017-08-19T00:00:00\', \'2017-08-20T00:00:00\', upper=exclusive))', '2017-08-18T20:00:00.000-0400', '2017-08-19T20:00:00.000-0400'),
  new SearchFacetBucket('', 'August 20, 2017', 23, 'date:FACET(RANGE(\'2017-08-20T00:00:00\', \'2017-08-21T00:00:00\', upper=exclusive))', '2017-08-19T20:00:00.000-0400', '2017-08-20T20:00:00.000-0400'),
  new SearchFacetBucket('', 'August 21, 2017', 17, 'date:FACET(RANGE(\'2017-08-21T00:00:00\', \'2017-08-22T00:00:00\', upper=exclusive))', '2017-08-20T20:00:00.000-0400', '2017-08-21T20:00:00.000-0400'),
  new SearchFacetBucket('', 'August 22, 2017', 29, 'date:FACET(RANGE(\'2017-08-22T00:00:00\', \'2017-08-23T00:00:00\', upper=exclusive))', '2017-08-21T20:00:00.000-0400', '2017-08-22T20:00:00.000-0400'),
  new SearchFacetBucket('', 'August 23, 2017', 12, 'date:FACET(RANGE(\'2017-08-23T00:00:00\', \'2017-08-24T00:00:00\', upper=exclusive))', '2017-08-22T20:00:00.000-0400', '2017-08-23T20:00:00.000-0400'),
  new SearchFacetBucket('', 'August 24, 2017', 53, 'date:FACET(RANGE(\'2017-08-24T00:00:00\', \'2017-08-25T00:00:00\', upper=exclusive))', '2017-08-23T20:00:00.000-0400', '2017-08-24T20:00:00.000-0400'),
  new SearchFacetBucket('', 'August 25, 2017', 42, 'date:FACET(RANGE(\'2017-08-25T00:00:00\', \'2017-08-26T00:00:00\', upper=exclusive))', '2017-08-24T20:00:00.000-0400', '2017-08-25T20:00:00.000-0400'),
  new SearchFacetBucket('', 'August 26, 2017', 15, 'date:FACET(RANGE(\'2017-08-26T00:00:00\', \'2017-08-27T00:00:00\', upper=exclusive))', '2017-08-25T20:00:00.000-0400', '2017-08-26T20:00:00.000-0400'),
  new SearchFacetBucket('', 'August 27, 2017', 11, 'date:FACET(RANGE(\'2017-08-27T00:00:00\', \'2017-08-28T00:00:00\', upper=exclusive))', '2017-08-26T20:00:00.000-0400', '2017-08-27T20:00:00.000-0400'),
  new SearchFacetBucket('', 'August 28, 2017', 5, 'date:FACET(RANGE(\'2017-08-28T00:00:00\', \'2017-08-29T00:00:00\', upper=exclusive))', '2017-08-27T20:00:00.000-0400', '2017-08-28T20:00:00.000-0400'),
  new SearchFacetBucket('', 'August 29, 2017', 0, 'date:FACET(RANGE(\'2017-08-29T00:00:00\', \'2017-08-30T00:00:00\', upper=exclusive))', '2017-08-28T20:00:00.000-0400', '2017-08-29T20:00:00.000-0400'),
  new SearchFacetBucket('', 'August 30, 2017', 0, 'date:FACET(RANGE(\'2017-08-30T00:00:00\', \'2017-08-31T00:00:00\', upper=exclusive))', '2017-08-29T20:00:00.000-0400', '2017-08-30T20:00:00.000-0400'),
  new SearchFacetBucket('', 'August 31, 2017', 6, 'date:FACET(RANGE(\'2017-08-31T00:00:00\', \'2017-09-01T00:00:00\', upper=exclusive))', '2017-08-30T20:00:00.000-0400', '2017-08-31T20:00:00.000-0400'),
  new SearchFacetBucket('', 'September 1, 2017', 53, 'date:FACET(RANGE(\'2017-09-01T00:00:00\', \'2017-09-02T00:00:00\', upper=exclusive))', '2017-08-31T20:00:00.000-0400', '2017-09-01T20:00:00.000-0400'),
  new SearchFacetBucket('', 'September 2, 2017', 13, 'date:FACET(RANGE(\'2017-09-02T00:00:00\', \'2017-09-03T00:00:00\', upper=exclusive))', '2017-09-01T20:00:00.000-0400', '2017-09-02T20:00:00.000-0400'),
  new SearchFacetBucket('', 'September 3, 2017', 12, 'date:FACET(RANGE(\'2017-09-03T00:00:00\', \'2017-09-04T00:00:00\', upper=exclusive))', '2017-09-02T20:00:00.000-0400', '2017-09-03T20:00:00.000-0400'),
  new SearchFacetBucket('', 'September 4, 2017', 17, 'date:FACET(RANGE(\'2017-09-04T00:00:00\', \'2017-09-05T00:00:00\', upper=exclusive))', '2017-09-03T20:00:00.000-0400', '2017-09-04T20:00:00.000-0400'),
  new SearchFacetBucket('', 'September 5, 2017', 32, 'date:FACET(RANGE(\'2017-09-05T00:00:00\', \'2017-09-06T00:00:00\', upper=exclusive))', '2017-09-04T20:00:00.000-0400', '2017-09-05T20:00:00.000-0400'),
  new SearchFacetBucket('', 'September 6, 2017', 43, 'date:FACET(RANGE(\'2017-09-06T00:00:00\', \'2017-09-07T00:00:00\', upper=exclusive))', '2017-09-05T20:00:00.000-0400', '2017-09-06T20:00:00.000-0400'),
  new SearchFacetBucket('', 'September 7, 2017', 12, 'date:FACET(RANGE(\'2017-09-07T00:00:00\', \'2017-09-08T00:00:00\', upper=exclusive))', '2017-09-06T20:00:00.000-0400', '2017-09-07T20:00:00.000-0400'),
  new SearchFacetBucket('', 'September 8, 2017', 1, 'date:FACET(RANGE(\'2017-09-08T00:00:00\', \'2017-09-09T00:00:00\', upper=exclusive))', '2017-09-07T20:00:00.000-0400', '2017-09-08T20:00:00.000-0400'),
  new SearchFacetBucket('', 'September 9, 2017', 3, 'date:FACET(RANGE(\'2017-09-09T00:00:00\', \'2017-09-10T00:00:00\', upper=exclusive))', '2017-09-08T20:00:00.000-0400', '2017-09-09T20:00:00.000-0400'),
  new SearchFacetBucket('', 'September 10, 2017', 7, 'date:FACET(RANGE(\'2017-09-10T00:00:00\', \'2017-09-11T00:00:00\', upper=exclusive))', '2017-09-09T20:00:00.000-0400', '2017-09-10T20:00:00.000-0400'),
  new SearchFacetBucket('', 'September 11, 2017', 15, 'date:FACET(RANGE(\'2017-09-11T00:00:00\', \'2017-09-12T00:00:00\', upper=exclusive))', '2017-09-10T20:00:00.000-0400', '2017-09-11T20:00:00.000-0400'),
  new SearchFacetBucket('', 'September 12, 2017', 29, 'date:FACET(RANGE(\'2017-09-12T00:00:00\', \'2017-09-13T00:00:00\', upper=exclusive))', '2017-09-11T20:00:00.000-0400', '2017-09-12T20:00:00.000-0400'),
  new SearchFacetBucket('', 'September 13, 2017', 24, 'date:FACET(RANGE(\'2017-09-13T00:00:00\', \'2017-09-14T00:00:00\', upper=exclusive))', '2017-09-12T20:00:00.000-0400', '2017-09-13T20:00:00.000-0400'),
  new SearchFacetBucket('', 'September 14, 2017', 5, 'date:FACET(RANGE(\'2017-09-14T00:00:00\', \'2017-09-15T00:00:00\', upper=exclusive))', '2017-09-13T20:00:00.000-0400', '2017-09-14T20:00:00.000-0400'),
  new SearchFacetBucket('', 'September 15, 2017', 5, 'date:FACET(RANGE(\'2017-09-15T00:00:00\', \'2017-09-16T00:00:00\', upper=exclusive))', '2017-09-14T20:00:00.000-0400', '2017-09-15T20:00:00.000-0400'),
];

const dateFacetCount = dateFacetBuckets.reduce((acc, bucket) => {
  return acc + bucket.count;
}, 0);
const dateFacet = new SearchFacet('date', 'date', 'Date', dateFacetCount, dateFacetBuckets);


const positiveSentimentFacetBuckets = [
  new SearchFacetBucket('', 'Puppies', 5, 'filter string'),
  new SearchFacetBucket('', 'Kittens', 3, 'filter string'),
  new SearchFacetBucket('', 'Sunshine', 18, 'filter string'),
  new SearchFacetBucket('', 'Music', 9, 'filter string'),
  new SearchFacetBucket('', 'Love', 15, 'filter string'),
  new SearchFacetBucket('', 'Happiness', 8, 'filter string'),
  new SearchFacetBucket('', 'Software', 2, 'filter string'),
  new SearchFacetBucket('', 'Attivio', 18, 'filter string'),
];
const positiveSentimentFacetCount = positiveSentimentFacetBuckets.reduce((acc, bucket) => {
  return acc + bucket.count;
}, 0);
const positiveSentimentFacet = new SearchFacet('positive', 'positive', 'Positive', positiveSentimentFacetCount, positiveSentimentFacetBuckets);

const negativeSentimentFacetBuckets = [
  new SearchFacetBucket('', 'Giant Squid', 5, 'filter string'),
  new SearchFacetBucket('', 'Evil', 3, 'filter string'),
  new SearchFacetBucket('', 'Thunderstorms', 18, 'filter string'),
  new SearchFacetBucket('', 'Blizzards', 9, 'filter string'),
  new SearchFacetBucket('', 'Depression', 15, 'filter string'),
  new SearchFacetBucket('', 'Liver & Onions', 8, 'filter string'),
  new SearchFacetBucket('', 'Pumpkin-Spice Lattes', 2, 'filter string'),
  new SearchFacetBucket('', 'Worms', 18, 'filter string'),
];
const negativeSentimentFacetCount = negativeSentimentFacetBuckets.reduce((acc, bucket) => {
  return acc + bucket.count;
}, 0);
const negativeSentimentFacet = new SearchFacet('negative', 'negative', 'Negative', negativeSentimentFacetCount, negativeSentimentFacetBuckets);

const hierarchicalFacetBuckets = [
  new SearchFacetBucket('', 'North America', 60, 'filter string', null, null, [
    new SearchFacetBucket('', 'United States', 30, 'filter string', null, null, [
      new SearchFacetBucket('', 'Georgia', 5, 'filter string'),
      new SearchFacetBucket('', 'Massachusetts', 5, 'filter string'),
      new SearchFacetBucket('', 'Virginia', 5, 'filter string'),
      new SearchFacetBucket('', 'Washington', 5, 'filter string'),
      new SearchFacetBucket('', 'Iowa', 5, 'filter string'),
      new SearchFacetBucket('', 'Kansas', 5, 'filter string'),
    ]),
    new SearchFacetBucket('', 'Canada', 20, 'filter string', null, null, [
      new SearchFacetBucket('', 'Alberta', 5, 'filter string'),
      new SearchFacetBucket('', 'Prince Edward Island', 5, 'filter string'),
      new SearchFacetBucket('', 'North America', 5, 'filter string'),
      new SearchFacetBucket('', 'North America', 5, 'filter string'),

    ]),
    new SearchFacetBucket('', 'Mexico', 10, 'filter string', null, null, [
      new SearchFacetBucket('', 'Chihuahua', 5, 'filter string', null, null, []),
      new SearchFacetBucket('', 'Baja California', 5, 'filter string', null, null, []),
    ]),
  ]),
  new SearchFacetBucket('', 'Europe', 20, 'filter string', null, null, [
    new SearchFacetBucket('', 'France', 20, 'filter string', null, null, [
      new SearchFacetBucket('', 'Paris', 5, 'filter string'),
      new SearchFacetBucket('', 'Marseilles', 5, 'filter string'),
      new SearchFacetBucket('', 'Lyon', 5, 'filter string'),
      new SearchFacetBucket('', 'Toulouse', 5, 'filter string'),
    ]),

  ]),
  new SearchFacetBucket('', 'Antarctica', 5, 'filter string'),
];

const hierarchicalFacet = new SearchFacet('location', 'location', 'Location', 85, hierarchicalFacetBuckets);

const sampleFacets = {
  relevancyScoreFacet,
  sentimentFacet,
  locationFacet,
  regionFacet,
  dateFacet,
  positiveSentimentFacet,
  negativeSentimentFacet,
  positionFacet,
  hierarchicalFacet,
};

export default sampleFacets;

/* eslint-enable max-len */
