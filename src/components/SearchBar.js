// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import {
  Dropdown,
  Glyphicon,
  MenuItem,
  Button,
  Modal,
  Row,
  Col,
} from 'react-bootstrap';

import Configurable from './Configurable';
import AutoCompleteInput from './AutoCompleteInput';
import AuthUtils from '../util/AuthUtils';
import SimpleQueryRequest from '../api/SimpleQueryRequest';
import QueryResponse from '../api/QueryResponse';

declare var webkitSpeechRecognition: any; // Prevent complaints about this not existing

type SearchBarProps = {
  history: PropTypes.object.isRequired;
  location: PropTypes.object.isRequired;
  /** If set, this will be styled to live inside a Masthead component. */
  inMasthead: boolean;
  /**
   * The placeholder text to display when the input field is empty and Simple
   * Query Language is selected. Defaults to “Search…”
   */
  placeholder: string;
  /**
   * The placeholder text to display when the input field is empty and Advanced
   * Query Language is selected. Defaults to “Enter an advanced query…”
   */
  placeholderAdvanced: string;
  /**
   * Whether to show a toggle for simple/advanced language in the search bar.
   * Defaults to true.
   */
  allowLanguageSelect: boolean;
  /**
   * If set, the microphone button is displayed in the search field and the
   * user can use speech recognition to input the query terms. This functionality
   * is only available if the user’s browser is Chrome.
   */
  allowVoice: boolean;
  /**
   * If set, the search bar’s input field will use autocomplete via this URI.
   * Otherwise, if the configuration is available, the autoCompleteUri in the
   * configuration will be used.
   * Otherwise, the search bar will not autocomplete.
   * Note that this is relative to the baseUri field in the configuration.
   */
  autoCompleteUri: string;
  /**
   * Optional. The location of the node through which to interact with Attivio.
   * Defaults to the value in the configuration.
   */
  baseUri: string;
  /** The label to show on the search button. Defaults to "Go". */
  buttonLabel: string;
  /** If set, this is the route to navigate to upon executing a search. By default, no navigation will occur when searching. */
  route: string | null;
  /** If set, the save search option is displayed next to the SearchBar, false by default */
  allowSavedSearch: boolean;
  /** Optional, specifies the workflow that should be used for querying the index which stores saved searches */
  savedSearchWorkflow?: string;
  /** Optional, specifies the table name assigned to the docs for saved searches, defaults to 'savedSearches' */
  savedSearchTable: string;
  /** Specifies the zone name for the zone that stores saved searches, defaults to 'savedSearches' */
  savedSearchZone: string;
};

type SearchBarDefaultProps = {
  inMasthead: boolean;
  placeholder: string;
  placeholderAdvanced: string;
  allowLanguageSelect: boolean;
  allowVoice: boolean;
  buttonLabel: string;
  autoCompleteUri: string | null;
  route: string | null;
  baseUri: string;
  allowSavedSearch: boolean;
  savedSearchTable: string,
  savedSearchZone: string;
};

type SearchBarState = {
  recognizing: boolean;
  suggestions: Array<string>;
  response?: QueryResponse;
  error?: string;
  showSaveSearchModal: boolean;
  savedSearchTitle: string;
  savedSearchList: Array<any>;
};

/**
 * Component to include in the Masthead for entering the query
 * to use when searching. Must be inside a Searcher component.
 */
class SearchBar extends React.Component<SearchBarDefaultProps, SearchBarProps, SearchBarState> {
  static defaultProps: SearchBarDefaultProps = {
    inMasthead: false,
    placeholder: 'Search\u2026',
    placeholderAdvanced: 'Enter an advanced query\u2026',
    buttonLabel: 'Go',
    allowLanguageSelect: true,
    allowVoice: false,
    autoCompleteUri: null,
    route: null,
    baseUri: '',
    allowSavedSearch: false,
    savedSearchWorkflow: '',
    savedSearchTable: 'savedSearches',
    savedSearchZone: 'savedSearches',
  };

  static contextTypes = {
    searcher: PropTypes.any,
  };

  static displayName = 'SearchBar';

  static AUTOCOMPLETE_THRESHOLD = 2;

