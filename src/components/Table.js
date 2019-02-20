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
    className: string = '',
    style: any = {},
  ) {
    this.title = title;
    this.render = render;
    this.sort = sort;
    this.className = className;
    this.style = style;
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
  /**
   * The class name to use for the html td and th elements representing this column in the table.
   */
  className: string = '';
  /**
   * Any css style attributes to apply to the html td and th elements representing this column in the table.
   */
  style: any = {};
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
   * If set, then the component will not allow the user to deselect all rows in the table.
   * For single-select components, the user will only be able to change the selection to
   * another row; for multi-select components, the user will not be able to deselect the last-
   * selected row without first selecting another one. This means that, unless the rows
   * property is empty, there will always be an item selected in the table.
   */
  noEmptySelection: boolean;
  /**
   * If set, the table will have a border drawn around it.
   */
  bordered: booleaan;
  /**
   * The class name to apply only to tr elements of selected rows. Optional
   */
  selectedClassName: string;
  /**
   * The class name to apply to the table element. Optional.
   */
  tableClassName: string;
};

type TableDefaultProps = {
  onSelect: null | (selectedRowsIds: Array<string>, newlySelectedRowId: string | null) => void;
  selection: Array<srting>;
  multiSelect: boolean;
  sortColumn: number;
  onSort: null | (sortColumn: number) => void;
  noEmptySelection: boolean;
  bordered: boolean;
  selectedClassName: string;
  tableClassName: string;
};

