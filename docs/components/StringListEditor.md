#### Examples:


__1:__ An editor for keeping track of a shopping list.

```jsx
  initialState = {
    items: ['Chocolate', 'More Chocolate', 'Cocoa', 'Carob Substitute (Chocolate)'],
  };

  <StringListEditor
    addButtonTooltip="Add to the shopping list"
    placeholder="Item to buy"
    items={state.items}
    updateList={(newItems) => {
      setState({ items: newItems });
    }}
  />
