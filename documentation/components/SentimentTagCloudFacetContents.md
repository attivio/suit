#### Examples:

__1.__ Showing positive and negative sentiment in the sanme cloud.

```jsx
  const sampleFacets = require('../sampleData/Facets').default;
  
  <SentimentTagCloudFacetContents
    positiveBuckets={sampleFacets.positiveSentimentFacet.buckets}
    negativeBuckets={sampleFacets.negativeSentimentFacet.buckets}
    maxBuxkets={20}
    addFacetFilter={(filterBucket) => {
      alert(`Called to add facet filter for bucket labeled ${ filterBucket.label } `);
    }}
  />
```
