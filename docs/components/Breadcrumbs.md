#### Examples:

__1:__ Simple breadcrumb list with 4 items.

```jsx
const { MemoryRouter } = require('react-router-dom');
<MemoryRouter>
  <Breadcrumbs
    crumbs={[
      new Breadcrumbs.BreadcrumbInfo('Birth', 'firstRoute'),
      new Breadcrumbs.BreadcrumbInfo('Youth', 'secondRoute'),
      new Breadcrumbs.BreadcrumbInfo('College', 'thirdRoute'),
      new Breadcrumbs.BreadcrumbInfo('Now', 'fourthRoute'),
    ]}
  />
</MemoryRouter>
```
