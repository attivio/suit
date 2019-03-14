import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css';
import { reduce as lodashReduce } from 'lodash';

import ObjectUtils from '../util/ObjectUtils';

/**
 * This defines a single column within the table.
 */
class TableColumn {
  constructor(
    title: string,
    render: string | (value: any) => any,
    sort: ?boolean | (a: any, b: any, order: 'asc' | 'desc') => number = false,
    className: ?string = '',
    style: ?any = {},
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
   * Rows of the table to be rendered. Rows must be objects.
   */
  rows: Array<{}>;
  /**
   * Hook to get details of the row(s) selected in the table. Optional. If not
   * set, the rows will be selectable, but the parent component won't have access to the
   * selected rows or active row. Will always be called with an array of row objects, though the array
   * will be empty if nothing is selected and an object or null as the second parameter.
   */
  onSelect?: (selectedRows: Array<{}>, newlySelectedRow: null | {}) => void;
  /**
   * If set, the user can select multiple rows in the table.
   */
  multiSelect?: boolean;
  /**
   * The column being sorted by, if any. The absolute value of this is the 1-based index
   * of the sort column in the array specified by the columns property. If the value is
   * positive, then the column is sorted normally; if it's negative, then it is sorted
   * in the reverse order. For example, if the columns for the table are "Name," "Speed,"
   * and "Color," and this is set to -2, then the table will be sorted by speed, from
   * highest to lowest (in the reverse order). This should be set only if the caller
   * is handling the sorting of the table rows.
   */
  sortColumn?: number;
  /**
   * A callback used if the parent wants to handle sorting of the rows in the table.
   * It is passed the 1-based index of the column by which the user wants to sort (if the
   * sorting should be done in the opposite direction, this value will be negative). This
   * is the same as the sortColumn property. The callback will only be invoked if the user
   * clicks on a sortable column, as indicated by the sort property in its TableColumn
   * definition. Once the callback has obtained the new data, the Table component should
   * be re-rendered with new values for the sortColumn and rows properties.
   */
  onSort?: (sortColumn: number) => void;
  /**
   * If set, then the component will not allow the user to deselect all rows in the table.
   * For single-select components, the user will only be able to change the selectedIndices to
   * another row; for multi-select components, the user will not be able to deselect the last-
   * selected row without first selecting another one. This means that, unless the rows
   * property is empty, there will always be an item selected in the table.
   */
  noEmptySelection?: boolean;
  /**
   * If set, the table will have a border drawn around it.
   */
  bordered?: boolean;
  /**
   * The class name to apply only to tr elements of selected rows. Optional
   */
  selectedClassName?: string;
  /**
   * The class name to apply to the table element. Optional.
   */
  tableClassName?: string;
  /**
   * The index of the active row. If no empty rows are allowed, this defaults to index 0.
   */
  activeRowIndex: number | null;
  /**
   *  Optional background color to apply to the last selected row. Only used if multiSelect is specified as well. Takes precedence
   *  over all other background colors specified through classNames.
   */
  anchorRowBackgroundColor?: string;
};

type TableDefaultProps = {
  activeRowIndex: number | null;
  bordered?: boolean;
  multiSelect?: boolean;
  noEmptySelection?: boolean;
  onSelect?: (selectedRows: Array<{}>, newlySelectedRow: {} | null) => void;
  onSort?: (sortColumn: number) => void;
  selectedClassName?: string;
  sortColumn?: number;
  tableClassName?: string;
};

type TableState = {
  /** The index of the anchor row. Only relevant with multiSelect option enabled. */
  anchorRowIndex: number | null;
  /** Indicates whether or not the shift key is pressed down. Only relevant with multiSelect option enabled. */
  shiftKeyDown: boolean;
  /** Indicates whether or not the ctrl key is pressed down. Only relevant with multiSelect option enabled. */
  ctrlKeyDown: boolean;
  /** The indices of the selected rows. */
  selectedIndices: Set<number>;
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
    bordered: false,
    activeRowIndex: null,
    multiSelect: false,
    noEmptySelection: false,
    selectedClassName: 'attivio-table-row-selected',
    sortColumn: 0,
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
      sortedRows: props.rows && props.rows.length > 0
        ? props.rows.map((row, index) => {
          return { ...row, index };
        })
        : [],
      shiftKeyDown: false,
      ctrlKeyDown: false,
      anchorRowIndex: props.multiSelect ? 0 : null,
    };
    (this: any).renderColumns = this.renderColumns.bind(this);
  }

  state: TableState;

  componentDidMount() {
    const { multiSelect, onSelect, noEmptySelection } = this.props;
    const { selectedIndices } = this.state;
    if (multiSelect) {
      document.addEventListener('keydown', this.keyDown);
      document.addEventListener('keyup', this.keyUp);
      if (onSelect && (!selectedIndices || selectedIndices.length < 1) && noEmptySelection) {
        onSelect([0], 0);
      }
    }
  }

  componentWillReceiveProps(newProps: TableProps) {
    if (!ObjectUtils.arrayEquals(newProps.rows, this.props.rows)) {
      // Update the row selectedIndices for the parent if onSelect is specified and the actual rows have changed.
      if (newProps.onSelect) {
        const detailsRowIndex = newProps.noEmptySelection ? 0 : null;
        const selectedRows = detailsRowIndex ? newProps.rows[detailsRowIndex] : [];
        newProps.onSelect(selectedRows, detailsRowIndex);
      }

      // Reset the sorted rows if the actual rows have changed.
      const sortedRows = newProps.rows && newProps.rows.length > 0
        ? newProps.rows.map((row, index) => {
          return { ...row, index };
        })
        : [];
      this.setState({
        sortedRows,
      });
    }
  }

  componentWillUnmount() {
    if (this.props.multiSelect) {
      document.removeEventListener('keydown', this.keyDown);
      document.removeEventListener('keyup', this.keyUp);
    }
  }

  keyDown = (e: KeyboardEvent) => {
    if (e.shiftKey || e.ctrlKey || e.metaKey) {
      const shiftKeyDown = e.shiftKey;
      const ctrlKeyDown = e.ctrlKey || e.metaKey;
      this.setState({ shiftKeyDown, ctrlKeyDown });
    }
  }

  keyUp = (e: KeyboardEvent) => {
    const shiftKeyUp = e.key === 'Shift';
    const ctrlKeyUp = e.key === 'Control' || e.key === 'Meta';
    if (shiftKeyUp || ctrlKeyUp) {
      this.setState({ shiftKeyDown: false, ctrlKeyDown: false });
    }
  }

  rowSelect = (rowData: any): boolean => {
    const {
      anchorRowIndex,
      ctrlKeyDown,
      shiftKeyDown,
      selectedIndices,
      sortedRows,
    } = this.state;

    const shiftKeyPressed = shiftKeyDown;
    const ctrlKeyPressed = ctrlKeyDown;

    const { multiSelect, noEmptySelection, onSelect, activeRowIndex } = this.props;
    const newSelectedRowIndices = selectedIndices;

    // Safety Check - if no row data is passed, do nothing.
    if (!rowData) {
      return false;
    }
    // If multiselect is enabled, check for modifier keys.
    if (multiSelect) {
      // If empty selections are allowed, then clicking a row (with or without a modifier) when there are
      // no selections will make this row the active row, the anchor row, and the only selectedIndices.
      if (anchorRowIndex === null) {
        const selectedRow = rowData.index;
        this.setState({
          anchorRowIndex: rowData.index,
        });
        onSelect([selectedRow], selectedRow);
        return true;
      }
      if (shiftKeyPressed) {
        // The shift key was pressed. The anchor row and active rows do not change.
        // All rows between the anchor row and the selected row are selected and added onto the current selectedIndices.
        const count = rowData.index - anchorRowIndex;
        const startIndex = count > 0 ? anchorRowIndex : rowData.index;
        const endIndex = count > 0 ? rowData.index : anchorRowIndex;
        let currentIndex = startIndex;

        // Add the rows in range onto the selectedIndices of row indices.
        while (currentIndex <= endIndex) {
          newSelectedRowIndices.add(currentIndex);

          currentIndex += 1;
        }
        onSelect(newSelectedRowIndices, activeRowIndex);

        return true;
      } else if (ctrlKeyPressed) {
        const alreadySelected = selectedIndices.has(rowData.index);
        const onlySelection = selectedIndices.length <= 1;
        // If the row is already selected, this is a deselection attempt.
        if (alreadySelected) {
          // Is this row the only selectedIndices?
          if (onlySelection) {
            // Does this table allow no selections?
            if (noEmptySelection) {
              // This row is already selected, it's the only row selected, and the table does not allow
              // empty selections. Do nothing.
              return false;
            }
            // The row is already selected, it's the only selectedIndices, and the table allows no selections,
            // clear out selections.
            this.setState({
              anchorRowIndex: null,
            });
            onSelect([], null);
            return true;
          }
          // Is the row we're deselecting the active row?
          const updateActiveRow = rowData.index === activeRowIndex;
          // Is the row we're deselecting the anchor row?
          const updateAnchorRow = rowData.index === anchorRowIndex;

          // This row is not the only selectedIndices, deselect it.
          newSelectedRowIndices.remove(rowData.index);

          if (updateActiveRow || updateAnchorRow) {
            // We need a fallback index for the anchor and/or active row. Use the selected row
            // (excluding the current row) with the least index.
            const fallbackIndex = lodashReduce(newSelectedRowIndices, (minimumRowIndex, currentRowIndex) => {
              return Math.min(currentRowIndex, minimumRowIndex);
            }, Infinity);

            // If the row we're deselecting is the anchor row we need to use a fallback anchor row index.
            const newActiveRowIndex = updateActiveRow ? fallbackIndex : activeRowIndex;

            // If the row we're deselecting is the active row, we need to use a fallback active row index.
            const baseValue = anchorRowIndex === null ? 0 : anchorRowIndex;
            const newAnchorRowIndex = updateAnchorRow ? fallbackIndex : baseValue;

            newSelectedRowIndices.add(newActiveRowIndex);
            newSelectedRowIndices.add(newAnchorRowIndex);

            const selectedRows = newSelectedRowIndices.map((index) => {
              return sortedRows[index];
            });

            const activeRow = sortedRows[newActiveRowIndex];

            // The control or meta key was pressed, and this row was previously selected. This row was an anchor or active row.
            // The anchor and/or active row may have been updated to a fallback index.
            this.setState({
              anchorRowIndex: newAnchorRowIndex,
            });
            onSelect(selectedRows, activeRow);
            return true;
          }

          const selectedRows = newSelectedRowIndices.map((index) => {
            return sortedRows[index];
          });

          // The control or meta key was pressed and this row was previously selected. This row is not an anchor or active row.
          // It may be safely removed. The active row does not change. The anchor row does not change.
          onSelect(selectedRows, sortedRows[activeRowIndex]);
          return true;
        }
        // The control or meta key was pressed, and this row was not previously selected, so select it.
        // This row becomes the anchor row, but the active row does not change.
        newSelectedRowIndices.add(rowData.index);

        const selectedRows = newSelectedRowIndices.map((index) => {
          return sortedRows[index];
        });

        this.setState({
          anchorRowIndex: rowData.index,
        });
        onSelect(selectedRows, sortedRows[activeRowIndex]);
        return true;
      }

      // No modifier keys were pressed, all previously selected indices are cleared and this row becomes the
      // anchor row, active row, and only selectedIndices.
      this.setState({
        anchorRowIndex: rowData.index,
      });
      const selectedRow = sortedRows[rowData.index];
      onSelect([selectedRow], selectedRow);
      return true;
    }

    // multiSelect is not enabled
    // Is this row already the currently selected row?
    if (activeRowIndex === rowData.index) {
      // Is it ok if no rows are selected?
      if (noEmptySelection) {
        // This row is the active row, and we don't allow empty selections, do nothing.
        return false;
      }
      // This row is the active row, and we do allow empty selections, deselect the row.ß
      onSelect([], null);
      return true;
    }

    // Multiselect is not enabled and this is not the currently selected row, just select the row.
    const selectedRow = sortedRows[rowData.index];
    onSelect([selectedRow], selectedRow);
    return true;
  }

  remote = (remoteObject: any): any => {
    const remoteCopy = Object.assign({}, remoteObject);
    if (this.props.onSort) {
      // Caller wants to handle sorting themselves
      remoteCopy.sort = true;
    }
    return remoteCopy;
  }

  handleSort = (colName: string, order: 'asc' | 'desc') => {
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

  renderColumns() {
    const { columns } = this.props;

    return columns.map((column: TableColumn) => {
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
  }

  render() {
    const {
      activeRowIndex,
      anchorRowBackgroundColor,
      bordered,
      columns,
      multiSelect,
      onSelect,
      onSort,
      selectedClassName,
      sortColumn,
      tableClassName,
    } = this.props;

    const { sortedRows, selectedIndices } = this.state;

    // If the selectedIndices function isn't set, then don't let user select rows
    const selectRow = onSelect ? {
      mode: multiSelect ? 'checkbox' : 'radio',
      onSelect: this.rowSelect,
      clickToSelect: true,
      className: selectedClassName,
      bgColor: (row) => {
        if (multiSelect && row.index === activeRowIndex && anchorRowBackgroundColor) {
          return anchorRowBackgroundColor;
        }
        return null;
      },
      hideSelectColumn: true,
      selected: selectedIndices,
    } : null;

    // Fill out the options with sorting-related properties
    const options = {};
    if (sortColumn !== 0) {
      options.defaultSortOrder = sortColumn > 0 ? 'asc' : 'desc';
      options.defaultSortName = columns[Math.abs(sortColumn) - 1].title;
    }
    if (onSort) {
      options.onSortChange = this.handleSort;
    }

    return (
      <div>
        <BootstrapTable
          data={sortedRows}
          tableHeaderClass={tableClassName}
          tableBodyClass={tableClassName}
          selectRow={selectRow}
          keyField="index"
          options={options}
          remote={this.remote}
          bordered={bordered}
        >
          {this.renderColumns()}
        </BootstrapTable>
      </div>
    );
  }
}

Table.TableColumn = TableColumn;
