// @flow

import React from 'react';
import PropTypes from 'prop-types';

import NavbarSearch from '../components/NavbarSearch';
import SearchResults from '../components/SearchResults';
import SearchResultsCount from '../components/SearchResultsCount';
import ObjectUtils from '../util/ObjectUtils';

export default class MiniSearchUI extends React.Component<void, {}, void> {
  static contextTypes = {
    searcher: PropTypes.any,
  };

  render() {
    return (
      <div style={{ minHeight: '50vh' }}>
        <NavbarSearch onSearch={this.context.searcher.doSearch} updateSearchString={this.context.searcher.updateQuery} value={this.context.searcher.state.query} />
        <SearchResultsCount />
        <SearchResults format="simple" entityFields={ObjectUtils.toMap([])} />
      </div>
    );
  }
}
