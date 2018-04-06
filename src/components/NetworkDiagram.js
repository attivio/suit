// @flow
import React from 'react';
import vis from 'vis';

export class Node {
  id: number;
  label: string;
  title: string;
  group: string;
  docId: string | null;

  constructor(id: number, label: string, title: string | null = null, group: string | null = null) {
    this.id = id;
    this.label = label;
    if (title) {
      this.title = title;
    }
    if (group) {
      this.group = group;
    }
    this.docId = null;
  }
}

export class Edge {
  from: number;
  to: number;

  constructor(from: number, to: number) {
    this.from = from;
    this.to = to;
  }
}

/**
 * The information passed when a an graphical event occurs.
 */
export type NetworkEventInfo = {
  /** The IDs of any selected nodes */
  nodes: Array<number>;
  /** The IDs of any selected edges */
  edges: Array<number>;
  /** The underlying event */
  event: Event;
  /** The location of the mouse relative to the DOM and relative to the canvas */
  pointer: {
    DOM: {x: number, y: number},
    canvas: {x: number, y: number},
  };
};

type NetworkDiagramProps = {
  /** The nodes to display in the diagram. */
  nodes: Array<Node>;
  /** The edges connecting the nodes. */
  edges: Array<Edge>;
  /** Any options for the diagram. See the vis.js documentation for details. Optional. */
  options: any;
  /** Any CSS you want to apply to the containing div element. Optional. */
  style: any;
  /** A callback when something in the diagram is double-clicked */
  onDoubleClick: (event: NetworkEventInfo) => void;
};

type NetworkDiagramDefaultProps = {
  options: any;
  style: any;
  onDoubleClick: (event: NetworkEventInfo) => void;
};

/**
 * Component to display an arbitrary network diagram of nodes and edges.
 */
export default class NetworkDiagram extends React.Component<NetworkDiagramDefaultProps, NetworkDiagramProps, void> {
  static defaultProps = {
    options: {},
    style: {},
    onDoubleClick: () => {},
  };

  static displayName = 'NetworkDiagram';

  static Node;
  static Edge;

  componentDidMount() {
    const data = {
      nodes: this.props.nodes,
      edges: this.props.edges,
    };

    this.network = new vis.Network(this.networkDiagram, data, this.props.options);
    this.network.on('doubleClick', (event: NetworkEventInfo) => {
      this.props.onDoubleClick(event);
    });
    this.network.on('stabilizationIterationsDone', () => {
      this.network.stopSimulation();
    });
  }

  /** The props have changed and we need to update our diagram. */
  componentWillReceiveProps(nextProps: NetworkDiagramProps) {
    let update = false;
    if (this.props.nodes.length !== nextProps.nodes.length) {
      update = true;
    } else if (this.props.edges.length !== nextProps.edges.length) {
      update = true;
    } else if (JSON.stringify(this.props.nodes) !== JSON.stringify(nextProps.nodes)) {
      update = true;
    } else if (JSON.stringify(this.props.edges) !== JSON.stringify(nextProps.edges)) {
      update = true;
    }
    if (update) {
      const data = {
        nodes: nextProps.nodes,
        edges: nextProps.edges,
      };
      this.network.setData(data);
    }
  }

  componentWillUnmount() {
    if (this.network) {
      this.network.destroy();
    }
  }

  networkDiagram: React.Component<*>;
  network: vis.Network;

  render() {
    return <div ref={(c) => { this.networkDiagram = c; }} style={this.props.style} />;
  }
}

NetworkDiagram.Node = Node;
NetworkDiagram.Edge = Edge;
