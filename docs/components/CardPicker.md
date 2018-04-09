#### Examples:

__1.__ Card picker.

```jsx
  const cards = [
    new CardPicker.CardPickerItem('Item One', '1', 'https://upload.wikimedia.org/wikipedia/commons/5/58/1NumberOneInCircle.png'),
    new CardPicker.CardPickerItem('Item Two', '2', 'https://www.goodfreephotos.com/albums/vector-images/two-lovebirds-and-valentines-day-heart-vector-clipart.png'),
    new CardPicker.CardPickerItem('Item Three', '3'),
    new CardPicker.CardPickerItem('Super-Long Name on This One', '4'),
    new CardPicker.CardPickerItem('Item Five', '5'),
    new CardPicker.CardPickerItem('Item Six', '6'),
    new CardPicker.CardPickerItem('Item Seven', '7', 'http://res.freestockphotos.biz/pictures/15/15505-illustration-of-a-seven-of-hearts-playing-card-pv.png'),
    new CardPicker.CardPickerItem('Item Eight', '8'),
    new CardPicker.CardPickerItem('Item Nine', '9'),
    new CardPicker.CardPickerItem('Item Ten', '10'),
    new CardPicker.CardPickerItem('Item Eleven', '11'),
    new CardPicker.CardPickerItem('Item Twelve', '12', 'https://upload.wikimedia.org/wikipedia/commons/3/3d/קשת_12.jpg'),
    new CardPicker.CardPickerItem('Item Thirteen', '13'),
    new CardPicker.CardPickerItem('Item Fourteen', '14'),
  ];
  <div style={{ height: '375px' }}>
    <CardPicker
      cards={cards}
      initialSelection="3"
      onChange={(key) => { alert(`User chose card with key ${key}`); }}
      defaultIconUri="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Blue_question_mark_icon.svg/2000px-Blue_question_mark_icon.svg.png"
    />
  </div>
```
