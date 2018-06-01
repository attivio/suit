#### Examples:


__1:__ A successful image display.

```jsx
  <DefaultImage
    src="/img/GirlPearlEaring.jpg"
    defaultSrc="/img/placeholder-person.svg"
    style={{ height: '100px' }}
  />
```

__2:__ A failed image display with a successful backup image display.

```jsx
  <DefaultImage
    src="/NOPE/img/GirlPearlEaring.jpg"
    defaultSrc="/img/placeholder-person.svg"
    style={{ height: '100px' }}
  />
```

__3:__ A failed image display, and a failed backup image display.

```jsx
  <DefaultImage
    src="/NOPE/img/GirlPearlEaring.jpg"
    defaultSrc="/NOPE/img/placeholder-person.svg"
    style={{ height: '100px' }}
  />
```
