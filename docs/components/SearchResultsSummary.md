#### Examples:

__1.__ Showing a complete set of search results.

```jsx
  <SearchResultsSummary pageNumber={0} totalResults={32} resultsPerPage={50} haveSearched />
```

__2.__ Showing a partial set.

```jsx
  <SearchResultsSummary pageNumber={3} totalResults={502} resultsPerPage={25} haveSearched />
```

__3.__ When the search hasn't yet happened.

```jsx
  <SearchResultsSummary haveSearched={false} />
```
