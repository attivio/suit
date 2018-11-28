#### Examples:


__1:__  An example of the view from a user who is allowed to see the secret.

```jsx
  const AuthUtils = require('../../src/util/AuthUtils').default;
  const AuthRoute = require('../../src/components/AuthRoute').default;
  const { Link, MemoryRouter, Route, Switch } = require('react-router-dom');

  const config = {
    ALL: {
      authType: 'NONE',
      defaultUsername: 'thor',
      defaultRealm: 'asgard',
      baseUri: 'hammer',
      basename: 'Thor',
    },
  };
  const user = {
    fullName: 'Thor',
    userId: 'thor',
    roles: [
      'prince',
    ],
  }
  AuthUtils.configure(
    {
      principal: {
        user: [
          user
        ]
      }
    },
    config,
    true,
  );
  AuthUtils.saveLoggedInUser(user);
  <MemoryRouter>
    <Switch>
      <AuthRoute
        authType='NONE'
        requiredRole="prince"
        exact
        path="/"
      >
        <div>
          Nothing to see here...
          <IfAllowed requiredRole="prince">
            <span style={{fontStyle: 'italic'}}>Shhhhh it's a secret</span>
          </IfAllowed>
        </div>
      </AuthRoute>
    </Switch>
  </MemoryRouter>
```

__2:__  An example of the view from a user who is _not_ allowed to see the secret.

```jsx
  const AuthUtils = require('../../src/util/AuthUtils').default;
  const AuthRoute = require('../../src/components/AuthRoute').default;
  const { Link, MemoryRouter, Route, Switch } = require('react-router-dom');

  const config = {
    ALL: {
      authType: 'NONE',
      defaultUsername: 'thor',
      defaultRealm: 'asgard',
      baseUri: 'hammer',
      basename: 'Thor',
    },
  };
  const user = {
    fullName: 'Thor',
    userId: 'thor',
    roles: [
      'prince',
    ],
  }
  AuthUtils.configure(
    {
      principal: {
        user: [
          user
        ]
      }
    },
    config,
    true,
  );
  AuthUtils.saveLoggedInUser(user);
  <MemoryRouter>
    <Switch>
      <AuthRoute
        authType='NONE'
        requiredRole="prince"
        exact
        path="/"
      >
        <div>
          Nothing to see here...
          <IfAllowed requiredRole="king">
            <span style={{fontStyle: 'italic'}}>Shhhhh it's a secret</span>
          </IfAllowed>
        </div>
      </AuthRoute>
    </Switch>
  </MemoryRouter>
```
