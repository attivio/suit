#### Examples:

__1.__ Simple example showing two filters that have been applied.

```jsx
<div>
  <NavbarFilter
    facetName="Country"
    bucketLabel="China (中国)"
    removeCallback={() => {
      alert('The user wants to remove the country filter.');
    }}
  />
  <NavbarFilter
    facetName="Table"
    bucketLabel="News"
    removeCallback={() => {
      alert('The user wants to remove the table filter.');
    }}
  />
</div>
```
