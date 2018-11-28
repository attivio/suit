#### Examples:


__1:__ Showing documents similar to the main one, using its `morelikethisquery` field.

```jsx
  const QueryResponse = require('../../src/api/QueryResponse').default;
  const DummySearcher = require('../../src/components/DummySearcher').default;
  const AuthUtils = require('../../src/util/AuthUtils').default;
  const sampleDocs = require('../sampleData/Documents').default;

  const queryResponse = new QueryResponse();
  queryResponse.documents = sampleDocs.rawDocuments;

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

  <DummySearcher defaultQueryResponse={queryResponse}>
    <SimilarDocuments
      baseDoc={sampleDocs.honduras}
    />
  </DummySearcher>

```
