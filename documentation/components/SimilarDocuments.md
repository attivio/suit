#### Examples:


__1:__ Showing documents similar to the main one, using its `morelikethisquery` field.

```jsx
  import QueryResponse from '../../src/api/QueryResponse';
  import DummySearcher from '../../src/components/DummySearcher';
  import AuthUtils from '../../src/util/AuthUtils';
  import sampleDocs from '../sampleData/Documents';

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
