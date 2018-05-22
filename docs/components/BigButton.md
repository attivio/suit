#### Examples:


__1:__ Standard shape button with a "danger" coloration and various text inside. Clicking sends the user to the "/catalog" route.

```jsx
const { Link, MemoryRouter, Route, Switch } = require('react-router-dom');
<MemoryRouter>
  <Switch>
    <Route exact path="/">
      <div>
        <BigButton route="/catalog" bsStyle="danger">
          <h1>Big Text</h1>
          <h2>Smaller Text</h2>
          <p>Even smaller text</p>
        </BigButton>
      </div>
    </Route>
    <Route path="/catalog">
      <div>
        This is the catalog.
        <Link to="/">Take me back to the button.</Link>
      </div>
    </Route>
  </Switch>
</MemoryRouter>
```

__2:__ Image button with no other styling that shows an alert when clicked.

```jsx
const { MemoryRouter } = require('react-router-dom');
<MemoryRouter>
  <BigButton onClick={() => { alert('You clicked the big button!'); }} style={{ border: 'none', background: 'lightblue' }}>
    <img src="/img/attivio-logo.png" />
  </BigButton>
</MemoryRouter>
```
