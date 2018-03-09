// @flow
import SimpleQueryRequest from "../api/SimpleQueryRequest";
import SolrToQueryResponse from "./SolrToQueryResponse";

export default (qr: any, baseUri: string, customOptions: any, callback: any) => {

  const { query, rows = 0, facets, sort = [".score:DESC"], facetFilters } =  qr;
  const { offset = ["0"] } = qr.restParams;


  const body = JSON.stringify({
    query: query,
    limit: parseInt(rows),
    filter: buildFilter(facetFilters),
    sort: buildSort(sort, customOptions),
    facet: buildFacets(customOptions.facets)
  })


  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json'
  });

  const params = {
    method: 'POST',
    headers,
    body,
  };

  const requestUri = `${baseUri}?start=${parseInt(offset.pop())}`

  const fetchRequest = new Request(requestUri, params)


  fetch(fetchRequest)
    .then(r => r.json())
    .then(r => callback(undefined, SolrToQueryResponse(r, customOptions)))
    .catch(e => callback(`Error: ${e}`))
}

const buildFilter = (facetFilters) => {
  if(!facetFilters || facetFilters.length === 0) return "";
  return `${facetFilters.map(ff => ff.filter).join(' AND ')}`
}

const buildFacets = (facets: Array<any>) => {
  const aggs = {};
  facets.forEach(f => {
    aggs[f.field] = { terms: { field: f.field } };
  })
  return aggs;
}

const buildSort = (sort, customConfig) => {
  if(!sort || !sort[0] || sort[0].length === 0) return "score DESC";
  const [ field, order ] = sort[0].split(':');
  const fieldInSolr = customConfig.mappings[field];

  if(field.indexOf('.score') === 0) return `score ${order}`;

  if(fieldInSolr) {
    return `${ fieldInSolr } ${ order }`
  }

  return `${ field } ${ order }`

}