#### Examples:

__1:__ Combined bar and line chart values over time. The bar represents percentages.

```jsx
  const DataPoint = require('../../src/api/DataPoint').default;

  const roundTo = function(num, digits = 0) {
    var multiplier = Math.pow(10, digits);
    const bigValue = Math.round(num * multiplier);
    return  bigValue / multiplier;
  };

  const getPoints = function(values, startTime, increment) {
    let currentStart = startTime;
    return values.map((value) => {
      const oldStart = currentStart;
      currentStart += increment;
      return {
        date: oldStart,
        value,
        endDate: currentStart,
      };
    });
  };

  const getValues = function(count, max, min = 0, decimalPoints = 0) {
    const result = [];
    let i;
    for (i = 0; i < count; i += 1) {
      const fraction = Math.random();
      const number = (fraction * (max - min)) + min;
      result.push(roundTo(number, decimalPoints));
    }
    return result;
  };

  const getBarValues = function() {
    const startTime = Date.UTC(2018, 6, 16);
    const increment = 1000 * 60 * 60 * 24; // 1 day
    const articleCounts = getValues(30, 100);
    return getPoints(articleCounts, startTime, increment);
  };

  const getLineValues = function() {
    const startTime = Date.UTC(2018, 6, 16);
    const increment = 1000 * 60 * 60 * 24; // 1 day
    const selfServeCounts = getValues(30, 1500, 71);
    return getPoints(selfServeCounts, startTime, increment);
  };

  const dataPoints1 = getBarValues().map((dataPoint) => {
    return new DataPoint(dataPoint.date, dataPoint.endDate, dataPoint.value);
  });

  const source1 = new TimeSeries.SeriesDataSource('Goodness', 'BAR', dataPoints1, '#0000c2', ':{}%', '% Goodness', true, true);

  const dataPoints2 = getLineValues().map((dataPoint) => {
    return new DataPoint(dataPoint.date, dataPoint.endDate, dataPoint.value);
  });
  const source2 = new TimeSeries.SeriesDataSource('Self-Serve Requests', 'LINE', dataPoints2, '#00c200', ':1 request|{} requests', 'Requests');

  <TimeSeries
    dataSources={[source1, source2]}
  />
```

__2:__ Stacked bar chart values over time.

```jsx
  const DataPoint = require('../../src/api/DataPoint').default;

  const roundTo = function(num, digits = 0) {
    var multiplier = Math.pow(10, digits);
    const bigValue = Math.round(num * multiplier);
    return  bigValue / multiplier;
  };

  const getPoints = function(values, startTime, increment) {
    let currentStart = startTime;
    return values.map((value) => {
      const oldStart = currentStart;
      currentStart += increment;
      return {
        date: oldStart,
        value,
        endDate: currentStart,
      };
    });
  };

  const getValues = function(count, max, min = 0, decimalPoints = 0) {
    const result = [];
    let i;
    for (i = 0; i < count; i += 1) {
      const fraction = Math.random();
      const number = (fraction * (max - min)) + min;
      result.push(roundTo(number, decimalPoints));
    }
    return result;
  };

  const getBarValues = function() {
    const startTime = Date.UTC(2018, 6, 16);
    const increment = 1000 * 60 * 60 * 24; // 1 day
    const values = getValues(30, 230);
    return getPoints(values, startTime, increment);
  };

  const getSecondBarValues = function() {
    const startTime = Date.UTC(2018, 6, 16);
    const increment = 1000 * 60 * 60 * 24; // 1 day
    const values = getValues(30, 230);
    return getPoints(values, startTime, increment);
  };

  const dataPoints1 = getBarValues().map((dataPoint) => {
    return new DataPoint(dataPoint.date, dataPoint.endDate, dataPoint.value);
  });
  const source1 = new TimeSeries.SeriesDataSource('Stacked Values', 'BAR', dataPoints1, '#0000c2', ':1 document|{} documents', 'New Document Count');
  const dataPoints2 = getSecondBarValues().map((dataPoint) => {
    return new DataPoint(dataPoint.date, dataPoint.endDate, dataPoint.value);
  });
  const source2 = new TimeSeries.SeriesDataSource('Base Values', 'BAR', dataPoints2, '#00c200', ':1 document|{} documents');

  <TimeSeries
    dataSources={[source1, source2]}
  />
```

__3:__ Combined bar and line chart values over time with the legend off to the right and a taller chart.

```jsx
  const DataPoint = require('../../src/api/DataPoint').default;

  const roundTo = function(num, digits = 0) {
    var multiplier = Math.pow(10, digits);
    const bigValue = Math.round(num * multiplier);
    return  bigValue / multiplier;
  };

  const getPoints = function(values, startTime, increment) {
    let currentStart = startTime;
    return values.map((value) => {
      const oldStart = currentStart;
      currentStart += increment;
      return {
        date: oldStart,
        value,
        endDate: currentStart,
      };
    });
  };

  const getValues = function(count, max, min = 0, decimalPoints = 0) {
    const result = [];
    let i;
    for (i = 0; i < count; i += 1) {
      const fraction = Math.random();
      const number = (fraction * (max - min)) + min;
      result.push(roundTo(number, decimalPoints));
    }
    return result;
  };

  const getBarValues = function() {
    const startTime = Date.UTC(2018, 6, 16);
    const increment = 1000 * 60 * 60 * 24; // 1 day
    const articleCounts = getValues(30, 230);
    return getPoints(articleCounts, startTime, increment);
  };

  const getLineValues = function() {
    const startTime = Date.UTC(2018, 6, 16);
    const increment = 1000 * 60 * 60 * 24; // 1 day
    const selfServeCounts = getValues(30, 1500, 71);
    return getPoints(selfServeCounts, startTime, increment);
  };

  const dataPoints1 = getBarValues().map((dataPoint) => {
    return new DataPoint(dataPoint.date, dataPoint.endDate, dataPoint.value);
  });
  const source1 = new TimeSeries.SeriesDataSource('New Documents', 'BAR', dataPoints1, '#0000c2', ':1 document|{} documents', 'New Document Count');
  const dataPoints2 = getLineValues().map((dataPoint) => {
    return new DataPoint(dataPoint.date, dataPoint.endDate, dataPoint.value);
  });
  const source2 = new TimeSeries.SeriesDataSource('Self-Serve Requests', 'LINE', dataPoints2, '#00c200', ':1 request|{} requests', 'Requests');

  <TimeSeries
    dataSources={[source1, source2]}
    legendAtRight
    height={400}
  />
```
