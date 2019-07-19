#### Examples:

__1.__ Toggle-able component.

```jsx
const initialState = {
  open: false,
};

<div>
  <DisclosureTriangle
    open={state.open}
    onToggle={(open) => {
      setState({ open });
    }}
  />
  The triangle is currently {state.open ? 'open' : 'closed'}.
</div>
```
