// @flow

import React from 'react';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { deepEquals } from '../util/ObjectUtils';

import Table from './Table';

type ColumnCount = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type MasterDetailsProps = {
  /**
   * The data for the rows of the table. When a row is selected, its value from
   * this array is passed to the details component. Each object in the array of
   * row data MUST have a property called "id" of type string and whose value is
   * unique among the objects in the array.
   */
  rows: Array<any>;
  /**
   * The columns to display in the table
   */
  columns: Array<Table.TableColumn>;
  /**
   * The details component to be rendered for the selected row object from table.
   * It is passed a property called "data" which contains the object representing
   * the selected row in the table.
   */
  details: any;
  /**
   * Custom properties to pass to the details component in addition to the "data" property.
   * Optional.
   */
  detailsProps: any;
  /**
   * If set, multiple rows in the table can be selected simultaneouysly. In this case, the
   * most recently selected row is shown in the details view.
   */
  multiSelect: boolean;
  /**
   * This callback is called when the user changes the selection in the table. However the
   * MasterDetails component and not its parent is responsible for maintaining the selection
   * in the table; this callback is just a "courtesy" so the parent can do something such
   * as change the enablement of buttons, etc., based on the selection. See the onSelect
   * property of the Table component for more details.
   */
  onSelect: null | (rowsIds: Array<string>, newlySelectedRowId: string | null) => void;
  /**
   * If set, the user can select multiple rows in the table.
   */
  multiSelect: boolean;
  /**
   * The column being sorted by, if any.
   * A callback used when the owner of the rows is doing any sorting. See the onSort property
   * in the Table component for more details.
   */
  sortColumn: number;
  /**
   * A callback used when the owner of the rows is doing any sorting. See the onSort property
   * in the Table component for more details.
   */
  onSort: null | (sortColumn: number) => void;
  /**
   * A header component that can be inserted above the table (but to the left of the
   * details component). For example, this might be used to include controls that help the
   * user filter the list of items in the table. May also be a function that uses selectedRows and
   * renders a header component. Optional; if not set, the table will be flush with the top of the details component.
   */
  header: any;
  /**
   * A footer component that can be inserted below the table (but to the left of the
   * details component). For example, this might be used to include controls to paginate
   * the table. Optional.
   */
  footer: any;
  /**
   * This determines the ratio of table to details, based on Bootstrap's 12-column grid.
   * This is the width of the table; the details component will use the remainder. Optional;
   * by default, the table will have a width of 8 and the details component 4. Note also
   * that this only applies to large or medium screen sizes; for small and extra small ones,
   * the table will always be full width, above the details component.
   */
  split: ColumnCount;
  /**
   * The number of pixels of padding to include between the table and the details component.
   * Optional; defaults to 0 pixels.
   */
  padding: number;
  /**
   * See the noEmptySelection property of the Table component for details
   */
  noEmptySelection: boolean;
  /**
   * The class name to apply to the parent div element containing the table. Optional
   */
  tableContainerClassName: string | void;
  /**
   * The class name to apply only to tr elements of selected rows in the table. Optional
   */
  selectedClassName: string;
  /**
   * The class name to apply to the table element. Optional.
   */
  tableClassName: string;
};

type MasterDetailsDefaultProps = {
  detailsProps: any;
  multiSelect: boolean;
  onSelect: null | (rowsIds: Array<string>, newlySelectedRowId: string | null) => void;
  sortColumn: number;
  onSort: null | (sortColumn: number) => void;
  header: any;
  footer: any;
  split: ColumnCount;
  padding: number;
  noEmptySelection: boolean;
  tableContainerClassName: string | void;
  selectedClassName: string;
  tableClassName: string;
};

type MasterDetailsState = {
  /** The IDs of the selected rows */
  selectedRows: Array<string>;
  /** The id for the most-recently selected row, to be displayed in the details pane. */
  detailsRowId: string;
  /** The object for the most-recently selected row, to be displayed in the details pane.  */
  detailsRow: any;
};

/**
 * A componnent which marries a Table componnent with a details pane on the right to show more
 * information about the item in the selected row. If the table allows selection of multiple rows
 * simultaneously, then the details pane shows information aobut the most recently selected row.
 */
