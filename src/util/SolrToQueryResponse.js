// @flow

import QueryResponse from "../api/QueryResponse";
import SearchDocument from "../api/SearchDocument";
import SearchFacet from "../api/SearchFacet";

export default (json: any, customOptions: any) => {
  const result = new QueryResponse();

    if(json.responseHeader) {
      result.totalTime = json.responseHeader.QTime;
    }

    if(json.response) {
      result.totalHits = json.response.numFound;
    }
    if(json.response.docs.length > 0) {
      result.documents = _getSolrDocuments(json.response.docs, customOptions)
    }
    if(json.facets) {
      result.facets = _getSolrFacets(json.facets, customOptions);
    }

    return result;
}


const _wrapIfNotArray = (v) => Array.isArray(v) ? v : [v];

const _getSolrDocuments = (documents: any, customOptions: any) => {
  return documents.map(doc => {
    const mapp = customOptions.mappings;
    const fields = {};

    Object.keys(mapp).forEach(k => { if(mapp[k] && doc[mapp[k]]) fields[k] = _wrapIfNotArray(doc[mapp[k]])});

    fields["thumbnailImageUri"] = [`http://robohash.org/${doc._id}`];
    fields["previewImageUri"] = [`http://robohash.org/${doc._score}`];
    fields["uri"] = [`http://robohash.org/${doc._id}`];

    if(customOptions.customId && customOptions.customId.length > 0) {
      fields[".id"] = [doc[customOptions.customId]];
    }
    else {
      fields[".id"] = [doc.id];
    }

    fields[".score"] = [""];

    return SearchDocument.fromJson({ fields });
  });
};


const _getSolrFacets = (facets: any, customOptions: any) => {

  if(facets.count) delete facets.count;

  return Object.keys(facets).map(field => {
    const facetConfig = customOptions.facets.find(f => f.field === field) || {};
    return SearchFacet.fromJson({
      name: facetConfig.field || field,
      field: facetConfig.field|| field,
      label: facetConfig.displayName|| field,
      buckets: facets[field].buckets.map(b => ({ value: b.val, count: b.count, filter: `${facetConfig.field}:"${b.val}"` }))
    });
  });
};