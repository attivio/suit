// @flow
import * as React from 'react';
import PropTypes from 'prop-types';

import FieldNames from '../api/FieldNames';

import DebugSearchResult from './DebugSearchResult';
import ListSearchResult from './ListSearchResult';
import SimpleSearchResult from './SimpleSearchResult';
import SearchDocument from '../api/SearchDocument';

/**
 * This is the definition of a search result renderer. It is passed the document
 * for the result, the document's position in the search results, and a base URI
 * that can be used when linking, etc. It should return either a React component
 * that will be rendered for the document (the component returned should have its
 * key set to the key parameter) or null if the document shouldn't be
 * rendered by this function. If no SearchResultRenderer functions handle the
 * rendering, then the document will be rendered by the 'list' renderer.
 */
export type SearchResultRenderer = (doc: SearchDocument, position: number, baseUri: string, key: string) => any;

type SearchResultsProps = {
  /**
   * Optional. The location of the node through which to interact with Attivio.
   * Defaults to the value in the configuration.
   */
  baseUri: string;
  /**
   * This controls how the document is rendered. If can be a single SearchResultRenderer or an
   * array of SearchResultRenderers. If an array, then each function is called in turn
   * until the document has been rendered; if a function returns null, then the next
   * function is called. If none of the SearchResultRenderers are able to render the document,
   * then the default 'list' type is used. This allows you to have document types rendered
   * differently in the same set of search results, depending on the contents of the document
   * or the document's position in the list.
   *
   * There are some built-in renderers that you can use for rendering a standard Search-UI-type
   * list result, for rendering the debug results showing all fields in the document,
   * or for rendering a simplified result. Each of the components <ListSearchResult>,
   * <DebugSearchResult>, and <SimpleSearchResult> exports a function called "renderer" you
   * can pass to the format property to render those components. For historical reasons, there
   * are also three string values you can pass to the format property, "list," "simple," and "debug,"
   * which result in a single SearchResultRenderer that produces a result of that format.
   */
  format: Array<SearchResultRenderer> | SearchResultRenderer | 'list' | 'simple' | 'debug';
  /**
   * Whether or not the documents’ relevancy scores should be displayed.
   * Defaults to false.
   */
  showScores?: boolean;
  /** Whether tags should be shown in the UI or not. Defaults to true. */
  showTags?: boolean;
  /** Whether star ratings should be shown in the UI or not. Defaults to true. */
  showRatings?: boolean;
  /**
   * Whether or not to show 360 view link on search result. Defaults to false.
   */
  hide360Link?: boolean;
  /** A style to apply to the results list */
  style: any;
};

/**
 * A container for showing a list of documents from the search results.
 * This comes from the parent Searcher component.
 */
export default class SearchResults extends React.Component<SearchResultsProps, void> {
  static defaultProps = {
    baseUri: '',
    format: 'list',
    showScores: false,
    showTags: true,
    showRatings: true,
    hide360Link: false,
    style: {},
  };

  static contextTypes = {
    searcher: PropTypes.any,
  };

  static displayName = 'SearchResults';

  renderResults() {
    const {
      baseUri,
      format,
      hide360Link,
    } = this.props;

    const { searcher = null } = this.context;
    const response = searcher && searcher.state ? searcher.state.response : null;
    const offset = searcher && searcher.state ? searcher.state.resultsOffset : null;

    let formatRenderers: Array<SearchResultRenderer> = [];
    if (searcher && searcher.state && searcher.state.debug) {
      // If the searcher is overriding with the debug flag...
      formatRenderers = [DebugSearchResult.renderer];
    } else if (typeof format === 'function') {
      formatRenderers = [format];
    } else if (Array.isArray(format)) {
      formatRenderers = format;
    } else if (format === 'list') {
      // 'list' -> ListSearchResult
      formatRenderers = [ListSearchResult.renderer];
    } else if (format === 'simple') {
      // 'simple' -> SimpleSearchResult
      formatRenderers = [SimpleSearchResult.renderer];
    } else if (format === 'debug') {
      // 'debug' -> DebugSearchResult
      formatRenderers = [DebugSearchResult.renderer];
    }

    if (response && response.documents && response.documents.length > 0) {
      const documents = response.documents;
      const results = [];
      documents.forEach((document: SearchDocument, index: number) => {
        const key = document.getFirstValue(FieldNames.ID);
        const position = offset + index + 1;
        let renderedDocument = null;

        // Look through the format array and see if one of the functions
        // will render a result.
        formatRenderers.forEach((formatRenderer: SearchResultRenderer) => {
          if (!renderedDocument) {
            if (typeof format === 'function') {
              const possibleResult = formatRenderer(document, position, this.props.baseUri, key);
              if (possibleResult) {
                renderedDocument = possibleResult;
              }
            }
          }
        });
        if (!renderedDocument) {
          // Default to the List renderer if nothing else did anything... It will always produce a result.
          renderedDocument = ListSearchResult.renderer(document, position, baseUri, key, hide360Link);
        }

        results.push(renderedDocument);
      });
      return results;
    }
    return null;
  }

  render() {
    const {
      style: baseStyle = {},
    } = this.props;

    const style = {
      ...baseStyle,
      listStyle: 'none',
      paddingLeft: 0,
    };

    return (
      <ul style={style}>
        {this.renderResults()}
      </ul>
    );
  }
}
