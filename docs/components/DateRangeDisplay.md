#### Examples:


__1:__ Example with an interval (a month) and a custom label.

```jsx
  <DateRangeDisplay
    label="When:"
    interval={ 30 * 24 * 60 * 60 * 1000 }
  />
```

__2:__ Example with a specified start and end time that are years apart.

```jsx
  <DateRangeDisplay
    start={new Date(2000, 3, 15)}
    end={new Date(2012, 8, 30)}
  />
```

__3:__ Example with a specified start and end time that are months apart.

```jsx
  <DateRangeDisplay
    start={new Date(2000, 3, 15)}
    end={new Date(2001, 1, 15)}
  />
```

__4:__ Example with a specified start and end time that are days apart.

```jsx
  <DateRangeDisplay
    start={new Date(2000, 3, 15)}
    end={new Date(2000, 4, 1)}
  />
```

__3:__ Example with a specified start and end time that are hours apart.

```jsx
  <DateRangeDisplay
    start={new Date(2000, 3, 15, 2, 0)}
    end={new Date(2000, 3, 15, 13, 0)}
  />
```

__3:__ Example with a specified start and end time that are minutes apart.

```jsx
  <DateRangeDisplay
    start={new Date(2000, 3, 15, 2, 0)}
    end={new Date(2000, 3, 15, 2, 37)}
  />
```

__3:__ Example with a specified start and end time that are the same.

```jsx
  <DateRangeDisplay
    start={new Date(2000, 3, 15)}
    end={new Date(2000, 3, 15)}
  />
```
