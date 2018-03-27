// @flow
import React from 'react';
import type { Children } from 'react';

import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import QueryString from 'query-string';

import Search from '../api/Search';
import SimpleQueryRequest from '../api/SimpleQueryRequest';
import QueryResponse from '../api/QueryResponse';
import FacetFilter from '../api/FacetFilter';
import FieldNames from '../api/FieldNames';

import ObjectUtils from '../util/ObjectUtils';

import Configurable from '../components/Configurable';
import Configuration from '../components/Configuration';

/*
  A NOTE ABOUT THE SEARCHER, THE PAGE'S URL, AND WHEN QUERYING HAPPENS:

  When the Searcher is first loaded, we check for query parameters and apply them if they exist.
  In this case, we need to do a search right away.

  When the Searcher is updated with a new query string, we parse it and possibly do a new search,
  if it has changed.

  When the user does a search manually, we need to calculate the query string and push the new
  location onto the router's history if it has changed. (This happens in the method doSearch().)

  When the user updates a property that affects existing searches but doesn't require resetting,
  we update the state and then, if there has been a previous search, perform a new one (and, only
  in this case, update the search string).

  When the user updates a property that affects existing searches and does require resetting,
  then we update the state including setting the offset to 0, and, if there has been a previous
  search, we perform a new one (and, only in this case, update the search string). The following
  properties require resetting when they're changed: geoFilters (adding or removing), resultsPerPage,
  facetFilters (adding or removing), sort, relevancyModels, format, and searchProfile.
*/

type SearcherProps = {
  location: PropTypes.object.isRequired;
  history: PropTypes.object.isRequired;

  /**
   * The engine backing the SUIT application. Defaults to 'attivio'.
   * Set to 'solr' or 'elastic' to use one of those engines instesd.
   */
  searchEngineType: 'attivio' | 'solr' | 'elastic';
  /**
   * If a search engine than 'attivio' is specified, this property contains
   * configuration mappings and other options for it. It is ignored when the
   * engine is 'attivio'.
   */
  customOptions: any;
  /**
   * Optional. The location of the node through which to interact with Attivio.
   * Defaults to the value in the configuration.
   */
  baseUri: string;
  /** The workflow to use when performing the search. Defaults to the "search" workflow. */
  searchWorkflow: string;
  /** The list of document fields to return when performing the search. Defaults to all fields (*). */
  fields: Array<string>;
  /** The list of facets to request when performing the search. Defaults to just 'table'. */
  facets: Array<string>;
  /** The list of relevancy models to use when performing the search. Defaults to the 'default' model. */
  relevancyModels: Array<string>;
  /** The maxumum number of facets for FacetFinder to add. Defaults to 0, which means FF is disabled. */
  facetFinderCount: number;
  /** An optional filter to apply to all queries. */
  queryFilter?: string | null;
  /**
   * Highlight mode for the results of your query: 'on' enables highlighting
   * using your schema preferences and field expressions, 'off' disables
   * highlighting on the request, only highlighting field expressions specified, and
   * 'all' adds a teaser field expression to all your display fields when not in debug mode.
   */
  highlightResults: 'on' | 'off' | 'all';
  /** The join rollup mode to use. Defaults to 'TREE'. */
  joinRollupMode: 'TREE' | 'AGGREGATE' | 'SQL';
  /** An optional locale to use for the search. */
  locale?: string | null;
  /** The default language to use for querying. Defaults to 'simple' if not specified. */
  defaultQueryLanguage: 'simple' | 'advanced';

  /** A field expression to override what is used for the title, defaults to 'title' */
  title: string;
  /** A field expression to override what is used for the URI, defaults to 'uri' */
  uri: string;
  /** A field expression to override what is used for the table, defaults to 'table' */
  table: string;
  /**
   * A field expression to override what is used for the teaser, defaults to
   * 'SCOPETEASER(text, fragment=true, numFragments=4, fragmentScope=sentence)'
   */
  teaser: string;
  /**
   * A field expression to override what is used for the text, defaults to
   * 'SCOPETEASER(text, fragment=true, numFragments=1, fragmentSize=2147483647)'
   */
  text: string;
  /**
   * A field expression to override what is used for the URI to the preview image,
   * defaults to 'img.uri.preview'
   */
  previewImageUri: string;
  /** A field expression to override what is used for the UTI to the document’s
   * thumbnail, defaults to 'img.uri.thumbnail' */
  thumbnailImageUri: string;
  /** A field expression to override what is used for the latitude, defaults to 'latitude' */
  latitude: string;
  /** A field expression to override what is used for the longitude, defaults to 'longitude' */
  longitude: string;
  /**
   * A field expression to override what is used for the query to use when asking
   * for similar documents, defaults to 'morelikethisquery' */
  moreLikeThisQuery: string;
  /** A field expression to override what is used for the MIME type, defaults to 'mimetype' */
  mimetype: string;
  /**
   * A field expression to override what is used for the path to the ingested document,
   * defaults to 'sourcepath'
   */
  sourcePath: string;
  /** If true, include fields added by the query workflow, defaults to true */
  // showWorkflowFields: boolean;
  /** The workflow to use when updating document properties, defaults to 'ingest' */
  // ingestWorkflow: string;
  /** The format to use for displaying the individual documents. */
  format: 'list' | 'usercard' | 'doccard' | 'debug' | 'simple';
  /** The number of document results to display on each page of the results set */
  resultsPerPage: number;
  /**
   * The name of the Business Center profile to use for queries. If set, this will enable Profile level campaigns and promotions.
   */
  businessCenterProfile?: string | null;
  /**
   * The Searcher contains arbitrary children, including the components that
   * control its properties and display the search results.
   */
  children: Children;
};

