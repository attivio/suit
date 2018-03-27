// @Flow

import SearchDocument from '../api/SearchDocument';
import FieldNames from '../api/FieldNames';
import GraphNode from './GraphNode';
import GraphEdge from './GraphEdge';
import StringUtils from './StringUtils';

export class GraphDefinition {
  nodes: Array<GraphNode>;
  edges: Array<GraphEdge>;

  constructor(nodes: Array<GraphNode>, edges: Array<GraphEdge>) {
    this.nodes = nodes;
    this.edges = edges;
  }
}

const BASE_GRAPH_OPTIONS = {
  width: '100%',
  height: '100%',
  layout: {
    // randomSeed: 10000,
    improvedLayout: false,
  },
  configure: false,
  interaction: {
    dragNodes: true,
    hover: true,
    hoverConnectedEdges: false,
    multiselect: true,
    keyboard: false,
    navigationButtons: false,
    selectConnectedEdges: false,
    tooltipDelay: 100,
  },
  edges: {
    chosen: false,
    color: {
      color: '#606060',
      hover: '#424242',
    },
    smooth: false,
    width: 1,
  },
  nodes: {
    borderWidth: 0,
    borderWidthSelected: 1,
    color: {
      border: '#fff',
      background: '#fff',
      highlight: {
        border: '#888',
        background: '#eee',
      },
      hover: {
        border: '#888',
        background: '#eee',
      },
    },
    font: {
      color: '#000',
      size: 11,
      face: 'arial',
      align: 'left',
    },
    labelHighlightBold: false,
    shadow: false,
    shape: 'box',
    shapeProperties: {
      borderRadius: 0,
    },
  },
  physics: {
    stabilization: {
      enabled: true,
      iterations: 5000,
      fit: true,
    },
  },
  groups: {
    document: {
      borderWidth: 0,
      font: {
        size: 14,
      },
      margin: 10,
      color: {
        border: '#fff',
        background: '#fff',
        highlight: {
          border: '#888',
          background: '#eee',
        },
        hover: {
          border: '#888',
          background: '#eee',
        },
      },
    },
  },
};

const BASE_GROUP_OPTIONS = {
  borderWidth: 2,
  color: {
    border: '#57b3e2',
    background: '#fff',
    highlight: {
      border: '#57b3e2',
      background: '#eee',
    },
    hover: {
      border: '#57b3e2',
      background: '#eee',
    },
  },
  shapeProperties: {
    borderDashes: [4, 2],
  },
};

export default class KnowledgeGraphUtils {
  static MAIN_DOCUMENT_BORDER_COLOR = '#333';

  /**
   * Build up the query to use to get the knowledge graph's documents. The results of the
   * query will be the main document (the one whose ID is passed in) with any related
   * documents listed as its children.
   *
   * @param docId         the ID of the document to look up.
   * @param table         the name of the table containing the document, if you want to exclude
   *                      joining to other documents in the same table (pass null to join with
   *                      any document, regardless of its table)
   * @param linkingFields the list of fields to look for links in (e.g., entity fields)
   * @param maxLinkedDocs the maximum number of additional documebnts to return
   * @param entityName
   * @param entityValue
   */
  static buildQuery(docId: string, table: string | null, tableField: string, linkingFields: Array<string>, maxLinkedDocs: number, entityName: string | null, entityValue: string | null): string { // eslint-disable-line max-len
    // We need to escape any backslashes in the document ID to ensure they pass through the query engine correctly
    const escapedDocId = docId.replace(/\\/g, '\\\\\\\\');
    // If there is an entity name and value, query on those instead.
    if (entityName && entityValue) {
      // We boost the existing document ID so it will appear at the top of the result list
      return `BOOST("${entityName}":"${entityValue}", ${FieldNames.ID}:"${escapedDocId}")`;
    }
    const primaryQuery = `QUERY("${FieldNames.ID}:\\"${escapedDocId}\\"", qlang=advanced)`;
    // Don't join against documents from the same table as the primary one (if it has a table)
    const notTable = (tableField && table) ? `NOT(${tableField}:"${table}"), ` : '*, ';
    const outerClauses = linkingFields.map((field) => {
      return `OUTER(${notTable}on="${field}", alias=${field}, rollup=${maxLinkedDocs})`;
    });
    const outerClausesList = outerClauses.join(', ');
    const query = `JOIN(${primaryQuery}, ${outerClausesList})`;
    return query;
  }

