import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css';

import ObjectUtils from '../util/ObjectUtils';

/**
 * This defines a single column within the table.
 */
class TableColumn {
  constructor(
    title: string,
    render: string | (value: any) => any,
    sort: boolean | (a: any, b: any, order: 'asc' | 'desc') => number = false,
    ) {
    this.title = title;
    this.render = render;
    this.sort = sort;
  }

  /**
   * The title to show for the column.
   */
  title: string;
  /**
   * A function to call to render the cell for this column with a
   * given row object. If not set, then the value will be displayed
   * as either a locale-formatted number or a plain string, depending
   * on its type.
   */
  render: string | (value: any) => any;
  /**
   * This indicates whether the table is sortable on this column's values. If the parent of the table
   * wants/needs to make additional calls to a back-end API to get the newly sorted table data, then it
   * should just pass a boolean value of true for this propety on the column. This will result in the
   * function passed to the table's onSort property being called with the new sorting informaitopn. If
   * the data is all in the list to start with, then this can be a sorting function which behaves like
   * the callback psased to the JavaScript Array class' sort() method, taking two rows' data as parameters,
   * as well as a third parameter indicating whether the result should be reversed due to sorting in
   * descending order.
   */
  sort: boolean | (a: any, b: any, order: 'asc' | 'desc') => number;
}

type TableProps = {
  /**
   * Columns to be created for the table
   */
  columns: Array<TableColumn>;
  /**
   * Rows of the table to be rendered
   */
  rows: Array<any>;
  /**
   * Method to display details of the row selected in the table. Optional. If not
   * set, the rows won't be selectable. Will always be called with an array of
   * row IDs, though the array will be empty if nothing is selected. If a row
   * was added to the selection of a multi-select table, then that row's ID will
   * be passed as the second parameter, if one was deselected, the previous last-
   * selected row will be passed as the newlySelectedRowId; if there are no more
   * rows selected, then this parameter will be null.
   */
  onSelect: null | (selectedRowsIds: Array<string>, newlySelectedRowId: string | null) => void;
  /**
   * The IDs of the selected rows, if any. May be an array, for muili-select tables,
   * or a single string, for single-select tables. If null, nothing is selected.
   */
  selection: null | string | Array<string>;
  /**
   * If set, the user can select multiple rows in the table.
   */
  multiSelect: boolean;
  /**
   * The column being sorted by, if any. The absolute value of this is the 1-based index
   * of the sort column in the array specified by the columns property. If the value is
   * positive, then the column is sorted normally; if it's negative, then it is sorted
   * in the reverse order. For example, if the columns for the table are "Name," "Speed,"
   * and "Color," and this is set to -2, then the table will be sorted by speed, from
   * highest to lowest (in the reverse order). This should be set only if the caller
   * is handling the sorting of the table rows.
   */
  sortColumn: number;
  /**
   * A callback used if the parent wants to handle sorting of the rows in the table.
   * It is passed the 1-based index of the column by which the user wants to sort (if the
   * sorting should be done in the opposite direction, this value will be negative). This
   * is the same as the sortColumn property. The callback will only be invoked if the user
   * clicks on a sortable column, as indicated by the sort property in its TableColumn
   * definition. Once the callback has obtained the new data, the Table component should
   * be re-rendered with new values for the sortColumn and rows properties.
   */
  onSort: null | (sortColumn: number) => void;
  /**
   * If set, then the component will not allow the user to deselect all rows in the child table.
   * For single-select components, the user will only be able to change the selection to
   * another row; for multi-select components, the user will not be able to deselect the last-
   * selected row without first selecting another one. This means that, unless the rows
   * property is empty, there will always be an item selected in the table and, therefore,
   * shown in the details view.
   */
  noEmptySelection: boolean;
};

type TableDefaultProps = {
  onSelect: null | (selectedRowsIds: Array<string>, newlySelectedRowId: string | null) => void;
  selection: Array<srting>;
  multiSelect: boolean;
  sortColumn: number;
  onSort: null | (sortColumn: number) => void;
  noEmptySelection: boolean;
};

type TableState = {
  /**
   * The sorted list of rows. If not sorting in the table, this will always just be
   * the same as the rows property.
   */
  sortedRows: Array<any>;
};

/**
 * A component to render tablular data. It can allow for rows in the table to be selected (either a
 * single row or multiple rows). You can define any number of columns for the table that use the
 * row data to display the contents of the cell at each row/column. For each column, the value can
 * be the contents of a property in the row's data object or the result of calling a function on that
 * row, allowing for complex values including nested React components.
 */
export default class Table extends React.Component<TableDefaultProps, TableProps, TableState> {
  static defaultProps = {
    onSelect: null,
    selection: [],
    multiSelect: false,
    sortColumn: 0,
    onSort: null,
    noEmptySelection: false,
  };

