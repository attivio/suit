// @flow
import QueryResponse from '../api/QueryResponse';
import SimpleQueryRequest from '../api/SimpleQueryRequest';
import SavedSearch from '../api/SavedSearch';
import AuthUtils from '../util/AuthUtils';
import Search from '../api/Search';

/**
 * Class that manages all the metadata management, manages functions that require api calls
 * but are not relevant to be put into Search class
 */
export default class MetadataManager {
  /** Queries the index for the saved searches and sets the response to state */
  getSavedSearches = (callback: (response: Array<SavedSearch> | null, error: string | null) => void) => {
    const username = AuthUtils.getLoggedInUserId();
    const qr = new SimpleQueryRequest();
    qr.query = `AND(table:'.savedSearches', username_s:"${username}")`;
    qr.facets = [];
    qr.restParams.set('zones', ['.metadata']);
    qr.workflow = 'search';
    qr.queryLanguage = 'advanced';
    this.search.search(qr, (response: QueryResponse | null, error: string | null) => {
      if (response) {
        const savedSearchList = this.populateSavedSearches(response);
        callback(savedSearchList, null);
      } else if (error) {
        callback(null, error);
      }
    });
  }

  /** Populates the response in an array of SavedSearch objects */
  populateSavedSearches = (response: QueryResponse) => {
    const menuItemList = [];
    if (response) {
      response.documents.forEach((doc) => {
        const ss = new SavedSearch();
        ss.setProperties(doc);
        menuItemList.push(ss);
      });
    }
    return menuItemList;
  }

  /** Saves a Search query, then get the updated list of saved searches for the callback */
  saveThisSearch = (ss: SavedSearch, callback: (response: Array<SavedSearch> | null, error: string | null) => void) => {
    // safety check for id
    if (ss.id === '') {
      const loggedDateTime = new Date().toISOString();
      const username = AuthUtils.getLoggedInUserId();
      const id = username.concat(loggedDateTime);
      const newSavedSearch = new SavedSearch();
      newSavedSearch.id = id;
      newSavedSearch.query = ss.query;
      newSavedSearch.queryString = ss.queryString;
      this.updateSavedSearches(newSavedSearch, callback);
    }

    this.updateSavedSearches(ss, callback);
  }

  /** Deletes a saved search by id */
  deleteThisSearch = (id: string, callback: (response: Array<SavedSearch> | null, error: string | null) => void) => {
    const ss = new SavedSearch();
    ss.id = id;
    const mode = 'DELETE';
    this.updateSavedSearches(ss, callback, mode);
  }

  /** Updates a record in the index and calls the callback once the update has been committed. */
  updateSavedSearches = (
    ss: SavedSearch,
    callback: (response: Array<SavedSearch> | null, error: string | null) => void,
    mode: string = 'ADD',
    ) => {
    // Get session
    const baseUri = this.search.baseUri;
    const connectUri = `${baseUri}/rest/ingestApi/connect`;
    fetch(connectUri, { credentials: 'include' })
      .then((connectResult) => {
        connectResult
          .json()
          .then((json) => {
            const sessionId = json;
            const updateUri = `${baseUri}/rest/ingestApi/feedDocuments/${sessionId}`;

            const headers = new Headers({
              Accept: 'application/json',
              'Content-Type': 'application/json',
            });

            const loggedDateTime = new Date().toISOString();
            const username = AuthUtils.getLoggedInUserId();

            const jsonRequest = {};
            jsonRequest.fields = {};
            jsonRequest.fields.title = [ss.title];
            jsonRequest.fields.query_s = [ss.query];
            jsonRequest.fields.query_string_s = [ss.queryString];
            jsonRequest.fields.username_S = [username];
            jsonRequest.fields.date = [loggedDateTime];
            jsonRequest.fields.table = ['.savedSearches'];
            jsonRequest.id = ss.id;
            jsonRequest.zone = '.metadata';
            jsonRequest.mode = mode;
            // const body = JSON.stringify(jsonRequest);
            const params = {
              method: 'POST',
              headers,
              jsonRequest,
              credentials: 'include',
            };

            const updateFetchRequest = new Request(updateUri, params);
            fetch(updateFetchRequest)
              .then((updateResult: Response) => {
                if (updateResult.ok) {
                  // Now need to refresh the update
                  const refreshUri = `${baseUri}/rest/ingestApi/refresh/${sessionId}`;
                  fetch(refreshUri, { credentials: 'include' })
                    .then((refreshResult: Response) => {
                      if (refreshResult.ok) {
                        // Now need to close the session
                        const disconnectUri = `${baseUri}/rest/ingestApi/disconnect/${sessionId}`;
                        fetch(disconnectUri, { credentials: 'include' })
                          .then((disconnectResult: Response) => {
                            if (disconnectResult.ok) {
                              this.getSavedSearches(callback);
                            } else {
                              // The request came back other than a 200-type response code
                              disconnectResult
                                .text()
                                .then((msg) => {
                                  callback(null, `Error disconnecting from the ingest API: ${msg}`);
                                })
                                .catch(() => {
                                  callback(
                                    null,
                                    `Error disconnecting from the ingest API: ${disconnectResult.statusText}`,
                                  );
                                });
                            }
                          })
                          .catch((error) => {
                            callback(null, `Failed to disconnect from the ingest API: ${error}`);
                          });
                      } else {
                        // The request came back other than a 200-type response code
                        refreshResult
                          .text()
                          .then((msg) => {
                            callback(null, `Failed to refresh the update: ${msg}`);
                          })
                          .catch(() => {
                            callback(null, `Failed to refresh the update: ${refreshResult.statusText}`);
                          });
                      }
                    })
                    .catch((error) => {
                      callback(null, `Failed to refresh the update: ${error}`);
                    });
                } else {
                  // The request came back other than a 200-type response code
                  updateResult
                    .text()
                    .then((msg) => {
                      callback(null, `Failed to update the field: ${msg}`);
                    })
                    .catch((error) => {
                      callback(null, `Failed to update the field: ${error}`);
                    });
                }
              })
              .catch((error: any) => {
                // Catch network-type errors from the updating fetch() call
                callback(null, `Failed to update the field: ${error}`);
              });
          })
          .catch((error) => {
            callback(null, `Failed to connect to the ingest API: ${error}`);
          });
      })
      .catch((error) => {
        callback(null, `Failed to connect to the ingest API: ${error}`);
      });
  }

  constructor(search: Search) {
    this.search = search;
  }

  /** An instance of the Search class to call other methods Search from MetadataManager*/
  search: Search;
}

