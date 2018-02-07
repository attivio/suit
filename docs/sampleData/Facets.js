// @flow

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
const relevancyScoreFacet = new SearchFacet('relevancy', '.score', 'Relevancy', relevancyScoreFacetBuckets);

const sentimentFacetBuckets = [
  new SearchFacetBucket('pos', 'pos', 239, 'filter string'),
  new SearchFacetBucket('neg', 'neg', 21, 'filter string'),
];
const sentimentFacet = new SearchFacet('sentiment', 'sentiment', 'Sentiment', sentimentFacetBuckets);

const locationFacetBuckets = [
  new SearchFacetBucket('Caribbean, Island Between the Caribbean Sea and North Atlantic Ocean, North Of Trinidad and Tobago', 'Caribbean, Island Between the Caribbean Sea and North Atlantic Ocean, North Of Trinidad and Tobago', 5, 'filter string'), // eslint-disable-line max-len
  new SearchFacetBucket('Central Africa, East Of Democratic Republic Of the Congo', 'Central Africa, East Of Democratic Republic Of the Congo', 3, 'filter string'), // eslint-disable-line max-len
  new SearchFacetBucket('Central Asia, West of China', 'Central Asia, West of China', 2, 'filter string'),
  new SearchFacetBucket('Eastern Asia, Bordering the South China Sea and China', 'Eastern Asia, Bordering the South China Sea and China', 2, 'filter string'), // eslint-disable-line max-len
  new SearchFacetBucket('Archipelago in the Indian Ocean, Northeast of Madagasca', 'Archipelago in the Indian Ocean, Northeast of Madagasca', 1, 'filter string'), // eslint-disable-line max-len
];
const locationFacet = new SearchFacet('location', 'location', 'Location', locationFacetBuckets);

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
const regionFacet = new SearchFacet('region', 'region', 'Region', regionFacetBuckets);

