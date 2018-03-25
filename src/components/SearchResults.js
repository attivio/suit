// @flow
import React from 'react';
import PropTypes from 'prop-types';

import FieldNames from '../api/FieldNames';

import SearchResult from './SearchResult';
import SearchDocument from '../api/SearchDocument';

type SearchResultsProps = {
  /**
   * Optional. The location of the node through which to interact with Attivio.
   * Defaults to the value in the configuration.
   */
  baseUri: string;
  /** The format to use for displaying the individual documents. */
  format: 'list' | 'usercard' | 'doccard' | 'debug' | 'simple';
  /**
   * Whether or not the documents’ relevancy scores should be displayed.
   * Defaults to false.
   */
  showScores: boolean;
  /**
   * A map of the field names to the label to use for any entity fields.
   * Defaults to show the people, locations, and companies entities.
   */
  entityFields: Map<string, string>;
  /** Whether tags should be shown in the UI or not. Defaults to true. */
  showTags: boolean;
  /** Whether star ratings should be shown in the UI or not. Defaults to true. */
  showRatings: boolean;
  /** A style to apply to the results list */
  style: ?any;
};

type SearchResultsDefaultProps = {
  baseUri: string;
  format: 'list' | 'usercard' | 'doccard' | 'debug' | 'simple';
  showScores: boolean;
  entityFields: Map<string, string>;
  showTags: boolean;
  showRatings: boolean;
};

/**
 * A container for showing a list of documents from the search results.
 * This comes from the parent Searcher component.
 */
export default class SearchResults extends React.Component<SearchResultsDefaultProps, SearchResultsProps, void> {
  static defaultProps = {
    baseUri: '',
    format: 'list',
    showScores: false,
    entityFields: new Map([['people', 'People'], ['locations', 'Locations'], ['companies', 'Companies']]),
    showTags: true,
    showRatings: true,
  };

  static contextTypes = {
    searcher: PropTypes.any,
  };

  renderResults() {
    const searcher = this.context.searcher;
    const response = searcher.state.response;
    const offset = searcher.state.resultsOffset;
    if (response && response.documents && response.documents.length > 0) {
      const documents = response.documents;
      const results = [];
      documents.forEach((document: SearchDocument, index: number) => {
        const key = document.getFirstValue(FieldNames.ID);
        const position = offset + index + 1;
        results.push(
          <SearchResult
            document={document}
            format={this.props.format}
            position={position}
            key={key}
            showScores={this.props.showScores}
            entityFields={this.props.entityFields}
            baseUri={this.props.baseUri}
            showRatings={this.props.showRatings}
            showTags={this.props.showTags}
          />,
        );
      });
      return results;
    }
    return null;
  }

  render() {
    const baseStyle = this.props.style ? this.props.style : {};
    const s = Object.assign({}, baseStyle, {
      listStyle: 'none',
      paddingLeft: 0,
    });

    return (
      <ul style={s}>
        {this.renderResults()}
      </ul>
    );
  }
}
