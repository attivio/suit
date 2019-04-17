#### Examples:


__1:__ Example showing a visible loading message.

```jsx
  <BusyIndicator show message="Loading" />
```


__2:__ Another using a custom style.

```jsx
  <BusyIndicator
    show
    message="I'm getting your stuff"
    style={{
      color: 'darkgreen',
      fontWeight: 'bold',
      backgroundColor: 'yellow',
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
    message="Don't bother me right now"
  />
```


__5:__ Another that can be shown and hidden...

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
