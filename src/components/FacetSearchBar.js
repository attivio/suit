// @flow
import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Configurable from './Configurable';
import SimpleQueryRequest from '../api/SimpleQueryRequest';
import SearchFacetBucket from '../api/SearchFacetBucket';

type FacetSearchBarProps = {
  placeholder: PropTypes.string.isRequired;
  /** The label to show on the search button. Defaults to "Go". */
  buttonLabel: PropTypes.string.isRequired;
  name: PropTypes.string.isRequired;
  /** Callback to add a filter for this facet. */
  addFacetFilter: (bucket: SearchFacetBucket) => void;
  maxValues: number;
  childProps: Object | null;
  showSearchBar: boolean;
  showExportButton: boolean;
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
  recognizing: boolean;
  suggestions: Array<SearchFacetBucket>;
  facetValue: string;
  error: string;
}

/**
 * Component to include in the Masthead for entering the query
 * to use when searching. Must be inside a Searcher component.
 */
class FacetSearchBar extends React.Component<FacetSearchBarDefaultProps, FacetSearchBarProps, FacetSearchBarState> {
  static contextTypes = {
    searcher: PropTypes.any,
  };

  static defaultProps: FacetSearchBarDefaultProps = {
    placeholder: 'Search Facet Values',
    buttonLabel: 'Search',
    name: '*',
    maxValues: 5,
    showSearchBar: true,
    showExportButton: true,
    exportButtonLabel: 'Export',
  };

  static convertArrayOfObjectsToCSV(args) {
    let result = '';
    let columnDelimiter = ',';
    let lineDelimiter = '\n';

    if (args.columnDelimiter && args.lineDelimiter) {
      columnDelimiter = args.columnDelimiter;
      lineDelimiter = args.lineDelimiter;
    }

    const data = args.data || null;

    if (data == null || !data.length) {
      return null;
    }

    const keys = Object.keys(data[0]);

    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    let ctr = 0;
    data.forEach((item) => {
      ctr = 0;
      if (keys && keys.length > 0) {
        keys.forEach((key) => {
          if (ctr > 0) result += columnDelimiter;

          result += item[key];
          ctr += 1;
        });
        result += lineDelimiter;
      }
    });

    return result;
  }

  constructor(props: FacetSearchBarProps) {
    super(props);
    this.state = {
      query: '',
      recognizing: false,
      suggestions: [],
      facetValue: '',
      error: null,
    };
    (this: any).doKeyPress = this.doKeyPress.bind(this);
    (this: any).doSearch = this.doSearch.bind(this);
    (this: any).queryChanged = this.queryChanged.bind(this);
    (this: any).updateQuery = this.updateQuery.bind(this);
    (this: any).addFilter = this.addFilter.bind(this);
    (this: any).handleSearchResults = this.handleSearchResults.bind(this);
  }

  state: FacetSearchBarState;

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
            style={{ width: '300px', textAlign: 'left', borderWidth: '0px', backgroundColor: '#FFFFFF' }}
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
        <div className={'facet-suggestion'} style={{ width: '300px', border: '1px solid #D2D2D2', passingTop: '11px' }}>
          <ul role="menu">
            {contents}
          </ul>
        </div>
      );
    }
    return null;
  }

  getAllFacetValues(callback) {
    function localCallback(qr: ?QueryResponse, error: ?string) {
      if (qr) {
        const facets = qr.facets[0].buckets;
        const response = [];
        facets.map((facet: Object) => {
          response.push({ 'Facet Value': facet.displayLabel(), 'Document Count': facet.count });
          return '';
        });
        callback(response);
      } else if (error) {
        // Failed!
      }
      return [];
    }
    this.doConfiguredSearch('*', -1, localCallback, this.context.searcher);
  }

  addFilter(eventKey) {
    this.props.addFacetFilter(this.state.suggestions[eventKey]);
    this.setState({ suggestions: [], query: '' });
  }

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

  doSearch() {
    const callback = this.handleSearchResults;
    this.doConfiguredSearch(`${this.state.facetValue}*`, this.props.maxValues * 2, callback, this.context.searcher);
  }

  queryChanged(e: Event) {
    if (e.target instanceof HTMLInputElement) {
      const newQuery = e.target.value;
      this.setState({ facetValue: newQuery, query: newQuery });
    }
  }

  updateQuery(newQuery: string, doSearch: boolean = false) {
    if (doSearch) {
      this.setState({ facetValue: newQuery, query: newQuery }, this.doSearch());
    } else {
      this.setState({ facetValue: newQuery, query: newQuery });
    }
  }

  downloadCSV(args) {
    const callback = (data) => {
      let csv = FacetSearchBar.convertArrayOfObjectsToCSV({ data });
      if (csv == null) return;

      const filename = args.filename || `${this.props.name}_facet_values.csv`;

      if (!csv.match(/^data:text\/csv/i)) {
        csv = `data:text/csv;charset=utf-8,${csv}`;
      }
      const encodedData = encodeURI(csv);

      const link = document.createElement('a');
      link.setAttribute('href', encodedData);
      link.setAttribute('download', filename);
      link.click();
    };
    this.getAllFacetValues(callback);
  }

  doKeyPress(e: Event) {
    // If the user presses enter, do the search
    if (e.target instanceof HTMLInputElement && e.keyCode) {
      if (e.keyCode === 13) {
        this.doSearch();
      }
    }
  }

  submitButton: ?HTMLButtonElement;
  advancedMenuItem: ?HTMLSpanElement;
  simpleMenuItem: ?HTMLSpanElement;

  render() {
    const additionalContent = this.props.childProps ? this.props.childProps : '';
    const containerClass = 'attivio-globalmast-search-container';
    const inputClass = 'form-control attivio-globalmast-search-input facet-search-bar';
    const query = this.state.query;
    const placeholder = this.props.placeholder;
    const suggestionList = this.getSuggestionList();
    const inputComponent = this.props.showSearchBar ? (
      <div className="attivio-globalmast-search" role="search" style={{ display: 'inline-block' }}>
        <div className="form-group">
          <input
            type="search"
            className={inputClass}
            placeholder={placeholder}
            onChange={this.queryChanged}
            onKeyDown={this.doKeyPress}
            value={query}
            style={{ minWidth: '300px' }}
          />
          <button
            type="submit"
            className="btn attivio-globalmast-search-submit"
            onClick={this.doSearch}
            style={{ height: '25px' }}
            ref={(c) => { this.submitButton = c; }}
          >
            {this.props.buttonLabel}
          </button>
        </div>
        {suggestionList}
      </div>) : '';

    const buttonContent = this.props.showExportButton ? (
      <div>
        <button
          id={this.props.name}
          className="btn attivio-globalmast-search-submit"
          style={{ height: '25px', position: 'relative' }}
          href="#"
          onClick={() => { return this.downloadCSV({}); }}
        >
          { this.props.exportButtonLabel }
        </button>
      </div>) : '';

    return (
      <div className={containerClass}>
        { inputComponent }
        { additionalContent }
        { buttonContent }
      </div>
    );
  }
}

export default Configurable(FacetSearchBar);