type SearcherDefaultProps = {
  searchEngineType: 'attivio' | 'elastic' | 'solr';
  customOptions: any;
  baseUri: string;
  searchWorkflow: string;
  fields: Array<string>;
  facets: Array<string>;
  relevancyModels: Array<string>;
  facetFinderCount: number;
  queryFilter: string | null;
  highlightResults: 'on' | 'off' | 'all';
  joinRollupMode: 'TREE' | 'AGGREGATE' | 'SQL';
  locale: string | null;
  title: string;
  uri: string;
  table: string;
  teaser: string;
  text: string;
  previewImageUri: string;
  thumbnailImageUri: string;
  latitude: string;
  longitude: string;
  moreLikeThisQuery: string;
  mimetype: string;
  sourcePath: string;
  format: 'list' | 'usercard' | 'doccard' | 'debug' | 'simple';
  resultsPerPage: number;
  businessCenterProfile: string | null;
  defaultQueryLanguage: 'simple' | 'advanced';
};

/*
 * NOTE: If you add or remove anything from the Searcher's state, you'll
 * need to update (at least) the following methods to accommodate the chnage:
 *   constructor()
 *   getQueryRequest()
 *   generateLocationQueryStringFromState()
 *   parseLocationQueryStringToState()
 *   reset()
 *   relevantStateDiffers()
 *   getDefaultState()
 */
type SearcherState = {
  haveSearched: boolean;
  response?: QueryResponse;
  error?: string;
  query: string;
  queryLanguage: 'advanced' | 'simple';
  sort: Array<string>,
  relevancyModels: Array<string>;
  facetFilters: Array<FacetFilter>;
  geoFilters: Array<string>;
  resultsPerPage: number;
  resultsOffset: number;
  format: 'list' | 'usercard' | 'doccard' | 'debug' | 'simple';
};

