import React from 'react';
import { render, within } from '@testing-library/react';

import Facet from '../../src/components/Facet';
import SearchFacet from '../../src/api/SearchFacet';
import SearchFacetBucket from '../../src/api/SearchFacetBucket';

// A workaround for an issue with using Mapbox with jest
// Refer: https://github.com/mapbox/mapbox-gl-js/issues/3436#issuecomment-485535598
jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
    remove: jest.fn()
  })),
  NavigationControl: jest.fn()
}));

//Sample data
const regionFacetBuckets = [
  new SearchFacetBucket('China', 'China', 310, 'filter string'),
  new SearchFacetBucket('United States', 'United States', 241, 'filter string'),
  new SearchFacetBucket('Brazio', 'Brazil', 191, 'filter string'),
  new SearchFacetBucket('Russia', 'Russia', 174, 'filter string'),
];
const regionFacetCount = regionFacetBuckets.reduce((acc, bucket) => {
  return acc + bucket.count;
}, 0);
const regionFacet = new SearchFacet('region', 'region', 'Region', regionFacetCount, regionFacetBuckets);

describe('Facet', () => {
  test('Test facet with label', () => {
    const { getByText } = render(
      <Facet facet={regionFacet} />
    );
    expect(getByText('Region')).toBeDefined();
  });

  test('Test collapsible facet', () => {
    const { getAllByRole } = render(
      <Facet facet={regionFacet} collapse />
    );
    const buttons = getAllByRole('button')
    expect(buttons[0].id).toEqual('facet-region-hed');
  });
});
