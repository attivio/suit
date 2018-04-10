// @flow

import React from 'react';

import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import MenuItem from 'react-bootstrap/lib/MenuItem';

type ConnectorCardProps = {
  /**
   * The identifying string for the connector.
   */
  id: string;
  /**
   * The name of the connector.
   */
  name: string;
  /**
   * The display name of this connector's type.
   */
  typeName: string;
  /**
   * The current state of the connector.
   */
  status: 'running' | 'stopped' | 'new';
  /**
   * The callback to use when the user wants to start the connector.
   */
  onStart: (id: string) => void;
  /**
   * The callback to use when the user wants to stop the connector.
   */
  onStop: (id: string) => void;
  /**
   * The callback to use when the user wants to preview the connector's contents.
   */
  onPreview: (id: string) => void;
  /**
   * The callback to use when the user wants to schedule the connector.
   */
  onSchedule: (id: string) => void;
  /**
   * The callback to use when the user wants to edit the connector's configuration.
   */
  onEdit: (id: string) => void;
  /**
   * The callback to use when the user wants to delete the connector.
   */
  onDelete: (id: string) => void;
  /**
   * The number of columns in the grid layout this card will live in. Defaults to 3.
   */
  columns: number;
};

type ConnectorCardDefaultProps = {
  columns: number;
};

export default class ConnectorCard extends React.Component<ConnectorCardDefaultProps, ConnectorCardProps, void> {
  static defaultProps = {
    columns: 3,
  };

  constructor(props: ConnectorCardProps) {
    super(props);
    (this: any).doPreview = this.doPreview.bind(this);
    (this: any).doEdit = this.doEdit.bind(this);
    (this: any).doStart = this.doStart.bind(this);
    (this: any).doSchedule = this.doSchedule.bind(this);
    (this: any).doDelete = this.doDelete.bind(this);
    (this: any).doStop = this.doStop.bind(this);
  }

  doPreview() {
    this.props.onPreview(this.props.id);
  }

  doEdit() {
    this.props.onEdit(this.props.id);
  }

  doStart() {
    this.props.onStart(this.props.id);
  }

  doSchedule() {
    this.props.onSchedule(this.props.id);
  }

  doDelete() {
    this.props.onDelete(this.props.id);
  }

  doStop() {
    this.props.onStop(this.props.id);
  }

  render() {
    const style = {
      width: `calc(${100 / this.props.columns}% - 6px)`,
      padding: '3px',
      margin: '3px',
      border: '1px solid #888',
      borderTop: '2px solid #2f75b0',
      height: '150px',
      color: '#000',
      backgroundColor: '#fff',
      position: 'relative',
    };

    const statusIcon = null;

    const buttonStyle = {
      minWidth: 0,
      border: 'none',
      boxShadow: 'none',
      padding: '5px 5px',
    };

    return (
      <div style={style}>
        <div
          style={{
            color: '#333',
            fontStyle: 'italic',
          }}
        >
          {this.props.typeName}
        </div>
        <div
          style={{
            verticalAlign: 'middle',
          }}
        >
          <div
            style={{
              marginTop: '7px',
              whiteSpace: 'nowrap',
              overflowX: 'hidden',
              textOverflow: 'ellipsis',
              fontSize: '1.5em',
            }}
          >
            {this.props.name}
          </div>
        </div>
        {statusIcon}
        <ButtonToolbar bsSize="small" style={{ position: 'absolute', bottom: '5px', right: '5px' }}>
          <ButtonGroup bsSize="small">
            <Button
              title="Preview Connector Results"
              onClick={this.doPreview}
              style={buttonStyle}
            >
              <Glyphicon glyph="eye-open" />
            </Button>
            <Button
              title="Edit Connector Configuration"
              onClick={this.doEdit}
              style={buttonStyle}
            >
              <Glyphicon glyph="pencil" />
            </Button>
            <Button
              title="Start Connector"
              onClick={this.doStart}
              style={buttonStyle}
            >
              <Glyphicon glyph="play" />
            </Button>
            <Button
              title="Schedule Connector"
              onClick={this.doSchedule}
              style={buttonStyle}
            >
              <Glyphicon glyph="time" />
            </Button>
          </ButtonGroup>
          <ButtonGroup bsSize="small">
            <Dropdown id="dropdown-custom-1">
              <Dropdown.Toggle
                title="Additional Options"
                style={buttonStyle}
              >
                <Glyphicon glyph="cog" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <MenuItem onSelect={this.doStop}>
                  <Glyphicon glyph="pause" />
                  Pause
                </MenuItem>
                <MenuItem onSelect={this.doDelete}>
                  <Glyphicon glyph="trash" />
                  Delete
                </MenuItem>
              </Dropdown.Menu>
            </Dropdown>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    );
  }
}
