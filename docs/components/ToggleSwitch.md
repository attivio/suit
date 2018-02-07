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

