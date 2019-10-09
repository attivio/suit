#### Examples:

__1.__ Showing an “or” between two text strings.

```jsx
  const Navbar = require('../../src/components/Navbar').default;
  <Navbar>
    <span className="navbar-nav">
      <li style={{ listStyle: 'none' }}><a>First Option</a></li>
      <NavbarOr />
      <li style={{ listStyle: 'none' }}><a>Second Option</a></li>
    </span>
  </Navbar>
```