/**
 * A wrapper for an Attivio search. Child components can access this object using
 * the searcher property that is inserted into their context object. This allows them
 * to access the Searcher's state to see all of its input parameters aa well as the
 * results of the most recent search and any errors. In addition, they can use the
 * reference to the Seacher to call methods which allow them to update the Searcher's
 * state or execute searches.
 *
 * The Searcher also provides a method, doCustomSearch(), that lets the callers
 * query the index using the configured Search class but providing their own request
 * object, without affecting the Searcher's state.
 *
 * See the SearchResults component for an example
 * of how this is done using by defining "static contextTypes" in the component.
 *
 * Note that the Searcher will add query parameters to the URL for the page's location
 * when the usere executes a (non-custom) search. This allows the URL for the search to be
 * used to repeat the same search, either when refreshing the browser window or when
 * bookmarking the page, sharing it in an email, etc. The URL is updated whenever a search
 * happens, whether caused by the user clicking the search button or by changing the
 * parameters to an existing search (e.g., changing the sort order or paging through the
 * results).

 IF
Searcher is first loaded, we need to check for query parameters and apply them if they exist.In this case, we need to do the search.

IF
Searcher is updated with a new query string, then we need to parse it and possibly do a new search, if it has changed.

IF
User does a search manually, we need to calculate the query string and push the new location onto the history if it has changed.
  THIS HAPPENS IN THE doSearch() method

IF
User updates a property that affects existing searches but doesn't require resetting, we need to update the state and then,
if there's a previous search, perform a new one (and, only in this case, update the search string
  THIS HAPPENDS WHEN THESE PROPERTIES CHANGE:
      resultsOffset (i.e., paging)

IF
User updates a property that affects existing searches AND requires resetting, then we need to update the state including setting
the offset to 0, and , if there's a previous search, perform a new one (and, only in this case, update the search string
  THIS HAPPENDS WHEN THESE PROPERTIES CHANGE:
      geoFilters (adding or removing)
      resultsPerPage
      facetFilters (adding or removing)
      sort
      relevancyModels
      format
      searchProfile


      // NEED TO DEAL WITH VALUES IN URL THAT ARE NOT VALID...

 */
class Searcher extends React.Component<SearcherDefaultProps, SearcherProps, SearcherState> {
  static STAR_COLON_STAR = '*:*';

  static defaultProps = {
    searchEngineType: 'attivio',
    customOptions: {},
    baseUri: '',
    searchWorkflow: 'search',
    fields: ['*'],
    facets: [],
    relevancyModels: ['default'],
    facetFinderCount: 0,
    queryFilter: null,
    highlightResults: 'on',
    joinRollupMode: 'TREE',
    locale: null,
    title: FieldNames.TITLE,
    uri: FieldNames.URI,
    table: FieldNames.TABLE,
    teaser: 'SCOPETEASER(text, fragment=true, numFragments=4, fragmentScope=sentence)',
    text: 'SCOPETEASER(text, fragment=true, numFragments=1, fragmentScope=2147483647)',
    previewImageUri: 'img.uri.preview',
    thumbnailImageUri: 'img.uri.thumbnail',
    latitude: FieldNames.LATITUDE,
    longitude: FieldNames.LONGITUDE,
    moreLikeThisQuery: 'morelikethisquery',
    mimetype: FieldNames.MIME_TYPE,
    sourcePath: FieldNames.SOURCEPATH,
    format: 'list',
    resultsPerPage: 10,
    businessCenterProfile: null,
    defaultQueryLanguage: 'simple',
  };

  static contextTypes = {
    configuration: PropTypes.instanceOf(Configuration),
  };

  static childContextTypes = {
    searcher: PropTypes.any,
  }

  /**
   * Convert an array of facet filters to an array of string representations thereof.
   */
  static serializeFacetFilters(facetFilters: Array<FacetFilter>): Array<string> {
    return facetFilters.map((facetFilter: FacetFilter): string => {
      return `${facetFilter.facetName},+${facetFilter.bucketLabel},+${facetFilter.filter}`;
    });
  }

  /**
   * Conveert an array of stringified facet filters to an array of actual FacetFilter objects.
   */
  static deserializeFacetFilters(facetFilters: Array<string>): Array<FacetFilter> {
    return facetFilters.map((facetFilterString: string): FacetFilter => {
      const parts: Array<string> = facetFilterString.split(',+');
      const facetFilter = new FacetFilter();
      facetFilter.facetName = parts[0];
      facetFilter.bucketLabel = parts[1];
      facetFilter.filter = parts[2];
      return facetFilter;
    });
  }

