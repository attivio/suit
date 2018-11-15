#### Examples:


__1:__ A simple bar chart showing time-based data. This is designed to show data from time-based facets.

```jsx
  const timeSeriesData = [];
  let timeLong = new Date().getTime();
  let i;
  for (i = 0; i < 30; i++) {
    const date = new Date(timeLong);
    const value = Math.floor(Math.random() * 10000) / 100;
    const dataPoint = new TimeSeries.TimeSeriesPoint(null, value);
    dataPoint.date = date;
    timeSeriesData.unshift(dataPoint);
    timeLong -= (1000 * 60 * 60 * 24); // go back a day
  }

  <TimeSeries
    data={timeSeriesData}
    onSelect={(start, end) => {
      if (start && end) {
        alert(`The user selected from ${start.toLocaleString()} to ${end.toLocaleString()}`);
      } else if (start) {
        alert(`The user selected from ${start.toLocaleString()}`);
      } else if (end) {
        alert(`The user selected up to ${end.toLocaleString()}`);
      } else {
        alert('The user selected nothing');
      }
    }}
  />
```
