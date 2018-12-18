// @flow
import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import SearchDocument from '../api/SearchDocument';
import FieldNames from '../api/FieldNames';
import Configurable from './Configurable';
import Configuration from './Configuration';
import DocumentEntityList from './DocumentEntityList';
import DocumentThumbnail from './DocumentThumbnail';
import DocumentType from './DocumentType';
import RelevancyScore from './RelevancyScore';
import SearchResultBody from './SearchResultBody';
import SearchResultTags from './SearchResultTags';
import SearchResultTitle from './SearchResultTitle';
import Signals from '../api/Signals';
import StarRating from './StarRating';
import TabPanel, { TabInfo } from './TabPanel';

type InnerListSearchResultProps = {
  /** The document to be displayed. */
  document: SearchDocument;
  /** The document’s position in the search results. */
  position: number,
  /**
   * Optional. The location of the node through which to interact with Attivio.
   * Defaults to the value in the configuration.
   */
  baseUri: string;
  /** Whether or not the documents’ relevancy scores should be displayed. Defaults to false. */
  showScores: boolean;
  /** A map of the field names to the label to use for any entity fields */
  entityFields: Map<string, string>;
  /** Whether tags should be shown in the UI or not. Defaults to true. */
  showTags: boolean;
  /** Whether star ratings should be shown in the UI or not. Defaults to true. */
  showRatings: boolean;
}

type InnerListSearchResultDefaultProps = {
  baseUri: string;
  showScores: boolean;
  entityFields: Map<string, string>;
  showTags: boolean;
  showRatings: boolean;
}

type InnerListSearchResultState = {
  currentTab: string;
};

/**
 * An individual List-type search result.
 */
class InnerListSearchResult extends React.Component<InnerListSearchResultDefaultProps, InnerListSearchResultProps, InnerListSearchResultState> { // eslint-disable-line max-len
  static defaultProps = {
    baseUri: '',
    format: 'list',
    showScores: false,
    entityFields: new Map([['people', 'People'], ['location', 'Locations'], ['company', 'Companies']]),
    showTags: true,
    showRatings: true,
  };

  static displayName = 'ListSearchResult';

  static contextTypes = {
    configuration: PropTypes.instanceOf(Configuration),
  };

  /**
   * Renders a <ListSearchResult> component for the document.
   */
  static renderer(doc: SearchDocument, position: number, baseUri: string, key: string) {
    return (
      <ListSearchResult document={doc} position={position} baseUri={baseUri} key={key} />
    );
  }

  static getFirstDocumentType(list: Array<SearchDocument>): string {
    let result = '';
    if (list && list.length > 0) {
      result = list[0].getFirstValue('table');
    }
    return result;
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

  constructor(props: InnerListSearchResultProps) {
    super(props);
    this.state = {
      currentTab: InnerListSearchResult.getFirstDocumentType(props.document.children),
    };
    (this: any).tabChanged = this.tabChanged.bind(this);
    (this: any).rateDocument = this.rateDocument.bind(this);
  }

  state: InnerListSearchResultState;

  tabChanged(newTab: string) {
    this.setState({
      currentTab: newTab,
    });
  }

  rateDocument(doc: SearchDocument, rating: number) {
    if (doc.signal) {
      new Signals(this.props.baseUri).addSignal(doc, 'like', rating);
    }
  }

  render() {
    const doc = this.props.document;
    const docId = doc.getFirstValue('.id');
    const table = doc.getFirstValue('table');
    const thumbnailUri = doc.getFirstValue('thumbnailImageUri');
    const previewUri = doc.getAllValues('previewImageUri');
    const scoreString = doc.getFirstValue(FieldNames.SCORE);
    const score = scoreString ? parseFloat(scoreString) : 0;
    const scoreDescription = doc.getFirstValue(FieldNames.SCORE_EXPLAIN);
    const text = doc.getFirstValue('teaser');
    const moreLikeThisQuery = doc.getFirstValue('morelikethisquery');
    const docTags = doc.getAllValues('tags');

    let nestedDocs = null;
    if (doc.children && doc.children.length > 0) {
      const childMap: Map<string, Array<SearchDocument>> = new Map();
      doc.children.forEach((child) => {
        const childTable = child.getFirstValue('table');
        const tableDocs = childMap.get(childTable);
        if (tableDocs) {
          tableDocs.push(child);
        } else {
          const newTableDocs = [child];
          childMap.set(childTable, newTableDocs);
        }
      });
      const tabInfos = [];
      childMap.forEach((tableDocs, tabTable) => {
        const label = tableDocs.length === 1 ? `1 ${tabTable}` : `${tableDocs.length} ${tabTable}`;
        const docResults = tableDocs.map((tableDoc, index) => {
          const childPosition = index + 1;
          return (
            <ListSearchResult
              document={tableDoc}
              key={tableDoc.getFirstValue('.id')}
              position={childPosition}
              baseUri={this.props.baseUri}
            />
          );
        });
        const docResultsList = (
          <div className="attivio-nested-search-results">
            {docResults}
          </div>
        );
        tabInfos.push(new TabInfo(label, tabTable, docResultsList));
      });
      let tabLabel;
      if (doc.children.length === 1) {
        tabLabel = 'One Child Record:';
      } else {
        tabLabel = `${doc.children.length} Child Records:`;
      }
      nestedDocs = (
        <TabPanel
          tabInfos={tabInfos}
          activeTabId={this.state.currentTab}
          tabChanged={this.tabChanged}
          tabLabel={tabLabel}
          nested
        />
      );
    }

    let entityFields = this.props.entityFields;
    if (this.context.configuration && this.context.configuration.state.ALL && this.context.configuration.state.ALL.entityFields) {
      // If the user specifies entity fields in the configuration, use those instead of the defaults
      entityFields = this.context.configuration.state.ALL.entityFields;
    }

    return (
      <div className=" attivio-search-result">
        <div className="attivio-search-result-col">
          <DocumentType docType={table} position={this.props.position} />
          <DocumentThumbnail uri={thumbnailUri} previewUris={previewUri} previewTitle={doc.getFirstValue(FieldNames.TITLE)} />
          <dl className="attivio-labeldata-stacked attivio-labeldata-stacked-search-results">
            {this.props.showRatings ? (
              <div>
                <dt>Rating</dt>
                <dd>
                  <StarRating onRated={(rating) => { this.rateDocument(doc, rating); }} />
                </dd>
              </div>
            ) : null}
            {this.props.showScores ? <dt>Relevancy Score</dt> : ''}
            {this.props.showScores ? <dd><RelevancyScore score={score} explanation={scoreDescription} id={docId} /></dd> : ''}
          </dl>
        </div>
        <div className="attivio-search-result-content">
          <SearchResultTitle doc={doc} baseUri={this.props.baseUri} />
          <Row>
            <Col xs={7} sm={7}>
              <SearchResultBody body={text} />
              {this.props.showTags ? (
                <SearchResultTags tags={docTags} moreLikeThisQuery={moreLikeThisQuery} docId={docId} />
              ) : null}
            </Col>
            <Col xs={5} sm={5}>
              <DocumentEntityList doc={doc} entityFields={entityFields} />
            </Col>
          </Row>
        </div>
        {nestedDocs}
      </div>
    );
  }
}

const ListSearchResult = Configurable(InnerListSearchResult);

ListSearchResult.renderer = InnerListSearchResult.renderer;

export default ListSearchResult;
