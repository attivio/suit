#### Examples:

__1.__ Showing simple JavaScript code.

```jsx
<Code>
  {`
  // @flow
  import SearchDocument from './SearchDocument';
  import SearchFacet from './SearchFacet';
  import SearchFeedback from './SearchFeedback';
  import SearchPlacement from './SearchPlacement';

  /**
  * The results of executing a query on the Attivio index.
  */
  export default class QueryResponse {
    static fromJson(json: any): QueryResponse {
      const result = new QueryResponse();
      if (json.totalTime) {
        result.totalTime = json.totalTime;
      }
      if (json.totalHits) {
        result.totalHits = json.totalHits;
      }
      if (json.documents && json.documents.length > 0) {
        const resultDocuments = json.documents.map((document) => {
          return SearchDocument.fromJson(document);
        });
        result.documents = resultDocuments;
      }
      if (json.facets && json.facets.length > 0) {
        const resultFacets = json.facets.map((facet) => {
          return SearchFacet.fromJson(facet);
        });
        result.facets = resultFacets;
      }
      if (json.feedback && json.feedback.length > 0) {
        const resultFeedback = json.feedback.map((feedback) => {
          return SearchFeedback.fromJson(feedback);
        });
        result.feedback = resultFeedback;
      }
      if (json.placements && json.placements.length > 0) {
        const resultPlacements = json.placements.map((placement) => {
          return SearchPlacement.fromJson(placement);
        });
        result.placements = resultPlacements;
      }
      return result;
    }

    /** The total amount of time, in milliseconds, it took to perform the query */
    totalTime: number;
    /** The total number of matching documents */
    totalHits: number;
    /** An array of documents matching the query (limited by the offset and rows parameters in the search request) */
    documents: Array<SearchDocument>;
    /** An array of facets applicable to the query */
    facets: Array<SearchFacet>;
    /** An array of feedback objects from performing the query */
    feedback: Array<SearchFeedback>;
    /** An array of Attivio-Business-Center-generated placements for the query */
    placements: Array<SearchPlacement>;
  }
  `}
</Code>
```