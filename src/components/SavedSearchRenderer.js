// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { Dropdown, Glyphicon, MenuItem, Button, Modal, Row, Col } from 'react-bootstrap';

import Configurable from './Configurable';
import QueryResponse from '../api/QueryResponse';
import SavedSearch from '../api/SavedSearch';

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

  static contextTypes = {
    searcher: PropTypes.any,
  };

  static displayName = 'SavedSearch';

  constructor(props: SavedSearchRendererProps) {
    super(props);
    this.state = {
      response: undefined,
      error: undefined,
      showSaveSearchModal: false,
      savedSearchTitle: '',
      savedSearchList: [],
      savedSearch: null,
    };
    (this: any).applySavedSearch = this.applySavedSearch.bind(this);
    (this: any).showSaveSearchModal = this.showSaveSearchModal.bind(this);
    (this: any).hideSaveSearchModal = this.hideSaveSearchModal.bind(this);
    (this: any).searchTitleEntered = this.searchTitleEntered.bind(this);
    (this: any).renderSavedQuery = this.renderSavedQuery.bind(this);
    (this: any).renderSavedQueryHeader = this.renderSavedQueryHeader.bind(this);
  }

  state: SavedSearchRendererState;

  componentWillMount() {
    this.context.metadataManager.getSavedSearches();
    this.setState({
      savedSearchList: this.context.metadataManager.state.savedSearchList,
    });
  }

  // applies the saved search which includes a query and facet filters
  applySavedSearch(query: string) {
    const { location } = this.props;
    this.props.history.push({
      pathname: location.pathname,
      search: query,
    });
  }

  searchTitleEntered(e: Event) {
    if (e.target instanceof HTMLInputElement) {
      this.setState({
        savedSearchTitle: e.target.value,
      });
    }
  }

  // hides the modal
  hideSaveSearchModal() {
    this.setState({ showSaveSearchModal: false });
  }

  // sets the query from searcher as the search title and shows the modal
  showSaveSearchModal() {
    this.setState({
      savedSearchTitle: this.context.searcher.state.query,
      showSaveSearchModal: true,
    });
  }

  renderSavedQueryHeader() {
    return (
      <MenuItem
        key="saveQueryHeader"
        onSelect={() => {
          this.showSaveSearchModal();
        }}
        id="saveQueryHeader"
      >
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
  }

  renderSavedQueryList() {
    return this.state.savedSearchList.length > 0 ? (
      this.state.savedSearchList.map((e) => {
        return (
          <MenuItem key={e.id}>
            <span // eslint-disable-line
              onClick={() => {
                this.applySavedSearch(e.query);
              }}
              title={e.title}
            >
              {e.titleLabel}
            </span>
            <span // eslint-disable-line
              onClick={() => {
                this.context.metadataManager.deleteThisSearch(e.id);
              }}
              style={{
                float: 'right',
                fontWeight: 'bold',
              }}
            >
              &times;
            </span>
          </MenuItem>
        );
      })
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
  }

  renderSavedQuery() {
    const savedQueryDivider = (
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
          {savedQueryDivider}
          <hr style={{ marginTop: '2px', marginBottom: '2px', color: '#003c7e' }} />
          {this.renderSavedQueryList()}
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  renderSaveSearchModal() {
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
              this.context.metadataManager.saveThisSearch(this.hideSaveSearchModal);
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
