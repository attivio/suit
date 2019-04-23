// @flow
import SimpleQueryRequest from './SimpleQueryRequest';
import QueryResponse from './QueryResponse';
import AuthUtils from '../util/AuthUtils';
import FetchUtils from '../util/FetchUtils';
import ObjectUtils from '../util/ObjectUtils';
import QueryRequestToElastic from '../util/QueryRequestToElastic';
import QueryRequestToSolr from '../util/QueryRequestToSolr';

/**
 * Encapsulates the default Attivio search behavior.
 */
export default class Search {
  baseUri: string;
  sessionId: string;
  searchEngineType: 'attivio' | 'solr' | 'elastic';
  customOptions: any;

  /**
   * Construct a Search object.
   *
   * @param baseUri     the base URI for the Attivio instance to call when searching
   *                    (including the protocol, hostname or IP address, and port number,
   *                    with no trailing slash)
   */
  constructor(baseUri: string, searchEngineType: 'attivio' | 'solr' | 'elastic', customOptions: any) {
    this.baseUri = baseUri;
    this.searchEngineType = searchEngineType;
    this.customOptions = customOptions;
  }

  search(request: SimpleQueryRequest, updateResults: (response: QueryResponse | null, error: string | null) => void) {
    if (!request.restParams || request.restParams.size === 0) {
      request.restParams = new Map([
        ['join.rollup', ['TREE']],
        ['includeMetadataInResponse', ['true']],
        ['geo.field', ['position']],
        ['geo.units', ['DEGREES']],
        ['l.stopwords.mode', ['OFF']],
        ['l.acronyms.mode', ['OFF']],
        ['l.acronymBoost', ['25']],
        ['l.synonyms.mode', ['OFF']],
        ['l.synonyms.boost', ['25']],
      ]);
    }
    // Do the search on behalf of the logged-in user.
    // If the user is authenticated using the servlet,
    // this will be replaced with that username.
    const username = AuthUtils.getLoggedInUserId();
    if (username && username.length > 0) {
      request.username = AuthUtils.getLoggedInUserId();
    }

    const uri = `${this.baseUri}/rest/searchApi/search`;
    const jsonRequest = Object.assign({}, request);
    jsonRequest.restParams = ObjectUtils.strMapToObj(request.restParams);

    if (this.searchEngineType === 'elastic') {
      QueryRequestToElastic.convert(jsonRequest, `${this.baseUri}`, this.customOptions, (err, searchResponse) => {
        if (err) {
          updateResults(null, err);
        }
        updateResults(searchResponse, null);
      });
    } else if (this.searchEngineType === 'solr') {
      QueryRequestToSolr.convert(jsonRequest, `${this.baseUri}`, this.customOptions, (err, searchResponse) => {
        if (err) {
          updateResults(null, err);
        }
        updateResults(searchResponse, null);
      });
    } else {
      const callback = (response: any | null, error: string | null) => {
        const searchResponse = response ? QueryResponse.fromJson(response) : null;
        updateResults(searchResponse, error);
      };
      FetchUtils.fetch(uri, jsonRequest, callback, 'POST', 'An error occurred while searching.');
    }
  }

  /**
   * Perform a search against the Attivio index.
   *
   * @param query         the query to perform
   * @param queryLanguage the language to use, either "simple" or "advanced"
   * @param offset        the index of the first document to return
   * @param count         the number of documents to return (e.g. page size)
   * @param updateResults will be called when the search is complete with the results or an error
   */
  simpleSearch(query: string, queryLanguage: 'simple' | 'advanced', offset: number, count: number,
    updateResults: (response: QueryResponse | null, error: string | null) => void) {
    const request = new SimpleQueryRequest();
    request.rows = count;
    request.query = query;
    request.queryLanguage = queryLanguage;

    this.search(request, updateResults);
  }

  updateRealtimeField(
    docId: string,
    fieldName: string,
    fieldValues: Array<string>,
    onCompletion: () => void,
    onError: (error: string) => void): Promise<any> {
    return new Promise((resolve, reject) => {
      // Get session
      const connectUri = `${this.baseUri}/rest/ingestApi/connect`;
      fetch(connectUri, { credentials: 'include' })
        .then((connectResult) => {
          connectResult
            .json()
            .then((json) => {
              const sessionId = json;
              const updateUri = `${this.baseUri}/rest/ingestApi/updateRealTimeField/${sessionId}`;

              const headers = new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json',
              });
              const jsonRequest = {
                id: docId,
                fieldName,
                values: fieldValues,
              };

              const body = JSON.stringify(jsonRequest);
              const params = {
                method: 'POST',
                headers,
                body,
                credentials: 'include',
              };

              const updateFetchRequest = new Request(updateUri, params);
              fetch(updateFetchRequest)
                .then((updateResult: Response) => {
                  if (updateResult.ok) {
                    onCompletion();
                    // Now need to refresh the update
                    const refreshUri = `${this.baseUri}/rest/ingestApi/refresh/${sessionId}`;
                    fetch(refreshUri, { credentials: 'include' })
                      .then((refreshResult: Response) => {
                        if (refreshResult.ok) {
                          // Now need to close the session
                          const disconnectUri = `${this.baseUri}/rest/ingestApi/disconnect/${sessionId}`;
                          fetch(disconnectUri, { credentials: 'include' })
                            .then((disconnectResult: Response) => {
                              if (disconnectResult.ok) {
                                resolve();
                              } else {
                                // The request came back other than a 200-type response code
                                disconnectResult
                                  .text()
                                  .then((msg) => {
                                    reject(new Error(`Error disconnecting from the ingest API: ${msg}`));
                                  })
                                  .catch(() => {
                                    onError(`Error disconnecting from the ingest API: ${disconnectResult.statusText}`);
                                    reject(new Error(`Error disconnecting from the ingest API: ${disconnectResult.statusText}`));
                                  });
                              }
                            })
                            .catch((error) => {
                              onError(error);
                              reject(new Error(`Failed to disconnect from the ingest API: ${error}`));
                            });
                        } else {
                          // The request came back other than a 200-type response code
                          refreshResult
                            .text()
                            .then((msg) => {
                              reject(new Error(`Failed to refresh the update: ${msg}`));
                            })
                            .catch(() => {
                              onError(`Failed to refresh the update: ${refreshResult.statusText}`);
                              reject(new Error(`Failed to refresh the update: ${refreshResult.statusText}`));
                            });
                        }
                      })
                      .catch((error) => {
                        onError(error);
                        reject(new Error(`Failed to refresh the update: ${error}`));
                      });
                  } else {
                    // The request came back other than a 200-type response code
                    updateResult
                      .text()
                      .then((msg) => {
                        reject(new Error(`Failed to update the field: ${msg}`));
                      })
                      .catch((error) => {
                        onError(`Failed to update the field: ${error}`);
                        reject(new Error(`Failed to update the field: ${error}`));
                      });
                  }
                })
                .catch((error: any) => {
                  // Catch network-type errors from the updating fetch() call
                  onError(`Failed to update the field: ${error}`);
                  reject(new Error(`Failed to update the field: ${error}`));
                });
            })
            .catch((error) => {
              onError(`Failed to connect to the ingest API: ${error}`);
              reject(new Error(`Failed to connect to the ingest API: ${error}`));
            });
        })
        .catch((error) => {
          onError(`Failed to connect to the ingest API: ${error}`);
          reject(new Error(`Failed to connect to the ingest API: ${error}`));
        });
    });
  }
}
