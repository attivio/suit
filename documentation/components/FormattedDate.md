#### Examples:

All the examples use the same date, with different formatting options.

__1.__ ISO_8601

```jsx
  const DateFormat = require('../../src/api/DateFormat').default;

  <FormattedDate
    date={new Date('2015-10-21T21:29:00-00:00')}
    format={DateFormat.ISO_8601}
  />
```

__2.__ SHORT_DATE

```jsx
  const DateFormat = require('../../src/api/DateFormat').default;

<FormattedDate
    date={new Date('2015-10-21T21:29:00-05:00')}
    format={DateFormat.SHORT_DATE}
  />
```

__3.__ MEDIUM_DATE

```jsx
  const DateFormat = require('../../src/api/DateFormat').default;

  <FormattedDate
    date={new Date('2015-10-21T21:29:00-05:00')}
    format={DateFormat.MEDIUM_DATE}
  />
```

__4.__ LONG_DATE

```jsx
  const DateFormat = require('../../src/api/DateFormat').default;

  <FormattedDate
    date={new Date('2015-10-21T21:29:00-05:00')}
    format={DateFormat.LONG_DATE}
  />
```

__5.__ SHORT_TIME

```jsx
  const DateFormat = require('../../src/api/DateFormat').default;

  <FormattedDate
    date={new Date('2015-10-21T21:29:00-05:00')}
    format={DateFormat.SHORT_TIME}
  />
```

__6.__ LONG_TIME

```jsx
  const DateFormat = require('../../src/api/DateFormat').default;

  <FormattedDate
    date={new Date('2015-10-21T21:29:00-05:00')}
    format={DateFormat.LONG_TIME}
  />
```

__7.__ SHORT

```jsx
  const DateFormat = require('../../src/api/DateFormat').default;

  <FormattedDate
    date={new Date('2015-10-21T21:29:00-05:00')}
    format={DateFormat.SHORT}
  />
```

__8.__ MEDIUM

```jsx
  const DateFormat = require('../../src/api/DateFormat').default;

  <FormattedDate
    date={new Date('2015-10-21T21:29:00-05:00')}
    format={DateFormat.MEDIUM}
  />
```

__9.__ LONG

```jsx
  const DateFormat = require('../../src/api/DateFormat').default;

<FormattedDate
    date={new Date('2015-10-21T21:29:00-05:00')}
    format={DateFormat.LONG}
  />
```

__10.__ AGO

```jsx
  const DateFormat = require('../../src/api/DateFormat').default;

  <FormattedDate
    date={new Date('2015-10-21T21:29:00-05:00')}
    format={DateFormat.AGO}
  />
```