/* eslint-disable max-len */
const dateFacetBuckets = [
  new SearchFacetBucket('', 'August 14, 2017', 55, 'date:FACET(RANGE(\'2017-08-14T00:00:00\', \'2017-08-15T00:00:00\', upper=exclusive))', '2017-08-13T20:00:00.000-0400', '2017-08-14T20:00:00.000-0400'),
  new SearchFacetBucket('', 'August 15, 2017', 0, 'date:FACET(RANGE(\'2017-08-15T00:00:00\', \'2017-08-16T00:00:00\', upper=exclusive))', '2017-08-14T20:00:00.000-0400', '2017-08-15T20:00:00.000-0400'),
  new SearchFacetBucket('', 'August 16, 2017', 0, 'date:FACET(RANGE(\'2017-08-16T00:00:00\', \'2017-08-17T00:00:00\', upper=exclusive))', '2017-08-15T20:00:00.000-0400', '2017-08-16T20:00:00.000-0400'),
  new SearchFacetBucket('', 'August 17, 2017', 0, 'date:FACET(RANGE(\'2017-08-17T00:00:00\', \'2017-08-18T00:00:00\', upper=exclusive))', '2017-08-16T20:00:00.000-0400', '2017-08-17T20:00:00.000-0400'),
  new SearchFacetBucket('', 'August 18, 2017', 0, 'date:FACET(RANGE(\'2017-08-18T00:00:00\', \'2017-08-19T00:00:00\', upper=exclusive))', '2017-08-17T20:00:00.000-0400', '2017-08-18T20:00:00.000-0400'),
  new SearchFacetBucket('', 'August 19, 2017', 0, 'date:FACET(RANGE(\'2017-08-19T00:00:00\', \'2017-08-20T00:00:00\', upper=exclusive))', '2017-08-18T20:00:00.000-0400', '2017-08-19T20:00:00.000-0400'),
  new SearchFacetBucket('', 'August 20, 2017', 0, 'date:FACET(RANGE(\'2017-08-20T00:00:00\', \'2017-08-21T00:00:00\', upper=exclusive))', '2017-08-19T20:00:00.000-0400', '2017-08-20T20:00:00.000-0400'),
  new SearchFacetBucket('', 'August 21, 2017', 0, 'date:FACET(RANGE(\'2017-08-21T00:00:00\', \'2017-08-22T00:00:00\', upper=exclusive))', '2017-08-20T20:00:00.000-0400', '2017-08-21T20:00:00.000-0400'),
  new SearchFacetBucket('', 'August 22, 2017', 0, 'date:FACET(RANGE(\'2017-08-22T00:00:00\', \'2017-08-23T00:00:00\', upper=exclusive))', '2017-08-21T20:00:00.000-0400', '2017-08-22T20:00:00.000-0400'),
  new SearchFacetBucket('', 'August 23, 2017', 0, 'date:FACET(RANGE(\'2017-08-23T00:00:00\', \'2017-08-24T00:00:00\', upper=exclusive))', '2017-08-22T20:00:00.000-0400', '2017-08-23T20:00:00.000-0400'),
  new SearchFacetBucket('', 'August 24, 2017', 0, 'date:FACET(RANGE(\'2017-08-24T00:00:00\', \'2017-08-25T00:00:00\', upper=exclusive))', '2017-08-23T20:00:00.000-0400', '2017-08-24T20:00:00.000-0400'),
  new SearchFacetBucket('', 'August 25, 2017', 0, 'date:FACET(RANGE(\'2017-08-25T00:00:00\', \'2017-08-26T00:00:00\', upper=exclusive))', '2017-08-24T20:00:00.000-0400', '2017-08-25T20:00:00.000-0400'),
  new SearchFacetBucket('', 'August 26, 2017', 0, 'date:FACET(RANGE(\'2017-08-26T00:00:00\', \'2017-08-27T00:00:00\', upper=exclusive))', '2017-08-25T20:00:00.000-0400', '2017-08-26T20:00:00.000-0400'),
  new SearchFacetBucket('', 'August 27, 2017', 0, 'date:FACET(RANGE(\'2017-08-27T00:00:00\', \'2017-08-28T00:00:00\', upper=exclusive))', '2017-08-26T20:00:00.000-0400', '2017-08-27T20:00:00.000-0400'),
  new SearchFacetBucket('', 'August 28, 2017', 0, 'date:FACET(RANGE(\'2017-08-28T00:00:00\', \'2017-08-29T00:00:00\', upper=exclusive))', '2017-08-27T20:00:00.000-0400', '2017-08-28T20:00:00.000-0400'),
  new SearchFacetBucket('', 'August 29, 2017', 0, 'date:FACET(RANGE(\'2017-08-29T00:00:00\', \'2017-08-30T00:00:00\', upper=exclusive))', '2017-08-28T20:00:00.000-0400', '2017-08-29T20:00:00.000-0400'),
  new SearchFacetBucket('', 'August 30, 2017', 0, 'date:FACET(RANGE(\'2017-08-30T00:00:00\', \'2017-08-31T00:00:00\', upper=exclusive))', '2017-08-29T20:00:00.000-0400', '2017-08-30T20:00:00.000-0400'),
  new SearchFacetBucket('', 'August 31, 2017', 0, 'date:FACET(RANGE(\'2017-08-31T00:00:00\', \'2017-09-01T00:00:00\', upper=exclusive))', '2017-08-30T20:00:00.000-0400', '2017-08-31T20:00:00.000-0400'),
  new SearchFacetBucket('', 'September 1, 2017', 0, 'date:FACET(RANGE(\'2017-09-01T00:00:00\', \'2017-09-02T00:00:00\', upper=exclusive))', '2017-08-31T20:00:00.000-0400', '2017-09-01T20:00:00.000-0400'),
  new SearchFacetBucket('', 'September 2, 2017', 0, 'date:FACET(RANGE(\'2017-09-02T00:00:00\', \'2017-09-03T00:00:00\', upper=exclusive))', '2017-09-01T20:00:00.000-0400', '2017-09-02T20:00:00.000-0400'),
  new SearchFacetBucket('', 'September 3, 2017', 0, 'date:FACET(RANGE(\'2017-09-03T00:00:00\', \'2017-09-04T00:00:00\', upper=exclusive))', '2017-09-02T20:00:00.000-0400', '2017-09-03T20:00:00.000-0400'),
  new SearchFacetBucket('', 'September 4, 2017', 0, 'date:FACET(RANGE(\'2017-09-04T00:00:00\', \'2017-09-05T00:00:00\', upper=exclusive))', '2017-09-03T20:00:00.000-0400', '2017-09-04T20:00:00.000-0400'),
  new SearchFacetBucket('', 'September 5, 2017', 0, 'date:FACET(RANGE(\'2017-09-05T00:00:00\', \'2017-09-06T00:00:00\', upper=exclusive))', '2017-09-04T20:00:00.000-0400', '2017-09-05T20:00:00.000-0400'),
  new SearchFacetBucket('', 'September 6, 2017', 0, 'date:FACET(RANGE(\'2017-09-06T00:00:00\', \'2017-09-07T00:00:00\', upper=exclusive))', '2017-09-05T20:00:00.000-0400', '2017-09-06T20:00:00.000-0400'),
  new SearchFacetBucket('', 'September 7, 2017', 0, 'date:FACET(RANGE(\'2017-09-07T00:00:00\', \'2017-09-08T00:00:00\', upper=exclusive))', '2017-09-06T20:00:00.000-0400', '2017-09-07T20:00:00.000-0400'),
  new SearchFacetBucket('', 'September 8, 2017', 0, 'date:FACET(RANGE(\'2017-09-08T00:00:00\', \'2017-09-09T00:00:00\', upper=exclusive))', '2017-09-07T20:00:00.000-0400', '2017-09-08T20:00:00.000-0400'),
  new SearchFacetBucket('', 'September 9, 2017', 0, 'date:FACET(RANGE(\'2017-09-09T00:00:00\', \'2017-09-10T00:00:00\', upper=exclusive))', '2017-09-08T20:00:00.000-0400', '2017-09-09T20:00:00.000-0400'),
  new SearchFacetBucket('', 'September 10, 2017', 0, 'date:FACET(RANGE(\'2017-09-10T00:00:00\', \'2017-09-11T00:00:00\', upper=exclusive))', '2017-09-09T20:00:00.000-0400', '2017-09-10T20:00:00.000-0400'),
  new SearchFacetBucket('', 'September 11, 2017', 0, 'date:FACET(RANGE(\'2017-09-11T00:00:00\', \'2017-09-12T00:00:00\', upper=exclusive))', '2017-09-10T20:00:00.000-0400', '2017-09-11T20:00:00.000-0400'),
  new SearchFacetBucket('', 'September 12, 2017', 0, 'date:FACET(RANGE(\'2017-09-12T00:00:00\', \'2017-09-13T00:00:00\', upper=exclusive))', '2017-09-11T20:00:00.000-0400', '2017-09-12T20:00:00.000-0400'),
  new SearchFacetBucket('', 'September 13, 2017', 0, 'date:FACET(RANGE(\'2017-09-13T00:00:00\', \'2017-09-14T00:00:00\', upper=exclusive))', '2017-09-12T20:00:00.000-0400', '2017-09-13T20:00:00.000-0400'),
  new SearchFacetBucket('', 'September 14, 2017', 3, 'date:FACET(RANGE(\'2017-09-14T00:00:00\', \'2017-09-15T00:00:00\', upper=exclusive))', '2017-09-13T20:00:00.000-0400', '2017-09-14T20:00:00.000-0400'),
  new SearchFacetBucket('', 'September 15, 2017', 5, 'date:FACET(RANGE(\'2017-09-15T00:00:00\', \'2017-09-16T00:00:00\', upper=exclusive))', '2017-09-14T20:00:00.000-0400', '2017-09-15T20:00:00.000-0400'),
];
/* eslint-enable max-len */

const dateFacet = new SearchFacet('date', 'date', 'Date', dateFacetBuckets);

const sampleFacets = {
  relevancyScoreFacet,
  sentimentFacet,
  locationFacet,
  regionFacet,
  dateFacet,
};

export default sampleFacets;
