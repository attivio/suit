#### Examples:

__1.__ Hierarchical facet.

```jsx
import sampleFacets from '../sampleData/Facets';

<HierarchicalFacetContents
  buckets={sampleFacets.hierarchicalFacet.buckets}
  addFacetFilter={(bucket) => {
    alert(`User wants to add bucket ${bucket.label} as a facet filter.`);
  }}
/>
```