export default class MasterDetails extends React.Component<MasterDetailsDefaultProps, MasterDetailsProps, MasterDetailsState> {
  static defaultProps = {
    detailsProps: {},
    multiSelect: false,
    onSelect: null,
    sortColumn: 0,
    onSort: null,
    header: null,
    footer: null,
    split: 8,
    padding: 0,
    noEmptySelection: false,
    tableContainerClassName: undefined,
    selectedClassName: 'attivio-table-row-selected',
    tableClassName: 'table table-striped attivio-table attivio-table-sm',
  };

  static displayName = 'MasterDetails';

  constructor(props: MasterDetailsProps) {
    super(props);
    this.state = {
      selectedRows: props.rows.length > 0 && props.rows[0] ? [props.rows[0].id] : [],
      detailsRowId: props.rows.length > 0 && props.rows[0] ? props.rows[0].id : '',
    };
    (this: any).selectionChanged = this.selectionChanged.bind(this);
  }
  state: MasterDetailsState;

  componentWillReceiveProps(newProps: MasterDetailsProps, newState: MasterDetailsState) {
    const { rows, noEmptySelection } = this.props;
    const { selectedRows } = this.state;

    const rowDataChanged = !deepEquals(rows, newProps.rows);
    const selectedRowsChanged = !deepEquals(selectedRows, newState.selectedRows);

    if (rowDataChanged || selectedRowsChanged) {
      if (newProps.rows.length === 0) {
        this.setState({
          selectedRows: [],
          detailsRowId: '',
          detailsRow: null,
        });
      } else {
        const ids = newProps.rows.map((row) => {
          return row.id;
        });
        const newSelectedRows = newState.selectedRows.filter((row) => { return ids.includes(row); });
        if (noEmptySelection && newSelectedRows.length === 0) {
          newSelectedRows.push(newProps.rows[0].id);
        }
        const newDetailsRowId = (newSelectedRows.length > 0) ? (newSelectedRows[newSelectedRows.length - 1]) : '';

        const detailsRow = newProps.rows.find(({ id }) => {
          return id === newDetailsRowId;
        });

        this.setState({
          selectedRows: newSelectedRows,
          detailsRowId: newDetailsRowId,
          detailsRow,
        });
      }
    }
  }

  /**
   * Update the table's selection and update the details view's input.
   */
  selectionChanged(selectedRowIds: Array<string>, newlySelectedRowId: string | null) {
    this.setState({
      selectedRows: selectedRowIds,
      detailsRowId: newlySelectedRowId || '',
    }, () => {
      if (this.props.onSelect) {
        this.props.onSelect(selectedRowIds, newlySelectedRowId);
      }
    });
  }

  renderHeader() {
    const { header } = this.props;
    const { selectedRows } = this.state;
    if (typeof header === 'function') {
      return header(selectedRows);
    }
    return header;
  }

  render() {
    const {
      columns,
      details: Detail,
      detailsProps,
      footer,
      multiSelect,
      noEmptySelection,
      onSort,
      padding,
      rows,
      selectedClassName,
      sortColumn,
      split: tableWidth,
      tableClassName,
      tableContainerClassName,
    } = this.props;
    const {
      selectedRows,
      detailsRow,
    } = this.state;

    const detailsWidth = 12 - tableWidth;
    const halfPadding = `${padding / 2}px`;

    return (
      <Grid fluid style={{ padding: 0 }}>
        <Row style={{ margin: 0 }}>
          <Col lg={tableWidth} md={tableWidth} sm={12} xs={12} style={{ paddingLeft: 0, paddingRight: halfPadding }}>
            <div className={tableContainerClassName}>
              {this.renderHeader()}
              <Table
                columns={columns}
                rows={rows}
                onSelect={this.selectionChanged}
                sortColumn={sortColumn}
                onSort={onSort}
                selection={selectedRows}
                multiSelect={multiSelect}
                noEmptySelection={noEmptySelection}
                selectedClassName={selectedClassName}
                tableClassName={tableClassName}
              />
              {footer}
            </div>
          </Col>
          <Col lg={detailsWidth} md={detailsWidth} sm={12} xs={12} style={{ paddingLeft: halfPadding, paddingRight: 0 }}>
            <Detail {...detailsProps} data={detailsRow} />
          </Col>
        </Row>
      </Grid>
    );
  }
}
