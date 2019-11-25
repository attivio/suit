#### Examples:

__1.__ Simple example with default placeholder and styling

```jsx
  initialState = { currentValue: '' };
  <AutoCompleteInput
    uri="http://get.suggestionshere.com"
    updateValue={(value, addNow) => {
      addNow ? this.takeSomeAction(value) : setState({ currentValue: value })
    }}
    value={state.currentValue}
  />
```

__2.__ Example with custom class and placeholder

```jsx
  initialState = { currentValue: '' };
  <AutoCompleteInput
    uri="http://get.suggestionshere.com"
    updateValue={(value, addNow) => {
      addNow ? this.takeSomeAction(value) : setState({ currentValue: value })
    }}
    value={state.currentValue}
    placeholder={'Tag\u2026'}
    className="form-control"
  />
```

__3.__ Example that allows users to escape the input by pressing the escape key

```jsx
  initialState = { currentValue: '' };
  <AutoCompleteInput
    uri={'http://get.suggestionshere.com'}
    updateValue={(value, addNow) => {
      addNow ? this.takeSomeAction(value) : setState({ currentValue: value })
    }}
    value={state.currentValue}
    onEscape={() => { setState({ currentFocus: null })}}
  />
```