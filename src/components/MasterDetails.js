// @flow

import * as React from 'react';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

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
  header?: null | React.Node | (selectedRows: Array<string>) => React.Node;
  /**
   * A footer component that can be inserted below the table (but to the left of the
   * details component). For example, this might be used to include controls to paginate
   * the table. Optional.
   */
  footer?: null | React.Node | (selectedRows: Array<string>) => React.Node;
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
  /**
   * Optional background color to apply to the last selected row. Only used if multiSelect is specified as well.
   * Takes precedence over all other background colors specified through classNames.
   */
  anchorRowBackgroundColor: ?string;
};

type MasterDetailsDefaultProps = {
  detailsProps: any;
  footer?: null | React.Node | (selectedRows: Array<string>) => React.Node;
  header?: null | React.Node | (selectedRows: Array<string>) => React.Node;
  multiSelect: boolean;
  noEmptySelection: boolean;
  onSelect: ?(rowsIndices: Array<number>, newlySelectedRowIndex: number | null) => void;
  onSort: null | (sortColumn: number) => void;
  padding: number;
  selectedClassName: string;
  sortColumn: number;
  split: ColumnCount;
  tableClassName: string;
  tableContainerClassName: string | void;
};

type MasterDetailsState = {
  /** The index for the most-recently selected row, to be displayed in the details pane. */
  detailsRowIndex: number | null;
  /** The indices of the selected rows */
  selectedRows: Set<number>;
};

/**
 * A componnent which marries a Table componnent with a details pane on the right to show more
 * information about the item in the selected row. If the table allows selection of multiple rows
 * simultaneously, then the details pane shows information aobut the most recently selected row.
 */
export default class MasterDetails extends React.Component<MasterDetailsDefaultProps, MasterDetailsProps, MasterDetailsState> {
  static defaultProps = {
    detailsProps: {},
    footer: null,
    header: null,
    multiSelect: false,
    noEmptySelection: false,
    onSelect: null,
    onSort: null,
    padding: 0,
    selectedClassName: 'attivio-table-row-selected',
    sortColumn: 0,
    split: 8,
    tableClassName: 'table table-striped attivio-table attivio-table-sm',
    tableContainerClassName: undefined,
  };

  static displayName = 'MasterDetails';

  constructor(props: MasterDetailsProps) {
    super(props);
    this.state = {
      detailsRowIndex: null,
      selectedRows: [],
    };
    (this: any).selectionChanged = this.selectionChanged.bind(this);
  }

  state: MasterDetailsState;

  /**
   * Update the table's selection and update the details view's input.
   */
  selectionChanged(selectedRowIndices: Array<number>, newlySelectedRowIndex: number | null) {
    this.setState({
      selectedRows: selectedRowIndices,
      detailsRowIndex: newlySelectedRowIndex,
    }, () => {
      if (this.props.onSelect) {
        this.props.onSelect(selectedRowIndices, newlySelectedRowIndex);
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

  renderFooter() {
    const { footer } = this.props;
    const { selectedRows } = this.state;
    if (typeof footer === 'function') {
      return footer(selectedRows);
    }
    return footer;
  }

  render() {
    const {
      columns,
      details: Detail,
      detailsProps,
      anchorRowBackgroundColor,
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
      detailsRowIndex,
    } = this.state;

    const detailsWidth = 12 - tableWidth;
    const halfPadding = `${padding / 2}px`;
    const detailsRow = rows[detailsRowIndex];

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
                activeRowIndex={detailsRowIndex}
                anchorRowBackgroundColor={anchorRowBackgroundColor}
              />
              {this.renderFooter()}
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
