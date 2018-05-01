// @flow
import SimpleQueryRequest from './SimpleQueryRequest';
import QueryResponse from './QueryResponse';
import FieldNames from './FieldNames';
import AuthUtils from '../util/AuthUtils';
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

  /**
   * Convert a JavaScript Map object whose keys are
   * strings into a plain-old JavaScript object so it
   * can be converted to JSON.
   */
  static strMapToObj(strMap: Map<string, any>) {
    const obj = Object.create(null);
    strMap.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
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
    const headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    const jsonRequest = Object.assign({}, request);
    jsonRequest.restParams = Search.strMapToObj(request.restParams);

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
      const body = JSON.stringify(jsonRequest);
      const params = {
        method: 'POST',
        headers,
        body,
        credentials: 'include',
      };
      const fetchRequest = new Request(uri, params);

      fetch(fetchRequest).then(
        (response: Response) => {
          if (response.ok) {
            response.json().then((jsonResponse: any) => {
              const searchResponse = QueryResponse.fromJson(jsonResponse);
              updateResults(searchResponse, null);
            }).catch((error: any) => {
              // Catch errors from converting the response's JSON
              updateResults(null, Search.getErrorMessage(error));
            });
          } else {
            // The request came back other than a 200-type response code
            // There should be JSON describing it...
            response.json().then((searchException: any) => {
              const exceptionMessasge = searchException.message ? searchException.message : '';
              const exceptionCode = searchException.errorCode ? ` (${(searchException.errorCode: string)})` : '';
              const finalExceptionMessage = `An exception occurred while searching. ${exceptionMessasge}${exceptionCode}`;
              updateResults(null, finalExceptionMessage);
            }).catch((badJsonError: any) => {
              // const errorMessage = response.statusText ? `${response.statusText} (error code ${response.status})` :
              //   `Unknown error of type ${response.status}`;
              updateResults(null, Search.getErrorMessage(badJsonError));
            });
          }
        },
        (error: any) => {
          // Catch network-type errors from the main fetch() call
          updateResults(null, Search.getErrorMessage(error));
        },
      ).catch((error: any) => {
        // Catch exceptions from the main "then" function
        updateResults(null, Search.getErrorMessage(error));
      });
    }
  }

  /**
   * Perform a search against the Attivio index.
   *
   * @param query         the query to perform
   * @param queryLanguage the language to use, either "simple" or "advanced"
   * @param offset        the index of the first document to return
   * @param number        the number of documents to return (e.g. page size)
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

  /**
   * Get the error message out of the error object.
   *
   * @param error the error recieved
   * @return      a string represening the error object
   */
  static getErrorMessage(error: any): string {
    let message;
    if (error && error.message) {
      message = error.message;
    } else {
      message = 'There was an error executing the query.';
    }
    return message;
  }

  updateRealtimeField(docId: string, fieldName: string, fieldValues: Array<string>): Promise<any> {
    return new Promise((resolve, reject) => {
      // Get session
      const connectUri = `${this.baseUri}/rest/ingestApi/connect`;
      fetch(connectUri, { credentials: 'include' }).then((connectResult) => {
        connectResult.json().then((json) => {
          const sessionId = json;
          const updateUri = `${this.baseUri}/rest/ingestApi/updateRealTimeField/${sessionId}`;

          const headers = new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          });
          const jsonRequest = {
            id: docId,
            fieldName: FieldNames.TAGS,
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
          fetch(updateFetchRequest).then((updateResult: Response) => {
            if (updateResult.ok) {
              // Now need to refresh the update
              const refreshUri = `${this.baseUri}/rest/ingestApi/refresh/${sessionId}`;
              fetch(refreshUri, { credentials: 'include' }).then((refreshResult: Response) => {
                if (refreshResult.ok) {
                  // Now need to close the session
                  const disconnectUri = `${this.baseUri}/rest/ingestApi/disconnect/${sessionId}`;
                  fetch(disconnectUri, { credentials: 'include' }).then((disconnectResult: Response) => {
                    if (disconnectResult.ok) {
                      resolve();
                    } else {
                      // The request came back other than a 200-type response code
                      disconnectResult.text().then((msg) => {
                        reject(new Error(`Error disconnecting from the ingest API: ${msg}`));
                      }).catch(() => {
                        reject(new Error(`Error disconnecting from the ingest API: ${disconnectResult.statusText}`));
                      });
                    }
                  }).catch((error) => {
                    reject(new Error(`Failed to disconnect from the ingest API: ${error}`));
                  });
                } else {
                  // The request came back other than a 200-type response code
                  refreshResult.text().then((msg) => {
                    reject(new Error(`Failed to refresh the update: ${msg}`));
                  }).catch(() => {
                    reject(new Error(`Failed to refresh the update: ${refreshResult.statusText}`));
                  });
                }
              }).catch((error) => {
                reject(new Error(`Failed to refresh the update: ${error}`));
              });
            } else {
              // The request came back other than a 200-type response code
              updateResult.text().then((msg) => {
                reject(new Error(`Failed to update the field: ${msg}`));
              }).catch((error) => {
                reject(new Error(`Failed to update the field: ${error}`));
              });
            }
          }).catch((error: any) => {
            // Catch network-type errors from the updating fetch() call
            reject(new Error(`Failed to update the field: ${error}`));
          });
        }).catch((error) => {
          reject(new Error(`Failed to connect to the ingest API: ${error}`));
        });
      }).catch((error) => {
        reject(new Error(`Failed to connect to the ingest API: ${error}`));
      });
    });
  }
}
