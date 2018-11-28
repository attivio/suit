#### Examples:

__1.__ Showing a variety of levels.

```jsx

const positiveTags = [
  new SentimentTagCloud.SentimentTagCloudValue('Alaska', 741894, 'positive'),
  new SentimentTagCloud.SentimentTagCloudValue('Alabama', 4863000, 'positive'),
  new SentimentTagCloud.SentimentTagCloudValue('California', 39250017, 'positive'),
  new SentimentTagCloud.SentimentTagCloudValue('Georgia', 10310371, 'positive'),
  new SentimentTagCloud.SentimentTagCloudValue('Wisconsin', 5778708, 'positive'),
];
const negativeTags = [
  new SentimentTagCloud.SentimentTagCloudValue('Louisiana', 4681666, 'negative'),
  new SentimentTagCloud.SentimentTagCloudValue('Florida', 20612439, 'negative'),
  new SentimentTagCloud.SentimentTagCloudValue('Massachusetts', 6811779, 'negative'),
  new SentimentTagCloud.SentimentTagCloudValue('Rhode Island', 1056426, 'negative'),
  new SentimentTagCloud.SentimentTagCloudValue('Wyoming', 585501, 'negative'),
  new SentimentTagCloud.SentimentTagCloudValue('District of Columbia', 681170, 'negative'),
  new SentimentTagCloud.SentimentTagCloudValue('Midway Atoll', 75, 'negative'),
];

  <SentimentTagCloud
    positiveTags={positiveTags}
    negativeTags={negativeTags}
    callback={(value) => {
      alert(`The user clicked the cloud item ${value.label} whose valus is ${value.value} and whose sentiment is ${value.sentiment}.`);
    }}
  />
```
