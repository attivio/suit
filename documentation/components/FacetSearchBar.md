#### Examples:


__1:__  A simple example for finding values in a large facet.

```jsx
  import AuthUtils from'../../src/util/AuthUtils';
  import DummySearcher from'../../src/components/DummySearcher';
  import MoreListFacetContents from'../../src/components/MoreListFacetContents';
  import QueryResponse from'../../src/api/QueryResponse';
  import sampleFacets from'../sampleData/Facets';

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
  import AuthUtils from '../../src/util/AuthUtils';
  import DummySearcher from '../../src/components/DummySearcher';
  import MoreListFacetContents from '../../src/components/MoreListFacetContents';
  import QueryResponse from '../../src/api/QueryResponse';
  import sampleFacets from '../sampleData/Facets';

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