  static makeDocNode(doc: SearchDocument, id: number, isPrimary: boolean = false): any {
    let label = StringUtils.wrapLabel(doc.getFirstValue('title'));
    const docId = doc.getFirstValue(FieldNames.ID);
    const table = doc.getFirstValue('table');
    const title = isPrimary ? `${table} [Main Document]` : `Related ${table} Document`;

    if (!label) {
      label = '[This document has no title]';
    }

    const node = new GraphNode(id, label, title, 'document');
    node.physics = false;
    if (isPrimary) {
      (node: any).borderWidth = 1;
      (node: any).color = {
        border: KnowledgeGraphUtils.MAIN_DOCUMENT_BORDER_COLOR,
      };
      (node: any).shadow = {
        enabled: true,
        color: KnowledgeGraphUtils.MAIN_DOCUMENT_BORDER_COLOR,
        size: 10,
        x: 0,
        y: 0,
      };
    } else {
      // Non-primary nodes can be double clicked, so we need to know their IDs
      node.docId = docId;
    }
    return node;
  }

  static makeLinkingNode(fieldName: string, fieldValue: string, id: number): any {
    const title = `${fieldName.charAt(0).toLocaleUpperCase()}${fieldName.slice(1)}`;
    const node = new GraphNode(id, StringUtils.wrapLabel(fieldValue), title, fieldName);
    return node;
  }

