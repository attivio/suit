#### Examples:

__1.__ Card picker.

```jsx
  const cards = [
    new CardPicker.CardPickerItem('Item One', '1'),
    new CardPicker.CardPickerItem('Item Two', '2'),
    new CardPicker.CardPickerItem('Item Three', '3'),
    new CardPicker.CardPickerItem('Item Four', '4'),
  ];
  <div style={{ height: '600px' }}>
    <CardPicker cards={cards} initialSelection="3" onChange={(key) => { alert(`User chose card with key ${key}`); }}>
    </CardPicker>
  </div>
```
