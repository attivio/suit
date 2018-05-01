// @flow

import QueryResponse from '../api/QueryResponse';
import SearchDocument from '../api/SearchDocument';
import SearchFacet from '../api/SearchFacet';

const wrapIfNotArray = (v) => {
  return Array.isArray(v) ? v : [v];
};

const getSolrDocuments = (documents: any, customOptions: any) => {
  return documents.map((doc) => {
    const mapp = customOptions.mappings;
    const fields = {};

    Object.keys(mapp).forEach((k) => {
      if (mapp[k] && doc[mapp[k]]) {
        fields[k] = wrapIfNotArray(doc[mapp[k]]);
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
};


const getSolrFacets = (facets: any, customOptions: any) => {
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
};

export default (json: any, customOptions: any) => {
  const result = new QueryResponse();

  if (json.responseHeader) {
    result.totalTime = json.responseHeader.QTime;
  }

  if (json.response) {
    result.totalHits = json.response.numFound;
  }
  if (json.response.docs.length > 0) {
    result.documents = getSolrDocuments(json.response.docs, customOptions);
  }
  if (json.facets) {
    result.facets = getSolrFacets(json.facets, customOptions);
  }

  return result;
};
