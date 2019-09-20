#### Examples:

__1.__ Simple example.

```jsx
  const ExpertDetails = require('../../src/components/ExpertDetails').default;
  <SimilarAuthorCard
    expert={
      new ExpertDetails.ExpertInfo(
        'Jane Goodall',
        'Primatologist',
        'Anthropology',
        'https://upload.wikimedia.org/wikipedia/commons/c/cc/Jane_Goodall_2015.jpg',
        'https://en.wikipedia.org/wiki/Jane_Goodall'
      )
    }
  />
```