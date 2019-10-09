#### Examples:

__1.__ Twenty-item list with default properties.

```jsx
  <MoreList>
    <div>First row</div>
    <div>Second row</div>
    <div>Third row</div>
    <div>Fourth row</div>
    <div>Fifth row</div>
    <div>Sixth row</div>
    <div>Seventh row</div>
    <div>Eighth row</div>
    <div>Ninth row</div>
    <div>Tenth row</div>
    <div>Eleventh row</div>
    <div>Twelfth row</div>
    <div>Thirteenth row</div>
    <div>Fourteenth row</div>
    <div>Fifteenth row</div>
    <div>Sixteenth row</div>
    <div>Seventeenth row</div>
    <div>Eighteenth row</div>
    <div>Nineteenth row</div>
    <div>Twentieth row</div>
  </MoreList>
```

__2.__ Twenty-item list with longer default list and custom prompts.

```jsx
  <MoreList shortSize={9} morePrompt="Show ’Em" fewerPrompt="Hide ’Em">
    <div>First row</div>
    <div>Second row</div>
    <div>Third row</div>
    <div>Fourth row</div>
    <div>Fifth row</div>
    <div>Sixth row</div>
    <div>Seventh row</div>
    <div>Eighth row</div>
    <div>Ninth row</div>
    <div>Tenth row</div>
    <div>Eleventh row</div>
    <div>Twelfth row</div>
    <div>Thirteenth row</div>
    <div>Fourteenth row</div>
    <div>Fifteenth row</div>
    <div>Sixteenth row</div>
    <div>Seventeenth row</div>
    <div>Eighteenth row</div>
    <div>Nineteenth row</div>
    <div>Twentieth row</div>
  </MoreList>
```

__3.__ List with fewer than the `shortSize` number of items.

```jsx
  <MoreList>
    <div>First row</div>
    <div>Second row</div>
    <div>Third row</div>
    <div>Fourth row</div>
    <div>Fifth row</div>
  </MoreList>
```
