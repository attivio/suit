#### Examples:

__1.__ Time series facet output.

```jsx
  import sampleFacets from '../sampleData/Facets';

  <TimeSeriesFacetContents
    buckets={sampleFacets.dateFacet.buckets}
    addFacetFilter={(bucket) => {
      alert(`User wants to filter on facet with label ${bucket.label}`);
    }}
  />
```
