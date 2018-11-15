#### Examples:


__1:__  A simple example for finding values in a large facet.

```jsx
  const AuthUtils = require('../../src/util/AuthUtils').default;
  const DummySearcher = require('../../src/components/DummySearcher').default;
  const QueryResponse = require('../../src/api/QueryResponse').default;
  const sampleFacets = require('../sampleData/Facets').default;

  const config = {
    ALL: {
      authType: 'NONE',
      defaultUsername: 'thor',
      defaultRealm: 'asgard',
      baseUri: 'dummy',
      basename: 'fred',
    },
  };
  AuthUtils.configure(null, config, true);

  const queryResponse = new QueryResponse();
  queryResponse.facets = [
    sampleFacets.regionFacet,
  ];

  <DummySearcher
    defaultQueryResponse={queryResponse}
  >
    <FacetSearchBar
      showSearchBar
      placeholder="Find a facet value..."
      buttonLabel="Go"
      name="myFacet"
      addFacetFilter={(bucket) => {
        alert(`User chose facet value ${bucket.displayLabel()}.`);
      }}
      maxValues={2}
    >
      <MoreListFacetContents
        buckets={sampleFacets.regionFacet.buckets}
        addFacetFilter={(bucket) => {
          alert(`User chose facet value ${bucket.displayLabel()}.`);
        }}
      />
    </FacetSearchBar>
  </DummySearcher>
```

__2:__  An example that allows exporting values as a CSV file.

```jsx
  const AuthUtils = require('../../src/util/AuthUtils').default;
  const DummySearcher = require('../../src/components/DummySearcher').default;
  const QueryResponse = require('../../src/api/QueryResponse').default;
  const sampleFacets = require('../sampleData/Facets').default;

  const config = {
    ALL: {
      authType: 'NONE',
      defaultUsername: 'thor',
      defaultRealm: 'asgard',
      baseUri: 'dummy',
      basename: 'fred',
    },
  };
  AuthUtils.configure(null, config, true);

  const queryResponse = new QueryResponse();
  queryResponse.facets = [
    sampleFacets.regionFacet,
  ];

  <DummySearcher
    defaultQueryResponse={queryResponse}
  >
    <FacetSearchBar
      showSearchBar
      placeholder="Find a facet value..."
      buttonLabel="Go"
      name="myFacet"
      addFacetFilter={(bucket) => {
        alert(`User chose facet value ${bucket.displayLabel()}.`);
      }}
      maxValues={2}
      showExportButton
      exportButtonLabel="Save as CSV"
    >
      <MoreListFacetContents
        buckets={sampleFacets.regionFacet.buckets}
        addFacetFilter={(bucket) => {
          alert(`User chose facet value ${bucket.displayLabel()}.`);
        }}
      />
    </FacetSearchBar>
  </DummySearcher>
```
