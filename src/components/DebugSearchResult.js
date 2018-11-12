// @flow
import React from 'react';

import SearchDocument from '../api/SearchDocument';
import FieldNames from '../api/FieldNames';

import DocumentType from './DocumentType';
import StarRating from './StarRating';
import SearchResultTitle from './SearchResultTitle';
import SearchResultTags from './SearchResultTags';
import DocumentThumbnail from './DocumentThumbnail';
import RelevancyScore from './RelevancyScore';
import Signals from '../api/Signals';

type DebugSearchResultProps = {
  /**
   * Optional. The location of the node through which to interact with Attivio.
   * Defaults to the value in the configuration.
   */
  baseUri: string;
  /** The document to be displayed. */
  document: SearchDocument;
  /** The document’s position in the search results. */
  position: number,
  /** Whether tags should be shown in the UI or not. Defaults to true. */
  showTags: boolean;
  /** Whether star ratings should be shown in the UI or not. Defaults to true. */
  showRatings: boolean;
}

type DebugSearchResultDefaultProps = {
  baseUri: string;
  showTags: boolean;
  showRatings: boolean;
}

/**
 * A "Debug" rendering of a document which shows all of its fields and their values.
 */
export default class DebugSearchResult extends React.Component<DebugSearchResultDefaultProps, DebugSearchResultProps, void> {
  static defaultProps = {
    baseUri: '',
    showTags: true,
    showRatings: true,
  };

  static displayName = 'DebugSearchResult';

  /**
   * Renders a <DebugSearchResult> component for the document.
   */
  static renderer(doc: SearchDocument, position: number, baseUri: string, key: string) {
    return (
      <DebugSearchResult document={doc} position={position} baseUri={baseUri} key={key} />
    );
  }

  static valueToDisplay(value: any) {
    if (typeof value === 'string') {
      return value;
    }
    const json = JSON.stringify(value, null, 2);
    if (json.startsWith('{')) {
      return <pre>{json}</pre>;
    }
    return <span>{json}</span>;
  }

  static renderer;

  constructor(props: DebugSearchResultProps) {
    super(props);
    (this: any).rateDocument = this.rateDocument.bind(this);
  }

  rateDocument(doc: SearchDocument, rating: number) {
    if (doc.signal) {
      new Signals(this.props.baseUri).addSignal(doc, 'like', rating);
    }
  }

  render() {
    const doc = this.props.document;
    const docId = doc.getFirstValue('.id');
    const table = doc.getFirstValue(FieldNames.TABLE);
    const thumbnailUri = doc.getFirstValue('thumbnailImageUri');
    const previewUri = doc.getAllValues('previewImageUri');
    const score = parseFloat(doc.getFirstValue(FieldNames.SCORE));
    const scoreDescription = doc.getFirstValue(FieldNames.SCORE_EXPLAIN);
    const moreLikeThisQuery = doc.getFirstValue('morelikethisquery');
    const docTags = doc.getAllValues('tags');

    const fieldRows = [];
    const fieldNames = this.props.document.fields.keys();
    let finished = false;
    while (!finished) {
      const nextField = fieldNames.next();
      if (nextField.done) {
        finished = true;
      } else {
        const fieldName = nextField.value;
        let value;
        const values = this.props.document.getAllValues(fieldName);
        if (values && values.length > 1) {
          let index = 0;
          const valueRows = values.map((singleValue) => {
            const singleValueContents = DebugSearchResult.valueToDisplay(singleValue);
            index += 1;
            return <li key={`${JSON.stringify(singleValue)}-${index}`}>{singleValueContents}</li>;
          });
          value = <ul>{valueRows}</ul>;
        } else if (values && values.length === 1) {
          value = DebugSearchResult.valueToDisplay(values[0]);
        } else {
          value = <span className={{ fontStyle: 'italic' }}>No value</span>;
        }
        fieldRows.push(<dt key={fieldName}>{fieldName}</dt>);
        fieldRows.push(<dd key={`${fieldName}value`}>{value}</dd>);
      }
    }

    return (
      <div className=" attivio-search-result row">
        <div className="col-xs-2 col-sm-2">
          <DocumentType docType={table} position={this.props.position} />
          <DocumentThumbnail uri={thumbnailUri} previewUris={previewUri} previewTitle={doc.getFirstValue(FieldNames.TITLE)} />
          <dl className="attivio-labeldata-stacked attivio-labeldata-stacked-search-results">
            {this.props.showRatings ? (
              <div>
                <dt>User Rating</dt>
                <dd>
                  <StarRating onRated={(rating) => { this.rateDocument(doc, rating); }} />
                </dd>
              </div>
            ) : null}
            <dt>Relevancy Score</dt>
            <dd><RelevancyScore score={score} description={scoreDescription} id={docId} /></dd>
          </dl>
        </div>
        <div className="col-xs-8 col-sm-8">
          <SearchResultTitle doc={doc} baseUri={this.props.baseUri} />
          <dl className="attivio-labeldata-2col attivio-search-result-debugger">
            {fieldRows}
          </dl>
          {this.props.showTags ? (
            <SearchResultTags tags={docTags} moreLikeThisQuery={moreLikeThisQuery} vertical docId={docId} />
          ) : null}
        </div>
      </div>
    );
  }
}
