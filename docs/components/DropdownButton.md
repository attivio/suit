#### Examples:


__1:__ Simple dropdown button with Bootstrap-type menu items.

```jsx
  const { MenuItem } = require('react-bootstrap');
  <DropdownButton
    id="testingButton"
    title="Pick a Color"
    onOpen={() => { alert('You clicked the dropdown button'); }}
    onSelect={(value) => { alert(`You selected the item with value: ${value.toString()}`); }}
  >
    <MenuItem header>Look at these fancy colors!</MenuItem>
    <MenuItem eventKey="red">Maroon</MenuItem>
    <MenuItem eventKey="orange">Pumpkin Spice</MenuItem>
    <MenuItem eventKey="yellow">Saffron</MenuItem>
    <MenuItem eventKey="green">Chartreuse</MenuItem>
    <MenuItem eventKey="blue">Cerulean</MenuItem>
    <MenuItem eventKey="violet">Mauve</MenuItem>
    <MenuItem divider />
    <MenuItem header>You can't select these</MenuItem>
    <MenuItem eventKey="black" disabled>Deep Space Nine</MenuItem>
    <MenuItem eventKey="white" disabled>Talcum</MenuItem>
  </DropdownButton>
```
