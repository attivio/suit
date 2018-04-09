#### Examples:

__1.__ Simple example.

```jsx
  initialState = {
    currentPage: 1,
  };
  const Navbar = require('../../src/components/Navbar').default;
  <Navbar>
    <NavbarPager
      currentPage={state.currentPage}
      maxPage={17}
      onChange={(newPage) => {
        setState({
          currentPage: newPage,
        });
      }}
    />
  </Navbar>
```
