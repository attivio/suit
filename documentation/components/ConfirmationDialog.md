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
      onCancel={() => {
        setState({open: false});
      }}
      onConfirm={() => {
        alert('Thanks, Dad. I promise not to crash it!');
        setState({open: false});
      }}
    >
      I want to borrow the car. May I?
    </ConfirmationDialog>
  </div>
```

__2:__ Disable the confirmation button until there is something to submit.

```jsx
  initialState = {
    open: false,
    inputValue: '',
  };
  <div>
    <button
      onClick={() => {
        setState({ open: true });
      }}>
      Open Dialog
    </button>
    <ConfirmationDialog
      show={state.open}
      title="Transportation"
      onCancel={() => {
        setState({ open: false });
      }}
      onConfirm={() => {
        alert('Thanks, Dad. I promise not to crash it!');
        setState({ open: false });
      }}
      confirmButtonDisabled={!state.inputValue}
    >
      <div className="attivio-centered">
        <div style={{ marginRight: '15px' }}>What is the magic word?</div>
        <input
          value={state.inputValue}
          onChange={(e) => setState({ inputValue: e.target.value })}
          tabIndex={0}
          type="text"
        />
      </div>
    </ConfirmationDialog>
  </div>
```

__3:__ Customized button labels to confirm a "dangerous" action and more elaborate contents.

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
    >
      <div style={{ float: 'left', paddingBottom: '20px' }}>
        <img src="img/kraken.jpg" style={{ float: 'left', marginRight: '20px', border: '4px solid deepskyblue' }} />
        <span style={{ fontSize: '30px' }}>
          Releasing the Kraken could have
          <em>devastating effects</em>
          .
          <br />
          <span style={{ textWeight: 'bold' }}>
            Do you really want to do this?
          </span>
        </span>
      </div>
    </ConfirmationDialog>
  </div>
```
