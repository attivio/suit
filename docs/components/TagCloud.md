#### Examples:

__1.__ Showing a variety of levels.

```jsx
  <TagCloud
    tags={[
      new TagCloud.TagCloudValue('Alaska', 741894),
      new TagCloud.TagCloudValue('Alabama', 4863000),
      new TagCloud.TagCloudValue('California', 39250017),
      new TagCloud.TagCloudValue('Georgia', 10310371),
      new TagCloud.TagCloudValue('Wisconsin', 5778708),
      new TagCloud.TagCloudValue('Louisiana', 4681666),
      new TagCloud.TagCloudValue('Florida', 20612439),
      new TagCloud.TagCloudValue('Massachusetts', 6811779),
      new TagCloud.TagCloudValue('Rhode Island', 1056426),
      new TagCloud.TagCloudValue('Wyoming', 585501),
      new TagCloud.TagCloudValue('District of Columbia', 681170),
      new TagCloud.TagCloudValue('Midway Atoll', 75),
    ]}
    callback={(value) => {
      alert(`The user clicked the cloud item ${value.label} whose population is ${value.value}.`);
    }}
  />
```

__2.__ Limiting the results to 5 tags.

```jsx
  <TagCloud
    tags={[
      new TagCloud.TagCloudValue('Alaska', 741894),
      new TagCloud.TagCloudValue('Alabama', 4863000),
      new TagCloud.TagCloudValue('California', 39250017),
      new TagCloud.TagCloudValue('Georgia', 10310371),
      new TagCloud.TagCloudValue('Wisconsin', 5778708),
      new TagCloud.TagCloudValue('Louisiana', 4681666),
      new TagCloud.TagCloudValue('Florida', 20612439),
      new TagCloud.TagCloudValue('Massachusetts', 6811779),
      new TagCloud.TagCloudValue('Rhode Island', 1056426),
      new TagCloud.TagCloudValue('Wyoming', 585501),
      new TagCloud.TagCloudValue('District of Columbia', 681170),
      new TagCloud.TagCloudValue('Midway Atoll', 75),
    ]}
    maxValues={5}
    callback={(value) => {
      alert(`The user clicked the cloud item ${value.label} whose population is ${value.value}.`);
    }}
  />
```
