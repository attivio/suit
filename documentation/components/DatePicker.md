#### Examples:


__1:__ Example showing an inline date picker. Usually it would be in a dialog box or ther pop-up-like div.

```jsx
  const initialState = {
    start: new Date(2018, 6, 19),
    end: new Date(2018, 6, 28),
    open: false,
  };
  <div>
    {state.open ? (
      <div>
        <DateRangeDisplay
          label="Current selection is:"
          start={state.start}
          end={state.end}
        />
        <br />
        <DatePicker
          startingDate={state.start}
          endingDate={state.end}
          updateDate={(start, end) => {
            setState({
              start,
              end,
            });
          }}
          onClose={() => {
            setState({ open: false });
          }}
        />
        <br />
        <button disabled>Pick a Date</button>
      </div>
    ) : (
      <div>
        <DateRangeDisplay
          label="Current selection is:"
          start={state.start}
          end={state.end}
        />
        <br />
        <button onClick={() => { setState({open: true}); }}>Pick a Date</button>
      </div>
    )}
  </div>
```
