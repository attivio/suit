import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css';
import { isEqualWith, isEqual } from 'lodash';

/**
 * This defines a single column within the table.
 */
class TableColumn {
  constructor(
    title: string,
    render: string | (value: any) => any,
    sort?: boolean | (a: any, b: any, order: 'asc' | 'desc') => number = false,
    className?: string = '',
    style?: any = {},
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
   * Rows of the table to be rendered. Each row will be treated as an object.
   */
  rows: Array<{}>;
  /**
   * Hook to get details of the row(s) selected in the table. Optional. If not
   * set, the rows will be selectable, but the parent component won't have access to the
   * selected rows or active row. Will always be called with an array of row objects, though the array
   * will be empty if nothing is selected and an object or null as the second parameter.
   * The second parameter is not necessary if multiselect is not enabled.
   */
  onSelect?: (selectedRows: Array<{}>, activeRow: {} | null) => void;
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
   *  Optional background color to apply to the active row. Takes precedence
   *  over all other background colors specified through classNames.
   */
  activeRowBackgroundColor?: string;
  /**
   *  Optional background color to apply all selected rows except for the active row. Only used if multiSelect is specified as well.
   *  Takes precedence over all other background colors specified through classNames.
   */
  multiSelectBackgroundColor?: string;
  /**
   * Row comparator function used to determine when rows have changed due to paging, sorting, or filtering. If
   * Any row is determined to have changed, the row selection is reset. If no rowComparator is set, defaults to a
   * deep row comparison and row selection will reset anytime anything in rows changes.
   * The comparator is given two row objects to compare. If the rows are equal, the function should return true.
   * If the two rows are not equal, the function should return false.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  rowComparator: (rowA: {}, rowB: {}) => boolean; // This prop is referenced as a newProp in componentWillReceiveProps.
};

type TableDefaultProps = {
  bordered: boolean;
  multiSelect: boolean;
  noEmptySelection: boolean;
  rows: Array<{}>;
  selectedClassName: string;
  sortColumn: number;
  tableClassName: string;
};

type TableState = {
  /** The index of the active row. Only relevant with multiSelect option enabled. */
  activeRowIndex: number | null;
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
  sortedRows: Array<{}>;
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
    multiSelect: false,
    noEmptySelection: false,
    rows: [],
    selectedClassName: 'attivio-table-row-selected attivio-table-row',
    sortColumn: 0,
    tableClassName: 'table table-striped attivio-table attivio-table-sm attivio-table-no-outline',
  };

  static makeCustomRenderer(column) {
    return (cell, row) => {
      return column.render(row);
    };
  }

  static compareRows

  static displayName = 'Table';

  static TableColumn;

  constructor(props: TableProps) {
    super(props);
    const defaultIndex = props.noEmptySelection ? 0 : null;
    this.state = {
      sortedRows: props.rows && props.rows.length > 0
        ? props.rows.map((row, tableRowIndex) => {
          return { ...row, tableRowIndex };
        })
        : [],
      shiftKeyDown: false,
      ctrlKeyDown: false,
      anchorRowIndex: defaultIndex,
      activeRowIndex: defaultIndex,
      selectedIndices: props.noEmptySelection ? new Set([0]) : new Set([]),
    };
    (this: any).renderColumns = this.renderColumns.bind(this);
  }

  state: TableState;

  componentDidMount() {
    const { multiSelect, onSelect, noEmptySelection } = this.props;
    const { sortedRows } = this.state;

    if (multiSelect) {
      document.addEventListener('keydown', this.keyDown);
      document.addEventListener('keyup', this.keyUp);
    }

    // If the parent provided an update hook, initialize the parent with selection values.
    if (onSelect) {
      const activeRowIndex = noEmptySelection && sortedRows.length > 0 ? 0 : null;
      const selectedRow = noEmptySelection && sortedRows.length > 0 ? sortedRows[0] : null;
      const selectedRows = noEmptySelection && selectedRow ? [selectedRow] : [];

      onSelect(selectedRows, selectedRow);
      // TODO: Look at redux/reselect pattern as alternative to manipulating data coming from api for component consumption.
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({
        activeRowIndex,
        anchorRowIndex: activeRowIndex,
        selectedIndices: noEmptySelection ? new Set([0]) : new Set([]),
      });
    }
  }

