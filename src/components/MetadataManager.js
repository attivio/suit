// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import QueryResponse from '../api/QueryResponse';
import SimpleQueryRequest from '../api/SimpleQueryRequest';
import SavedSearch from '../api/SavedSearch';
import AuthUtils from '../util/AuthUtils';
import Configurable from '../components/Configurable';

type MetadataManagerProps = {};

type MetadataManagerDefaultProps = {};

type MetadataManagerState = {
  response?: QueryResponse,
  error?: string,
  savedSearchList: Array<SavedSearch>,
};
/**
 * Component that manages all the metadata management, manages functions that require api calls
 * but are not relevant to be put in search
 */
class MetadataManager extends React.Component<MetadataManagerDefaultProps, MetadataManagerProps, MetadataManagerState> {
  static defaultProps: MetadataManagerDefaultProps = {};
  static childContextTypes = {
    metadataManager: PropTypes.any,
  };

  static displayName = 'MetadataManager';

  constructor(props: MetadataManagerProps) {
    super(props);
    this.state = {
      error: '',
      savedSearchList: [],
    };
    (this: any).getSavedSearches = this.getSavedSearches.bind(this);
    (this: any).saveThisSearch = this.saveThisSearch.bind(this);
    (this: any).deleteThisSearch = this.deleteThisSearch.bind(this);
    (this: any).populateSavedSearches = this.populateSavedSearches.bind(this);
    (this: any).updateSavedSearches = this.updateSavedSearches.bind(this);
  }

  state: MetadataManagerState;

  getChildContext() {
    return {
      metadataManager: this,
    };
  }

  // queries the index for the saved searches and sets the response to state
  getSavedSearches() {
    const username = AuthUtils.getLoggedInUserId();
    const searcher = this.context.searcher;
    if (searcher) {
      const qr = new SimpleQueryRequest();
      qr.query = `AND(table:'.savedSearches', username_s:"${username}")`;
      qr.facets = [];
      qr.restParams.set('zones', ['.metadata']);
      qr.workflow = 'search';
      qr.queryLanguage = 'advanced';
      searcher.doCustomSearch(qr, (response: QueryResponse | null, error: string | null) => {
        if (response) {
          this.populateSavedSearches(response);
        } else if (error) {
          this.setState({ error });
        }
      });
    }
  }

  // populates the response in an array of SavedSearch objects
  populateSavedSearches(response) {
    if (response) {
      const menuItemList = [];
      response.documents.forEach((doc) => {
        const ss = new SavedSearch();
        ss.setProperties(doc);
        menuItemList.push(ss);
      });
      this.setState({ savedSearchList: menuItemList });
    }
  }

  // saves a search query from the url and feeds it to a separate index zone, with an optional callback
  saveThisSearch(callback: () => void) {
    const { searcher } = this.context;
    const loggedDateTime = new Date().toISOString();
    const username = AuthUtils.getLoggedInUserId();
    const ss = new SavedSearch();
    ss.id = username.concat(loggedDateTime);
    ss.title = this.context.searcher.state.query;
    ss.query = searcher.generateLocationQueryStringFromState(this.context.searcher.state);
    ss.queryString = searcher.state.query;
    searcher.search.updateSavedSearches(ss, this.getSavedSearches);
    callback();
  }

  deleteThisSearch(id: string) {
    const ss = new SavedSearch();
    ss.id = id;
    const mode = 'DELETE';
    this.updateSavedSearches(ss, this.getSavedSearches, mode);
  }

  updateSavedSearches(ss: SavedSearch, callback: () => void, mode: string = 'ADD'): Promise<any> {
    return new Promise((resolve, reject) => {
      // Get session
      const baseUri = this.context.searcher.search.baseUri;
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
                                callback();
                                resolve();
                              } else {
                                // The request came back other than a 200-type response code
                                disconnectResult
                                  .text()
                                  .then((msg) => {
                                    reject(new Error(`Error disconnecting from the ingest API: ${msg}`));
                                  })
                                  .catch(() => {
                                    reject(new Error(`Error disconnecting from the ingest API: ${disconnectResult.statusText}`));
                                  });
                              }
                            })
                            .catch((error) => {
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
                              reject(new Error(`Failed to refresh the update: ${refreshResult.statusText}`));
                            });
                        }
                      })
                      .catch((error) => {
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
                        reject(new Error(`Failed to update the field: ${error}`));
                      });
                  }
                })
                .catch((error: any) => {
                  // Catch network-type errors from the updating fetch() call
                  reject(new Error(`Failed to update the field: ${error}`));
                });
            })
            .catch((error) => {
              reject(new Error(`Failed to connect to the ingest API: ${error}`));
            });
        })
        .catch((error) => {
          reject(new Error(`Failed to connect to the ingest API: ${error}`));
        });
    });
  }
}

export default withRouter(Configurable(MetadataManager));
