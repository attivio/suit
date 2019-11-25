#### Examples:


__1:__ Showing some geographic facet data. Click the VIEW CODE link below and enter your own Mapbox key to see the map displayed.

```jsx
  import sampleFacets from '../sampleData/Facets';

  <MapFacetContents
    buckets={sampleFacets.positionFacet.buckets}
    addFacetFilter={(bucket) => {
      alert(`The user wants to filter on ${bucket.displayLabel()}.`);
    }}
    size={{ height: 300, width: 700 }}
    mapboxKey=""
  />
```

__2:__ Showing Conifer trees data with custom location pointers and tooltip

```jsx
  const sampleFacets = require('../sampleData/Facets').default;

  <MapFacetContents
    buckets={sampleFacets.positionFacet.buckets}
    addFacetFilter={(bucket) => {
      alert(`The user wants to filter on ${bucket.displayLabel()}.`);
    }}
    size={{ height: 300, width: 700 }}
    mapboxKey=""
    pointerImageUri="img/tree.png"
    tooltip="{} Conifer Tree|{} Conifer Trees"
  />
```
