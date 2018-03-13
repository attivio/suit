// @flow

import QueryResponse from "../api/QueryResponse";
import SearchDocument from "../api/SearchDocument";
import SearchFacet from "../api/SearchFacet";

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
    if(json.aggregations || Object.keys(json.aggregations).length > 0) {
      result.facets = _getElasticFacets(json.aggregations, customOptions);
    }

    return result;
}

const _wrapIfNotArray = (v) => Array.isArray(v) ? v : [v];

const _getElasticDocuments = (documents: any, customOptions: any) => {
  return documents.map(doc => {
    const mapp = customOptions.mappings;
    const fields = {};

    Object.keys(mapp).forEach(k => { if(mapp[k] && doc._source[mapp[k]]) fields[k] = _wrapIfNotArray(doc._source[mapp[k]]); });

    fields[".id"] = [doc._id];
    fields[".score"] = [doc._score || 0];

    return SearchDocument.fromJson({ fields });
  });
}

const _getElasticFacets = (facets: any, customOptions: any) => {
  return Object.keys(facets).map(field => {
    const facetConfig = customOptions.facets.find(f => f.field === field) || {};
    return SearchFacet.fromJson({
      name: facetConfig.field,
      field: facetConfig.field,
      label: facetConfig.displayName,
      buckets: facets[field].buckets.map(b => ({ value: b.key, count: b.doc_count, filter: `${facetConfig.field}:"${b.key}"` }))
    });
  })
}
