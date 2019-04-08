#### Examples:


__1:__ Example showing a visible loading message.

```jsx
  <BusyIndicator show message="Loading" />
```


__2:__ Another using a custom style.

```jsx
  <BusyIndicator
    show
    message="Smashing bugs"
    style={{
      color: '#2f75b0',
      fontWeight: 600,
    }}
  />
```


__3:__ Example showing a loading indicator with the "spinny" animation.

```jsx
  <BusyIndicator
    show
    type="spinny"
  />
```

__4:__ Another "spinny" one, with a message.

```jsx
  <BusyIndicator
    show
    type="spinny"
    message="Building new features"
  />
```

__5:__ Displays a customized message positioned to the right of a spinner.

```jsx
  <BusyIndicator
    show
    type="spinny"
    message="Dusting keyboards..."
    messageStyle={{ fontWeight: 600, color: '#2f75b0' }}
    positionMessageRight
  />
```

__6:__ Another that can be shown and hidden...

```jsx
  initialState = { shown: false };
  const button = state.shown ? (
    <button onClick={() => { setState({ shown: false}); }}>Stop Loading</button>
  ) : (
    <button onClick={() => { setState({ shown: true}); }}>Start Loading</button>
  );
  <div>
    <BusyIndicator message="I'm busy here" show={state.shown} />
    <br /> 
    {button}
  </div>
```
