#### Examples:

__1.__ Time series facet output.

```jsx
  const sampleFacets = require('../sampleData/Facets').default;

  <TimeSeriesFacetContents
    buckets={sampleFacets.dateFacet.buckets}
    addFacetFilter={(bucket) => {
      alert(`User wants to filter on facet with label ${bucket.label}`);
    }}
  />
```
