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

__2.__ Customized toggle.

```jsx
  initialState = { toggleOn: false };

  <ToggleSwitch
    onLabel="1"
    offLabel="0"
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

__4.__ A toggle without a label.

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

__5.__ A disabled toggle switch without a label.

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
