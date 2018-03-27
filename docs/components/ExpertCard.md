#### Examples:

__1.__ Simple card.

```jsx
  <ExpertCard
    experName="Ludwig van Beethoven"
    expertImage="img/Ludwig_Van_Beethoven.jpg"
    expertTitle="Composer"
    expertDepartment="Music"
    expertId="37242"
    expertBirthdate={new Date('1770-12-17T12:00:00')}
    expertiseList={[
      new ExpertCard.ExpertiseItem('Orchestra', 'https://en.wikipedia.org/wiki/Orchestra'),
      new ExpertCard.ExpertiseItem('Classical Music', 'https://en.wikipedia.org/wiki/Classical_music'),
      new ExpertCard.ExpertiseItem('Bonn, Germany', 'https://www.nrw-tourism.com/bonn-city-of-beethoven'),
    ]}
    authorCount={4}
    authoredMessage="a single musical composition|all of {} musical compositions"
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
