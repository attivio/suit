#### Examples:


__1:__ Description.

```jsx
  const { Link, MemoryRouter, Route, Switch } = require('react-router-dom');
  const DummySearcher = require('../../src/components/DummySearcher').default;
  const QueryResponse = require('../../src/api/QueryResponse').default;
  const SearchFeedback = require('../../src/api/SearchFeedback').default;

  const response = new QueryResponse();
  const feedback = new SearchFeedback();
  feedback.messageName = 'spellcheck.suggested';
  feedback.message = 'France';
  response.feedback = [feedback];

  <MemoryRouter>
    <DummySearcher defaultQueryResponse={response}>
      <SpellCheckMessage />
    </DummySearcher>
  </MemoryRouter>
```
