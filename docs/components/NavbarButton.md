#### Examples:

__1.__ Button with just text.

```jsx
  const Navbar = require('../../src/components/Navbar').default;
  <Navbar>
    <NavbarButton
      label="Click Me"
      onClick={() => { alert('User clicked me!'); }}
    />
  </Navbar>
```
__2.__ Button with just an icon.

```jsx
  const Navbar = require('../../src/components/Navbar').default;
  <Navbar>
    <NavbarButton
      icon="cog"
      onClick={() => { alert('The user clicked the gear.'); }}
    />
  </Navbar>
```
__3.__ Button with text and an icon.

```jsx
  const Navbar = require('../../src/components/Navbar').default;
  <Navbar>
    <NavbarButton
      label="Scan Product"
      icon="barcode"
      onClick={() => { alert('The user wants to scan something.'); }}
    />
  </Navbar>
```
