#### Examples:

__1.__ Simple sort menu that includes the Relevancy option.

```jsx
  import Navbar from '../../src/components/Navbar';
  <Navbar>
    <NavbarSort
      includeRelevancy
      fieldNames={[
        'Name',
        'Title',
        'Author',
        'ISBN',
        'Publication Date',
        'Publisher',
      ]}
    />
  </Navbar>
```

__2.__ Example with custom label, pulled to the right.

```jsx
  import Navbar from '../../src/components/Navbar';
  <Navbar>
    <NavbarSort
      label="Order the Results:"
      right
      fieldNames={[
        'Name',
        'Title',
        'Author',
        'ISBN',
        'Publication Date',
        'Publisher',
      ]}
    />
  </Navbar>
```
