// @flow
import SimpleQueryRequest from "../api/SimpleQueryRequest";
import ElasticToQueryResponse from "./ElasticToQueryResponse";

export default (qr: any, baseUri: string, customOptions: any, callback: any) => {

  const { query, rows = 0, facets, sort = [".score:DESC"], facetFilters } =  qr;
  const { offset = ["0"] } = qr.restParams;


  const body = JSON.stringify({
    query: {
      query_string: {
        query: buildQuery(query, facetFilters)
      }
    },
    size: rows,
    from: offset.pop(),
    sort: buildSort(sort, customOptions),
    aggs: buildFacets(customOptions.facets)
  })


  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json'
  });

  const params = {
    method: 'POST',
    headers,
    body
  };

  const requestUri = `${baseUri}`

  const fetchRequest = new Request(requestUri, params)


  fetch(fetchRequest)
    .then(r => r.json())
    .then(r => callback(undefined, ElasticToQueryResponse(r, customOptions)))
    .catch(e => callback(`Error: ${e}`))
}

const buildQuery = (query, facetFilters) => {
  if(facetFilters.length === 0) return query;
  return `${query} AND ${facetFilters.map(ff => ff.filter).join(' AND ')}`
}

const buildFacets = (facets: Array<any>) => {
  const aggs = {};
  facets.forEach(f => {
    aggs[f.field] = { terms: { field: f.field } };
  })
  return aggs;
}

const buildSort = (sort, customConfig) => {
  if(sort.length === 0) return [];
  const [ field, order ] = sort[0].split(':');
  let fieldInElastic;
  switch(field) {
    case '.score':
      fieldInElastic = '_score';
      break;
    default:
      fieldInElastic = customConfig.mappings[field];
  }
  const sortObj = {};
  sortObj[fieldInElastic] = order;
  return [ sortObj ];
}