  constructor(props: SearchBarProps) {
    super(props);
    this.state = {
      query: '',
      recognizing: false,
      suggestions: [],
      response: undefined,
      error: undefined,
      showSaveSearchModal: false,
      savedSearchTitle: '',
      savedSearchList: [],
    };
    (this: any).doKeyPress = this.doKeyPress.bind(this);
    (this: any).doSearch = this.doSearch.bind(this);
    (this: any).startSpeechRecognition = this.startSpeechRecognition.bind(this);
    (this: any).queryChanged = this.queryChanged.bind(this);
    (this: any).updateQuery = this.updateQuery.bind(this);
    (this: any).languageChanged = this.languageChanged.bind(this);
    (this: any).applySavedSearch = this.applySavedSearch.bind(this);
    (this: any).showSaveSearchModal = this.showSaveSearchModal.bind(this);
    (this: any).hideSaveSearchModal = this.hideSaveSearchModal.bind(this);
    (this: any).getSavedSearches = this.getSavedSearches.bind(this);
    (this: any).searchTitleEntered = this.searchTitleEntered.bind(this);
    if (this.props.allowVoice && !('webkitSpeechRecognition' in window)) {
      console.log('Requested speech recognition but the browser doesn’t support it'); // eslint-disable-line no-console
    }
  }

  state: SearchBarState;

  componentWillMount() {
    if (this.props.allowSavedSearch) {
      this.getSavedSearches();
    }
  }

  getSuggestionList() {
    if (!this.state.suggestions || this.state.suggestions.length === 0) {
      return null;
    }
    const contents = this.state.suggestions.map((suggestion) => {
      return <MenuItem key={suggestion}>{suggestion}</MenuItem>;
    });
    return (
      <ul className="list-unstyled" role="menu">
        {contents}
      </ul>
    );
  }

  // queries the index for the saved searches and sets the response to state
  getSavedSearches() {
    const username = AuthUtils.getLoggedInUserId();
    const searcher = this.context.searcher;
    const { savedSearchWorkflow, savedSearchTable, savedSearchZone } = this.props;
    if (searcher) {
      const qr = new SimpleQueryRequest();
      qr.query = `AND(table:${savedSearchTable}, username_s:"${username}")`;
      qr.facets = [];
      qr.restParams.set('zones', [`${savedSearchZone}`]);
      if (savedSearchWorkflow) {
        qr.workflow = savedSearchWorkflow;
      }
      qr.queryLanguage = 'advanced';
      searcher.doCustomSearch(qr, (response: QueryResponse | null, error: string | null) => {
        if (response) {
          this.setState(
            {
              response,
            },
            this.populateSavedSearches,
          );
        } else if (error) {
          this.setState({ error });
        }
      });
    }
  }

  // applies the saved search which includes a query and facet filters
  applySavedSearch(query: string) {
    const { location } = this.props;
    this.props.history.push({
      pathname: location.pathname,
      search: query,
    });
  }

  // populates the saved searches in the saved searches drop down
  populateSavedSearches() {
    const response = this.state.response;
    if (response) {
      const menuItemList = [];
      response.documents.forEach((doc) => {
        const savedSearch = {};
        const htmlString = doc.getFirstValue('title');
        savedSearch.id = doc.getFirstValue('.id');
        savedSearch.title = htmlString.replace(/<[^>]+>/g, '');
        savedSearch.query = doc.getFirstValue('query_s');
        savedSearch.queryString = doc.getFirstValue('query_string_s');
        let savedSearchTitle = savedSearch.title;
        savedSearchTitle = savedSearchTitle.length > 15 ? `${savedSearchTitle.substring(0, 15)}...` : savedSearchTitle;
        menuItemList.push(
          <MenuItem key={savedSearch.id}>
            <span // eslint-disable-line
              onClick={() => {
                this.applySavedSearch(savedSearch.query);
              }}
              title={savedSearch.title}
            >
              {savedSearchTitle}
            </span>
            <span // eslint-disable-line
              onClick={() => {
                this.deleteThisSearch(savedSearch.id);
              }}
              style={{
                float: 'right',
                fontWeight: 'bold',
              }}
            >
              &times;
            </span>
          </MenuItem>,
        );
      });
      this.setState({ savedSearchList: menuItemList });
    }
  }

  submitButton: ?HTMLButtonElement;

  startSpeechRecognition() {
    const recognition = new webkitSpeechRecognition(); // eslint-disable-line new-cap,no-undef
    recognition.continuous = true;
    recognition.interrimResults = true;
    // recognition.lang = 'en';

    recognition.onresult = (e: any) => {
      recognition.stop();
      const newQuery = e.results[0][0].transcript;
      if (e.results[0].isFinal) {
        const searcher = this.context.searcher;
        if (searcher) {
          searcher.setQueryAndSearch(newQuery);
        }
      }
      this.setState({
        recognizing: false,
      });
    };

    recognition.onerror = () => {
      recognition.stop();
      this.setState({
        recognizing: false,
      });
    };

    recognition.start();
    this.setState({
      recognizing: true,
    });
  }

