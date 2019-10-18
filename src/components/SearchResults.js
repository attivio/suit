// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-bootstrap';

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
  /** Whether or not to show tabs based on a facet */
  showTabs: boolean;
  /** Facet field to use for tabs */
  tabsField: string;
  /** List of explicit tabs to always show. If empty, tab values will be dynamic based on query response. */
  tabList: Array<string>;
  /** A style to apply to the results list */
  style: any;
};

type SearchResultsDefaultProps = {
  baseUri: string;
  format: Array<SearchResultRenderer> | SearchResultRenderer | 'list' | 'simple' | 'debug';
  showScores: boolean;
  showTags: boolean;
  showRatings: boolean;
  showTabs: boolean;
  tabsField: string;
  tabList: Array<string>;
  style: any;
};

type SearchResultsState = {
  activeTableTabKey: string,
};

/**
 * A container for showing a list of documents from the search results.
 * This comes from the parent Searcher component.
 */
export default class SearchResults extends React.Component<SearchResultsDefaultProps, SearchResultsProps, SearchResultsState> {
  static defaultProps = {
    baseUri: '',
    format: 'list',
    showScores: false,
    showTags: true,
    showRatings: true,
    hide360Link: false,
    showTabs: false,
    tabsField: FieldNames.TABLE,
    tabList: [],
    style: {},
  };

  static contextTypes = {
    searcher: PropTypes.any,
  };

  static displayName = 'SearchResults';

  constructor(props: SearchResultsProps) {
    super(props);
    this.state = {
      activeTableTabKey: 'All',
    };

    (this: any).wrapResultsInTabs = this.wrapResultsInTabs.bind(this);
    (this: any).handleTabChange = this.handleTabChange.bind(this);
  }

  wrapResultsInTabs(results: Array<any>, response: QueryResponse) {
    const facets = response.facets;
    let tables = [];
    let tableFacet;
    facets.forEach((f: SearchFacet) => {
      if (f.name === this.props.tabsField) {
        tableFacet = f;
      }
    });

    let { activeTableTabKey } = this.state;
    if (!this.context.searcher.state.filters || this.context.searcher.state.filters.length <= 0) {
      activeTableTabKey = 'All';
    } else {
      this.context.searcher.state.filters.forEach((f: string) => {
        if (f.indexOf('table') > -1) {
          activeTableTabKey = f;
        }
      });
    }
    if (this.props.tabList.length < 1 && tableFacet && tableFacet.buckets) {
      tables = tableFacet.buckets.map((bucket: SearchFacetBucket) => {
        const innerContents = activeTableTabKey === bucket.filter ? results : '';
        return (
          <Tab eventKey={bucket.filter} title={`${bucket.value} (${bucket.count})`}>
            {innerContents}
          </Tab>
        );
      });
    } else if (this.props.tabList.length > 1) {
      tables = this.props.tabList.map((tableName: string) => {
        let isDisabled = true;
        let count = 0;
        let innerContents;
        let eventKey = tableName;
        if (tableFacet && tableFacet.buckets) {
          tableFacet.buckets.forEach((facet: SearchFacetBucket) => {
            if (facet.value === tableName) {
              isDisabled = false;
              count = facet.count;
              eventKey = facet.filter;
              if (activeTableTabKey === facet.filter) {
                innerContents = results;
              }
            }
          });
        }
        return (
          <Tab eventKey={eventKey} title={`${tableName} (${count})`} disabled={isDisabled}>
            {innerContents}
          </Tab>
        );
      });
    }
    if (tables && tables.length > 0) {
      const innerContents = activeTableTabKey === 'All' ? results : '';
      tables.unshift(
        <Tab eventKey="All" title="All">
          {innerContents}
        </Tab>,
      );
      // `
      return (
        <Tabs activeKey={activeTableTabKey} id="table-tabs" onSelect={this.handleTabChange}>
          {tables}
        </Tabs>
      );
    }
    return results;
  }

  handleTabChange(key: string) {
    this.setState({ activeTableTabKey: key }, () => {
      const newFilters = key === 'All' ? [] : [key];
      this.context.searcher.updateStateResetAndSearch({ filters: newFilters });
    });
  }

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
            const possibleResult = formatRenderer(document, position, baseUri, key, hide360Link);
            if (possibleResult) {
              renderedDocument = possibleResult;
            }
          }
        });
        if (!renderedDocument) {
          // Default to the List renderer if nothing else did anything... It will always produce a result.
          renderedDocument = ListSearchResult.renderer(document, position, baseUri, key, hide360Link);
        }

        results.push(renderedDocument);
      });
      if (this.props.showTabs) {
        return this.wrapResultsInTabs(results, response);
      }
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
