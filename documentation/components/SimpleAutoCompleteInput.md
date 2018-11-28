#### Examples:


__1:__ Example showing both an array of values (for the Customer filters) and a single one (for the Topic filters).

```jsx
  initialState = {
    value: '',
    lastChosenValue: '',
  };

  <div>
    <div>
      Your current favorite candy bar is:
      {state.lastChosenValue}
    </div>
    <SimpleAutoCompleteInput
      id="testing"
      updateValue={(newValue, done) => {
        if (done) {
          setState({
            value: '',
            lastChosenValue: newValue,
          });
        } else {
          setState({
            value: newValue,
          });
        }
      }}
      placeholder="Choose a candy bar..."
      value={state.value}
      values={[
        '100 Grand',
        'Almond Joy',
        'Baby Ruth',
        'Charleston Chew',
        'Chunky',
        'Clark',
        'Crunch',
        'Heath',
        'Hershey\'s',
        'Kit Kat',
        'Mars',
        'MilkyWay',
        'Mr. Goodbar',
        'Mounds',
        'Oh Henry!',
        'Payday',
        'Reese\'s',
        'Snickers',
        'Three Musketeers',
        'Toblerone',
        'Twix',
        'York Peppermint Patty',
        'Zagnut',
      ]}
    />
  </div>
```
