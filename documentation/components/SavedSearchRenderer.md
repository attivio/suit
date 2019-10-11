#### Examples:

**1.** Simple enabled Saved search option. This component is an additional feature to be used as a child in the `<SearchBar>`.

```jsx
const { SearchBar } = require('react-router-dom');
initialState = {
  response: undefined,
  error: undefined,
  showSaveSearchModal: false,
  savedSearchTitle: '',
  savedSearchList: []
};

<SearchBar>
  <SavedSearchRenderer />;
</SearchBar>;
```
