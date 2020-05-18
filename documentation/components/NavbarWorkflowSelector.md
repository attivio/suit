#### Examples:

__1.__ Simple menu that allows selecting a search workflow. It will use the default label.

```jsx
  const Navbar = require('../../src/components/Navbar').default;
  <Navbar>
    <NavbarWorkflowSelector
      workflows={[
        'search',
        'searchCustomerViews',
        'searchProductViews',
      ]}
    />
  </Navbar>
```

__2.__ Example with custom label, pulled to the right.

```jsx
  const Navbar = require('../../src/components/Navbar').default;
  <Navbar>
    <NavbarProfileSelector
      label="Select Search Workflow:"
      right
      workflows={[
        'search',
        'searchCustomerViews',
        'searchProductViews',
      ]}
    />
  </Navbar>
```
