// @flow
import React from 'react';
import type { Children } from 'react';
import PropTypes from 'prop-types';
import { RootCloseWrapper } from 'react-overlays';

import MenuItem from 'react-bootstrap/lib/MenuItem';
import Configurable from './Configurable';
import QueryResponse from '../api/QueryResponse';
import SimpleQueryRequest from '../api/SimpleQueryRequest';
import ObjectUtils from '../util/ObjectUtils';
import SearchFacetBucket from '../api/SearchFacetBucket';

type FacetSearchBarProps = {
  /** Whether the FacetSearchBar should be shown */
  showSearchBar: boolean;
  /** A placeholder for the facet search field */
  placeholder: string;
  /** The label to show on the search button. Defaults to "Search." */
  buttonLabel: string;
  /** The name of the facet being searched */
  name: string;
  /** Callback to add a filter for this facet */
  addFacetFilter: (bucket: SearchFacetBucket) => void;
  /** Max number of matching facet values to show */
  maxValues: number;
  /** Content to show for the actual facet stuff (typically a ListFacetContents) */
  children: Children;
  /**
   * Whether the export button should be shown to allow exporting all the facet
   * values as a CSV file
   */
  showExportButton: boolean;
  /** The label for the export button */
  exportButtonLabel: string;
};

type FacetSearchBarDefaultProps = {
  placeholder: string;
  buttonLabel: string;
  name: string;
  maxValues: number;
  showSearchBar: boolean;
  showExportButton: boolean;
  exportButtonLabel: string;
};

type FacetSearchBarState = {
  query: string;
  suggestions: Array<SearchFacetBucket>;
  facetValue: string;
  error: string | null;
}

/**
 * Component that wraps a Facet that allows searching for specific values for that facet,
 * as well as exporting that facet's values to a CSV
 */
class FacetSearchBar extends React.Component<FacetSearchBarDefaultProps, FacetSearchBarProps, FacetSearchBarState> {
  static contextTypes = {
    searcher: PropTypes.any,
  };

  static defaultProps: FacetSearchBarDefaultProps = {
    placeholder: 'Search facet values\u2026',
    buttonLabel: 'Search',
    name: '*',
    maxValues: 5,
    showSearchBar: false,
    showExportButton: false,
    exportButtonLabel: 'Export facet as CSV\u2026',
  };

  static displayName = 'FacetSearchBar';

  /**
   * Generate a string with the the CSV representation of the facet value data.
   */
  static convertArrayOfObjectsToCSV(data: Array<Map<string, Object>>, columnDelimiter: string = ',', lineDelimiter: string = '\n') {
    if (data === null || !data.length) {
      return null;
    }

    // Create the header row of the CSV
    const keys = Array.from(data[0].keys());
    const header = keys.join(columnDelimiter);

    // Populate the rows of the CSV
    const rows = data.map((item: Map<string, Object>) => {
      // Get the values for each data row from the map
      const rowValues = keys.map((key: string) => {
        return item.get(key);
      });
      // Concatenate the values, separated by the column delimiter
      return rowValues.join(columnDelimiter);
    });
    // Add the header to the beginning of the rows
    rows.unshift(header);

    // Concatenate the rows, separated by the line delimiter
    return `${header}${lineDelimiter}${rows.join(lineDelimiter)}`;
  }

  constructor(props: FacetSearchBarProps) {
    super(props);
    this.state = {
      query: '',
      suggestions: [],
      facetValue: '',
      error: null,
    };
    (this: any).doKeyPress = this.doKeyPress.bind(this);
    (this: any).doSearch = this.doSearch.bind(this);
    (this: any).queryChanged = this.queryChanged.bind(this);
    (this: any).addFilter = this.addFilter.bind(this);
    (this: any).handleSearchResults = this.handleSearchResults.bind(this);
    (this: any).closeMenu = this.closeMenu.bind(this);
  }

  state: FacetSearchBarState;

  /**
   * Generates a list of menu items to show for the Facet values that match the query,
   * based on values currently set on this.state.suggestions.
   */
  getSuggestionList() {
    if (!this.state.suggestions || this.state.suggestions.length === 0) {
      return null;
    }
    let suggestionsAdded = 0;
    const contents = this.state.suggestions.map((suggestion: SearchFacetBucket, index: number) => {
      let include = suggestion.displayLabel().length >= this.state.query.length;
      include = include && suggestion.displayLabel().toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1;
      let returnVal = '';
      if (include && suggestionsAdded < this.props.maxValues) {
        suggestionsAdded += 1;
        returnVal = (
          <button
            className={'facet-suggestion'}
            key={suggestionsAdded}
            onClick={() => { return this.addFilter(index); }}
            style={{ width: '100%', textAlign: 'left', borderWidth: '0px', backgroundColor: '#FFFFFF' }}
          >
            <MenuItem eventKey={index} key={suggestionsAdded} onSelect={this.addFilter} tabIndex={index}>
              {`${suggestion.displayLabel()} (${suggestion.count})`}
            </MenuItem>
          </button>);
      }
      return returnVal;
    });
    if (contents.length > 0) {
      return (
        <div
          className={'facet-suggestion'}
          style={{ width: '100%', border: '1px solid #D2D2D2', borderTop: 'none', passingTop: '11px', position: 'absolute' }}
        >
          <ul role="menu" style={{ marginBottom: 0 }}>
            {contents}
          </ul>
        </div>
      );
    }
    return null;
  }

