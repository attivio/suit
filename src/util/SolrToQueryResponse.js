// @flow

import QueryResponse from '../api/QueryResponse';
import SearchDocument from '../api/SearchDocument';
import SearchFacet from '../api/SearchFacet';

/**
 * Convert the response from a call to the Solr engine
 * into an Attivio QueryResponse so that it can be
 * processed by the Search UI.
 */
export default class SolrToQueryResponse {
  /**
   * Do the conversion.
   *
   * @param json          the JSON returned from the call
   * @param customOptions the custom options defined in the configuration
   */
  static convert(json: any, customOptions: any): QueryResponse {
    const result = new QueryResponse();

    if (json.responseHeader) {
      result.totalTime = json.responseHeader.QTime;
    }

    if (json.response) {
      result.totalHits = json.response.numFound;
    }
    if (json.response.docs.length > 0) {
      result.documents = SolrToQueryResponse.getSolrDocuments(json.response.docs, customOptions);
    }
    if (json.facets) {
      result.facets = SolrToQueryResponse.getSolrFacets(json.facets, customOptions);
    }

    return result;
  }

  /**
   * Turn non-array field values into arrays.
   */
  static wrapIfNotArray(v) {
    return Array.isArray(v) ? v : [v];
  }

  static getSolrDocuments(documents: any, customOptions: any) {
    return documents.map((doc) => {
      const mapp = customOptions.mappings;
      const fields = {};

      Object.keys(mapp).forEach((k) => {
        if (mapp[k] && doc[mapp[k]]) {
          fields[k] = SolrToQueryResponse.wrapIfNotArray(doc[mapp[k]]);
        }
      });

      if (customOptions.customId && customOptions.customId.length > 0) {
        fields['.id'] = [doc[customOptions.customId]];
      } else {
        fields['.id'] = [doc.id];
      }

      fields['.score'] = [''];

      return SearchDocument.fromJson({ fields });
    });
  }

  static getSolrFacets(facets: any, customOptions: any) {
    const countlessFacets = Object.assign({}, facets);
    if (countlessFacets.count) {
      delete countlessFacets.count;
    }

    return Object.keys(countlessFacets).map((field) => {
      const facetConfig = customOptions.facets.find((f) => {
        return f.field === field;
      }) || {};
      return SearchFacet.fromJson({
        name: facetConfig.field || field,
        field: facetConfig.field || field,
        label: facetConfig.displayName || field,
        buckets: facets[field].buckets.map((b) => {
          return ({
            value: b.val,
            count: b.count,
            filter: `${facetConfig.field}:'${b.val}'`,
          });
        }),
      });
    });
  }
}
