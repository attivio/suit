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

__2:__ A multi-select variation with a custom details component. In real life, it's recommended that you
create a full class-based component for the details pane.

```jsx
  const tableData = require('../sampleData/TableData').default;
  const DataPairs = require('../../src/components/DataPairs').default;

  const details = (props) => {
    let contents;

    if (props.data) {
      const categoryToDisplay = props.data.subCategory ? `${props.data.category} (${props.data.subCategory})` : props.data.category;
      const pairs = [
        new DataPairs.DataPairInfo('Name', props.data.expertName),
        new DataPairs.DataPairInfo('Category', categoryToDisplay),
        new DataPairs.DataPairInfo('Expert Because', props.data.reasons.join(', ')),
      ];
      contents = (
        <div>
          <h2>Expert</h2>
          <DataPairs pairs={pairs} />
        </div>
      );
    } else {
      contents = (
        <span className="none">
          Nothing selected.
        </span>
      );
    }

    return (
      <div>
        {contents}
      </div>
    );

  };

  <MasterDetails
    columns={tableData.experts.columns}
    rows={tableData.experts.rows}
    details={details}
  /> 
```
