// @flow

import React from 'react';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

type ListEditorProps = {
  /**
   * A tooltip to display for the add (plus) button.
   */
  addButtonTooltip: string;
  /**
   * The list of items that is being edited. The type will depend on the caller.
   */
  items: Array<*>,
  /**
   * Render an item from the list as a string so it can be displayed.
   */
  itemAsString: (item: any) => string;
  /**
   * Render the control for adding a new item to the list.
   */
  renderControl: () => React$Element<*>;
  /**
   * Callback that is called when the list of items has changed so the parent
   * knows and can update itself.
   */
  updateList: (items: Array<*>) => void;
  /**
   * Get the object representing the current value of the control so that it can be
   * added to the list. Return null if the current value isn't valid and cannot
   * theeefore be added.
   */
  getValue: () => any;
  /**
   * Callback that is called to reset the control after an item has been added to the list.
   */
  resetControl: () => any;
};

export default class ListEditor extends React.Component<void, ListEditorProps, void> {
  constructor(props: ListEditorProps) {
    super(props);
    (this: any).doAdd = this.doAdd.bind(this);
    (this: any).doRemove = this.doRemove.bind(this);
  }

  doAdd() {
    const newItem = this.props.getValue();
    if (newItem) {
      const items = this.props.items.slice();
      items.push(newItem);
      this.props.resetControl();
      this.props.updateList(items);
    }
  }

  doRemove(index: number) {
    const items = this.props.items.slice();
    items.splice(index, 1);
    this.props.updateList(items);
  }

  render() {
    let list;
    if (this.props.items && this.props.items.length > 0) {
      const listItemStyle = {
        marginRight: '8px',
        whiteSpace: 'nowrap',
      };
      list = this.props.items.map((item, index) => {
        const itemString = this.props.itemAsString(item);
        return (
          <span style={listItemStyle} key={itemString}>
            {itemString}
            <a
              onClick={() => {
                this.doRemove(index);
              }}
              role="button"
              tabIndex={0}
              title="Remove"
              style={{
                display: 'inline-block',
              }}
            >
              <img src="img/delete.png" style={{ paddingLeft: '4px' }} alt="Delete" />
            </a>
          </span>
        );
      });
    }
    return (
      <div>
        <div>
          <div
            style={{
              width: 'calc(100% - 20px)',
              display: 'inline-block',
              marginRight: '6px',
            }}
          >
            {this.props.renderControl()}
          </div>
          <a
            onClick={this.doAdd}
            role="button"
            tabIndex={0}
            title={this.props.addButtonTooltip}
          >
            <Glyphicon glyph="plus" />
          </a>
        </div>
        <div style={{ marginTop: '5px' }}>
          {list}
        </div>
      </div>
    );
  }
}
