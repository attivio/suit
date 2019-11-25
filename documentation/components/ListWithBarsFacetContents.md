#### Examples:

__1.__ Normal variation.

```jsx
  import sampleFacets from '../sampleData/Facets';
  <div style={{ width: '400px' }}>
    <ListWithBarsFacetContents
      buckets={sampleFacets.relevancyScoreFacet.buckets}
      addFacetFilter={(filterBucket) => {
        alert(`Called to add facet filter for bucket labeled ${filterBucket.label}`);
      }}
    />
  </div>
```

__2.__ Right-aligned labels.

```jsx
  import sampleFacets from '../sampleData/Facets';

  <div style={{ width: '400px' }}>
    <ListWithBarsFacetContents
      buckets={sampleFacets.relevancyScoreFacet.buckets}
      addFacetFilter={(filterBucket) => {
        alert(`Called to add facet filter for bucket labeled ${filterBucket.label}`);
      }}
      right
    />
  </div>
```
