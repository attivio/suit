#### Examples:

For more complex examples, see the Document360Page.

__1.__ Simple example with straighforward content.

```jsx
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
    options={{
      edges: {
        arrows: {
          to: {
            enabled: true,
            type: 'circle',
          },
          from: {
            enabled: true,
            type: 'arrow',
          },
        },
        arrowStrikethrough: false,
        label: '<>',
        physics: false,
        title: 'Hookin’ up words and phrases...',
      },
      nodes: {
        borderWidth: 0,
        color: {
          background: '#ccc',
          border: '#000',
          highlight: {
            border: '#800',
            background: '#f88',
          },
          hover: {
            border: 'yellow',
            background: 'lightyellow',
          },
        },
        shape: 'box',
        shadow: true,
        shapeProperties: {
          borderRadius: 4,
        },
        title: 'You’re hovering over me!',
      },
      interaction: {
        selectConnectedEdges: false,
        hoverConnectedEdges: false,
      },
    }}
    style={{
      height: '450px',
      width: '450px',
      border: '1px solid blue',
    }}
  />
```
