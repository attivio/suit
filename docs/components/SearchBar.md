#### Examples:

__1.__ Simplest search bar.

```jsx
  <Router>
    <Searcher>
      <SearchBar />
    </Searcher>
  </Router>
```

__2.__ Search bar styled for use inside the `<Masthead>` component.

```jsx
  <SearchBar inMasthead />
```

__3.__ Search bar with custom placeholder text, which also allows voice-recognition-based entry.
```
  <SearchBar
    placeholder="Tell me what you want…"
    allowVoice
  />
```