  constructor(props: SearcherProps) {
    super(props);

    this.search = new Search(this.props.baseUri, this.props.searchEngineType, this.props.customOptions);

    this.state = this.getDefaultState();
    (this: any).updateSearchResults = this.updateSearchResults.bind(this);
  }

  state: SearcherState;

  getChildContext() {
    return {
      searcher: this,
    };
  }

  componentWillMount() {
    // When the searcher is first created, this is called.
    // Pull a state object out of the location's query string
    const location = this.props.location;
    const newState = this.parseLocationQueryStringToState(location.search);

    // We check to see if the state needs to be updated due to this
    if (this.relevantStateDiffers(newState)) {
      this.updateStateAndSearch(newState);
    }
  }

  componentWillReceiveProps(nextProps: SearcherProps) {
    // When the searcher gets updated to have a new set of props, then this is called.
    const location = nextProps.location;

    // Pull a state object out of the location's query string
    const newState = this.parseLocationQueryStringToState(location.search);

    // We check to see if the state needs to be updated due to this
    if (this.relevantStateDiffers(newState)) {
      this.updateStateAndSearch(newState);
    }
  }

  /**
   * Method to get the default state for the Searcher. This ism in a
   * separate method since it needs to be done both in the constructor
   * and in the reset method.
   */
  getDefaultState(): SearcherState {
    return {
      haveSearched: false,
      response: undefined,
      error: undefined,
      query: Searcher.STAR_COLON_STAR,
      queryLanguage: this.props.defaultQueryLanguage,
      sort: ['.score:DESC'],
      relevancyModels: this.props.relevancyModels,
      facetFilters: [],
      geoFilters: [],
      resultsPerPage: parseInt(this.props.resultsPerPage, 10),
      resultsOffset: 0,
      format: this.props.format,
    };
  }

  /**
   * Use the properties of the Searcher component and the values from its
   * current state to generate a query request object that will be passed
   * to the Search class to do the work.
   */
  getQueryRequest() {
    const qr = new SimpleQueryRequest();
    qr.workflow = this.props.searchWorkflow;
    qr.query = this.state.query;
    qr.queryLanguage = this.state.queryLanguage;
    qr.rows = this.state.resultsPerPage;
    if (this.state.geoFilters) {
      qr.filters = this.state.geoFilters;
    } else {
      qr.filters = [];
    }
    if (this.props.queryFilter) {
      qr.filters.push(this.props.queryFilter);
    }
    if (this.props.locale) {
      qr.locale = this.props.locale;
    }
    qr.facets = this.props.facets;
    qr.sort = this.state.sort;
    qr.fields = this.getFieldList();
    qr.facetFilters = this.state.facetFilters;

    // And now, the fields that don't have explicit counterparts
    // in the simple query request, which need to be set using
    // the restParams property.
    const restParams = new Map();
    restParams.set('offset', [`${this.state.resultsOffset}`]);
    if (this.state.relevancyModels && this.state.relevancyModels.length > 0) {
      restParams.set('relevancymodelnames', [this.state.relevancyModels.join(',')]);
    } else if (this.props.relevancyModels && this.props.relevancyModels.length > 0) {
      restParams.set('relevancymodelnames', [this.props.relevancyModels.join(',')]);
    }
    restParams.set('includemetadatainresponse', ['true']);
    if (this.props.highlightResults) {
      restParams.set('highlight', ['true']);
      restParams.set('highlight.mode', ['HTML']);
    }
    if (this.props.facetFinderCount > 0) {
      restParams.set('facet.ff', ['RESULTS']);
      restParams.set('facet.ffcount', [this.props.facetFinderCount.toString(10)]);
    }
    restParams.set('join.rollup', [this.props.joinRollupMode]);
    if (this.props.businessCenterProfile) {
      const profiles = [this.props.businessCenterProfile];
      restParams.set('abc.enabled', ['true']);
      restParams.set('searchProfile', profiles);
    }

    qr.restParams = restParams;
    return qr;
  }

