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

__2:__ A master detail example using the dummy &lt;Details&gt; component on the right side and
multiselect table option that always requires a table selection.

```jsx
  const tableData = require('../sampleData/TableData').default;
  const Details = require('../../src/components/Details').default;

  <MasterDetails
    columns={tableData.experts.columns}
    rows={tableData.experts.rows}
    details={Details}
    rowComparator={(rowA, rowB) => rowA.id === rowB.id}
    multiSelect
    activeRowBackgroundColor="#d08afc"
    multiSelectBackgroundColor="#dcaef9"
    noEmptySelection
  />
```

__3:__ Another example showing the use of a header and footer and with a 50-50 split, widthwise, between
the table and details, along with 20 pixels of padding between them.

```jsx
  const tableData = require('../sampleData/TableData').default;
  const Details = require('../../src/components/Details').default;

  <MasterDetails
    columns={tableData.experts.columns}
    rows={tableData.experts.rows}
    details={Details}
    header={(
      <div style={{ width: '100%', background: 'darkblue', color: 'white', textAlign: 'center' }} >Header</div>
    )}
    footer={(
      <div style={{ width: '100%', background: 'darkred', color: 'white', textAlign: 'center' }} >Footer</div>
    )}
    split={6}
    padding={20}
  />
```

__4:__ A multi-select variation with a custom details component. In real life, it's recommended that you
create a full class-based component for the details pane.

```jsx
  const tableData = require('../sampleData/TableData').default;

  const details = (props) => {
    let contents;

    if (props.data) {
      const detailsRows = [];
      // Show the name
      detailsRows.push(<dt key="expertName">Name:</dt>);
      detailsRows.push(<dd key="expertNameValue">{props.data.expertName}</dd>);

      // Show the category
      const categoryToDisplay = props.data.subCategory ? `${props.data.category} (${props.data.subCategory})` : props.data.category;
      detailsRows.push(<dt key="category">Category:</dt>);
      detailsRows.push(<dd key="categoryValue">{categoryToDisplay}</dd>);

      // Show the reasons this person is an expert
      let reasons;
      if (props.data.reasons) {
        if (props.data.reasons.length > 1) {
          const individualReasons = props.data.reasons.map((individualReason) => {
            return <li key={individualReason}>{individualReason}</li>;
          });
          reasons = <ul>{individualReasons}</ul>;
        } else {
          reasons = <span>{props.data.reasons[0]}</span>;
        }
      } else {
        reasons = <span className="none">No reasons</span>;
      }
      detailsRows.push(<dt key="reasons">Expert Because:</dt>);
      detailsRows.push(<dd key="reasonsValue">{reasons}</dd>);

      contents = (
        <div>
          <h2>Expert</h2>
          <dl className="attivio-labeldata-2col">
            {detailsRows}
          </dl>
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
      <div style={{ paddingLeft: '20px' }}>
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
