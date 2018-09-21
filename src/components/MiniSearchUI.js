// @flow

import React from 'react';
import PropTypes from 'prop-types';

import NavbarSearch from '../components/NavbarSearch';
import SearchResults from '../components/SearchResults';
import Scrollable from '../components/Scrollable';
import SearchResultsCount from '../components/SearchResultsCount';
import ObjectUtils from '../util/ObjectUtils';
import QueryResponse from '../api/QueryResponse';

type MiniSearchUIProps = {
  /**
   * A scale (1.0 = 100%) to use when rendering the search results part of
   * the MiniSearchUI. Optional—defaults to 100%.
   */
  scale: number;
  onSearch?: (q: string) => void;
  updateQuery?: (q: string) => void;
  response?: QueryResponse;
  error?: string | null;
};

type MiniSearchUIDefaultProps = {
  scale: number;
};

type MiniSearchUIState = {
  query: string;
}

/**
 * A miniature, self-contained component that presentds super simple search UI including a text field for the
 * query, an indication of the number or results or error from the wuery, and a small, scrollable results area
 * showing the resulting documents. It must be nested inside a Searcher component and will use that parent
 * Searcher to manage its state.
 */
export default class MiniSearchUI extends React.Component<MiniSearchUIDefaultProps, MiniSearchUIProps, MiniSearchUIState> {
  static defaultProps = {
    scale: 1.0,
  };

  static contextTypes = {
    searcher: PropTypes.any,
  };

  static displayName = 'MiniSearchUI';

  constructor(props: MiniSearchUIProps) {
    super(props);
    this.state = {
      query: '*',
    };
    (this: any).doSearch = this.doSearch.bind(this);
    (this: any).updateSearchQuery = this.updateSearchQuery.bind(this);
  }

  doSearch() {
    if (this.props.onSearch) {
      this.props.onSearch(this.state.query);
    } else {
      const searcher = this.context.searcher;
      searcher.doSearch();
    }
  }

  updateSearchQuery(query: string) {
    if (this.props.updateQuery) {
      this.props.updateQuery(query);
    } else {
      const searcher = this.context.searcher;
      searcher.updateQuery(query);
    }
    this.setState({ query });
  }

  render() {
    return (
      <div style={{ minHeight: '50vh' }}>
        <NavbarSearch
          onSearch={this.doSearch}
          updateSearchString={this.updateSearchQuery}
          value={this.state.query}
          style={{
            marginLeft: '8px',
          }}
        />
        <SearchResultsCount
          style={{ marginLeft: '20px', paddingBottom: '8px' }}
          response={this.props.response}
          error={this.props.error}
        />
        <Scrollable
          style={{
            height: '428px',
            width: '100%',
            borderTop: '1px solid #ccc',
            borderRight: '1px solid #ccc',
            borderLeft: '1px solid #ccc',
          }}
        >
          <SearchResults
            format="simple"
            entityFields={ObjectUtils.toMap([])}
            style={{
              transform: `scale(${this.props.scale}, ${this.props.scale})`,
            }}
            response={this.props.response}
          />
        </Scrollable>
      </div>
    );
  }
}