  /**
   * Get the list of fields to use in the query request.
   */
  getFieldList(): Array<string> {
    // Start out with the fields the user specifed
    const result = [].concat(this.props.fields || []);
    // Add the mapped fields that the search results will expect
    result.push(`${this.props.title} as title`);
    result.push(`${this.props.uri} as uri`);
    result.push(`${this.props.table} as table`);
    result.push(`${this.props.teaser} as teaser`);
    result.push(`${this.props.text} as text`);
    result.push(`${this.props.previewImageUri} as previewImageUri`);
    result.push(`${this.props.thumbnailImageUri} as thumbnailImageUri`);
    result.push(`${this.props.latitude} as latitude`);
    result.push(`${this.props.longitude} as longitude`);
    result.push(`${this.props.moreLikeThisQuery} as morelikethisquery`);
    result.push(`${this.props.mimetype} as mimetype`);
    result.push(`${this.props.sourcePath} as sourcepath`);
    // Add the fields we always want
    result.push('tags');
    return result;
  }

  /**
   * Check to see if the old and new state differ, only comparing the
   * properties we care about (non-transient ones).
   */
  relevantStateDiffers(compareWith: any): boolean {
    // Get a copy of the state with transient values removed
    const currentState = Object.assign({}, this.state);
    delete currentState.error;
    delete currentState.response;
    delete currentState.haveSearched;

    const newState = Object.assign({}, compareWith);
    delete newState.error;
    delete newState.response;
    delete newState.haveSearched;

    return !ObjectUtils.deepEquals(currentState, newState);
  }

  /**
   * Given a SearcherState object, generate the serialized URL query string parameters
   * that represent that state. If the optional original queryString parameter is passed,
   * then any non-SearcherState parameters encoded in it will be added to the resulting
   * query string.
   */
  generateLocationQueryStringFromState(state: SearcherState, originalQueryString: string | null): string {
    let basicState = {};

    if (!(state.query === '*' || state.query === '*:*')) {
      basicState.query = state.query;
    }
    if (state.queryLanguage !== this.props.defaultQueryLanguage) {
      basicState.queryLanguage = state.queryLanguage;
    }
    if (state.geoFilters && state.geoFilters.length > 0) {
      basicState.geoFilters = state.geoFilters;
    }
    if (state.resultsPerPage !== this.props.resultsPerPage) {
      basicState.resultsPerPage = state.resultsPerPage;
    }
    if (state.resultsOffset !== 0) {
      basicState.resultsOffset = state.resultsOffset;
    }
    if (state.facetFilters && state.facetFilters.length > 0) {
      basicState.facetFilters = Searcher.serializeFacetFilters(state.facetFilters);
    }
    if (state.sort) {
      // LJV TODO compare with default version
      basicState.sort = state.sort;
    }
    if (state.relevancyModels && state.relevancyModels.length > 0) {
      basicState.relevancyModels = state.relevancyModels;
    }
    if (state.format && state.format !== this.props.format) {
      basicState.format = state.format;
    }

    // See if there are any query parameters other than those set by the Searcher. If so, we want to maintain them.
    if (originalQueryString) {
      const originalParsed = QueryString.parse(originalQueryString);
      if (originalParsed) {
        originalParsed.delete('query');
        originalParsed.delete('queryLanguage');
        originalParsed.delete('geoFilters');
        originalParsed.delete('resultsPerPage');
        originalParsed.delete('resultsOffset');
        originalParsed.delete('facetFilters');
        originalParsed.delete('sort');
        originalParsed.delete('relevancyModels');
        originalParsed.delete('format');
      }
      // Add any leftover fields back in to the basic state
      basicState = Object.assign({}, basicState, originalParsed);
    }

    return QueryString.stringify(basicState);
  }

