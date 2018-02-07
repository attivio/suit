#### Examples:

__1.__ Showing a set of existing tags.

```jsx
  <SearchResultTags
    tags={[
      'Useful',
      'Friendly',
      'Warm & Fuzzy',
      'Jealous',
    ]}
    docId="foo"
  />
```

__2.__ Showing no existing tags.

```jsx
  <SearchResultTags tags={[]} docId="foo" />
```

__3.__ Showing tags in a vertical layout.

```jsx
  <SearchResultTags
    tags={[
      'Useful',
      'Friendly',
      'Warm & Fuzzy',
      'Jealous',      
    ]}
    vertical
    docId="foo"
  />
```
