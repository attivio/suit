#### Examples:

__1.__ Card picker.

```jsx
  const cards = [
    new CardPicker.CardPickerItem('Item One', '1', 'https://upload.wikimedia.org/wikipedia/commons/2/24/1_peso.jpg'),
    new CardPicker.CardPickerItem('Item Two', '2', 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Number_two_on_wall.JPG'),
    new CardPicker.CardPickerItem('Item Three', '3', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Number_3_in_yellow_rounded_square.svg/240px-Number_3_in_yellow_rounded_square.svg.png'),
    new CardPicker.CardPickerItem('Super-Long Name on This One But I Think You Can Guess What It Means', '4', 'https://upload.wikimedia.org/wikipedia/commons/5/59/4NumberFourInCircle.png'),
    new CardPicker.CardPickerItem('Item Five', '5', 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Briefmarkenkapselgeld_-_hinten.jpg'),
    new CardPicker.CardPickerItem('Item Six', '6', 'https://upload.wikimedia.org/wikipedia/commons/7/7c/6_in_Bangla.svg'),
    new CardPicker.CardPickerItem('Item Seven', '7', 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Playing_Card%2C_Seven_of_Hearts%2C_late_19th_century_%28CH_18405277%29.jpg'),
    new CardPicker.CardPickerItem('Item Eight', '8', 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Number-8_%28dark_green%29.png'),
    new CardPicker.CardPickerItem('Item Nine', '9', 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Number_9_bus_in_Aldwych_-_geograph.org.uk_-_1802264.jpg'),
    new CardPicker.CardPickerItem('Item Ten', '10', 'https://upload.wikimedia.org/wikipedia/commons/8/82/Number-10.png'),
    new CardPicker.CardPickerItem('Item Eleven', '11', 'https://upload.wikimedia.org/wikipedia/commons/3/31/Number-11_%28black%29.png'),
    new CardPicker.CardPickerItem('Item Twelve', '12', 'https://upload.wikimedia.org/wikipedia/commons/8/8e/2016-366-351_It%27s_12_of_One%2C_2_Half_Dozen_of_The_Other_%2831321387560%29.jpg'),
    new CardPicker.CardPickerItem('Item Thirteen', '13', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Bundesautobahn_13_number_red.svg/200px-Bundesautobahn_13_number_red.svg.png'),
    new CardPicker.CardPickerItem('Item Fourteen', '14', 'https://upload.wikimedia.org/wikipedia/commons/5/53/Apollo14patch.jpg'),
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

__1.__ Card picker with 5 columns (with the same cards).

```jsx
  const cards = [
    new CardPicker.CardPickerItem('Item One', '1', 'https://upload.wikimedia.org/wikipedia/commons/2/24/1_peso.jpg'),
    new CardPicker.CardPickerItem('Item Two', '2', 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Number_two_on_wall.JPG'),
    new CardPicker.CardPickerItem('Item Three', '3', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Number_3_in_yellow_rounded_square.svg/240px-Number_3_in_yellow_rounded_square.svg.png'),
    new CardPicker.CardPickerItem('Super-Long Name on This One But I Think You Can Guess What It Means', '4', 'https://upload.wikimedia.org/wikipedia/commons/5/59/4NumberFourInCircle.png'),
    new CardPicker.CardPickerItem('Item Five', '5', 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Briefmarkenkapselgeld_-_hinten.jpg'),
    new CardPicker.CardPickerItem('Item Six', '6', 'https://upload.wikimedia.org/wikipedia/commons/7/7c/6_in_Bangla.svg'),
    new CardPicker.CardPickerItem('Item Seven', '7', 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Playing_Card%2C_Seven_of_Hearts%2C_late_19th_century_%28CH_18405277%29.jpg'),
    new CardPicker.CardPickerItem('Item Eight', '8', 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Number-8_%28dark_green%29.png'),
    new CardPicker.CardPickerItem('Item Nine', '9', 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Number_9_bus_in_Aldwych_-_geograph.org.uk_-_1802264.jpg'),
    new CardPicker.CardPickerItem('Item Ten', '10', 'https://upload.wikimedia.org/wikipedia/commons/8/82/Number-10.png'),
    new CardPicker.CardPickerItem('Item Eleven', '11', 'https://upload.wikimedia.org/wikipedia/commons/3/31/Number-11_%28black%29.png'),
    new CardPicker.CardPickerItem('Item Twelve', '12', 'https://upload.wikimedia.org/wikipedia/commons/8/8e/2016-366-351_It%27s_12_of_One%2C_2_Half_Dozen_of_The_Other_%2831321387560%29.jpg'),
    new CardPicker.CardPickerItem('Item Thirteen', '13', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Bundesautobahn_13_number_red.svg/200px-Bundesautobahn_13_number_red.svg.png'),
    new CardPicker.CardPickerItem('Item Fourteen', '14', 'https://upload.wikimedia.org/wikipedia/commons/5/53/Apollo14patch.jpg'),
  ];
  <div style={{ height: '375px' }}>
    <CardPicker
      cards={cards}
      initialSelection="3"
      onChange={(key) => { alert(`User chose card with key ${key}`); }}
      defaultIconUri="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Blue_question_mark_icon.svg/2000px-Blue_question_mark_icon.svg.png"
      columns={5}
    />
  </div>
```
