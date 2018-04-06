// @flow
import React from 'react';
import type { Children } from 'react';

import PropTypes from 'prop-types';

import QueryResponse from '../api/QueryResponse';
import FacetFilter from '../api/FacetFilter';

type DummySearcherProps = {
  defaultRelevancyModels: Array<string>;
  defaultQueryLanguage: 'simple' | 'advanced';
  defaultFormat: 'list' | 'usercard' | 'doccard' | 'debug' | 'simple';
  defaultResultsPerPage: number;
  defaultBusinessCenterProfile: string | null;
  defaultSort: Array<string>;
  defaultQuery: string;
  defaultQueryResponse: QueryResponse | null;
  defaultError: string | null;
  children: Children;
};

type DummySearcherDefaultProps = {
  defaultRelevancyModels: Array<string>;
  defaultQueryLanguage: 'simple' | 'advanced';
  defaultFormat: 'list' | 'usercard' | 'doccard' | 'debug' | 'simple';
  defaultResultsPerPage: number;
  defaultBusinessCenterProfile: string | null;
  defaultSort: Array<string>;
  defaultQuery: string;
  defaultQueryResponse: QueryResponse | null;
  defaultError: string | null;
};

type DummySearcherState = {
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
  businessCenterProfile: string | null;
};

/**
 * A dummy version of the Searcher component, used only for wrapping
 * Searcher-dependent components in the style guide.
 *
 * This isn't included in the index.js for SUIT because
 * YOU DO NOT WANT TO USE THIS COMPONENT IN YOUR APPLICATIONS!
 */
export default class DummySearcher extends React.Component<DummySearcherDefaultProps, DummySearcherProps, DummySearcherState> {
  static defaultProps = {
    defaultRelevancyModels: ['default'],
    defaultQueryLanguage: 'simple',
    defaultFormat: 'list',
    defaultResultsPerPage: 10,
    defaultBusinessCenterProfile: null,
    defaultSort: ['.score:DESC'],
    defaultQuery: '*:*',
    defaultQueryResponse: null,
    defaultError: null,
  };

  static childContextTypes = {
    searcher: PropTypes.any,
  }

  constructor(props: DummySearcherProps) {
    super(props);
    this.state = this.getDefaultState();
  }

  state: DummySearcherState;

  getChildContext() {
    return {
      searcher: this,
    };
  }

  getDefaultState(): DummySearcherState {
    return {
      haveSearched: false,
      query: this.props.defaultQuery,
      queryLanguage: this.props.defaultQueryLanguage,
      sort: this.props.defaultSort,
      relevancyModels: this.props.defaultRelevancyModels,
      facetFilters: [],
      geoFilters: [],
      resultsPerPage: this.props.defaultResultsPerPage,
      resultsOffset: 0,
      format: this.props.defaultFormat,
      businessCenterProfile: this.props.defaultBusinessCenterProfile,
    };
  }

 /**
   * Used to tell the search results component which format
   * to use when rendering results.
   */
  updateFormat(newFormat: 'list' | 'usercard' | 'doccard' | 'debug' | 'simple') {
    if (this.state.format !== newFormat) {
      this.setState({
        format: newFormat,
      });
    }
  }

  /**
   * Perform a custom search given a query request. Calls the updateResults callback
   * and doesn't affect the state of the DummySearcher itself.
   */
  doCustomSearch(request: any, updateResults: (response: QueryResponse | null, error: string | null) => void) {
    updateResults(this.props.defaultQueryResponse, this.props.defaultError);
  }

  /**
   * Completely reset the DummySearcher to its default state and call an
   * optional callback when done.
   */
  reset(callback: () => void = () => { }) {
    this.setState(this.getDefaultState(), () => { callback(); });
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
    if (this.props.defaultQueryResponse) {
      this.setState({
        haveSearched: true,
        response: this.props.defaultQueryResponse,
        error: undefined,
      });
    } else if (this.props.defaultError) {
      this.setState({
        haveSearched: true,
        response: undefined,
        error: this.props.defaultError,
      });
    }
  }

  /**
   * Set the query string to the passed-in value and trigger the
   * query immediately, resetting parameters to the beginning.
   */
  performQueryImmediately() {
    this.doSearch();
  }

  /**
   * Set whether the simple or advanced query language should be
   * used to perform the search.
   * This causes subsequent searches to be reset.
   */
  updateQueryLanguage(queryLanguage: 'advanced' | 'simple') {
    if (queryLanguage !== this.state.queryLanguage) {
      this.setState({
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
      this.setState({
        haveSearched: false,
        response: undefined,
        error: undefined,
        resultsOffset: 0,
        resultsPerPage: newResultsPerPage,
      });
    }
  }

  /**
   * Call to change the relevancy model in use by the DummySearcher.
   * If there is a current search and the value has changed, the
   * search will be repeated with the new value.
   */
  updateRelevancyModels(newRelevancyModels: Array<string>) {
    if (JSON.stringify(newRelevancyModels) !== JSON.stringify(this.state.relevancyModels)) {
      this.setState({
        haveSearched: false,
        response: undefined,
        error: undefined,
        resultsOffset: 0,
        relevancyModels: newRelevancyModels,
      });
    }
  }

  /**
   * Update the DummySearcher to use a new sort column. The value passed
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
      this.setState({
        haveSearched: false,
        response: undefined,
        error: undefined,
        resultsOffset: 0,
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
    this.setState({
      haveSearched: false,
      response: undefined,
      error: undefined,
      resultsOffset: 0,
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
    this.setState({
      haveSearched: false,
      response: undefined,
      error: undefined,
      resultsOffset: 0,
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
    this.setState({
      haveSearched: false,
      response: undefined,
      error: undefined,
      resultsOffset: 0,
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
    this.setState({
      haveSearched: false,
      response: undefined,
      error: undefined,
      resultsOffset: 0,
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
      this.setState({
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
