#### Examples:


__1:__  An example of the view from a user who is allowed to see the secret.

```jsx
  const AuthUtils = require('../../src/util/AuthUtils').default;
  const AuthRoute = require('../../src/components/AuthRoute').default;

  const config = {
    ALL: {
      authType: 'NONE',
      defaultUsername: 'thor',
      defaultRealm: 'asgard',
      baseUri: 'dummy',
      basename: 'fred',
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

  <AuthRoute
    authType='NONE'
    requiredRole="prince"
  >
    <IfAllowed requiredRole="prince">
      Shhhhh it's a secret
    </IfAllowed>
  </AuthRoute>
```

__2:__  An example of the view from a user who is _not_ allowed to see the secret.

```jsx
  const AuthUtils = require('../../src/util/AuthUtils').default;
  const AuthRoute = require('../../src/components/AuthRoute').default;

  const config = {
    ALL: {
      authType: 'NONE',
      defaultUsername: 'thor',
      defaultRealm: 'asgard',
      baseUri: 'dummy',
      basename: 'fred',
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

  <AuthRoute
    authType='NONE'
    requiredRole="prince"
  >
    <IfAllowed requiredRole="king">
      Shhhhh it's a secret
    </IfAllowed>
  </AuthRoute>
```