  languageChanged(newLanguage: 'simple' | 'advanced') {
    const searcher = this.context.searcher;
    if (searcher && newLanguage) {
      searcher.updateQueryLanguage(newLanguage);
    }
  }

  updateQuery(newQuery: string, doSearch: boolean = false) {
    // Update the searcher
    const searcher = this.context.searcher;
    if (searcher) {
      if (doSearch) {
        searcher.setQueryAndSearch(newQuery);
        this.route();
      } else {
        searcher.updateQuery(newQuery);
      }
    }
    this.forceUpdate();
  }

  queryChanged(e: Event) {
    if (e.target instanceof HTMLInputElement) {
      const newQuery = e.target.value;
      this.updateQuery(newQuery);
    }
  }

  searchTitleEntered(e: Event) {
    if (e.target instanceof HTMLInputElement) {
      this.setState({
        savedSearchTitle: e.target.value,
      });
    }
  }

  advancedMenuItem: ?HTMLSpanElement;

  simpleMenuItem: ?HTMLSpanElement;

  route() {
    const searcher = this.context.searcher;
    if (this.props.route && searcher) {
      // We need to do this to ensure the Searcher's state survives the navigation
      const searchString = searcher.generateLocationQueryStringFromState(searcher.state);
      this.props.history.push({
        pathname: this.props.route,
        search: searchString,
      });
    }
  }

  doSearch() {
    const searcher = this.context.searcher;
    if (this.props.route && searcher) {
      this.route();
    } else {
      searcher.doSearch();
    }
    if (this.submitButton) {
      this.submitButton.blur();
    }
  }

  // saves the current search from the url and feed it to a separate index zone
  saveThisSearch(searcherState) {
    const searcher = this.context.searcher;
    const { savedSearchZone, savedSearchTable } = this.props;
    const currentSearch = searcher.generateLocationQueryStringFromState(searcherState);
    const username = AuthUtils.getLoggedInUserId();
    const loggedDateTime = new Date().toISOString();
    const id = username.concat(loggedDateTime);
    const title = this.state.savedSearchTitle;
    const queryString = searcher.state.query;

    const jsonDoc = '{ "fields" : { "title" : '
      + `[ "${title}" ], "query_s" : [ "${currentSearch}" ], "query_string_s" : [ "${queryString}" ], `
      + `"username_s" : [ "${username}" ], "date" : [ "${loggedDateTime}" ], "table" : [ "${savedSearchTable}" ] }, `
      + `"id" : "${id}", "zone" : "${savedSearchZone}" }`;
    searcher.search.updateSavedSearches(JSON.parse(jsonDoc), this.getSavedSearches);
    this.hideSaveSearchModal();
  }

