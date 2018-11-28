#### Examples:

__1.__ Showing the built-in simnple format.

```jsx
  const QueryResponse = require('../../src/api/QueryResponse').default;
  const DummySearcher = require('../../src/components/DummySearcher').default;
  const SimpleSearchResult = require('../../src/components/SimpleSearchResult').default;
  const sampleDocs = require('../sampleData/Documents').default;

  const queryResponse = new QueryResponse();
  queryResponse.totalTime = 3239;
  queryResponse.totalHits = sampleDocs.rawDocuments.length;
  queryResponse.documents = sampleDocs.rawDocuments;

  <DummySearcher defaultQueryResponse={queryResponse}>
    <SearchResults
      format="simple"
      showRatings={false}
      showScores={false}
      showTags={false}
    />
  </DummySearcher>
```


__2.__ Using a custom renderer for documents in the "country" table.

```jsx
  const QueryResponse = require('../../src/api/QueryResponse').default;
  const Card = require('../../src/components/Card').default;
  const DocumentType = require('../../src/components/DocumentType').default;
  const DummySearcher = require('../../src/components/DummySearcher').default;
  const SimpleSearchResult = require('../../src/components/SimpleSearchResult').default;
  const sampleDocs = require('../sampleData/Documents').default;

  const queryResponse = new QueryResponse();
  queryResponse.totalTime = 3239;
  queryResponse.totalHits = sampleDocs.rawDocuments.length;
  queryResponse.documents = sampleDocs.rawDocuments;

  const countryRenderer = (doc, position, baseUri, key) => {
    const table = doc.getFirstValue('table');
    if (table === 'country') {
      const title = doc.getFirstValue('title');
      const mapUrl = doc.getFirstValue('img.uri.preview');
      let imageTag;
      if (mapUrl) {
        const fileName = mapUrl.substring(mapUrl.lastIndexOf('/') + 1);
        const newUrl = `https://www.cia.gov/library/publications/the-world-factbook/graphics/maps/${fileName}`;
        imageTag = <img src={newUrl} />;
      } else {
        imageTag = null;
      }

      return (
        <Card title={title} key={key} style={{ marginBottom: '5px', backgroundColor: 'lightgreen' }}>
          <div className="row" style={{ width: '100%', margin: 0 }} >
            <div className="col-sm-3 col-xs-4 col-md-3 col-lg-3" style={{ padding: 0 }}>
              <DocumentType docType={table} position={position} />
            </div>
            <div>
              {imageTag}
            </div>
          </div>
        </Card>
      );
    }
    return null;
  };

  const formats = [
    countryRenderer,
    SimpleSearchResult.renderer,
  ];

  <DummySearcher defaultQueryResponse={queryResponse}>
    <SearchResults
      format={formats}
      showRatings={false}
      showScores={false}
      showTags={false}
    />
  </DummySearcher>
```
