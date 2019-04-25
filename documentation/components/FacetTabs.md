#### Examples:


__1:__  A simple example for showing facet as tabs.

```jsx
  const DummySearcher = require('../../src/components/DummySearcher').default;
  const QueryResponse = require('../../src/api/QueryResponse').default;
  const sampleFacets = require('../sampleData/Facets').default;

  const queryResponse = new QueryResponse();
  queryResponse.facets = [
    sampleFacets.regionFacet,
  ];

  <DummySearcher
    defaultQueryResponse={queryResponse}
  >
    <FacetTabs facetName = "region" />
  </DummySearcher>
```

__2:__  Example for showing facet tabs by passing in a facet instead of facet name.

```jsx
  const sampleFacets = require('../sampleData/Facets').default;

  <FacetTabs facet = {sampleFacets.regionFacet} />
```

__3:__  Example for showing facet tabs by passing in a facet and a background color.

```jsx
  const sampleFacets = require('../sampleData/Facets').default;

  <FacetTabs facet={sampleFacets.regionFacet} backgroundColor='lightgray' />
```