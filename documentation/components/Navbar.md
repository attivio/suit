#### Examples:

__1.__ Simple, empty navigation bar

```jsx
  import NavbarFilter from '../../src/components/NavbarFilter';
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
