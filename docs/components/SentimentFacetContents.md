#### Examples:

__1.__ Normal variation.

```jsx
  sampleFacets = require('../sampleData/Facets').default;
  
  <SentimentFacetContents
    buckets={sampleFacets.sentimentFacet.buckets}
    addFacetFilter={(filterBucket) => {
      alert(`Called to add facet filter for bucket labeled ${filterBucket.label}`);
    }}
  />
```
