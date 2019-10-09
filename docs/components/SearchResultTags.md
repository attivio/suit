#### Examples:

__1.__ Showing a set of existing tags.

```jsx
const { StaticRouter } = require('react-router-dom');
<StaticRouter context={{}}>
  <SearchResultTags
    tags={[
      'Useful',
      'Friendly',
      'Warm & Fuzzy',
      'Jealous',
    ]}
    docId="foo"
  />
</StaticRouter>
```

__2.__ Showing no existing tags.

```jsx
const { StaticRouter } = require('react-router-dom');
<StaticRouter context={{}}>
  <SearchResultTags tags={[]} docId="foo" />
</StaticRouter>
```

__3.__ Showing tags in a vertical layout.

```jsx
const { StaticRouter } = require('react-router-dom');
<StaticRouter context={{}}>
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
</StaticRouter>
```