  /**
   * Given the query string from the location URL, parse it into the values of a SearcherState
   * object. Values which are missing are set to their default values. Any values in the
   * queryString which don't apply to the SearcherState are ignored.
   */
  parseLocationQueryStringToState(queryString: string): SearcherState {
    const parsed = QueryString.parse(queryString);

    // Get the query string
    // DEFAULT: *:*
    const query = parsed.query ? parsed.query : '*:*';

    // Get the query language (and validate that it's one of 'simple' or 'advanced')
    // DEFAULT: this.props.defaultQueryLanguage
    let queryLanguage: 'simple' | 'advanced' = this.props.defaultQueryLanguage;
    if (parsed.queryLanguage === 'simple' || parsed.queryLanguage === 'advanced') {
      queryLanguage = parsed.queryLanguage;
    } else if (parsed.queryLanguage) {
      console.log(`Searcher was passed unknown query language from the URI: ${parsed.queryLanguage}. Using default: ${this.props.defaultQueryLanguage}`); // eslint-disable-line max-len
    }

    // Get the geoFilters (normalized to an array of strings)
    // DEFAUT: []
    let geoFilters = parsed.geoFilters;
    if (!geoFilters) {
      geoFilters = [];
    } else if (typeof geoFilters === 'string') {
      geoFilters = [geoFilters];
    }

    // Get the number of results per page (as a positive integer)
    // DEFAULT: this.props.resultsPerPage¸
    let resultsPerPage: number;
    if (parsed.resultsPerPage) {
      resultsPerPage = parseInt(parsed.resultsPerPage, 10);
    }
    if (!resultsPerPage || resultsPerPage <= 0) {
      resultsPerPage = this.props.resultsPerPage;
    }

    // Get the offset into the search results (as a positive integer or zero)
    // DEFAULT: 0
    let resultsOffset: number;
    if (parsed.resultsOffset) {
      resultsOffset = parseInt(parsed.resultsOffset, 10);
    }
    if (!resultsOffset || resultsOffset < 0) {
      resultsOffset = 0;
    }

    // Get the facet filters (normalized to an array of FacetFilter objects
    // DEFAULT: []
    let facetFiltersStrings = [];
    if (parsed.facetFilters) {
      // Wrap single strings in an array
      if (typeof parsed.facetFilters === 'string') {
        facetFiltersStrings = [parsed.facetFilters];
      } else {
        facetFiltersStrings = parsed.facetFilters;
      }
    }
    // Deserialize the strings to get FacetFilter objects
    const facetFilters = Searcher.deserializeFacetFilters(facetFiltersStrings);

    // Get the sort order
    // DEFAULT: '.score:DESC'
    let sort;
    if (typeof parsed.sort === 'string') {
      // LJV TODO Validate the sort column and direction
      sort = parsed.sort;
    }
    if (!sort) {
      sort = '.score:DESC';
    }

    // Get the relevancy models to use.
    // DEFAULT: []
    let relevancyModels;
    if (parsed.relevancyModels) {
      if (typeof parsed.relevancyModels === 'string') {
        relevancyModels = [parsed.relevancyModels];
      } else {
        relevancyModels = parsed.relevancyModels;
      }
    }
    if (!relevancyModels) {
      relevancyModels = [];
    }

    // LJV TODO
    // Get the business center profile to use.
    // DEFAULT: none

    // Get the format.
    // DEFAULT: this.props.format
    let format: 'list' | 'usercard' | 'doccard' | 'debug' | 'simple' = this.props.format;
    if (parsed.format === 'list' || parsed.format === 'usercard' || parsed.format === 'doccard' ||
        parsed.format === 'debug' || parsed.format === 'simple') {
      format = parsed.format;
    } else if (parsed.format) {
      console.log(`Searcher was passed unknown list format from the URI: ${parsed.format}. Using default: ${this.props.format}`);
    }

    const result: SearcherState = {
      query,
      queryLanguage,
      geoFilters,
      resultsPerPage,
      resultsOffset,
      facetFilters,
      sort: [sort],
      relevancyModels,
      format,
      haveSearched: this.state.haveSearched, // Make sure we don't change this
    };

    return result;
  }

  /**
   * Reset to the first page and then update the state, re-running the search if one had already been done.
   */
  updateStateResetAndSearch(partialState: any) {
    const newPartialState = Object.assign({}, partialState);
    newPartialState.resultsOffset = 0;
    this.updateStateAndSearch(newPartialState);
  }

