#### Examples:

__1.__ Simple, empty navigation bar

```jsx
  const NavbarFilter = require('../../src/components/NavbarFilter').default;
  <Navbar>
    <NavbarFilter
      facetName="Country"
      bucketLabel="China (中国)"
      removeCallback={() => {
        alert('The user wants to remove the country filter.');
      }}
    />
  </Navbar>
```
