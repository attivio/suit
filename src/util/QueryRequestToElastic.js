// @flow

import ElasticToQueryResponse from './ElasticToQueryResponse';

export default class QueryRequestToElastic {
  static convert(qr: any, baseUri: string, customOptions: any, callback: any) {
    const { query, rows = 0, sort = ['.score:DESC'], facetFilters } = qr;
    const { offset = ['0'] } = qr.restParams;

    const body = JSON.stringify({
      query: {
        query_string: {
          query: QueryRequestToElastic.buildQuery(query, facetFilters),
        },
      },
      size: rows,
      from: offset.pop(),
      sort: QueryRequestToElastic.buildSort(sort, customOptions),
      aggs: QueryRequestToElastic.buildFacets(customOptions.facets),
    });

    const headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });

    const params = {
      method: 'POST',
      headers,
      body,
    };

    const requestUri = `${baseUri}`;

    const fetchRequest = new Request(requestUri, params);

    fetch(fetchRequest)
      .then((r) => { return r.json(); })
      .then((r) => { return callback(undefined, ElasticToQueryResponse.convert(r, customOptions)); })
      .catch((e) => { return callback(`Error: ${e}`); });
  }

  static buildQuery(query, facetFilters) {
    if (facetFilters.length === 0) {
      return query;
    }
    return `${query} AND ${facetFilters.map((ff) => { return ff.filter; }).join(' AND ')}`;
  }

  static buildFacets(facets: Array<any>) {
    const aggs = {};
    facets.forEach((f) => {
      aggs[f.field] = { terms: { field: f.field } };
    });
    return aggs;
  }

  static buildSort(sort, customConfig) {
    if (sort.length === 0) {
      return [];
    }
    const [field, order] = sort[0].split(':');
    let fieldInElastic;
    switch (field) {
      case '.score':
        fieldInElastic = '_score';
        break;
      default:
        fieldInElastic = customConfig.mappings[field];
    }
    const sortObj = {};
    sortObj[fieldInElastic] = order;
    return [sortObj];
  }
}
