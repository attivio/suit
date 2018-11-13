#### Examples:


__1:__  A simple example using the search field.

```jsx
  initialState = {
    value: '',
  };
  <NavbarSearch
    placeholder="Whatcha want?"
    value={state.vaue}
    updateSearchString={(newValue) => {
      setState({ vaue: newValue });
    }}
    onSearch={() => {
      alert(`The user wants to search for ${state.value}.`);
    }}
  />
```
