#### Examples:

__1.__ Normal variation.

```jsx
  const sampleFacets = require('../sampleData/Facets').default;
  
  <ListWithBarsFacetContents
    buckets={sampleFacets.relevancyScoreFacet.buckets}
    addFacetFilter={(filterBucket) => {
      alert(`Called to add facet filter for bucket labeled ${filterBucket.label}`);
    }}
  />
```

__2.__ Right-aligned labels.

```jsx
  const sampleFacets = require('../sampleData/Facets').default;

  <ListWithBarsFacetContents
    buckets={sampleFacets.relevancyScoreFacet.buckets}
    addFacetFilter={(filterBucket) => {
      alert(`Called to add facet filter for bucket labeled ${filterBucket.label}`);
    }}
    right
  />
```
