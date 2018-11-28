#### Examples:

__1.__ Empty masthead with an application name and logged-in user. See any of the page components for usage of child components within the `<Masthead>` component.

```jsx
const { StaticRouter } = require('react-router-dom');
<StaticRouter context={{}}>
  <Masthead username="Mister User" applicationName="My Search" logoUri="img/attivio-logo.png" />
</StaticRouter>
```


__2.__ This version  allows the user to log out.

```jsx
const { StaticRouter } = require('react-router-dom');
<StaticRouter context={{}}>
  <Masthead username="Mister User" applicationName="My Search" logoUri="img/attivio-logo.png" logoutFunction={() => { alert('Mister User is logging out'); }}/>
</StaticRouter>
```
