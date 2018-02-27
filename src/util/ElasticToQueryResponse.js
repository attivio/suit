// @flow

import QueryResponse from "../api/QueryResponse";
import SearchDocument from "../api/SearchDocument";

export default (json: any, customOptions: any) => {
  const result = new QueryResponse();

    if(json.took) {
      result.totalTime = json.took;
    }

    if(json.hits.total) {
      result.totalHits = json.hits.total;
    }

    if(json.hits.hits.length > 0) {
      result.documents = _getElasticDocuments(json.hits.hits, customOptions);
    }

    return result;
}

/* const _getElasticDocuments = (documents: any) => {
  // Here we build the documents in the same structure as the attivio response.
  return documents.map(doc => {
    // Here wee wrap the values returned by the elastic response in a Array as SUIT expects
    const fields = {};
    Object.keys(doc._source).forEach(k => { fields[k] = [doc._source[k]] })
    // Here we add the id and the score of the document in the fields array
    fields[".id"] = [doc._id];
    fields[".score"] = [doc._score]

    return SearchDocument.fromJson({ fields });
  });
} */

const _getElasticDocuments = (documents: any, customOptions: any) => {
  return documents.map(doc => {
    const mapp = customOptions.mappings;
    const fields = {};

    Object.keys(mapp).forEach(k => { if(mapp[k]) fields[k] = [doc._source[mapp[k]]]; });

    //Temporary

    fields["thumbnailImageUri"] = [`http://robohash.org/${doc._id}`];
    fields["previewImageUri"] = [`http://robohash.org/${doc._score}`];

    fields[".id"] = [doc._id];
    fields[".score"] = [doc._score];

    return SearchDocument.fromJson({ fields });
  });
}