#### Examples:

__1.__ Simple card.

```jsx
  <ExpertCard
    experName="John Smith"
    expertImage="img/jsmith.png"
    expertTitle="Software Engineer"
    expertDepartment="R & D"
    expertId="37242"
    expertBirthdate={new Date()}
    expertiseList={[
      new ExpertCard.ExpertiseItem('Attivio', 'http://www.attivio.com'),
      new ExpertCard.ExpertiseItem('Coffee', 'https://en.wikipedia.org/wiki/Coffee'),
      new ExpertCard.ExpertiseItem('JavaScript', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'),
    ]}
    authorCount={4}
    authoredMessage="a single research document|all of {} research documents"
  />
```

__2.__ Card with some missing details.

```jsx
  <ExpertCard
    experName="John Smith"
    expertTitle="Software Engineer"
    expertDepartment="R & D"
    expertiseList={[
      new ExpertCard.ExpertiseItem('Attivio', 'http://www.attivio.com'),
      new ExpertCard.ExpertiseItem('Coffee', 'https://en.wikipedia.org/wiki/Coffee'),
      new ExpertCard.ExpertiseItem('JavaScript', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'),
    ]}
  />
```
