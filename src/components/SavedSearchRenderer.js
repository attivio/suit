// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { Dropdown, Glyphicon, MenuItem, Button, Modal, Row, Col } from 'react-bootstrap';

import Configurable from './Configurable';
import MetadataManager from '../api/MetadataManager';
import QueryResponse from '../api/QueryResponse';
import SavedSearch from '../api/SavedSearch';
import AuthUtils from '../util/AuthUtils';

type SavedSearchRendererProps = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

type SavedSearchRendererDefaultProps = {};

type SavedSearchRendererState = {
  response?: QueryResponse,
  error?: string,
  showSaveSearchModal: boolean,
  savedSearchTitle: string,
  savedSearchList: Array<SavedSearch>,
  searchToSave: SavedSearch,
};

/**
 * Component to include in the Masthead for entering the query
 * to use when searching. Must be inside a Searcher component.
 */
class SavedSearchRenderer extends React.Component<
  SavedSearchRendererDefaultProps,
  SavedSearchRendererProps,
  SavedSearchRendererState,
> {
  static defaultProps: SavedSearchRendererDefaultProps = {};

  static displayName = 'SavedSearchRenderer';

  static contextTypes = {
    searcher: PropTypes.any,
  };

  constructor(props: SavedSearchRendererProps) {
    super(props);
    this.metadataManager = new MetadataManager(this.context.searcher.search);
  }

  state: SavedSearchRendererState;

  componentDidMount() {
    this.metadataManager.getSavedSearches(this.responseHandler);
  }

  metadataManager: MetadataManager;

  // default callback to handle query responses
  responseHandler = (response: Array<SavedSearch> | null, error: string | null) => {
    if (response) {
      this.setState({
        savedSearchList: response,
        error: '',
      });
    } else if (error) {
      this.setState({
        savedSearchList: [],
        error,
      });
    }
  };

  // applies the saved search which includes a query and facet filters
  applySavedSearch = (search: string) => {
    const { location: { pathname }, history } = this.props;
    history.push({
      pathname,
      search,
    });
  };

  // steps to perform when a new title is entered as a label for a saved search
  searchTitleEntered = (e: Event) => {
    const ss = new SavedSearch();
    if (e.target instanceof HTMLInputElement) {
      ss.title = e.target.value;
      const { searcher } = this.context;
      const loggedDateTime = new Date().toISOString();
      const username = AuthUtils.getLoggedInUserId();
      ss.id = username.concat(loggedDateTime);
      ss.query = searcher.generateLocationQueryStringFromState(this.context.searcher.state);
      ss.queryString = searcher.state.query;
      this.setState({
        savedSearchTitle: ss.title,
        searchToSave: ss,
      });
    }
  };

  // saves a search query into the index
  saveASearch = () => {
    const ss = new SavedSearch();
    if (!this.state.searchToSave) {
      const { searcher } = this.context;
      const loggedDateTime = new Date().toISOString();
      const username = AuthUtils.getLoggedInUserId();
      ss.title = this.context.searcher.state.query;
      ss.id = username.concat(loggedDateTime);
      ss.query = searcher.generateLocationQueryStringFromState(this.context.searcher.state);
      ss.queryString = searcher.state.query;
      this.setState({
        savedSearchTitle: ss.title,
        searchToSave: ss,
      });
    }
    this.setState({ showSaveSearchModal: false }, () => {
      this.metadataManager.saveThisSearch(this.state.searchToSave, this.responseHandler);
    });
  };

  // hides the modal
  hideSaveSearchModal = () => {
    this.setState({ showSaveSearchModal: false });
  };

  // sets the query from searcher as the search title and shows the modal
  showSaveSearchModal = () => {
    this.setState({
      savedSearchTitle: this.context.searcher.state.query,
      showSaveSearchModal: true,
    });
  };

  renderSavedQueryHeader = () => {
    return (
      <MenuItem key="saveQueryHeader" onSelect={this.showSaveSearchModal} id="saveQueryHeader">
        <span
          style={{
            fontSize: '14px',
            color: '#003c7e',
          }}
        >
          <b> SAVE SEARCH </b>
        </span>
      </MenuItem>
    );
  };

  renderSavedQueryList = () => {
    return this.state.savedSearchList.length > 0 ? (
      this.state.savedSearchList.map(savedSearchItem => (
        <MenuItem key={savedSearchItem.id}>
          <span
            onClick={() => {
              this.applySavedSearch(savedSearchItem.query);
            }}
            title={savedSearchItem.title}
            role="button"
            tabIndex={0}
          >
            {savedSearchItem.titleLabel}
          </span>
          <span
            onClick={() => {
              this.metadataManager.deleteThisSearch(savedSearchItem.id, this.responseHandler);
            }}
            style={{
              float: 'right',
              fontWeight: 'bold',
            }}
            role="button"
            tabIndex={0}
          >
            &times;
          </span>
        </MenuItem>
      ))
    ) : (
      <MenuItem key="noSavedSearches">
        <span
          style={{
            color: '#5d7c89',
            cursor: 'default',
          }}
        >
          No Saved Searches
        </span>
      </MenuItem>
    );
  };

  renderSavedQueryDivider = () => {
    return (
      <div
        id="recentlySavedSearchesLabel"
        style={{
          width: '100%',
          textAlign: 'center',
          backgroundColor: '#dff0f9',
          color: '#5d7c89',
          cursor: 'default',
        }}
      >
        <b>Recently saved searches:</b>
      </div>
    );
  }

  renderSavedQuery = () => {
    return (
      <Dropdown id="saveQueryDropDown" style={{ display: 'inline-block' }}>
        <Dropdown.Toggle
          noCaret
          useAnchor
          className="attivio-smalltoolbar-btn"
          bsClass="attivio-smalltoolbar-btn"
          title="Save This Search"
          style={{
            position: 'relative',
            left: '-13px',
            color: '#fff',
            border: 'none',
            background: 'transparent',
          }}
        >
          <Glyphicon glyph="heart-empty" style={{ color: 'white', fontSize: '1.1em' }} />
          <span className="attivio-globalmast-icon attivio-icon-arrow-down-blue" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {this.renderSavedQueryHeader()}
          <hr style={{ marginTop: '2px', marginBottom: '2px', color: '#003c7e' }} />
          {this.renderSavedQueryDivider()}
          <hr style={{ marginTop: '2px', marginBottom: '2px', color: '#003c7e' }} />
          {this.renderSavedQueryList()}
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  renderSaveSearchModal = () => {
    return (
      <Modal show={this.state.showSaveSearchModal} onHide={this.hideSaveSearchModal}>
        <Modal.Header closeButton>
          <Modal.Title>Save Current Search</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12} sm={6} md={4} lg={4}>
              <b> Name for this Search : </b>
            </Col>
            <Col xs={12} sm={6} md={8} lg={8}>
              <input
                type="text"
                onChange={this.searchTitleEntered}
                defaultValue={`${this.context.searcher.state.query}`}
                style={{ width: '100%' }}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.hideSaveSearchModal}>Close</Button>
          <Button
            onClick={() => {
              this.saveASearch();
            }}
          >
            Save Search
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  render() {
    return (
      <span>
        {this.renderSavedQuery()}
        {this.renderSaveSearchModal()}
      </span>
    );
  }
}

export default withRouter(Configurable(SavedSearchRenderer));
