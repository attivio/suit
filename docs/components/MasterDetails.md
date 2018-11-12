#### Examples:


__1:__ Dummy Component: example of documenting components for the styleguide.

```jsx
  const tableData = require('../sampleData/TableData').default;
  const Details = require('../../src/components/Details').default;

  <MasterDetails
    columns={tableData.experts.columns}
    rows={tableData.experts.rows}
    details={Details}
  /> 
```
