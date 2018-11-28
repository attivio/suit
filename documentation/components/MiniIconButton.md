#### Examples:

__1.__ An button with a Glyphicon (see http://glyphicons.com/)

```jsx
  <MiniIconButton
    title="Click me for an inspiring message"
    onClick={() => {
      alert('“We are all broken, that’s how the light gets in.” – Ernest Hemingway');
    }}
    glyph="heart"
  />
```

__1.__ An button with an image.

```jsx
  <MiniIconButton
    title="Help me find my other earing!"
    onClick={() => {
      alert('Whew! The earing was under the sofa cushions.');
    }}
    uri="img/GirlPearlEaring.jpg"
  />
```
