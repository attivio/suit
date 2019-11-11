// @flow
import * as React from 'react';

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
  showTags?: boolean;
  /** Whether star ratings should be shown in the UI or not. Defaults to true. */
  showRatings?: boolean;
  /** Whether 360 View should be shown. Defaults to false. */
  hide360Link?: boolean;
}

/**
 * A "Debug" rendering of a document which shows all of its fields and their values.
 */
export default class DebugSearchResult extends React.Component<DebugSearchResultProps, void> {
  static defaultProps = {
    baseUri: '',
    showTags: true,
    showRatings: true,
    hide360Link: false,
  };

  static displayName = 'DebugSearchResult';

  /**
   * Renders a <DebugSearchResult> component for the document.
   */
  static renderer(
    doc: SearchDocument,
    position: number,
    baseUri: string,
    key: string,
    hide360Link: boolean = false,
  ) {
    return (
      <DebugSearchResult
        document={doc}
        position={position}
        baseUri={baseUri}
        key={key}
        hide360Link={hide360Link}
      />
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

  /* $FlowFixMe This comment suppresses an error found when upgrading Flow to
   * v0.107.0. To view the error, delete this comment and run Flow. */
  static renderer;

  rateDocument = (doc: SearchDocument, rating: number) => {
    const { baseUri } = this.props;
    if (doc.signal) {
      new Signals(baseUri).addSignal(doc, 'like', rating);
    }
  }

  render() {
    const {
      baseUri,
      document,
      position,
      showRatings,
      showTags,
      hide360Link,
    } = this.props;

    const docId = document.getFirstValue('.id');
    const table = document.getFirstValue(FieldNames.TABLE);
    const thumbnailUri = document.getFirstValue('thumbnailImageUri');
    const previewUri = document.getAllValues('previewImageUri');
    const score = parseFloat(document.getFirstValue(FieldNames.SCORE));
    const scoreDescription = document.getFirstValue(FieldNames.SCORE_EXPLAIN);
    const moreLikeThisQuery = document.getFirstValue('morelikethisquery');
    const docTags = document.getAllValues('tags');

    const fieldRows = [];
    const fieldNames = document.fields.keys();
    let finished = false;
    while (!finished) {
      const nextField = fieldNames.next();
      if (nextField.done) {
        finished = true;
      } else {
        const fieldName = nextField.value;
        let value;
        const values = document.getAllValues(fieldName);
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
          <DocumentType docType={table} position={position} />
          <DocumentThumbnail
            uri={thumbnailUri}
            previewUris={previewUri}
            previewTitle={document.getFirstValue(FieldNames.TITLE)}
          />
          <dl className="attivio-labeldata-stacked attivio-labeldata-stacked-search-results">
            {showRatings && (
              <div>
                <dt>User Rating</dt>
                <dd>
                  <StarRating onRated={(rating) => { this.rateDocument(document, rating); }} />
                </dd>
              </div>
            )}
            <dt>Relevancy Score</dt>
            <dd><RelevancyScore score={score} description={scoreDescription} id={docId} /></dd>
          </dl>
        </div>
        <div className="col-xs-8 col-sm-8">
          <SearchResultTitle doc={document} baseUri={baseUri} />
          <dl className="attivio-labeldata-2col attivio-search-result-debugger">
            {fieldRows}
          </dl>
          {showTags && (
            <SearchResultTags
              tags={docTags}
              moreLikeThisQuery={moreLikeThisQuery}
              vertical
              docId={docId}
              hide360Link={hide360Link}
            />
          )}
        </div>
      </div>
    );
  }
}
