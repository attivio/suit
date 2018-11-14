#### Examples:


__1:__ A simple master detail example using the dummy &lt;Details&gt; component on the right side.

```jsx
  const tableData = require('../sampleData/TableData').default;
  const Details = require('../../src/components/Details').default;

  <MasterDetails
    columns={tableData.experts.columns}
    rows={tableData.experts.rows}
    details={Details}
  /> 
```

__2:__ A multi-select variation

```jsx
  const tableData = require('../sampleData/TableData').default;
  const Details = require('../../src/components/Details').default;

  <MasterDetails
    columns={tableData.experts.columns}
    rows={tableData.experts.rows}
    details={Details}
    multiSelect
  /> 
```
