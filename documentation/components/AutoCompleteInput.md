#### Examples:

__1.__ Simple example with default placeholder and styling

```jsx
  <AutoCompleteInput
    uri={'http://get.suggestionshere.com'}
    updateValue={(value: string, addNow?: boolean) => {
      addNow ? this.takeSomeAction(value) : setState({ currentValue: value })
    }}
    value={this.state.currentValue}
  />
```

__2.__ Example with custom class and placeholder

```jsx
  <AutoCompleteInput
    uri={'http://get.suggestionshere.com'}
    updateValue={(value: string, addNow?: boolean) => {
      addNow ? this.takeSomeAction(value) : setState({ currentValue: value })
    }}
    value={this.state.currentValue}
    placeholder={'Tag\u2026'}
    className="form-control"
  />
```

__3.__ Example that allows users to escape the input by pressing the escape key

```jsx
  <AutoCompleteInput
    uri={'http://get.suggestionshere.com'}
    updateValue={(value: string, addNow?: boolean) => {
      addNow ? this.takeSomeAction(value) : setState({ currentValue: value })
    }}
    value={this.state.currentValue}
    onEscape={() => { setState({ currentFocus: null })}}
  />
```