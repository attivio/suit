#### Examples:


__1:__ Single-select filter with all items showing

```jsx
  initialState={
    value: null,
  }
  const values = [
    'Annette',
    'Bobby',
    'Cubby',
    'Darlene',
    'Doreen',
    'Karen',
    'Lonnie',
    'Sharon',
    'Tommy',
  ];
  <div style={{ width: '250px' }}>
    <LozengeFilter
      title="Mouseketeers"
      allLabel="Nobody's Home"
      values={values}
      currentValue={state.value}
      onChange={(newValue) => { setState({ value: newValue }); }}
    />
  </div>
```

__2:__ Multi-select filter with a scroll bar because not all items fit (also, it's limited to showing 7 items).

```jsx
  initialState={
    value: ['Reese\'s', 'Crunch',],
  }
  const values = [
    '100 Grand',
    'Almond Joy',
    'Baby Ruth',
    'Charleston Chew',
    'Chunky',
    'Clark',
    'Crunch',
    'Heath',
    'Hershey\'s',
    'Kit Kat',
    'Mars',
    'MilkyWay',
    'Mr. Goodbar',
    'Mounds',
    'Oh Henry!',
    'Payday',
    'Reese\'s',
    'Snickers',
    'Three Musketeers',
    'Toblerone',
    'Twix',
    'York Peppermint Patty',
    'Zagnut',
  ];
  <div style={{ width: '250px' }}>
    <LozengeFilter
      title="Candy Bars"
      allLabel="None"
      values={values}
      itemCutoff={7}
      multiSelect
      currentValue={state.value}
      onChange={(newValue) => { setState({ value: newValue }); }}
      filterPlaceholder="Choose a candy bar…"
    />
  </div>
```
