#### Examples:

__1:__ A standard Bootstrap-styled button that navigates to the “myRoute” route.

```jsx
<NavigationButton
  bsStyle="primary"
  route="myRoute"
>
  Go to My Route
</NavigationButton>
```

__2:__ A custom-styled button that navigates to the “elsewhere” route.

```jsx
<NavigationButton
  style={{
    color: 'red',
    fontWeight: 'bold',
    textSize: '32px',
    textStyle: 'italic',
    width: '180px',
    textAlign: 'right',
    textTransform: 'none',
    backgroundColor: 'lavender',
  }}
  route="elsewhere"
>
  Go Away!
</NavigationButton>
```
