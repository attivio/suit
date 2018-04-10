#### Examples:

__1.__ Simple example.

```jsx
  initialState = {
    currentTab: 'Sushi',
  };
  <SmallTabs
    tabs={[ 'Sushi', 'Sashimi', 'Tempura', 'Noodles', 'Yakimono' ]}
    currentTab={state.currentTab}
    changed={(name) => {
      alert(`The user chose tab ${name}.`);
      setState({
        currentTab: name,
      });
    }}
  />
```
