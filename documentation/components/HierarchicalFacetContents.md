#### Examples:

__1.__ Hierarchical facet.

```jsx
const sampleFacets = require('../sampleData/Facets').default;


<HierarchicalFacetContents
  buckets={sampleFacets.hierarchicalFacet.buckets}
  addFacetFilter={(bucket) => {
    alert(`User wants to add bucket ${bucket.label} as a facet filter.`);
  }}
/>
```
