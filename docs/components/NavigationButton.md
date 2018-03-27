#### Examples:

__1:__ A standard Bootstrap-styled button that navigates to the “myRoute” route.

```jsx
const { Link, MemoryRouter, Route, Switch } = require('react-router-dom');
<MemoryRouter>
  <Switch>
    <Route exact path="/">
      <div>
        <NavigationButton
          bsStyle="primary"
          route="myRoute"
        >
          Go to My Route
        </NavigationButton>
      </div>
    </Route>
    <Route path="/myRoute">
      <div>
        This is my route.
        <Link to="/">Take me back to the button.</Link>
      </div>
    </Route>
  </Switch>
</MemoryRouter>
```

__2:__ A custom-styled button that navigates to the “elsewhere” route.

```jsx
const { Link, MemoryRouter, Route, Switch } = require('react-router-dom');
<MemoryRouter>
  <Switch>
    <Route exact path="/">
      <div>
        <NavigationButton
          style={{
            color: 'red',
            fontWeight: 'bold',
            fontSize: '35px',
            width: '180px',
            textAlign: 'right',
            textTransform: 'none',
            transform: 'skewX(30deg)',
            backgroundColor: 'goldenrod',
          }}
          route="/elsewhere"
        >
          Go Away!
        </NavigationButton>
      </div>
    </Route>
    <Route path="/elsewhere">
      <div>
        This is somewhere else.
        <Link to="/">Take me back to the button.</Link>
      </div>
    </Route>
  </Switch>
</MemoryRouter>
```
