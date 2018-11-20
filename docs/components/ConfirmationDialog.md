#### Examples:


__1:__ Straightforward confirmation dialog with default values.

```jsx
  initialState = {
    open: false,
  };
  <div>
    <button onClick={() => {
      setState({open: true});
    }}>Open Dialog</button>
    <ConfirmationDialog
      show={state.open}
      title="Transportation"
      message="I want to borrow the car. May I?"
      onCancel={() => {
        setState({open: false});
      }}
      onConfirm={() => {
        alert('Thanks, Dad. I promise not to crash it!');
        setState({open: false});
      }}
    />
  </div>
```

__2:__ Customized button labels to confirm a "dangerous" action.

```jsx
  initialState = {
    open: false,
  };
  <div>
    <button onClick={() => {
      setState({open: true});
    }}>Open Dialog</button>
    <ConfirmationDialog
      show={state.open}
      title="Poseidon Says..."
      message="Releasing the Kraken could have devastating effects. Do you really want to do this?"
      cancelButtonLabel="Oh, Heavens, No!"
      confirmButtonLabel="Don't Second Guess Me!"
      dangerous
      onCancel={() => {
        setState({open: false});
      }}
      onConfirm={() => {
        alert('I hope you know what you\'ve done!');
        setState({open: false});
      }}
    />
  </div>
```
