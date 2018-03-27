#### Examples:

__1.__ Normal variation.

```jsx
  const sampleFacets = require('../sampleData/Facets').default;
  
  <SentimentFacetContents
    buckets={sampleFacets.sentimentFacet.buckets}
    addFacetFilter={(filterBucket) => {
      alert(`Called to add facet filter for bucket labeled ${filterBucket.label}`);
    }}
  />
```
