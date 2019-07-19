#### Examples:

__1.__ Simple pager for navigating among 10 pages of data.

```jsx
  initialState = {
    page: 0,
  };
  <Pager
    onPageChange={(newPage) => {
      setState({ page: newPage });
      alert(`The user is navigating to page ${newPage + 1}.`);
    }}
    currentPage={state.page}
    totalPages={10}
  />
```

__2.__ Simple pager for navigating among an unknown number of pages based on whether
there are more pages at any given point in time.

```jsx
  initialState = {
    page: 0,
  };
  <Pager
    onPageChange={(newPage) => {
      setState({ page: newPage });
    }}
    currentPage={state.page}
    hasMore={(state.page < 4)}
  />
```
