#### Examples:

__1.__ A downward trend.

```jsx
  <ChartTrends change="-52.6%" down />
```

__2.__ An upward trend.

```jsx
  <ChartTrends change="5mm" up />
```

__3.__ An average value.

```jsx
  <ChartTrends change="18.425"/>
```

__4.__ An upward trend with a custom label.

```jsx
  <ChartTrends
    change="5mm"
    up
    changedLabel="Fluctuating"
  />
```

__5.__ An unchanged value with a custom label.

```jsx
  <ChartTrends
    change="18.425"
    unchangedLabel="Stable"
  />
```
