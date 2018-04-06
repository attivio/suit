// @flow
import React from 'react';
import PropTypes from 'prop-types';

import FieldNames from '../api/FieldNames';

import SearchResult from './SearchResult';
import SearchDocument from '../api/SearchDocument';
import SimpleQueryRequest from '../api/SimpleQueryRequest';
import QueryResponse from '../api/QueryResponse';

type SimilarDocumentsProps = {
  /**
   * Optional. The location of the node through which to interact with Attivio.
   * Defaults to the value in the configuration.
   */
  baseUri: string;
  /**
   * The documents to which you'd like to see similar documents.
   */
  baseDoc: SearchDocument | null;
};

type SimilarDocumentsDefaultProps = {
  baseUri: string;
};

type SimilarDocumentsState = {
  /**
   * The documents to display. If empty, a message to that effect will be displayed instead.
   */
  docs: Array<SearchDocument>;
  /** An error message from doing the query. */
  error: string | null;
};

/**
 * A container for showing a list of documents from the search results.
 * This comes from the parent Searcher component.
 */
export default class SimilarDocuments extends React.Component<SimilarDocumentsDefaultProps, SimilarDocumentsProps, SimilarDocumentsState> { // eslint-disable-line max-len
  static defaultProps = {
    baseUri: '',
  }

  static contextTypes = {
    searcher: PropTypes.any,
  };

  static displayName = 'SimilarDocuments';

  constructor(props: SimilarDocumentsProps) {
    super(props);
    this.state = {
      docs: [],
      error: null,
    };
  }

  state: SimilarDocumentsState;

  componentDidMount() {
    if (this.props.baseDoc) {
      const query = this.props.baseDoc.getFirstValue('morelikethisquery');
      if (query) {
        if (this.context.searcher) {
          const searcher = this.context.searcher;
          const req = new SimpleQueryRequest(query);
          req.queryLanguage = 'advanced';
          const fields = searcher.getFieldList();
          req.fields = fields;
          req.rows = 6;

          searcher.doCustomSearch(req, (response: QueryResponse | null, error: string | null) => {
            if (response && response.documents) {
              let docs = response.documents.slice();
              if (this.props.baseDoc) {
                const baseDocId = this.props.baseDoc.getFirstValue(FieldNames.ID);
                docs = docs.filter((doc) => {
                  return doc.getFirstValue(FieldNames.ID) !== baseDocId;
                });
              }
              if (docs.length > 5) {
                docs = docs.slice(0, 5);
              }
              this.setState({ docs });
            } else if (error) {
              this.setState({ error });
            }
          });
        }
      }
    }
  }

  renderResults() {
    if (this.state.docs.length > 0) {
      const results = [];
      this.state.docs.forEach((document: SearchDocument, index: number) => {
        const key = document.getFirstValue(FieldNames.ID);
        const position = index + 1;
        results.push(
          <SearchResult
            document={document}
            format="simple"
            position={position}
            key={key}
            baseUri={this.props.baseUri}
          />,
        );
      });
      return results;
    }
    if (this.state.error) {
      return this.state.error;
    }
    return <li className="none">No similar documents exist</li>;
  }

  render() {
    const style = {
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
