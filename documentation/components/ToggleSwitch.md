#### Examples:

__1.__ Simple on-off toggle.

```jsx
  initialState = { toggleOn: false };

  <ToggleSwitch
    on={state.toggleOn}
    onChange={(newState) => {
      setState({
        toggleOn: newState,
      });
    }}
  />
```

__2.__ Toggle switch with custom labels.

```jsx
  initialState = { toggleOn: false };

  <ToggleSwitch
    onLabel="¡Claro que sí!"
    offLabel="¡De ninguna manera!"
    on={state.toggleOn}
    onChange={(newState) => {
      setState({
        toggleOn: newState,
      });
    }}
  />
```

__3.__ Disabled toggle.

```jsx
  initialState = { toggleOn: false };

  <ToggleSwitch
    on={state.toggleOn}
    onChange={(newState) => {
      setState({
        toggleOn: newState,
      });
    }}
    disabled
  />
```

__4.__ A toggle switch with a custom style applied.
```jsx
  initialState = { toggleOn: false };

  <ToggleSwitch
    on={state.toggleOn}
    onChange={(newState) => {
      setState({
        toggleOn: newState,
      });
    }}
    style={{
      padding: '5px',
      paddingLeft: '30px',
      backgroundColor: '#ff0',
      fontSize: '4em',
      fontFamily: 'cursive',
    }}
  />
```

__5.__ A toggle without a label turned on.

```jsx
  initialState = { toggleOn: true };

  <ToggleSwitch
    on={state.toggleOn}
    onChange={(newState) => {
      setState({
        toggleOn: newState,
      });
    }}
    noLabel
  />
```

__6.__ A toggle without a label turned off.

```jsx
  initialState = { toggleOn: false };

  <ToggleSwitch
    on={state.toggleOn}
    onChange={(newState) => {
      setState({
        toggleOn: newState,
      });
    }}
    noLabel
  />
```

__7.__ A disabled toggle switch without a label turned off.

```jsx
  initialState = { toggleOn: false };

  <ToggleSwitch
    on={state.toggleOn}
    onChange={(newState) => {
      setState({
        toggleOn: newState,
      });
    }}
    noLabel
    disabled
  />
```

__8.__ A disabled toggle switch without a label turned on.

```jsx
  initialState = { toggleOn: true };

  <ToggleSwitch
    on={state.toggleOn}
    onChange={(newState) => {
      setState({
        toggleOn: newState,
      });
    }}
    noLabel
    disabled
  />
```
