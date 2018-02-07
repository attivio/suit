#### Examples:

__1:__ Standard shape button with a “danger” coloration and various text inside that sends the user to the “catalog” route.

```jsx
<BigButton route="catalog" bsStyle="danger">
  <h1>Big Text</h1>
  <h2>Smaller Text</h2>
  <p>Even smaller text</p>
</BigButton>
```

__2:__ Image button with no other styling that shows an alert when clicked.

```jsx
<BigButton onClick={() => { alert('You clicked the big button!'); }} style={{ border: 'none', background: 'lightblue' }}>
  <img src="/img/attivio-logo.png" />
</BigButton>
```