type TableState = {
  controlKeyDown: Boolean;
  lastSelectedRowIndex: number | null;
  /**
   * The sorted list of rows. If not sorting in the table, this will always just be
   * the same as the rows property.
   */
  sortedRows: Array<any>;
  selectedRowIndices: Set<number>;
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
    bordered: false,
    selectedClassName: 'attivio-table-row-selected',
    tableClassName: 'table table-striped attivio-table attivio-table-sm',
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
      sortedRows: this.props.rows.map((row, index) => {
        return { ...row, index };
      }),
      selectedRowIndices: new Set([0]),
      controlKeyDown: false,
      lastSelectedRowIndex: null,
    };
    (this: any).handleSort = this.handleSort.bind(this);
    (this: any).rowSelect = this.rowSelect.bind(this);
    (this: any).remote = this.remote.bind(this);
  }

  state: TableState;

  componentDidMount() {
    if (this.props.multiSelect) {
      window.addEventListener('keydown', this.keyDown);
    }
  }

  componentWillReceiveProps(newProps: TableProps) {
    if (!ObjectUtils.arrayEquals(newProps.rows, this.props.rows)) {
      // Reset the sorted rows if the actual rows have changed.
      this.setState({
        sortedRows: newProps.rows.map((row, index) => {
          return { ...row, index };
        }),
      });
    }
  }

  componentWillUnmount() {
    if (this.props.multiSelect) {
      window.removeEventListener('keydown', this.keyDown);
      // window.removeEventListener('keyup', this.keyUp);
    }
  }

  keyDown = (e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.group('keyDown function');
    console.log('multiSelect: ', this.props.multiSelect);
    console.log('code: ', e.code);
    console.log('is control key: ', e.ctrlKey);
    console.log('is meta key: ', e.metaKey);
    console.groupEnd();
    if (this.props.multiSelect && (e.ctrlKey || e.metaKey)) {
      this.setState({ controlKeyDown: true });
    }
  }

  rowSelect(rowData: any): boolean {
    const { multiSelect, selection, noEmptySelection, onSelect } = this.props;
    console.group('rowSelect()');
    console.log('controlKeyPressed: ', this.state.controlKeyDown);
    console.groupEnd();
    let selectedRowIds = [];
    let rowId = rowData.id;

    this.setState(({
      selectedRowIndices: prevSelectedRowIndices,
      controlKeyDown: prevControlKeyDown,
      lastSelectedRowIndex: prevLastSelectedRowIndex,
    }) => {
      const alreadySelected = prevSelectedRowIndices.has(rowData.index);
      const notOnlySelection = prevSelectedRowIndices.length > 1;
      const selectedRowIndices = multiSelect && alreadySelected && (notOnlySelection || !noEmptySelection)
        ? prevSelectedRowIndices.delete(rowData.index)
        : prevSelectedRowIndices.add(rowData.index);

      const lastSelectedRowIndex = rowData.index;
      if (prevControlKeyDown && multiSelect && prevLastSelectedRowIndex) {
        const count = rowData.index - prevLastSelectedRowIndex;

        const startIndex = count > 0 ? prevLastSelectedRowIndex + 1 : rowData.index + 1;
        const endIndex = count > 0 ? rowData.index : prevLastSelectedRowIndex;

        let currentIndex = startIndex;

        const findSelectionIndex = (row) => {
          return row.index === currentIndex;
        };
        while (currentIndex < endIndex) {
          selectedRowIndices.add(currentIndex);
          const newSelection = selection.find(findSelectionIndex);
          if (newSelection) {
            selectedRowIds = [...selectedRowIds, newSelection.id];
          }
          currentIndex += 1;
        }
      }

      console.log('selectedRowIndices: ', selectedRowIndices);
      return {
        selectedRowIndices,
        controlKeyDown: false,
        lastSelectedRowIndex,
      };
    });

    if (multiSelect) {
      // if the list allows multiple selected rows
      if (Array.isArray(selection)) {
        selectedRowIds = [...selectedRowIds, ...selection];
      } else if (typeof selection === 'string') {
        selectedRowIds = [...selectedRowIds, [selection]];
      }

      if (!selectedRowIds.includes(rowId)) {
        // if the row is not already in the selection, add it
        selectedRowIds.push(rowId);
        onSelect(selectedRowIds, rowId);
      } else if (selectedRowIds.length === 1 && noEmptySelection) {
        // if this is the only remaining selection and we don't allow empty selection, just don't update
        return false;
      } else {
        // if it is already in the selection, remove it
        selectedRowIds.splice(selectedRowIds.indexOf(rowId), 1);
        rowId = selectedRowIds[selectedRowIds.length - 1];
        onSelect(selectedRowIds, rowId);
      }
      return true;
    }

    if (Array.isArray(selection)) {
      selectedRowIds = selection[0];
    } else if (typeof selection === 'string') {
      selectedRowIds = selection;
    } else {
      selectedRowIds = '';
    }

    // if this row is the currently selected row,
    if (selectedRowIds === rowId) {
      // if we don't allow empty selection
      if (noEmptySelection) {
        // do nothing
        return false;
      }
      // otherwise, deselect the row
      onSelect([], null);
      return true;
    }

    // otherwise, just select the newly clicked row
    onSelect([rowId], rowId);
    return true;
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
    const { multiSelect, selection } = this.props;
    const { selectedRowIndices } = this.state;

    let selectedRowIds;
    if (Array.isArray(selection)) {
      selectedRowIds = selection;
    } else if (typeof selection === 'string') {
      selectedRowIds = [selection];
    } else {
      selectedRowIds = [];
    }

    // FIXME: Move data manipulation outside of render function.
    // If multiSelect include row index selections made using keyboard
    if (multiSelect && selectedRowIndices.size > 0) {
      selectedRowIndices.forEach((index) => {
        const selectionId = selectedRowIds[index];
        if (selectionId) {
          selectedRowIds = [...selectedRowIds, selectionId];
        }
      });
    }
    console.group('<Table />');
    console.log('selectedRowIds: ', selectedRowIds);
    console.log('selectedRowIndices: ', selectedRowIndices);
    console.log('selection: ', selection);
    console.log('controlKeyDown: ', this.state.controlKeyDown);
    console.groupEnd();

    // If the selection function isn't set, then don't let user select rows
    const selectRow = this.props.onSelect ? {
      mode: multiSelect ? 'checkbox' : 'radio',
      onSelect: this.rowSelect,
      clickToSelect: true,
      className: this.props.selectedClassName,
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
          <TableHeaderColumn
            key={column.title}
            dataFormat={rendererFunction}
            dataSort={sortable}
            sortFunc={sortFunc}
            tdStyle={column.style}
            thStyle={column.style}
            className={column.className}
            columnClassName={column.className}
          >
            {column.title}
          </TableHeaderColumn>
        );
      }
      // Otherwise it's just the name of a field so use the string value of the field for the row object
      return (
        <TableHeaderColumn
          key={column.title}
          dataField={column.render}
          dataSort={sortable}
          sortFunc={sortFunc}
          tdStyle={column.style}
          thStyle={column.style}
          className={column.className}
          columnClassName={column.className}
        >
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
          tableHeaderClass={this.props.tableClassName}
          tableBodyClass={this.props.tableClassName}
          selectRow={selectRow}
          keyField="id"
          options={options}
          remote={this.remote}
          bordered={this.props.bordered}
        >
          {columns}
        </BootstrapTable>
      </div>
    );
  }
}

Table.TableColumn = TableColumn;
