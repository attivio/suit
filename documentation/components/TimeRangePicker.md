#### Examples:


__1:__ A control to choose a time range.

```jsx
  initialState = {
    interval: '7d',
    start: null,
    end: null,
    granularity: 'DAY',
  };
  const intervals = new Map();
  intervals.set('15m', 1000 * 60 * 15);
  intervals.set('1h', 1000 * 60 * 60);
  intervals.set('12h', 1000 * 60 * 60 * 12);
  intervals.set('1d', 1000 * 60 * 60 * 24);
  intervals.set('7d', 1000 * 60 * 60 * 24 * 7);
  intervals.set('30d', 1000 * 60 * 60 * 24 * 30);
  intervals.set('90d', 1000 * 60 * 60 * 24 * 90);
  intervals.set('180d', 1000 * 60 * 60 * 24 * 180);
  intervals.set('1y', 1000 * 60 * 60 * 24 * 365);

  <TimeRangePicker
    currentInterval={state.interval}
    currentStart={state.start}
    currentEnd={state.end}
    currentGranularity={state.granularity}
    onChange={(currentInterval, intervalMS, start, end, granularity) => {
      setState({
        interval: currentInterval,
        start,
        end,
        granularity,
      });
    }}
    intervals={intervals}
  /> 
```

__2:__ A control that allows a custom time range and allows users to set their own granularity.

```jsx
  initialState = {
    interval: '7d',
    start: null,
    end: null,
    granularity: 'DAY',
  };
  const intervals = new Map();
  intervals.set('15m', 1000 * 60 * 15);
  intervals.set('1h', 1000 * 60 * 60);
  intervals.set('12h', 1000 * 60 * 60 * 12);
  intervals.set('1d', 1000 * 60 * 60 * 24);
  intervals.set('7d', 1000 * 60 * 60 * 24 * 7);
  intervals.set('30d', 1000 * 60 * 60 * 24 * 30);
  intervals.set('90d', 1000 * 60 * 60 * 24 * 90);
  intervals.set('180d', 1000 * 60 * 60 * 24 * 180);
  intervals.set('1y', 1000 * 60 * 60 * 24 * 365);
  <TimeRangePicker
    currentInterval={state.interval}
    currentStart={state.start}
    currentEnd={state.end}
    currentGranularity={state.granularity}
    customRange
    customGranularity
    onChange={(currentInterval, intervalMS, start, end, granularity) => {
      setState({
        interval: currentInterval,
        start,
        end,
        granularity,
      });
    }}
    intervals={intervals}
  /> 
```

__3:__ A control with custom time ranges.

```jsx
  initialState = {
    interval: 'fortnight',
    start: null,
    end: null,
    granularity: 'DAY',
  };
  const intervals = new Map();
  intervals.set('A While', 1000 * 60 * 60 * 17);
  intervals.set('Fortnight', 1000 * 60 * 60 * 24 * 14);
  intervals.set('Quarter Century', 1000 * 60 * 60 * 24 * 365 * 25);
  <TimeRangePicker
    intervals={intervals}
    currentInterval={state.interval}
    currentStart={state.start}
    currentEnd={state.end}
    currentGranularity={state.granularity}
    onChange={(currentInterval, intervalMS, start, end, granularity) => {
      setState({
        interval: currentInterval,
        start,
        end,
        granularity,
      });
    }}
  /> 
```