  /**
   * Create a graph from the search results.
   * The main document should have children that represent the others.
   * If firstIsPrimary is false, no document will be the primary (shadowed) one.
   * If filterOutSingletons is false, then external "leaf" entity nodes will be shown
   */
  static searchResultsToGraph(mainDoc: SearchDocument,
    linkingFields: Array<string>,
    firstIsPrimary: boolean = true,
    filterOutSingletons: boolean = true): GraphDefinition {
    let nodes = [];
    const edges = [];
    const docNodes: Map<string, any> = new Map();
    const linkingNodes: Map<string, any> = new Map();
    let nodeId = firstIsPrimary ? 0 : 1;
    // Get the parent and child docs into the same list...
    const allDocs = mainDoc.children;
    const newMainDoc = mainDoc;
    newMainDoc.children = [];
    allDocs.unshift(newMainDoc);

    // Remove any duplicate documents since they'll just muck up the graph
    const filteredDocs = [];
    allDocs.forEach((doc) => {
      const existingDoc = filteredDocs.find((filteredDoc) => {
        return doc.getFirstValue(FieldNames.ID) === filteredDoc.getFirstValue(FieldNames.ID);
      });
      if (!existingDoc) {
        filteredDocs.push(doc);
      }
    });

    // Loop through the docs
    filteredDocs.forEach((doc) => {
      const docNode = KnowledgeGraphUtils.makeDocNode(doc, nodeId, nodeId === 0);
      nodeId += 1;
      nodes.push(docNode);
      docNodes.set(doc.getFirstValue(FieldNames.ID), docNode);

      // Loop through the linking fields...
      linkingFields.forEach((field) => {
        const fieldValues = doc.getAllValues(field);
        if (fieldValues && fieldValues.length > 0) {
          // For each field value, add a node
          fieldValues.forEach((fieldValue) => {
            // See if we already have a node for this field/value combination
            const linkingNodeKey = `${field}:${fieldValue}`;
            const existingNode = linkingNodes.get(linkingNodeKey);
            if (existingNode) {
              // Make sure the existing node isn't already connected to the document node
              // (some documents may have the same value multiple times in a given field)
              const existingEdge = edges.find((edge) => {
                return edge.from === docNode.id && edge.to === existingNode.id;
              });
              if (!existingEdge) {
                // Connect the existing node to the document node...
                edges.push(new GraphEdge(docNode.id, existingNode.id));
              }
            } else {
              const newNode = KnowledgeGraphUtils.makeLinkingNode(field, fieldValue, nodeId);
              nodeId += 1;
              nodes.push(newNode);
              linkingNodes.set(linkingNodeKey, newNode);
              // Add an edge between the document node and the linking node
              edges.push(new GraphEdge(docNode.id, newNode.id));
            }
          });
        }
      });
    });

    // Now, position doc nodes
    const numDocNodes = docNodes.size;
    const step = (2 * Math.PI) / numDocNodes;
    let angle = step / 2; // Starting point not straight up...
    const angledDocNodes = new Map();
    const entries = Array.from(docNodes.entries());
    entries.forEach((entry) => {
      const dn = entry[1];
      dn.x = (Math.cos(angle) * 400) + 500;
      dn.y = (Math.sin(angle) * 400) + 500;
      angle += step;
      angledDocNodes.set(entry[0], dn);
    });

    if (filterOutSingletons) {
      // Filter out any nodes which only have one edge coming into them and which aren't document nodes...
      const nodesToEdgesMap = KnowledgeGraphUtils.calculateNodesToEdges(edges);
      const filteredNodes = nodes.filter((node) => {
        if (node.group !== 'document') {
          const nodeEdges = nodesToEdgesMap.get(node.id);
          if (nodeEdges && nodeEdges.length > 1) {
            return true;
          }
          if (nodeEdges.length === 1) {
            if (nodeEdges[0].from === 0 || nodeEdges[0].to === 0) {
              // Also include nodes directly connected to the primary one (which always has ID 0)
              return true;
            }
          }
          return false; // Single edged node!
        }
        return true;
      });
      nodes = filteredNodes;
    }

    return new GraphDefinition(nodes, edges);
  }

  static calculateNodesToEdges(edges: Array<any>): Map<number, Array<any>> {
    const result = new Map();
    edges.forEach((edge) => {
      let fromNodeEdgeList = result.get(edge.from);
      if (!fromNodeEdgeList) {
        fromNodeEdgeList = [];
        result.set(edge.from, fromNodeEdgeList);
      }
      fromNodeEdgeList.push(edge);

      let toNodeEdgeList = result.get(edge.to);
      if (!toNodeEdgeList) {
        toNodeEdgeList = [];
        result.set(edge.to, toNodeEdgeList);
      }
      toNodeEdgeList.push(edge);
    });
    return result;
  }

  static calculateGraphOptions(entityNames: Array<string> = [], entityColors: Map<string, any>): any {
    const options = JSON.parse(JSON.stringify(BASE_GRAPH_OPTIONS));
    const groups = options.groups;
    entityColors.forEach((color, entity) => {
      const entityOptions = JSON.parse(JSON.stringify(BASE_GROUP_OPTIONS));
      entityOptions.color.border = color;
      entityOptions.color.highlight.border = color;
      entityOptions.color.hover.border = color;
      groups[entity] = entityOptions;
    });
    entityNames.forEach((entityName) => {
      if (!entityColors.has(entityName)) {
        // Make up a random color for this unknown entity
        const entityOptions = JSON.parse(JSON.stringify(BASE_GROUP_OPTIONS));
        const customColor = 'purple';
        entityOptions.color.border = customColor;
        entityOptions.color.highlight.border = customColor;
        entityOptions.color.hover.border = customColor;
        groups[entityName] = entityOptions;
      }
    });
    return options;
  }
}
