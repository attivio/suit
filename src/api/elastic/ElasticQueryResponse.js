// @flow

import QueryResponse from "../QueryResponse";
import SearchDocument from "../SearchDocument";

export default class ElasticQueryResponse extends QueryResponse {
  static fromJson(json: any) : ElasticQueryResponse {
    const result = new ElasticQueryResponse();

    if(json.took) {
      result.totalTime = json.took;
    }

    if(json.hits.total) {
      result.totalHits = json.hits.total;
    }

    if(json.hits.hits.length > 0) {
      result.setElasticDocuments(json.hits.hits);
    }

  }

  constructor() {
    super();
  }

  setElasticDocuments(documents: any) {
    // Here we build the documents in the same structure as the attivio response.
    this.documents = documents.map(doc => {
      // Here wee wrap the values returned by the elastic response in a Array as SUIT expects
      const fields = Object.keys(doc._source).reduce((acc, fKey) => {
        acc[fKey] = [docs._source[fKey]];
      }, {});
      // Here we add the id and the score of the document in the fields array
      fields[".id"] = [doc._id];
      fields[".score"] = [doc._score]

      return { fields };
    });
  }
}