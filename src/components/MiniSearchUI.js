// @flow

import React from 'react';
import PropTypes from 'prop-types';

import NavbarSearch from '../components/NavbarSearch';
import SearchResults from '../components/SearchResults';
import Scrollable from '../components/Scrollable';
import SearchResultsCount from '../components/SearchResultsCount';
import ObjectUtils from '../util/ObjectUtils';

type MiniSearchUIProps = {
  /**
   * The scale factor for the mini UI. Defaults to 100%.
   */
  scale: number;
};

type MiniSearchUIDefaultProps = {
  scale: number;
};

export default class MiniSearchUI extends React.Component<MiniSearchUIDefaultProps, MiniSearchUIProps, void> {
  static defaultProps = {
    scale: 1.0,
  };

  static contextTypes = {
    searcher: PropTypes.any,
  };

  render() {
    return (
      <div style={{ minHeight: '50vh' }}>
        <NavbarSearch onSearch={this.context.searcher.doSearch} updateSearchString={this.context.searcher.updateQuery} value={this.context.searcher.state.query} />
        <SearchResultsCount />
        <Scrollable
          style={{
            height: '300px',
            width: '100%',
          }}
        >
          <SearchResults
            format="simple"
            entityFields={ObjectUtils.toMap([])}
            style={{
              transform: `scale(${this.props.scale}, ${this.props.scale})`,
            }}
          />
        </Scrollable>
      </div>
    );
  }
}
