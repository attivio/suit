// @flow

import QueryResponse from '../api/QueryResponse';
import SearchDocument from '../api/SearchDocument';
import SearchFacet from '../api/SearchFacet';

/**
 * Convert the response from a call to the Elasticsearch
 * engine into an Attivio QueryResponse so that it can be
 * processed by the Search UI.
 */
export default class ElasticToQueryResponse {
  static convert(json: any, customOptions: any): QueryResponse {
    const result = new QueryResponse();

    if (json.took) {
      result.totalTime = json.took;
    }

    if (json.hits.total) {
      result.totalHits = json.hits.total;
    }

    if (json.hits.hits.length > 0) {
      result.documents = ElasticToQueryResponse.getElasticDocuments(json.hits.hits, customOptions);
    }
    if (json.aggregations || Object.keys(json.aggregations).length > 0) {
      result.facets = ElasticToQueryResponse.getElasticFacets(json.aggregations, customOptions);
    }

    return result;
  }

  /**
   * Turn non-array field values into arrays.
   */
  static wrapIfNotArray(v): Array<any> {
    return Array.isArray(v) ? v : [v];
  }

  static getElasticDocuments(documents: any, customOptions: any) {
    return documents.map((doc) => {
      const mapp = customOptions.mappings;
      const fields = {};

      Object.keys(mapp).forEach((k) => {
        if (mapp[k] && doc._source[mapp[k]]) { // eslint-disable-line no-underscore-dangle
          fields[k] = ElasticToQueryResponse.wrapIfNotArray(doc._source[mapp[k]]); // eslint-disable-line no-underscore-dangle
        }
      });

      fields['.id'] = [doc._id]; // eslint-disable-line no-underscore-dangle
      fields['.score'] = [doc._score || 0]; // eslint-disable-line no-underscore-dangle

      return SearchDocument.fromJson({ fields });
    });
  }

  static getElasticFacets(facets: any, customOptions: any) {
    return Object.keys(facets).map((field) => {
      const facetConfig = customOptions.facets.find((f) => {
        return f.field === field;
      }) || {};

      return SearchFacet.fromJson({
        name: facetConfig.field,
        field: facetConfig.field,
        label: facetConfig.displayName,
        buckets: facets[field].buckets.map((b) => {
          return ({ value: b.key, count: b.doc_count, filter: `${facetConfig.field}:'${b.key}'` });
        }),
      });
    });
  }
}