  componentWillReceiveProps(newProps: TableProps) {
    // If a rowComparator is specified, use it, otherwise, do a deep row comparison and reset selection if anything changed.
    if (newProps.rows.length !== this.props.rows.length
      || (newProps.rowComparator && !isEqualWith(newProps.rows, this.props.rows, newProps.rowComparator))
      || (!newProps.rowComparator && !isEqual(newProps.rows, this.props.rows))
    ) {
      // Reset the sorted rows if the actual rows have changed.
      const sortedRows = newProps.rows && newProps.rows.length > 0
        ? newProps.rows.map((row, tableRowIndex) => {
          return { ...row, tableRowIndex };
        })
        : [];
      // Reset row selection if the actual rows have changed.

      const selectedIndices = sortedRows.length > 0 && newProps.noEmptySelection
        ? new Set([0])
        : new Set([]);
      const anchorRowIndex = sortedRows.length > 0 && newProps.noEmptySelection
        ? 0
        : null;
      const activeRowIndex = sortedRows.length > 0 && newProps.noEmptySelection
        ? 0
        : null;

      // If the parent provided an update hook, update the parent with the changes.
      if (newProps.onSelect) {
        const selectedRows = activeRowIndex !== null && newProps.noEmptySelection ? [sortedRows[activeRowIndex]] : [];
        const selectedRow = activeRowIndex !== null && newProps.noEmptySelection ? sortedRows[activeRowIndex] : null;
        newProps.onSelect(selectedRows, selectedRow);
      }
      this.setState({
        sortedRows,
        selectedIndices,
        anchorRowIndex,
        activeRowIndex,
      });
    } else if (!isEqual(newProps.rows, this.props.rows)) {
      // Selection hasn't changed, but other row data has, update row data
      const sortedRows = newProps.rows && newProps.rows.length > 0
      ? newProps.rows.map((row, tableRowIndex) => {
        return { ...row, tableRowIndex };
      })
      : [];
      this.setState({ sortedRows }, () => {
        const activeRow = sortedRows[this.state.activeRowIndex];
        if (newProps.onSelect) {
          newProps.onSelect(this.state.sortedRows, activeRow);
        }
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
      activeRowIndex,
      anchorRowIndex,
      ctrlKeyDown,
      shiftKeyDown,
      selectedIndices,
      sortedRows,
    } = this.state;

    const shiftKeyPressed = shiftKeyDown;
    const ctrlKeyPressed = ctrlKeyDown;

    const { multiSelect, noEmptySelection, onSelect } = this.props;
    const newSelectedIndices = selectedIndices;

    // Safety Check - if no row data is passed, do nothing.
    if (!rowData) {
      return false;
    }
    // If multiselect is enabled, check for modifier keys.
    if (multiSelect) {
      // If empty selections are allowed, then clicking a row (with or without a modifier) when there are
      // no selections will make this row the active row, the anchor row, and the only selectedIndices.
      if (anchorRowIndex === null) {
        this.setState({
          selectedIndices: new Set([rowData.tableRowIndex]),
          anchorRowIndex: rowData.tableRowIndex,
          activeRowIndex: rowData.tableRowIndex,
        });
        onSelect([rowData], rowData);
        return true;
      }
      if (shiftKeyPressed) {
        // The shift key was pressed. The anchor row and active rows do not change.
        // All rows between the anchor row and the selected row are selected and added onto the current selectedIndices.
        const count = rowData.tableRowIndex - anchorRowIndex;
        const startIndex = count > 0 ? anchorRowIndex : rowData.tableRowIndex;
        const endIndex = count > 0 ? rowData.tableRowIndex : anchorRowIndex;
        let currentIndex = startIndex;

        // Add the rows in range onto the selectedIndices of row indices.
        while (currentIndex <= endIndex) {
          newSelectedIndices.add(currentIndex);

          currentIndex += 1;
        }
        this.setState({ selectedIndices: newSelectedIndices });

        const selectedRows = [];
        newSelectedIndices.forEach((index) => {
          selectedRows.push(sortedRows[index]);
        });
        onSelect(selectedRows, sortedRows[activeRowIndex]);

        return true;
      } else if (ctrlKeyPressed) {
        const alreadySelected = selectedIndices.has(rowData.tableRowIndex);
        const onlySelection = selectedIndices.size <= 1;
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
              selectedIndices: new Set([]),
              anchorRowIndex: null,
              activeRowIndex: null,
            });
            onSelect([], null);
            return true;
          }
          // Is the row we're deselecting the active row?
          const updateActiveRow = rowData.tableRowIndex === activeRowIndex;
          // Is the row we're deselecting the anchor row?
          const updateAnchorRow = rowData.tableRowIndex === anchorRowIndex;

          // This row is not the only selectedIndices, deselect it.
          newSelectedIndices.delete(rowData.tableRowIndex);

          if (updateActiveRow || updateAnchorRow) {
            // We need a fallback index for the anchor and/or active row. Use the selected row
            // (excluding the current row) with the least index.
            let minimiumIndex = Infinity;
            newSelectedIndices.forEach((selectedIndex) => {
              minimiumIndex = Math.min(selectedIndex, minimiumIndex);
            });

            const fallbackIndex = minimiumIndex === Infinity ? null : minimiumIndex;

            // If the row we're deselecting is the anchor row we need to use a fallback anchor row index.
            const newActiveRowIndex = updateActiveRow ? fallbackIndex : activeRowIndex;

            // If the row we're deselecting is the active row, we need to use a fallback active row index.
            const baseValue = anchorRowIndex === null ? 0 : anchorRowIndex;
            const newAnchorRowIndex = updateAnchorRow ? fallbackIndex : baseValue;

            newSelectedIndices.add(newActiveRowIndex);
            newSelectedIndices.add(newAnchorRowIndex);

            const selectedRows = [];
            newSelectedIndices.forEach((index) => {
              selectedRows.push(sortedRows[index]);
            });

            const activeRow = sortedRows[newActiveRowIndex];

            // The control or meta key was pressed, and this row was previously selected. This row was an anchor or active row.
            // The anchor and/or active row may have been updated to a fallback index.
            this.setState({
              selectedIndices: newSelectedIndices,
              anchorRowIndex: newAnchorRowIndex,
              activeRowIndex: newActiveRowIndex,
            });
            onSelect(selectedRows, activeRow);
            return true;
          }
          const selectedRows = [];
          newSelectedIndices.forEach((index) => {
            selectedRows.push(sortedRows[index]);
          });

          this.setState({ selectedIndices: newSelectedIndices });
          // The control or meta key was pressed and this row was previously selected. This row is not an anchor or active row.
          // It may be safely removed. The active row does not change. The anchor row does not change.
          onSelect(selectedRows, sortedRows[activeRowIndex]);
          return true;
        }
        // The control or meta key was pressed, and this row was not previously selected, so select it.
        // This row becomes the anchor row, but the active row does not change.
        newSelectedIndices.add(rowData.tableRowIndex);

        const selectedRows = [];
        newSelectedIndices.forEach((index) => {
          selectedRows.push(sortedRows[index]);
        });

        this.setState({
          selectedIndices: newSelectedIndices,
          anchorRowIndex: rowData.tableRowIndex,
        });
        onSelect(selectedRows, sortedRows[activeRowIndex]);
        return true;
      }

