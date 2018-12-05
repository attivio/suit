#### Examples:


__1:__ Chart with both lines and bars.

```jsx
  const values = [
    new LineBarChart.Point(1, 5),
    new LineBarChart.Point(2, 8),
    new LineBarChart.Point(3, 13),
    new LineBarChart.Point(4, 9),
    new LineBarChart.Point(5, 2),
    new LineBarChart.Point(6, 1),
    new LineBarChart.Point(7, 4),
  ];
  const values2 = [
    new LineBarChart.Point(1, 3),
    new LineBarChart.Point(2, 2),
    new LineBarChart.Point(3, 15),
    new LineBarChart.Point(4, 8),
    new LineBarChart.Point(5, 3),
    new LineBarChart.Point(6, 15),
    new LineBarChart.Point(7, 8),
  ];
  <LineBarChart
    dataSources={[
      new LineBarChart.ChartDataSource('Cats Seen', 'BAR', values2, '#00ff00', 'cats'),
      new LineBarChart.ChartDataSource('Mice Caught', 'LINE', values, '#ff0000', 'mice'),
    ]}
    height={200}
    xAxisLabel="Time"
    yAxisLabel="Mice Caught"
    yAxis2Label="Cats Seen"
  /> 
```
