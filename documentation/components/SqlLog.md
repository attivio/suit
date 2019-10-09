#### Examples:

__1.__ With the default label

```jsx
  <SqlLog
    lines={[
      'My first query',
      'Another query',
      'this is a super super long query with a whole bunch of characters and it just seems to keep going and going, like that silly rabbit from the commercials for batteries that playes the bass drum strapped to its little bunny chest', // eslint-disable-line max-len
    ]}
  />
```

__2.__ With a custom label

```jsx
  <SqlLog
    label="My Log Entries"
    lines={[
      'My first query',
      'Another query',
      'this is a super super long query with a whole bunch of characters and it just seems to keep going and going, like that silly rabbit from the commercials for batteries that plays the bass drum strapped to its little bunny chest', // eslint-disable-line max-len
    ]}
  />
```