      // No modifier keys were pressed, all previously selected indices are cleared and this row becomes the
      // anchor row, active row, and only selectedIndices.
      this.setState({
        anchorRowIndex: rowData.tableRowIndex,
        activeRowIndex: rowData.tableRowIndex,
        selectedIndices: new Set([rowData.tableRowIndex]),
      });

      onSelect([rowData], rowData);
      return true;
    }

    // multiSelect is not enabled
    // Is this row already the currently selected row?
    if (activeRowIndex === rowData.tableRowIndex) {
      // Is it ok if no rows are selected?
      if (noEmptySelection) {
        // This row is the active row, and we don't allow empty selections, do nothing.
        return false;
      }
      // This row is the active row, and we do allow empty selections, deselect the row.
      this.setState({
        selectedIndices: new Set([]),
        activeRowIndex: null,
      });
      onSelect([], null);
      return true;
    }

    // Multiselect is not enabled and this is not the currently selected row, just select the row.
    this.setState({
      selectedIndices: [rowData.tableRowIndex],
      selectedRowIndex: rowData.tableRowIndex,
    });
    onSelect([rowData], rowData);
    return true;
  }

  remote = (remoteObject: any): any => {
    const remoteCopy = { ...remoteObject };
    if (this.props.onSort) {
      // Caller wants to handle sorting themselves
      remoteCopy.sort = true;
    }
    return remoteCopy;
  }

  handleSort = (colName: string, order: 'asc' | 'desc') => {
    const { rows, noEmptySelection, onSelect } = this.props;
    let colNum = 0;
    this.props.columns.forEach((col: TableColumn, index: number) => {
      if (col.title === colName || (typeof col.render === 'string' && col.render === colName)) {
        colNum = index + 1;
      }
    });
    if (order === 'desc') {
      colNum = -colNum;
    }
    const sortedRows = rows && rows.length > 0
      ? rows.map((row, tableRowIndex) => {
        return { ...row, tableRowIndex };
      })
      : [];

    // Reset table selection.
    const tableContainsRows = this.state.sortedRows.length > 0;

    const defaultIndex = noEmptySelection && tableContainsRows ? 0 : null;
    if (onSelect) {
      const selectedRows = defaultIndex ? [defaultIndex] : [];
      onSelect(selectedRows, defaultIndex);
    }
    const selectedIndices = defaultIndex ? new Set([defaultIndex]) : new Set([]);
    this.setState({
      activeRowIndex: defaultIndex,
      anchorRowIndex: defaultIndex,
      selectedIndices,
      sortedRows,
    });
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
      activeRowBackgroundColor,
      bordered,
      columns,
      multiSelect,
      onSelect,
      onSort,
      multiSelectBackgroundColor,
      selectedClassName,
      sortColumn,
      tableClassName,
    } = this.props;

    const { sortedRows, selectedIndices, activeRowIndex } = this.state;
    const selected = [];
    selectedIndices.forEach((index) => {
      selected.push(index);
    });

    // If the selectedIndices function isn't set, then don't let user select rows
    const selectRow = onSelect ? {
      mode: multiSelect ? 'checkbox' : 'radio',
      onSelect: this.rowSelect,
      clickToSelect: true,
      className: selectedClassName,
      bgColor: (row, isSelected) => {
        if (activeRowBackgroundColor && row.tableRowIndex === activeRowIndex) {
          return activeRowBackgroundColor;
        }
        if (multiSelect && multiSelectBackgroundColor && isSelected) {
          return multiSelectBackgroundColor;
        }
        return null;
      },
      hideSelectColumn: true,
      selected,
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
          keyField="tableRowIndex"
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
