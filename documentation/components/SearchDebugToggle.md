#### Examples:


__1:__ Basic version.

```jsx
  const DummySearcher = require('../../src/components/DummySearcher').default;
  <DummySearcher>
    <SearchDebugToggle />
  </DummySearcher>
```

__2:__ Custom label, pinned to the right.

```jsx
  const DummySearcher = require('../../src/components/DummySearcher').default;
  <DummySearcher>
    <SearchDebugToggle label="Show Me Everything:" right/>
  </DummySearcher>
```