  /**
   * Update the state of the searcher and then re-run the search if one had already been done.
   */
  updateStateAndSearch(partialState: any) {
    this.setState(partialState, () => {
      if (this.state.haveSearched) {
        this.doSearch();
      }
    });
  }

  /**
   * Used to tell the search results component which format
   * to use when rendering results.
   */
  updateFormat(newFormat: 'list' | 'usercard' | 'doccard' | 'debug' | 'simple') {
    if (this.state.format !== newFormat) {
      this.updateStateAndSearch({
        format: newFormat,
      });
    }
  }

  /**
   * Update the list of tags for the given document.
   */
  updateTags(tags: Array<string>, docId: string): Promise<any> {
    return this.search.updateRealtimeField(docId, FieldNames.TAGS, tags);
  }

  props: SearcherProps;
  search: Search;

  /**
   * Callback used when the search is completed. Will update the Searcher's state
   * with the query response or the error string passed in.
   */
  updateSearchResults(response: QueryResponse | null, error: string | null) {
    if (response) {
      // Succeeded...
      this.setState({
        response,
        error: undefined,
        haveSearched: true,
      });
    } else if (error) {
      // Failed!
      this.setState({
        response: undefined,
        haveSearched: true,
        error,
      });
    }
  }

  /**
   * Perform a custom search given a query request. Calls the updateResults callback
   * and doesn't affect the state of the searcher itself.
   */
  doCustomSearch(request: SimpleQueryRequest, updateResults: (response: QueryResponse | null, error: string | null) => void) {
    this.search.search(request, updateResults);
  }

  /**
   * Completely reset the searcher to its default state and call an
   * optional callback when done.
   */
  reset(callback: () => void = () => {}) {
    this.setState(this.getDefaultState(), callback);

    const callBackWrapper = () => {
      this.updateStateResetAndSearch(this.getDefaultState());
    };
    this.setState({
      haveSearched: false,
      response: undefined,
      error: undefined,
    }, callBackWrapper);
  }

  /**
   * Trigger a new search.
   *
   * If the search has been reset by one of the other
   * methods, then
   * <ul>
   *  <li>The "haveSearched" flag is reset to false until the search completes</li>
   *  <li>The offset is reset to 0 to show the first page of results</li>
   *  <li>Any facet filters that were applied are cleared.</li>
   *  <li>Any response or error from a previous search are cleared.</li>
   * </ul>
   */
  doSearch() {
    const qr = this.getQueryRequest();
    this.search.search(qr, (response: QueryResponse | null, error: string | null) => {
      this.updateSearchResults(response, error);

      // potentially do window.scrollTo(0, 0)?

      // Update the URL if needed.
      const oldQueryString = this.props.location.query;
      const updatedQueryString = this.generateLocationQueryStringFromState(this.state, oldQueryString);
      if (oldQueryString !== updatedQueryString) {
        this.props.history.push(`?${updatedQueryString}`);
      }
    });
  }

  /**
   * Set the query string to the passed-in value and trigger the
   * query immediately, resetting parameters to the beginning.
   */
  performQueryImmediately(query: string, advanced: boolean = false) {
    this.updateStateResetAndSearch({
      haveSearched: true, // Force it to update right now
      error: undefined,
      response: undefined,
      queryLanguage: advanced ? 'advanced' : 'simple',
      facetFilters: [],
      query,
    });
  }

  /**
   * Set whether the simple or advanced query language should be
   * used to perform the search.
   * This causes subsequent searches to be reset.
   */
  updateQueryLanguage(queryLanguage: 'advanced' | 'simple') {
    if (queryLanguage !== this.state.queryLanguage) {
      this.updateStateResetAndSearch({
        queryLanguage,
      });
    }
  }

  /**
   * Update the query string to use for searching. Don't add this into the
   * URL because we don't want the URL changing as the user types, only when
   * the search button is clicked.
   * This causes subsequent searches to be reset (see doSearch() for details).
   */
  updateQuery(query: string) {
    this.setState({
      haveSearched: false,
      query,
    });
  }

