#### Examples:

__1:__ A standard “hamburger” menu.

```jsx
const { MemoryRouter } = require('react-router-dom');
<MemoryRouter>
  <NavigationHamburgerMenu
    id="myHBMenu"
    items={[
      new NavigationHamburgerMenu.NavMenuItem('First Choice', '1'),
      new NavigationHamburgerMenu.NavMenuItem('Second Choice', '2'),
      new NavigationHamburgerMenu.NavMenuItem('Third Choice', '3'),
    ]}
  />
</MemoryRouter>
```

__2:__ Another one, using a custom icon (“user”) and color (orange on purple).

```jsx
const { MemoryRouter } = require('react-router-dom');
<MemoryRouter>
  <NavigationHamburgerMenu
    id="anotherHBMenu"
    tooltip="Choose where to go"
    tooltipPlacement="right"
    icon="user"
    color="orange"
    backgroundColor="purple"
    items={[
      new NavigationHamburgerMenu.NavMenuItem('First Choice', '1'),
      new NavigationHamburgerMenu.NavMenuItem('Second Choice', '2'),
      new NavigationHamburgerMenu.NavMenuItem('Third Choice', '3'),
    ]}
  />
</MemoryRouter>
```