  static makeCustomRenderer(column) {
    return (cell, row) => {
      return column.render(row);
    };
  }

  static displayName = 'Table';

  static TableColumn;

  constructor(props: TableProps) {
    super(props);
    this.state = {
      sortedRows: this.props.rows,
    };
    (this: any).handleSort = this.handleSort.bind(this);
    (this: any).rowSelect = this.rowSelect.bind(this);
    (this: any).remote = this.remote.bind(this);
  }

  state: TableState;

  componentWillReceiveProps(newProps: TableProps) {
    if (!ObjectUtils.arrayEquals(newProps.rows, this.props.rows)) {
      // Reset the sorted rows if the actual rows have changed.
      this.setState({
        sortedRows: newProps.rows,
      });
    }
  }

  rowSelect(rowData: any, isSelected: boolean) {
    const rowId = rowData.id;

    let selectedRowIds;
    if (Array.isArray(this.props.selection)) {
      selectedRowIds = this.props.selection;
    } else if (typeof this.props.selection === 'string') {
      selectedRowIds = [this.props.selection];
    } else {
      selectedRowIds = [];
    }

    if (isSelected) {
      if (this.props.multiSelect) {
        // If it's not already in the selection, add it and call the callback
        if (!selectedRowIds.includes(rowId)) {
          selectedRowIds.push(rowId);
        }
      } else {
        // Just set the selection to the single row if not multi-select
        selectedRowIds = [rowId];
      }
      this.props.onSelect(selectedRowIds, rowId);
    } else if (this.props.noEmptySelection && selectedRowIds.length > 1) {
      const oldPosition = selectedRowIds.indexOf(rowId);
      if (oldPosition >= 0) {
          // If it was in the previous array, remove it...
        selectedRowIds.splice(oldPosition, 1);
        const mostRecent = selectedRowIds.length > 0 ? selectedRowIds[selectedRowIds.length - 1] : null;
        this.props.onSelect(selectedRowIds, mostRecent);
      }
    }
  }

  remote(remoteObject: any): any {
    const remoteCopy = Object.assign({}, remoteObject);
    if (this.props.onSort) {
      // Caller wants to handle sorting themselves
      remoteCopy.sort = true;
    }
    return remoteCopy;
  }

  handleSort(colName: string, order: 'asc' | 'desc') {
    let colNum = 0;
    this.props.columns.forEach((col: TableColumn, index: number) => {
      if (col.title === colName || (typeof col.render === 'string' && col.render === colName)) {
        colNum = index + 1;
      }
    });
    if (order === 'desc') {
      colNum = -colNum;
    }
    this.props.onSort(colNum);
  }

  render() {
    let selectedRowIds;
    if (Array.isArray(this.props.selection)) {
      selectedRowIds = this.props.selection;
    } else if (typeof this.props.selection === 'string') {
      selectedRowIds = [this.props.selection];
    } else {
      selectedRowIds = [];
    }

    // If the selection function isn't set, then don't let user select rows
    const selectRow = this.props.onSelect ? {
      mode: this.props.multiSelect ? 'checkbox' : 'radio',
      onSelect: this.rowSelect,
      clickToSelect: true,
      bgColor: '#b3d9ff',
      hideSelectColumn: true,
      selected: selectedRowIds,
    } : null;

    const columns = this.props.columns.map((column: TableColumn) => {
      const sortable = !!column.sort;
      const sortFunc = typeof column.sort === 'function' ? column.sort : null;

      if (typeof column.render === 'function') {
        // If the column has a custom renderer, then use that
        const rendererFunction = Table.makeCustomRenderer(column);

        return (
          <TableHeaderColumn key={column.title} dataFormat={rendererFunction} dataSort={sortable} sortFunc={sortFunc}>
            {column.title}
          </TableHeaderColumn>
        );
      }
      // Otherwise it's just the name of a field so use the string value of the field for the row object
      return (
        <TableHeaderColumn key={column.title} dataField={column.render} dataSort={sortable} sortFunc={sortFunc}>
          {column.title}
        </TableHeaderColumn>
      );
    });

    // Fill out the options with sorting-related properties
    const options = {};
    if (this.props.sortColumn !== 0) {
      options.defaultSortOrder = this.props.sortColumn > 0 ? 'asc' : 'desc';
      options.defaultSortName = this.props.columns[Math.abs(this.props.sortColumn) - 1].title;
    }
    if (this.props.onSort) {
      options.onSortChange = this.handleSort;
    }

    return (
      <div>
        <BootstrapTable
          data={this.state.sortedRows}
          tableStyle={{ backgroundColor: 'white' }}
          selectRow={selectRow}
          striped
          keyField="id"
          options={options}
          remote={this.remote}
        >
          {columns}
        </BootstrapTable>
      </div>
    );
  }
}

Table.TableColumn = TableColumn;
