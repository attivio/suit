#### Examples:


__1:__  Showing a suggested update to the user's query.

```jsx
  const { Link, MemoryRouter, Route, Switch } = require('react-router-dom');
  const DummySearcher = require('../../src/components/DummySearcher').default;
  const QueryResponse = require('../../src/api/QueryResponse').default;
  const SearchFeedback = require('../../src/api/SearchFeedback').default;

  const feedback = new SearchFeedback();
  feedback.messageName = 'spellcheck.suggested';
  feedback.message = 'France';

const response = new QueryResponse();
  response.feedback = [feedback];

  <MemoryRouter>
    <DummySearcher defaultQueryResponse={response}>
      <SpellCheckMessage />
    </DummySearcher>
  </MemoryRouter>
```
