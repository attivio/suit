// @flow
import React from 'react';
import PropTypes from 'prop-types';

import SearchDocument from '../api/SearchDocument';
import SimpleQueryRequest from '../api/SimpleQueryRequest';
import QueryResponse from '../api/QueryResponse';
import FieldNames from '../api/FieldNames';
import AuthUtils from '../util/AuthUtils';
import KnowledgeGraphUtils from '../util/KnowledgeGraphUtils';
import NetworkDiagram, { Node, Edge } from './NetworkDiagram';

import type { NetworkEventInfo } from './NetworkDiagram';

type KnowledgeGraphPanelProps = {
  /** The primary document being displayed */
  doc: SearchDocument;
  /** The list of fields to use to do the join */
  linkingFields: Array<string>;
  /** The maximum number of linked documents to display */
  maxLinkedDocs: number;
  /** The field in the document that has the table */
  tableField: string;
  /** A callback function used when the user double-clicks a document node */
  navigateToDoc: (docId: string) => void;
  /** A callback function used when the user double-clicks an entity node */
  navigateToEntity: (entityType: string, entityValue: string) => void;
  /** The name of the endity being searched on, or null if searching on a document */
  entityName: string | null;
  /** The value of the endity being searched on, or null if searching on a document */
  entityValue: string | null;
  /**
   * If set, even entities that don't link two doucments and aren't connected to
   * the primary document will be shown (these are hidden by default).
   */
  showEdges: boolean;
  /**
   * If true, then the 360° page will show links to documents from any table. Set this to false to
   * only show links to documnents that come from tables other than the one the main document is in.
   */
  includeAllTables: boolean;
};

type KnowledgeGraphPanelDefaultProps = {
  maxLinkedDocs: number;
  tableField: string;
  navigateToDoc: (docId: string) => void;
  navigateToEntity: (entityType: string, entityValue: string) => void;
  entityName: string | null;
  entityValue: string | null;
  showEdges: boolean;
  includeAllTables: boolean;
};

type KnowledgeGraphPanelState = {
  nodes: Array<Node>;
  edges: Array<Edge>;
  error: string | null;
};

export default class KnowledgeGraphPanel extends React.Component<KnowledgeGraphPanelDefaultProps, KnowledgeGraphPanelProps, KnowledgeGraphPanelState> { // eslint-disable-line max-len
  static defaultProps = {
    maxLinkedDocs: 3,
    tableField: FieldNames.TABLE,
    navigateToDoc: () => { },
    navigateToEntity: () => { },
    entityName: null,
    entityValue: null,
    showEdges: false,
    includeAllTables: false,
  };

  static contextTypes = {
    searcher: PropTypes.any,
  };

  static updatePrimaryDoc(primaryDoc: SearchDocument, results: Array<SearchDocument>): SearchDocument {
    let newPrimaryDoc = primaryDoc;
    if (results.length > 0) {
      // If the primary doc is already in the results, remove it and add the remiaing ones as children
      const primaryDocId = primaryDoc.getFirstValue(FieldNames.ID);
      const docIds = results.map((value: SearchDocument) => {
        return value.getFirstValue(FieldNames.ID);
      });
      if (docIds.includes(primaryDocId)) {
        // Filter out the primary
        newPrimaryDoc.children = results.filter((value: SearchDocument) => {
          return value.getFirstValue(FieldNames.ID) !== primaryDocId;
        });
      }
      // If not, use the first doc as the primary one and add the remainig ones as its children
      newPrimaryDoc = results[0];
      newPrimaryDoc.children = results.slice(1);
    }
    return newPrimaryDoc;
  }

  constructor(props: KnowledgeGraphPanelProps) {
    super(props);
    this.state = {
      nodes: [],
      edges: [],
      error: null,
    };
    (this: any).onDoubleClick = this.onDoubleClick.bind(this);
  }

  state: KnowledgeGraphPanelState;

  componentDidMount() {
    this.loadGraphForDocument(this.props.doc, this.props.entityName, this.props.entityValue);
  }

  componentWillReceiveProps(nextProps: KnowledgeGraphPanelProps) {
    if (this.props.doc !== nextProps.doc || this.props.entityName !== nextProps.entityName ||
        this.props.entityValue !== nextProps.entityValue) {
      this.loadGraphForDocument(nextProps.doc, nextProps.entityName, nextProps.entityValue);
    }
  }

  onDoubleClick(event: NetworkEventInfo) {
    if (this.props.navigateToDoc) {
      if (event && event.nodes) {
        const nodes: Array<number> = event.nodes;
        if (nodes.length > 0) {
          const nodeId = nodes[0];
          const node = this.state.nodes.find((n) => {
            return n.id === nodeId;
          });
          if (node && node.docId) {
            this.props.navigateToDoc(node.docId);
          } else if (node) {
            this.props.navigateToEntity(node.group, node.label);
          }
        }
      }
    }
  }

  loadGraphForDocument(doc: SearchDocument, entityName: string | null, entityValue: string | null) {
    if (this.context.searcher) {
      const docId = doc.getFirstValue(FieldNames.ID);
      const table = this.props.includeAllTables ? null : doc.getFirstValue(this.props.tableField);

      const query = KnowledgeGraphUtils.buildQuery(docId, table, this.props.tableField,
        this.props.linkingFields, this.props.maxLinkedDocs, entityName, entityValue);
      const req = new SimpleQueryRequest(query);
      req.queryLanguage = 'advanced';
      this.context.searcher.doCustomSearch(req, (response: QueryResponse | null, error: string | null) => {
        if (response && response.documents && response.documents.length >= 1) {
          // Add the nodes and edges to our state so we can display them
          let primaryDoc = response.documents[0];
          if (entityName && entityValue) {
            // Massage the primary doc to have children...
            primaryDoc = KnowledgeGraphPanel.updatePrimaryDoc(primaryDoc, response.documents);
          }
          const result = KnowledgeGraphUtils.searchResultsToGraph(primaryDoc, this.props.linkingFields,
            primaryDoc.getFirstValue(FieldNames.ID) === docId, !this.props.showEdges);
          this.setState({
            nodes: result.nodes,
            edges: result.edges,
          });
        } else if (response) {
          // Got a response but no documents? Bad ID?
          this.setState({ error: 'The query produced no results.' });
        } else if (error) {
          this.setState({ error });
        }
      });
    }
  }

  render() {
    const style = {
      backgroundColor: '#f5f5f5',
      height: '1200px',
    };

    if (this.state.error) {
      return (
        <div>
          {this.state.error}
        </div>
      );
    }
    return (
      <div>
        <NetworkDiagram
          nodes={this.state.nodes}
          edges={this.state.edges}
          options={KnowledgeGraphUtils.calculateGraphOptions(this.props.linkingFields, AuthUtils.getEntityColors())}
          style={style}
          onDoubleClick={this.onDoubleClick}
        />
      </div>
    );
  }
}
