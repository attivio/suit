#### Examples:

For more complex examples, see the Document360Page. For details about the options available,
see the <a href="http://visjs.org/docs/network/" target="_blank">Vis.js Network documentation</a>.

__1.__ Simple example with straighforward content.

```jsx
  // const KnowledgeGraphUtils = require('../../src/util/KnowledgeGraphUtils');
  const entityColors = require('../sampleData/EntityColors').default;
  // const linkingFields = [];
  // const options = KnowledgeGraphUtils.calculateGraphOptions(linkingFields);
  const options = {
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
      title: 'Hookin’ up words and phrases…',
      label: '<>',
    },
    nodes: {
      borderWidth: 0,
      borderWidthSelected: 1,
      color: {
        border: '#000',
        background: '#ccc',
        highlight: {
          border: '#800',
          background: '#f88',
        },
        hover: {
          border: 'yellow',
          background: 'lightyellow',
        },
      },
      font: {
        color: '#000',
        size: 11,
        face: 'arial',
        align: 'left',
      },
      labelHighlightBold: false,
      shadow: true,
      shape: 'box',
      shapeProperties: {
        borderRadius: 4,
      },
      title: 'You’re hovering over me!',
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
  options.edges.arrows = {
    to: {
      enabled: true,
      type: 'circle',
    },
    from: {
      enabled: true,
      type: 'arrow',
    },
  };
  options.interaction.selectConnectedEdges = false;
  options.interaction.hoverConnectedEdges = false;

  <NetworkDiagram
    nodes={[
      new NetworkDiagram.Node(1, 'Document 1'),
      new NetworkDiagram.Node(2, 'Document 2'),
      new NetworkDiagram.Node(3, 'Document 3'),
      new NetworkDiagram.Node(4, 'Document 4'),
    ]}
    edges={[
      new NetworkDiagram.Edge(1, 2),
      new NetworkDiagram.Edge(1, 3),
      new NetworkDiagram.Edge(1, 4),
      new NetworkDiagram.Edge(2, 4),
    ]}
    options={options}
    style={{
      height: '450px',
      width: '450px',
      border: '1px solid blue',
    }}
  />
```
