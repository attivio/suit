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

import Configurable from '../components/Configurable';
import Configuration from '../components/Configuration';

type SearcherProps = {
  location: PropTypes.object.isRequired;
  history: PropTypes.object.isRequired;
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

type SearcherState = {
  query: string;
  queryLanguage: 'advanced' | 'simple';
  geoFilters: Array<string>;
  resultsPerPage: number;
  haveSearched: boolean;
  resultsOffset: number;
  facetFilters: Array<FacetFilter>;
  sort: Array<string>,
  error?: string;
  response?: QueryResponse;
  relevancyModels: Array<string>;
  format: 'list' | 'usercard' | 'doccard' | 'debug' | 'simple';
};

/**
 * A wrapper for an Attivio search. child components can access it using
 * a property on the React context. See the SearchResults component for an example
 * of how this is done using by defining "static contextTypes" in the component.
 */
class Searcher extends React.Component<SearcherDefaultProps, SearcherProps, SearcherState> {
  static defaultProps = {
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

  static serializeFacetFilters(facetFilters: Array<FacetFilter>): Array<string> {
    return facetFilters.map((facetFilter: FacetFilter): string => {
      return `${facetFilter.facetName},+${facetFilter.bucketLabel},+${facetFilter.filter}`;
    });
  }

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
    const location = this.props.location;
    const search = QueryString.parse(location.search);
    search.geoFilters = search.geoFilters === undefined ? [] : search.geoFilters;
    search.geoFilters = typeof search.geoFilters === 'string' ? [search.geoFilters] : search.geoFilters;
    search.resultsPerPage = search.resultsPerPage ? Number(search.resultsPerPage) : 10;
    search.relevancyModels = typeof search.relevancyModels === 'string' ? [search.relevancyModels] : search.relevancyModels;
    search.sort = typeof search.sort === 'string' ? [search.sort] : search.sort;
    if (search.facetFilters) {
      search.facetFilters = typeof search.facetFilters === 'string' ? [search.facetFilters] : search.facetFilters;
      search.facetFilters = Searcher.deserializeFacetFilters(search.facetFilters);
    }
    this.state = {
      query: search.query || '*:*',
      queryLanguage: search.queryLanguage || this.props.defaultQueryLanguage,
      geoFilters: search.geoFilters || [],
      resultsPerPage: parseInt(search.resultsPerPage, 10) || parseInt(this.props.resultsPerPage, 10) || 10,
      haveSearched: false,
      resultsOffset: parseInt(search.resultsOffset, 10) || 0,
      facetFilters: search.facetFilters || [],
      sort: search.sort || ['.score:DESC'],
      relevancyModels: search.relevancyModels || this.props.relevancyModels || ['default'],
      format: search.format || this.props.format || 'list',
    };
    (this: any).updateQuery = this.updateQuery.bind(this);
    (this: any).updateQueryLanguage = this.updateQueryLanguage.bind(this);
    (this: any).updateFormat = this.updateFormat.bind(this);
    (this: any).changePage = this.changePage.bind(this);
    (this: any).updateResultsPerPage = this.updateResultsPerPage.bind(this);
    (this: any).addFacetFilter = this.addFacetFilter.bind(this);
    (this: any).removeFacetFilter = this.removeFacetFilter.bind(this);
    (this: any).doSearch = this.doSearch.bind(this);
    (this: any).doCustomSearch = this.doCustomSearch.bind(this);
    (this: any).updateSearchResults = this.updateSearchResults.bind(this);
    (this: any).performQueryImmediately = this.performQueryImmediately.bind(this);
  }

  state: SearcherState;

  getChildContext() {
    return {
      searcher: this,
    };
  }

  componentWillMount() {
    this.search = new Search(this.props.baseUri);
    const location = this.props.location;
    const {
      query,
      queryLanguage,
      geoFilters,
      resultsPerPage,
      resultsOffset,
      sort,
      relevancyModels,
      format,
      facetFilters,
    } = this.state;
    const search = Object.assign({}, {
      query,
      queryLanguage,
      geoFilters,
      resultsPerPage,
      resultsOffset,
      sort,
      relevancyModels,
      facetFilters,
      format,
    }, QueryString.parse(location.search));
    if (location.search !== `?${QueryString.stringify(search)}`) {
      location.search = `?${QueryString.stringify(search)}`;
      this.props.history.push(location);
    }
  }

  componentWillReceiveProps(nextProps: SearcherProps) {
    const location = nextProps.location;
    const search = QueryString.parse(location.search);
    const { geoFilters, resultsPerPage, resultsOffset, sort, relevancyModels, facetFilters } = this.state;

    search.geoFilters = search.geoFilters === undefined ? [] : search.geoFilters;
    search.geoFilters = typeof search.geoFilters === 'string' ? [search.geoFilters] : search.geoFilters;
    search.resultsPerPage = search.resultsPerPage ? Number(search.resultsPerPage) : 10;
    search.resultsOffset = search.resultsOffset ? Number(search.resultsOffset) : 0;
    search.relevancyModels = typeof search.relevancyModels === 'string' ? [search.relevancyModels] : search.relevancyModels;
    search.sort = typeof search.sort === 'string' ? [search.sort] : search.sort;

    const doSearch = QueryString.stringify(search) !== QueryString.stringify({
      query: search.query,
      queryLanguage: search.queryLanguage,
      format: search.format,
      geoFilters,
      resultsPerPage,
      resultsOffset,
      sort,
      relevancyModels,
      facetFilters: Searcher.serializeFacetFilters(facetFilters),
    });
    if (search.facetFilters) {
      search.facetFilters = typeof search.facetFilters === 'string' ? [search.facetFilters] : search.facetFilters;
      search.facetFilters = Searcher.deserializeFacetFilters(search.facetFilters);
    } else {
      search.facetFilters = [];
    }
    this.setState(search, () => {
      if (doSearch) {
        const qr = this.getQueryRequest();
        this.search.search(qr, this.updateSearchResults);
      }
    });
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

  updateQueryParams(props: any) {
    const { location } = this.props;
    const search = Object.assign({}, props);
    if (search.facetFilters) {
      search.facetFilters = Searcher.serializeFacetFilters(search.facetFilters);
    }
    location.search = `?${QueryString.stringify(Object.assign(QueryString.parse(location.search), search))}`;
    this.props.history.push(location);
  }

  /**
   * Used to tell the search results component which format
   * to use when rendering results.
   */
  updateFormat(newFormat: 'list' | 'usercard' | 'doccard' | 'debug' | 'simple') {
    const callback = () => {
      this.updateQueryParams({ format: newFormat });
    };
    if (this.state.format !== newFormat) {
      if (this.context && this.context.configuration) {
        this.context.configuration.set('Searcher', {
          format: newFormat,
        }, callback);
      } else {
        callback();
      }
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
   * Callback used when the search is completed.
   */
  updateSearchResults(response: ?QueryResponse, error: ?string) {
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
  doCustomSearch(request: SimpleQueryRequest, updateResults: (response: ?QueryResponse, error: ?string)=>void) {
    this.search.search(request, updateResults);
  }

  /**
   * Completely reset the searcher to its default state and call an
   * optional callback when done.
   */
  reset(callback: () => void = () => {}) {
    const callBackWrapper = () => {
      this.updateQueryParams({
        query: '*:*',
        queryLanguage: this.props.defaultQueryLanguage,
        resultsPerPage: this.props.resultsPerPage ? this.props.resultsPerPage : 10,
        resultsOffset: 0,
        sort: ['.score:DESC'],
        facetFilters: [],
        format: 'list',
      });
      callback();
    };
    this.setState({
      haveSearched: false,
      error: undefined,
      response: undefined,
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
    this.search.search(qr, this.updateSearchResults);
  }

  /**
   * Set the query string to the passed-in value and trigger the
   * query immediately, resetting parameters to the beginning.
   */
  performQueryImmediately(query: string, advanced: boolean = false) {
    this.setState({
      haveSearched: true,
      error: undefined,
      response: undefined,
      query,
    }, () => {
      const qr = this.getQueryRequest();
      qr.facetFilters = [];
      qr.restParams.set('offset', [`${0}`]);
      // If requested, force an advanced query (we always do this, e.g.,
      // for more-like-this queries, regardless of the searcher's state)
      if (advanced) {
        qr.queryLanguage = 'advanced';
      }
      this.search.search(qr, this.updateSearchResults);
      window.scrollTo(0, 0);
    });
  }

  /**
   * Set whether the simple or advanced query language should be
   * used to perform the search.
  * This causes subsequent searches to be reset (see doSearch() for details).
   */
  updateQueryLanguage(queryLanguage: 'advanced' | 'simple') {
    if (queryLanguage !== this.state.queryLanguage) {
      this.setState({
        haveSearched: false,
      }, () => {
        this.updateQueryParams({ queryLanguage });
      });
    }
  }

  /**
   * Update the query string to use for searching.
   * This causes subsequent searches to be reset (see doSearch() for details).
   */
  updateQuery(query: string) {
    this.updateQueryParams({ query });
  }

  /**
   * Update the number of documents to show on a page.
   * This causes the current search to be reperformed with the new value.
   */
  updateResultsPerPage(newResultsPerPage: number) {
    const callback = () => {
      this.updateQueryParams({ resultsPerPage: newResultsPerPage });
    };
    if (this.context && this.context.configuration) {
      this.context.configuration.set('Searcher', {
        resultsPerPage: newResultsPerPage,
      }, callback);
    } else {
      callback();
    }
  }

  /**
   * Call to change the relevancy model in use for the searcher.
   * Will repeat the current search, if any has been done.
   */
  updateRelevancyModels(newRelevancyModels: Array<string>) {
    if (JSON.stringify(newRelevancyModels) !== JSON.stringify(this.state.relevancyModels)) {
      this.updateQueryParams({ relevancyModels: newRelevancyModels });
    }
  }

  /**
   * Update the searcher to use a new sort column. The value passed
   * in should have the column name and sort direction, separated
   * by a colon (direction is either ASC or DESC).
   */
  updateSort(newSort: string) {
    let sort = this.state.sort;
    if (sort && sort.length > 0) {
      sort[0] = newSort;
    } else {
      sort = [newSort];
    }
    this.setState({
      haveSearched: true,
    }, () => {
      this.updateQueryParams({ sort, resultsOffset: 0 });
    });
  }

  /**
   * Add a query filter (in AQL) to the query request.
   */
  addGeoFilter(filter: string) {
    const geoFilters = this.state.geoFilters.slice();
    if (geoFilters.indexOf(filter) === -1) {
      geoFilters.push(filter);
    }
    this.updateQueryParams({ geoFilters });
  }

  /**
   * Add multiple query filters (in AQL) to the query request.
   */
  addGeoFilters(filters: Array<string>) {
    let geoFilters = this.state.geoFilters.slice();
    geoFilters = geoFilters.concat(filters);
    this.updateQueryParams({ geoFilters });
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
    this.updateQueryParams({ geoFilters });
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
    this.updateQueryParams({ resultsOffset: 0, facetFilters: updatedFacetFilters });
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
    this.updateQueryParams({ resultsOffset: 0, facetFilters: updatedFacetFilters });
  }

  /**
   * Navigate to a new page. If a search has been completed,
   * the search's results for the new page will be displayed.
   */
  changePage(newPage: number) {
    const resultsPerPage = this.state.resultsPerPage;
    const newOffset = resultsPerPage * newPage;
    this.updateQueryParams({ resultsOffset: newOffset });
    if (this.state.haveSearched) {
      this.doSearch();
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(Configurable(Searcher));
