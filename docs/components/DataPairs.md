#### Examples:

__1.__ Showing entity lists.

```jsx
  <DataPairs
    pairs={[
      new DataPairs.DataPairInfo('People', 'George Washington, Frieda Kahlo, and Mickey Mouse', 'person'),
      new DataPairs.DataPairInfo('Locations', 'Washington, D.C., Mexico, DF, and Orlando, FL', 'location'),
      new DataPairs.DataPairInfo('Key Phrases', 'Crossing the Delaware, Oil Painting, Mouseketeers', 'phrase'),
      new DataPairs.DataPairInfo('Untyped', 'This data set has no type.'),
    ]}
  />
```

__2.__ Once more, with a Show All link

```jsx
  <DataPairs
    pairs={[
      new DataPairs.DataPairInfo('People', 'George Washington, Frieda Kahlo, and Mickey Mouse', 'person'),
      new DataPairs.DataPairInfo('Locations', 'Washington, D.C., Mexico, DF, and Orlando, FL', 'location'),
      new DataPairs.DataPairInfo('Key Phrases', 'Crossing the Delaware, Oil Painting, Mouseketeers', 'phrase'),
      new DataPairs.DataPairInfo('Untyped', 'This data set has no type.'),
    ]}
    onShowAll={() => {
      alert('The user clicked the "Show All…" link for the data pairs.');
    }}
  />
```