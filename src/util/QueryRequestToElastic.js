// @flow
import SimpleQueryRequest from "../api/SimpleQueryRequest";
import ElasticToQueryResponse from "./ElasticToQueryResponse";

export default (qr: any, baseUri: string, customOptions: any, callback: any) => {

  const { query, rows = 0, facets, sort } =  qr;
  const { offset = ["0"] } = qr.restParams;

  const body = JSON.stringify({
    query: {
      query_string: {
        query
      }
    },
    size: rows,
    from: offset.pop(),
    aggs: buildFacets(customOptions.facets.fields)
  })


  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });

  const params = {
    method: 'POST',
    headers,
    body
  };

  const requestUri = `${baseUri}/_search`

  const fetchRequest = new Request(requestUri, params)


  fetch(fetchRequest)
    .then(r => r.json())
    .then(r => callback(undefined, ElasticToQueryResponse(r, customOptions)))
    .catch(e => callback("Error: ", e))
}

const buildFacets = (facets: Array<string>) => {
  const aggs = {};
  facets.forEach(f => {
    aggs[f] = {}
    aggs[f].terms = { field: f }
  })
  return aggs
}