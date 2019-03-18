#### Examples:

__1:__ Simple table allowing multiple selection.

```jsx
  const tableData = require('../sampleData/TableData').default;
  initialState = {
    activeRow: tableData.customerEngagementRows[0],
    selectedRows: [tableData.customerEngagementRows[0], tableData.customerEngagementRows[1]],
  };

  <Table
    columns={tableData.customerEngagementSimpleColumns}
    rows={tableData.customerEngagementRows}
    onSelect={(selectedRows, activeRow) => {
      setState({ selectedRows, activeRow });
    }}
    multiSelect
    activeRowBackgroundColor="#d08afc"
    multiSelectBackgroundColor="#dcaef9"
    rowComparator={(rowA, rowB) => {
      return rowA.id === rowB.id
    }}
  />
```

__2:__ Simple table allowing multiple selection that requires a row to always be selected.

```jsx
  const tableData = require('../sampleData/TableData').default;
  initialState = {
    activeRow: tableData.customerEngagementRows[0],
    selectedRows: [tableData.customerEngagementRows[0], tableData.customerEngagementRows[1]],
  };

  <Table
    columns={tableData.customerEngagementSimpleColumns}
    rows={tableData.customerEngagementRows}
    onSelect={(selectedRows, activeRow) => {
      // The table will support multiselect without this function.
      // Use this function to get access to the selected rows.
      setState({ selectedRows, activeRow });
    }}
    multiSelect
    noEmptySelection
    rowComparator={(rowA, rowB) => {
      return rowA.id === rowB.id
    }}
  />
```

__3:__ Single-selection table with a border.

```jsx
  const tableData = require('../sampleData/TableData').default;
  initialState = {
    selectedRows: [tableData.customerEngagementRows[0]],
  };
  <Table
    columns={tableData.customerEngagementSimpleColumns}
    rows={tableData.customerEngagementRows}
    onSelect={(selectedRows) => {
      setState({ selectedRows});
    }}
    rowComparator={(rowA, rowB) => {
      return rowA.id === rowB.id
    }}
    bordered
  />
```

__4:__ Table with a custom cell renderer for the Self-Service column showing percentage bars...

```jsx
  const tableData = require('../sampleData/TableData').default;
  initialState = {
    selectedRows: [tableData.customerEngagementRows[0]],
  };
  const cols = tableData.customerEngagementSimpleColumns.slice();
  const maxSelfServe = tableData.customerEngagementRows.reduce((acc, row) => {
    if (row.selfServe > acc) {
      return row.selfServe;
    }
    return acc;
  }, 0);
  const selfServeCellRenderer = (value) => {
    const percent = maxSelfServe > 0 ? Math.floor(value.selfServe / maxSelfServe * 100) : 0;
    return (
      <div>
        <div style={{
          backgroundColor: 'gold',
          width: `${percent}%`,
          height: '1em',
        }} />
      </div>
    );
  };
  // Replace the third column with one that uses our rendering function
  cols[2] = new Table.TableColumn(cols[2].title, selfServeCellRenderer, cols[2].sort);

  <Table
    columns={cols}
    rows={tableData.customerEngagementRows}
    onSelect={(selectedRows) => {
      setState({ selectedRows });
    }}
  />
```

__5:__ Table with sortable columms handled by a global handler (useful when sorting in the back-end code).

```jsx
  const tableData = require('../sampleData/TableData').default;
  initialState = {
    selectedRows: [tableData.customerEngagementRows[0]],
    sortCol: 0,
    rows: tableData.customerEngagementRows.slice(),
  };
  const columns = tableData.customerEngagementSimpleColumns.map((col, index) => {
    return new Table.TableColumn(col.title, col.render, index !== 0);
  });
  <Table
    columns={columns}
    rows={state.rows}
    onSelect={(selectedRows) => {
      setState({ selectedRows });
    }}
    sortColumn={state.sortCol}
    onSort={(col) => {
      if (col !== 0) {
        const sortColIdx = Math.abs(col) - 1
        const colName = columns[sortColIdx].title;
        const dir = col > 0 ? 'ascending' : 'descending';
        const rows = state.rows;
        rows.sort((row1, row2) => {
          switch (sortColIdx) {
            case 1:
              return row2.engagement - row1.engagement;
            case 2:
              return row2.selfServe - row1.selfServe;
            case 3:
              return row2.tickets - row1.tickets;
          }
          return 0;
        });
        if (col < 0) {
          rows.reverse();
        }
        setState({
          sortCol: col,
          rows,
        });
      }
    }}
  />
```

__6:__ Table with sortable columms with sorting handled by the columns themselves.

```jsx
  const tableData = require('../sampleData/TableData').default;
  initialState = {
    selectedRows: [tableData.customerEngagementRows[0]],
    sortCol: 0,
  };
  const numberToText = (n) => {
    const smallValues = [
      'Zero', 'One', 'Two', 'Three', 'Four',
      'Five', 'Six', 'Seven', 'Eight', 'Nine',
      'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen',
      'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen',
    ];
    const tensValues = [
      'Zero', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty',
      'Sixty', 'Seventy', 'Eighty', 'Ninety',
    ];

    // Simplistic — only handle numbers up to 999.
    let hundredsString = '';
    let lessThanHundredsString = '';

    const hundreds = Math.floor(n / 100);
    const lessThanHundred = n % 100;
    if (lessThanHundred < 20) {
      // All special cases...
      if (hundreds > 0 && lessThanHundred === 0) {
        lessThanHundredsString = '';
      } else {
        lessThanHundredsString = smallValues[lessThanHundred];
      }
    } else {
      const tens = Math.floor(lessThanHundred / 10);
      const ones = lessThanHundred % 10;
      const tensString = tensValues[tens];
      const onesString = smallValues[ones];
      lessThanHundredsString = `${tensString}-${onesString}`;
    }
    if (hundreds > 0) {
      if (hundreds === 10) {
        hundredsString = 'One Thousand';
      } else {
        hundredsString = `${smallValues[hundreds]} Hundred`;
      }
    }
    const totalValueString = `${hundredsString} ${lessThanHundredsString}`.trim();
    return totalValueString;
  };

  const columns = tableData.customerEngagementSimpleColumns.map((col, index) => {
    let sortFunc = null;
    if (index === 0) {
      // Customer: sort the data according to the customer name using Danish sort order but ignoring diacritical marks
      sortFunc = (a, b, o) => {
        let result = a.customer.localeCompare(b.customer, 'da', { sensitivity: 'base', ignorePunctuation: true, numeric: true, caseFirst: 'upper' });
        if (o === 'desc') {
          result = -result;
        }
        return result;
      }
    } else if (index === 3) {
      // Tickets: sort using alphabetical order of the number converted to an English string
      sortFunc = (a, b, o) => {
        const aTickets = numberToText(a.tickets);
        const bTickets = numberToText(b.tickets);
        let result = aTickets.localeCompare(bTickets);
        if (o === 'desc') {
          result = -result;
        }
        return result;
      }
    }
    return new Table.TableColumn(col.title, col.render, sortFunc);
  });
  <Table
    columns={columns}
    rows={tableData.customerEngagementRows}
    onSelect={(selectedRows) => {
      setState({ selectedRows });
    }}
  />
```
