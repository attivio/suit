#### Examples:

__1.__ To pick a single date.

```jsx
  <DatePicker
    startingDate={new Date()}
    updateDate={(newDate) => {
      alert(`The user chose a new date: ${newDate.toString()}.`);
    }}
  />
```

__2.__ To pick a date range.

```jsx
  <DatePicker
    startingDate={new Date('Mon, 25 Dec 1995')}
    endingDate={new Date()}
    range
    updateDate={(newStart, newEnd) => {
      alert(`The user chose a new date range, from ${newStart.toString()} to ${newEnd.toString()}.`);
    }}
  />
```
