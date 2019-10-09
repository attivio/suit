#### Examples:


__1:__ Showing some geographic facet data. Click the VIEW CODE link below and enter your own Mapbox key to see the map displayed.

```jsx
  const sampleFacets = require('../sampleData/Facets').default;

  <MapFacetContents
    buckets={sampleFacets.positionFacet.buckets}
    addFacetFilter={(bucket) => {
      alert(`The user wants to filter on ${bucket.displayLabel()}.`);
    }}
    size={{ height: 300, width: 700 }}
    mapboxKey=""
  />
```
