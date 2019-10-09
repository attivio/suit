#### Examples:

__1.__ Hierarchical list.

```jsx
const initialState = {
  openNodes: [],
};

const us = new HierarchicalList.HierarchicalNode('United States', 'USA', [
  new HierarchicalList.HierarchicalNode('Georgia', 'GA'),
  new HierarchicalList.HierarchicalNode('Massachusetts', 'MA'),
  new HierarchicalList.HierarchicalNode('Virginia', 'VA'),
  new HierarchicalList.HierarchicalNode('Washington', 'WA'),
  new HierarchicalList.HierarchicalNode('Iowa', 'IA'),
  new HierarchicalList.HierarchicalNode('Kansas', 'KA'),
]);

const mexico = new HierarchicalList.HierarchicalNode('Mexico', 'MEX', [
  new HierarchicalList.HierarchicalNode('Chihuahua', 'CHIH'),
  new HierarchicalList.HierarchicalNode('Baja California', 'BC'),
  new HierarchicalList.HierarchicalNode('Chiapas', 'CHIA'),
  new HierarchicalList.HierarchicalNode('Yucatán', 'YUCA'),
]);

const canada = new HierarchicalList.HierarchicalNode('Canada', 'CAN', [
  new HierarchicalList.HierarchicalNode('Alberta', 'ALB'),
  new HierarchicalList.HierarchicalNode('Prince Edward Island', 'PEI'),
  new HierarchicalList.HierarchicalNode('Ontario', 'ONT'),
  new HierarchicalList.HierarchicalNode('Quebec', 'QUE'),
]);

const northAmerica = new HierarchicalList.HierarchicalNode('North America', 'NORTH_AMERICA', [
  us,
  mexico,
  canada,
]);

const france = new HierarchicalList.HierarchicalNode('France', 'FRA', [
  new HierarchicalList.HierarchicalNode('Paris', 'PARIS'),
  new HierarchicalList.HierarchicalNode('Marseilles', 'MARS'),
  new HierarchicalList.HierarchicalNode('Lyon', 'LYON'),
  new HierarchicalList.HierarchicalNode('Toulouse', 'TOULOUSE'),
]);

const europe = new HierarchicalList.HierarchicalNode('Europe', 'EUROPE', [
  france,
]);

const antarctica = new HierarchicalList.HierarchicalNode('Antarctica', 'ANTARCTICA');

const rootNode = new HierarchicalList.HierarchicalNode('root', null, [
  northAmerica,
  europe,
  antarctica,
]);

<HierarchicalList
  root={rootNode}
  openNodes={state.openNodes}
  onToggle={(key, open) => {
    if (open) {
      const updatedOpenNodes = state.openNodes.slice();
      updatedOpenNodes.push(key);
      setState({ openNodes: updatedOpenNodes });
    } else {
      const index = state.openNodes.indexOf(key);
      if (index >= 0) {
        const updatedOpenNodes = state.openNodes.slice();
        updatedOpenNodes.splice(index, 1);
        setState({ openNodes: updatedOpenNodes });
      }
    }
  }}
/>
```
