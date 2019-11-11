#### Examples:


__1:__ Showing a set of common facets.

```jsx
  import QueryResponse from '../../src/api/QueryResponse';
  import DummySearcher from '../../src/components/DummySearcher';
  import sampleFacets from '../sampleData/Facets';

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
