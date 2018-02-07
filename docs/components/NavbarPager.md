#### Examples:

__1.__ Simple example.

```jsx
  initialState = {
    currentPage: 1,
  };

  <NavbarPager
    currentPage={state.currentPage}
    maxPage={17}
    onChange={(newPage) => {
      setState({
        currentPage: newPage,
      });
    }}
  />
```
