// @flow
import SolrToQueryResponse from './SolrToQueryResponse';

export default class QueryRequestToSolr {
  static convert(qr: any, baseUri: string, customOptions: any, callback: any) {
    const { query, rows = 0, sort = ['.score:DESC'], facetFilters } = qr;
    const { offset = ['0'] } = qr.restParams;

    const body = JSON.stringify({
      query,
      limit: parseInt(rows, 10),
      filter: QueryRequestToSolr.buildFilter(facetFilters),
      sort: QueryRequestToSolr.buildSort(sort, customOptions),
      facet: QueryRequestToSolr.buildFacets(customOptions.facets),
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

    const requestUri = `${baseUri}?start=${parseInt(offset.pop(), 10)}`;

    const fetchRequest = new Request(requestUri, params);

    fetch(fetchRequest)
      .then((r) => { return r.json(); })
      .then((r) => { return callback(undefined, SolrToQueryResponse.convert(r, customOptions)); })
      .catch((e) => { return callback(`Error: ${e}`); });
  }

  static buildFilter(facetFilters): string {
    if (!facetFilters || facetFilters.length === 0) return '';
    return `${facetFilters.map((ff) => { return ff.filter; }).join(' AND ')}`;
  }

  static buildFacets(facets: Array<any>): any {
    const aggs = {};
    facets.forEach((f) => {
      aggs[f.field] = { terms: { field: f.field } };
    });
    return aggs;
  }

  static buildSort(sort, customConfig): string {
    if (!sort || !sort[0] || sort[0].length === 0) return 'score DESC';
    const [field, order] = sort[0].split(':');
    const fieldInSolr = customConfig.mappings[field];

    if (field.indexOf('.score') === 0) return `score ${order}`;

    if (fieldInSolr) {
      return `${fieldInSolr} ${order}`;
    }

    return `${field} ${order}`;
  }
}