  deleteThisSearch(id: string) {
    const { savedSearchZone } = this.props;
    const jsonDoc = `{ "id" : "${id}", "zone" : "${savedSearchZone}", "mode" : "DELETE" }`;
    this.context.searcher.search.updateSavedSearches(JSON.parse(jsonDoc), this.getSavedSearches);
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

  doKeyPress(e: Event) {
    // If the user presses enter, do the search
    if (e.target instanceof HTMLInputElement) {
      if (e.keyCode === 13) {
        this.doSearch();
      }
    }
  }

  render() {
    const showMicrophone = this.props.allowVoice && ('webkitSpeechRecognition' in window);
    const micStyle = {};
    if (this.state.recognizing) {
      micStyle.backgroundSize = '125%';
    }

    const containerClass = this.props.inMasthead ? 'attivio-globalmast-search-container' : '';
    const subContainerClass = this.props.allowSavedSearch ? 'attivio-globalmast-search-saved-search' : 'attivio-globalmast-search';
    const inputClass = this.props.inMasthead ? 'form-control attivio-globalmast-search-input' : 'form-control';

    let query = '';
    let language = 'simple';
    const searcher = this.context.searcher;
    if (searcher) {
      query = searcher.state.query;
      language = searcher.state.queryLanguage;
    }

    const simpleMenuItem = (
      <MenuItem
        onSelect={() => {
          this.languageChanged('simple');
          if (this.simpleMenuItem) {
            this.simpleMenuItem.blur();
          }
        }}
      >
        <span ref={(c) => { this.simpleMenuItem = c; }}>
          <span style={{ visibility: language === 'simple' ? 'visible' : 'hidden' }}>&#x2713;</span>
          {' '}
          Simple
        </span>
      </MenuItem>
    );
    const advancedMenuItem = (
      <MenuItem
        onSelect={() => {
          this.languageChanged('advanced');
          if (this.advancedMenuItem) {
            this.advancedMenuItem.blur();
          }
        }}
      >
        <span ref={(c) => { this.advancedMenuItem = c; }}>
          <span style={{ visibility: language === 'advanced' ? 'visible' : 'hidden' }}>&#x2713;</span>
          {' '}
          Advanced
        </span>
      </MenuItem>
    );

    const languageControl = this.props.allowLanguageSelect ? (
      <Dropdown
        id="myDropdown"
        className=""
        onSelect={this.languageChanged}
        componentClass="div"
        style={{ display: 'inline-block' }}
      >
        <Dropdown.Toggle
          noCaret
          useAnchor
          className="attivio-smalltoolbar-btn"
          bsClass="attivio-smalltoolbar-btn"
          title="Query Language"
          style={{
            position: 'relative',
            top: '1px',
            left: '-2px',
            color: '#fff',
            border: 'none',
            background: 'transparent',
          }}
        >
          <Glyphicon glyph="search" style={{ color: 'white' }} />
          {' '}
          <span className="attivio-globalmast-icon attivio-icon-arrow-down-blue" />
        </Dropdown.Toggle>
        <Dropdown.Menu
          style={{
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          {simpleMenuItem}
          {advancedMenuItem}
        </Dropdown.Menu>
      </Dropdown>
    ) : '';

    let placeholder = this.props.placeholder;
    if (this.props.allowLanguageSelect && language === 'advanced') {
      placeholder = this.props.placeholderAdvanced;
    }

    const suggestionList = this.getSuggestionList();
    const inputComponent = this.props.autoCompleteUri
      ? (
        <AutoCompleteInput
          uri={`${this.props.baseUri}${this.props.autoCompleteUri}`}
          updateValue={this.updateQuery}
          placeholder={placeholder || ''}
          value={query}
          className={inputClass}
        />
      ) : (
        <input
          type="search"
          className={inputClass}
          placeholder={placeholder}
          onChange={this.queryChanged}
          onKeyDown={this.doKeyPress}
          value={query}
        />
      );

    const saveQueryHeader = (
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

    const savedQueryList = this.state.savedSearchList.length > 0 ? (
      this.state.savedSearchList
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

    const saveQuery = this.props.allowSavedSearch ? (
      <Dropdown id="saveQueryDropDown" className="" componentClass="div" style={{ display: 'inline-block' }}>
        <Dropdown.Toggle
          noCaret
          useAnchor
          className="attivio-smalltoolbar-btn"
          bsClass="attivio-smalltoolbar-btn"
          title="Save This Search"
          style={{
            position: 'relative',
            top: '2px',
            left: '-1px',
            color: '#fff',
            border: 'none',
            background: 'transparent',
          }}
        >
          <Glyphicon glyph="heart-empty" style={{ color: 'white', fontSize: '1.1em' }} />
          <span className="attivio-globalmast-icon attivio-icon-arrow-down-blue" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {saveQueryHeader}
          <hr style={{ marginTop: '2px', marginBottom: '2px', color: '#003c7e' }} />
          {savedQueryDivider}
          <hr style={{ marginTop: '2px', marginBottom: '2px', color: '#003c7e' }} />
          {savedQueryList}
        </Dropdown.Menu>
      </Dropdown>
    ) : (
      ''
    );

    const saveSearchModal = this.props.allowSavedSearch ? (
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
          <Button onClick={this.hideSaveSearchModal}>
            Close
          </Button>
          <Button
            onClick={() => {
              this.saveThisSearch(this.context.searcher.state);
            }}
          >
            Save Search
          </Button>
        </Modal.Footer>
      </Modal>
    ) : (
      ''
    );

    return (
      <div className={containerClass}>
        <div className={subContainerClass} role="search">
          <div className="form-group">
            {inputComponent}
            {showMicrophone ? (
              <a onClick={this.startSpeechRecognition} role="button" tabIndex={0}>
                <span className="attivio-globalmast-search-mic-icon attivio-icon-microphone" style={micStyle} />
              </a>
            ) : ''}
            <button
              type="submit"
              className="btn attivio-globalmast-search-submit"
              onClick={this.doSearch}
              ref={(c) => { this.submitButton = c; }}
            >
              {this.props.buttonLabel}
            </button>
          </div>
          {suggestionList}
        </div>
        {languageControl}
        {saveQuery}
        {saveSearchModal}
      </div>
    );
  }
}

export default withRouter(Configurable(SearchBar));
