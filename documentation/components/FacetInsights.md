#### Examples:


__1:__ Showing a set of common facets.

```jsx
  const QueryResponse = require('../../src/api/QueryResponse').default;
  const DummySearcher = require('../../src/components/DummySearcher').default;
  const sampleFacets = require('../sampleData/Facets').default;

  const queryResponse = new QueryResponse();
  queryResponse.facets = [
    sampleFacets.relevancyScoreFacet,
    sampleFacets.sentimentFacet,
    sampleFacets.locationFacet,
    sampleFacets.regionFacet,
    sampleFacets.dateFacet,
  ];

  <DummySearcher defaultQueryResponse={queryResponse}>
    <FacetInsights />
  </DummySearcher>
```