  /**
   * Update the number of documents to show on a page.
   * If there is a current search and the value has changed, the
   * search will be repeated with the new value.
   */
  updateResultsPerPage(newResultsPerPage: number) {
    if (newResultsPerPage !== this.state.resultsPerPage) {
      this.updateStateResetAndSearch({
        resultsPerPage: newResultsPerPage,
      });
    }
  }

  /**
   * Call to change the relevancy model in use by the searcher.
   * If there is a current search and the value has changed, the
   * search will be repeated with the new value.
   */
  updateRelevancyModels(newRelevancyModels: Array<string>) {
    if (JSON.stringify(newRelevancyModels) !== JSON.stringify(this.state.relevancyModels)) {
      this.updateStateResetAndSearch({
        relevancyModels: newRelevancyModels,
      });
    }
  }

  /**
   * Update the searcher to use a new sort column. The value passed
   * in should have the column name and sort direction, separated
   * by a colon (direction is either ASC or DESC).
   * If there is a current search and the value has changed, the
   * search will be repeated with the new value.
   * The search is reset to the first page when performed again.
   */
  updateSort(newSort: string) {
    if (this.newSort !== this.state.sort) {
      let sort = this.state.sort;
      if (sort && sort.length > 0) {
        sort[0] = newSort;
      } else {
        sort = [newSort];
      }
      this.updateStateResetAndSearch({
        sort,
      });
    }
  }

  /**
   * Add a query filter (in AQL) to the query request.
   */
  addGeoFilter(filter: string) {
    this.addGeoFilters([filter]);
  }

  /**
   * Add multiple query filters (in AQL) to the query request.
   */
  addGeoFilters(filters: Array<string>) {
    let geoFilters = this.state.geoFilters.slice();
    geoFilters = geoFilters.concat(filters);
    this.updateStateResetAndSearch({
      geoFilters,
    });
  }

  /**
   * Remove a query filter by name (in AQL) from the query request.
   */
  removeGeoFilter(filter: string) {
    const geoFilters = this.state.geoFilters.slice();
    const index = geoFilters.indexOf(filter);
    if (index !== -1) {
      geoFilters.splice(index, 1);
    }
    this.updateStateResetAndSearch({
      geoFilters,
    });
  }

  /**
   * Add a facet filter to the current search. Will repeat the search
   * if it's already been performed. Note that if a filter for the
   * same facet name already exists, it will be replaced with the
   * new one.
   */
  addFacetFilter(facetName: string, bucketLabel: string, filter: string) {
    const newFF = new FacetFilter();
    newFF.facetName = facetName;
    newFF.bucketLabel = bucketLabel;
    newFF.filter = filter;

    const updatedFacetFilters = [];
    const facetFilters = this.state.facetFilters;
    facetFilters.forEach((facetFilter) => {
      if (facetFilter.facetName !== facetName) {
        updatedFacetFilters.push(facetFilter);
      }
    });
    updatedFacetFilters.push(newFF);
    this.updateStateResetAndSearch({
      facetFilters: updatedFacetFilters,
    });
  }

  /**
   * Remove the specified facet filter from the current
   * search. If a search has already been performed, it
   * will be repeated with the updated set of facet filters.
   */
  removeFacetFilter(removeFilter: FacetFilter) {
    const updatedFacetFilters = [];
    const facetFilters = this.state.facetFilters;
    facetFilters.forEach((facetFilter) => {
      if (facetFilter.facetName !== removeFilter.facetName) {
        updatedFacetFilters.push(facetFilter);
      }
    });
    this.updateStateResetAndSearch({
      facetFilters: updatedFacetFilters,
    });
  }

  /**
   * Navigate to a new page of search results. (Should only actually be
   * called if a search has been completed.) The search will be performed
   * again with the new page's offset.
   */
  changePage(newPage: number) {
    const resultsPerPage = this.state.resultsPerPage;
    const oldOffset = this.state.resultsOffset;
    const newOffset = resultsPerPage * newPage;
    if (newOffset !== oldOffset) {
      this.updateStateAndSearch({
        resultsOffset: newOffset,
      });
    }
  }

  render() {
    // Nothing special to do here. The children will all look at our state to decide what to render
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(Configurable(Searcher));
