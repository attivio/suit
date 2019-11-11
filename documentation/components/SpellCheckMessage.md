#### Examples:


__1:__  Showing a suggested update to the user's query.

```jsx
  import { Link, MemoryRouter, Route, Switch } from 'react-router-dom';
  import DummySearcher from '../../src/components/DummySearcher';
  import QueryResponse from '../../src/api/QueryResponse';
  import SearchFeedback from '../../src/api/SearchFeedback';

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
