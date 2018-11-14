// @flow

import React from 'react';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import Table from './Table';

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
  columns: Array<Table.ColumnDef>;
  /**
   * The details component to be rendered for the selected row object from table.
   * It is passed a property called "rowData" which contains the object representing
   * the selected row in the table.
   */
  details: any;
  /**
   * If set, multiple rows in the table can be selected simultaneouysly. In this case, the
   * most recently selected row is shown in the details view.
   */
  multiSelect: boolean;
};

type MasterDetailsDefaultProps = {
  multiSelect: boolean;
};

type MasterDetailsState = {
  /** The IDs of the selected rows */
  selectedRows: Array<string>;
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
    multiSelect: false,
  };

  static displayName = 'MasterDetails';

  constructor(props: MasterDetailsProps) {
    super(props);
    this.state = {
      selectedRows: this.props.rows.length > 0 ? [this.props.rows[0].id] : [],
      detailsRow: this.props.rows.length > 0 ? this.props.rows[0] : null,
    };
    (this: any).selectionChanged = this.selectionChanged.bind(this);
  }
  state: MasterDetailsState;

  /**
   * Update the table's selection and update the details view's input.
   */
  selectionChanged(rows: Array<string>, mostRecent: string | null) {
    let detailsRowId;
    let selectedRows;
    if (this.props.multiSelect) {
      if (mostRecent) {
        // We're adding a new row to the selection
        detailsRowId = mostRecent;
      } else if (rows.length > 0) {
        // we removed a row fromt he selection... if there's anything left,
        // use the last item in the list as the details row; since any new
        // selection is always added to the end of the array, this will be
        // the previously selected row
        detailsRowId = rows[rows.length - 1];
      }
    } else {
      // Rows should be an array of 0 or 1 row ID
      selectedRows = rows;
      if (rows.length > 0) {
        detailsRowId = rows[0];
      }
    }
    const detailsRow = this.props.rows.find((row) => {
      return row.id === detailsRowId;
    });
    this.setState({
      selectedRows,
      detailsRow: detailsRow || null,
    });
  }

  render() {
    const Detail = this.props.details;
    return (
      <Grid fluid>
        <Row>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Table
              columns={this.props.columns}
              rows={this.props.rows}
              onSelect={this.selectionChanged}
              selection={this.state.selectedRows}
              multiSelect={this.props.multiSelect}
            />
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Detail data={this.state.detailsRow} />
          </Col>
        </Row>
      </Grid>
    );
  }
}
