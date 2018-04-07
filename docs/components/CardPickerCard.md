#### Examples:

__1.__ Card picker card.

```jsx
  <CardPickerCard
    label="Pikachu"
    iconUri="https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pvhc.net%2Fimg8%2Fniexjjzstcseuzdzkvoq.png&f=1"
    onClick={() => { alert('User clicked the Pikachu card'); }}
  />
```

__1.__ Selected card picker card.

```jsx
  <CardPickerCard
    label="You Like Me!"
    iconUri="https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pvhc.net%2Fimg8%2Fniexjjzstcseuzdzkvoq.png&f=1"
    onClick={() => { alert('User clicked the Pikachu card.'); }}
    selected
  />
```

__1.__ Card picker card with no icon.

```jsx
  <CardPickerCard
    label="Nothing to See Here"
    onClick={() => { alert('User clicked the card with no icon'); }}
  />
```
