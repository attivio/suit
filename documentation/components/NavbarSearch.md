#### Examples:

__1:__  A simple example using the search field.

```jsx
  initialState = {
    value: '',
  };
  <NavbarSearch
    placeholder="Whatcha want?"
    value={state.value}
    updateSearchString={(newValue) => {
      setState({ value: newValue });
    }}
    onSearch={() => {
      alert(`The user wants to search for ${state.value}.`);
    }}
  />
```