  /**
   * Calls the function to fire off the query, then maps the results
   * into a format ready to be written to CSV
   */
  getAllFacetValues(callback: (data: Array<Map<string, Object>>) => void) {
    function localCallback(qr: ?QueryResponse, error: ?string) {
      if (qr) {
        const facets = qr.facets[0].buckets;
        const response = facets.map((facet: SearchFacetBucket) => {
          return ObjectUtils.toMap({ 'Facet Value': facet.displayLabel(), 'Document Count': facet.count });
        });
        callback(response);
      } else if (error) {
        // Failed!
      }
      return [];
    }
    this.doConfiguredSearch('*', -1, localCallback, this.context.searcher);
  }

  closeMenu() {
    this.setState({
      suggestions: [],
      error: '',
    });
  }

  /**
    * Handles when a user clicks on a facet value from the suggestion list.
    */
  addFilter(eventKey) {
    this.props.addFacetFilter(this.state.suggestions[eventKey]);
    this.setState({ suggestions: [], query: '' });
  }

  /**
   * Handles the results and sets the facets to state.
   */
  handleSearchResults(response: ?QueryResponse, error: ?string) {
    if (response) {
      const facets = response.facets[0].buckets;
      this.setState({ suggestions: facets });
    } else if (error) {
      // Failed!
      this.setState({
        suggestions: [],
        error,
      });
    }
  }

  /**
   * Fires off the search for the matching facet values, while respecting the query
   * and filters the user has already entered.
   */
  doConfiguredSearch(queryTerm: string, maxBuckets: number, callback, searcher) {
    if (searcher) {
      const searchTerm = searcher.state.query;
      const simpleQR = new SimpleQueryRequest();
      simpleQR.query = searchTerm;
      simpleQR.facets = [`${this.props.name}(maxBuckets=${maxBuckets})`];
      simpleQR.facetFilters = searcher.state.facetFilters;
      simpleQR.filters = [];
      if (searcher.getQueryRequest().filters && searcher.getQueryRequest().filters.length > 0) {
        Array.prototype.push.apply(simpleQR.filters, searcher.getQueryRequest().filters);
      }
      simpleQR.filters.push(`${this.props.name}:${queryTerm}`);
      simpleQR.rows = 0;
      simpleQR.queryLanguage = 'simple';
      simpleQR.workflow = searcher.getQueryRequest().workflow;

      searcher.doCustomSearch(simpleQR, callback);
    }
  }

  /**
   * Called when the user wants to search (hits enter or clicks search).
   */
  doSearch() {
    const callback = this.handleSearchResults;
    this.doConfiguredSearch(`${this.state.facetValue}*`, this.props.maxValues * 2, callback, this.context.searcher); // `
  }

  /**
   * Handles when the user updates the query for this facet.
   */
  queryChanged(e: Event) {
    if (e.target instanceof HTMLInputElement) {
      const newQuery = e.target.value;
      this.setState({ facetValue: newQuery, query: newQuery });
    }
  }

  /**
   * Exports all values and counts for the facet to CSV.
   */
  downloadCSV() {
    const callback = (data: Array<Map<string, Object>>) => {
      const csv = FacetSearchBar.convertArrayOfObjectsToCSV(data);
      if (csv !== null) {
        const filename = `${this.props.name}_facet_values.csv`;
        // Make the CSV data into a data URI
        const encodedData = encodeURI(`data:text/csv;charset=utf-8,${csv}`);

        const link = document.createElement('a');
        link.setAttribute('href', encodedData);
        link.setAttribute('download', filename);
        link.click();
      }
    };
    this.getAllFacetValues(callback);
  }

  /**
   * Called when a user presses a key.
   */
  doKeyPress(e: Event) {
    // If the user presses enter, do the search
    if (e.target instanceof HTMLInputElement && e.keyCode) {
      if (e.keyCode === 13) {
        this.doSearch();
      }
    }
  }

  render() {
    const inputClass = 'form-control facet-search-bar';
    const query = this.state.query;
    const placeholder = this.props.placeholder;
    const suggestionList = this.getSuggestionList();
    // Only show the search button once the user has typed something in the field
    const searchButton = this.state.facetValue === '' ? null : (
      <button
        type="submit"
        className="btn attivio-globalmast-search-submit"
        style={{
          paddingLeft: '4px',
          paddingRight: '4px',
          height: 'calc(100% - 7px)',
          lineHeight: 'calc(100% - 7px)',
        }}
        onClick={this.doSearch}
      >
        {this.props.buttonLabel}
      </button>
    );
    const inputComponent = this.props.showSearchBar ? (
      <div className="attivio-globalmast-search" role="search" style={{ display: 'inline-block' }}>
        <div className="form-group" style={{ position: 'relative' }}>
          <input
            type="search"
            className={inputClass}
            placeholder={placeholder}
            onChange={this.queryChanged}
            onKeyDown={this.doKeyPress}
            value={query}
            style={{ minWidth: '300px', paddingRight: '75px', height: '1.75em' }}
          />
          {searchButton}
        </div>
        {suggestionList}
      </div>) : null;

    const exportButton = this.props.showExportButton ? (
      <div>
        <a
          className="attivio-facet-more attivio-more"
          onClick={() => { return this.downloadCSV(); }}
          role="button"
          tabIndex={0}
          style={{ fontSize: '12px' }}
        >
          {this.props.exportButtonLabel}
        </a>
      </div>) : null;

    return (
      <RootCloseWrapper
        onRootClose={this.closeMenu}
      >
        <div>
          {inputComponent}
          {this.props.children}
          {exportButton}
        </div>
      </RootCloseWrapper>
    );
  }
}

export default Configurable(FacetSearchBar);
