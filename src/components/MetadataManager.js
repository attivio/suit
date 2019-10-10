// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import QueryResponse from '../api/QueryResponse';
import SimpleQueryRequest from '../api/SimpleQueryRequest';
import SavedSearch from '../api/SavedSearch';
import AuthUtils from '../util/AuthUtils';
import Configurable from '../components/Configurable';
import Configuration from '../components/Configuration';

type MetadataManagerProps = {
  username: string,
};

type MetadataManagerDefaultProps = {
  username: string,
};

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
  static defaultProps: MetadataManagerProps = {
    username: AuthUtils.getLoggedInUserId(),
  };

  static contextTypes = {
    configuration: PropTypes.instanceOf(Configuration),
  };

  static childContextTypes = {
    metadataManager: PropTypes.any,
  };

  static displayName = 'MetadataManager';

  constructor(props: MetadataManagerProps) {
    super(props);
    this.state = {
      response: undefined,
      error: undefined,
      savedSearchList: [],
    };
    (this: any).getSavedSearches = this.getSavedSearches.bind(this);
    (this: any).saveThisSearch = this.saveThisSearch.bind(this);
    (this: any).deleteThisSearch = this.deleteThisSearch.bind(this);
    (this: any).populateSavedSearches = this.populateSavedSearches.bind(this);
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
    const ss = new SavedSearch();
    ss.id = this.props.username.concat(loggedDateTime);
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
    this.context.searcher.search.updateSavedSearches(ss, mode, this.getSavedSearches);
  }
}

export default withRouter(Configurable(MetadataManager));
