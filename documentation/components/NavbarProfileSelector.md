#### Examples:

__1.__ Simple menu that allows selecting a profile. It will use the default label.

```jsx
  const Navbar = require('../../src/components/Navbar').default;
  <Navbar>
    <NavbarProfileSelector
      profiles={[
        'The_Default_Profile',
        'An_IT_Profile',
        'A_Marketing_Profile',
      ]}
    />
  </Navbar>
```

__2.__ Example with custom label, pulled to the right.

```jsx
  const Navbar = require('../../src/components/Navbar').default;
  <Navbar>
    <NavbarProfileSelector
      label="Select A Profile:"
      right
      profiles={[
        'The_Default_Profile',
        'An_IT_Profile',
        'A_Marketing_Profile',
      ]}
    />
  </Navbar>
```
