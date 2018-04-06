// @flow
import React from 'react';

import Checkbox from 'react-bootstrap/lib/Checkbox';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';

/**
 * Class for defining each individual menu item to be
 * displayed in the Menu component.
 */
export class MenuItemDef {
  /** The label displayed to the user */
  label: string;
  /**
   * The value returned to the code—values <em>must</em> be
   * unique across all MenuItemDefs passed as the items parameter
   */
  value: string;
  /** If true, this item shows up as a divider */
  divider: boolean;
  /**
   * If true, this item shows up disabled (dividers must still
   * have a value set so they can be deemed unique by React)
   */
  disabled: boolean;
  /**
   * If true, this item is an un-clickable header (headers must
   * still have a value set so they can be deemed unique by React)
   */
  header: boolean;
  /**
   * If set, then a span with a custom icon class (for example,
   * "'attivio-icon-sort-descending" will be added after the
   * menu item's label.
   */
  customIconClass: string;

  constructor(label: string, value: string) {
    this.label = label;
    this.value = value;
    this.divider = false;
    this.disabled = false;
    this.header = false;
  }
}

type MenuProps = {
  /**
   * The label to display for the menu (should include a
   * colon if you want one to be shown).
   */
  label: string;
  /**
   * The <em>value</em> of the currently selected item or items.
   * If set, then there must be a menu item whose value matches
   * this/these. If multiSelect is set, then this must be an
   * array.
   */
  selection: Array<string> | string | null;
  /** The list of items to display in the menu. */
  items: Array<MenuItemDef>;
  /**
   * This callback is called when the user chooses an item in
   * the menu. The item's MenuItemDef is passed to it.
   */
  onSelect: (item: MenuItemDef) => void;
  /** If set, the menu is aligned to the right. */
  right: boolean;
  /**
   * If set, the menu can have multiple values selected at the
   * same time.
   */
  multiSelect: boolean;
  /**
   * If set, then the multi-select menu will have a links to
   * select all or none at the top. Only applies if multiSelect
   * is also set.
   */
  selectAllNone: null | (selectAll: boolean) => void;
  /**
   * If set, the menu will be shown in a "block" style, taking up
   * the width of its parent. In addition, when a block-style
   * menu has a selection, it is shown with a yellow dot to the left
   * of the label.
   */
  block: boolean;
  /**
   * If there is no selection and this property is set, it is shown
   * instead of the standard "label" property.
   */
  promptLabel: string | null;
  /**
   * For a multiSelect menmu, this is the label to show when all
   * of the items have been selected. Defaults to "All" but you
   * can override this if your "All" has a different meaning, such
   * as "Show the average instead of an aggregate value."
   */
  allLabel: string | null;
  /**
   * If you want the menu to be fixed to a set width, set this value
   * to the number of pixels you want the css style to map the menu's
   * width to. Must be greater than 40 if set.
   */
  width: number | null;
};

type MenuDefaultProps = {
  selection: Array<string> | string | null;
  right: boolean;
  multiSelect: boolean;
  selectAllNone: null | (selectAll: boolean) => void;
  block: boolean;
  promptLabel: string | null;
  allLabel: string | null;
  maxLabelCharacters: number | null;
  width: number | null;
};

export default class Menu extends React.Component<MenuDefaultProps, MenuProps, void> {
  static defaultProps = {
    selection: null,
    right: false,
    multiSelect: false,
    selectAllNone: null,
    block: false,
    promptLabel: null,
    allLabel: 'All',
    maxLabelCharacters: null,
    width: null,
  };

  static displayName = 'Menu';

  static MenuItemDef;

  constructor(props: MenuProps) {
    super(props);
    (this: any).onSelect = this.onSelect.bind(this);
    (this: any).selectAll = this.selectAll.bind(this);
    (this: any).selectNone = this.selectNone.bind(this);
  }

  onSelect(eventKey: any) {
    const selectedItem = this.itemForValue((eventKey: string));
    if (selectedItem) {
      this.props.onSelect(selectedItem);
    }
  }

  /**
   * Get the MenuItem whose value is passed in.
   *
   * @param {*} value
   * @returns the corresponding item or null if not found
   */
  itemForValue(value: string | void): MenuItemDef | typeof undefined {
    let result;
    if (value) {
      result = this.props.items.find((item) => {
        return item.value === value;
      });
    }
    return result;
  }

  /**
   * Get the label for the MenuItem whose value is passed in.
   * The result may be a simple string or a JSX item.
   */
  labelForValue(value: string | void) {
    let valueItem;
    if (value) {
      valueItem = this.props.items.find((item) => {
        return item.value === value;
      });
    }
    if (valueItem) {
      if (valueItem.customIconClass) {
        return <span>{valueItem.label} <span className={valueItem.customIconClass} /></span>;
      }
      return valueItem.label;
    }
    return null;
  }

  selectAllLink: ?HTMLAnchorElement;
  selectNoneLink: ?HTMLAnchorElement;

  selectAll() {
    if (this.props.selectAllNone) {
      this.props.selectAllNone(true);
    }
    if (this.selectAllLink) {
      this.selectAllLink.blur();
    }
  }

  selectNone() {
    if (this.props.selectAllNone) {
      this.props.selectAllNone(false);
    }
    if (this.selectNoneLink) {
      this.selectNoneLink.blur();
    }
  }

  /**
   * Get the label to show for the current selection, if any.
   * For multiple selections, shows an abbreviated version
   * if there are two many items.
   */
  calcSelectionLabel() {
    let result: any = '';
    if (typeof this.props.selection === 'string') {
      result = this.labelForValue((this.props.selection: string));
    } else if (this.props.selection) {
      // Must be an array now
      if (typeof this.props.selection !== 'string') {
        const selectionArray = (this.props.selection: Array<string>);
        if (selectionArray.length === 1) {
          result = this.labelForValue(selectionArray[0]);
        } else if (selectionArray.length === this.props.items.length) {
          // All!
          result = this.props.allLabel;
        } else if (selectionArray.length > 1) {
          result = `${selectionArray.length} selected`;
        }
      // If the array is empty, we fall through
      }
    }
    if (!result) {
      result = <span style={{ fontStyle: 'italic' }}>None</span>;
    }
    return result;
  }

  /**
   * Determine whether the menu item is selected. If we're
   * a multi-select menu, it needs to be in the selection
   * array. If not, it needs to be the single string value
   * of selection. If selection is not set, then we always
   * return false.
   */
  isSelected(item: MenuItemDef): boolean {
    if (this.props.selection) {
      if (this.props.multiSelect && this.props.selection && typeof this.props.selection !== 'string') {
        const selectionArray = (this.props.selection: Array<string>);
        return selectionArray.includes(item.value);
      }
      return typeof this.props.selection === 'string' && this.props.selection === item.value;
    }
    return false;
  }

  /**
   * Generate the label to show inside the button itself.
   */
  calcButtonLabel() {
    if (this.props.promptLabel && !this.props.selection) {
      // If the user wants a prompt and there's no current selection,
      // show the prompt.
      return this.props.promptLabel;
    }
    const selectionLabel = this.calcSelectionLabel();

    const buttonLabelPrefix = this.props.block && this.props.selection ?
      (
        <span>
          <span
            className="attivio-model-dot"
            style={{ backgroundColor: '#f1c541' }}
          />
          {' '}
        </span>
      ) : null;

    const buttonLabel = (
      <span>
        {buttonLabelPrefix}
        {this.props.label}
        {' '}
        <b>
          {selectionLabel}
        </b>
      </span>
    );
    return buttonLabel;
  }

  render() {
    const buttonLabel = this.calcButtonLabel();
    const menuItems = this.props.items.map((item) => {
      const selected = this.isSelected(item);
      let itemLabel = item.label;
      if (item.customIconClass) {
        itemLabel = <span>{item.label} <span className={item.customIconClass} /></span>;
      }
      if (this.props.multiSelect) {
        return (
          <MenuItem
            eventKey={item.value}
            key={item.value}
            className="checkbox"
            componentClass="div"
          >
            <Checkbox checked={selected}>
              {item.label}
            </Checkbox>
          </MenuItem>
        );
      }
      if (item.divider) {
        return <MenuItem divider key={item.value} />;
      }
      if (item.header) {
        return <MenuItem header key={item.value}>{itemLabel}</MenuItem>;
      }
      // Normal menu item
      let label;
      if (this.props.multiSelect) {
        label = <Checkbox checked={selected}>{itemLabel}</Checkbox>;
      } else {
        label = selected ? <b>{itemLabel}</b> : itemLabel;
      }
      return <MenuItem eventKey={item.value} key={item.value}>{label}</MenuItem>;
    });

    const menuPrefix = this.props.multiSelect && this.props.selectAllNone ?
      (
        <MenuItem
          eventKey="allNone"
          key="allNone"
          className="checkbox"
          componentClass="div"
        >
          <ul className="attivio-dropdown-toolbar attivio-list-inline list-inline">
            <li>
              Check: <a onClick={this.selectAll} role="button" tabIndex={0} ref={(c) => { this.selectAllLink = c; }}>All</a>
            </li>
            <li>
              <a onClick={this.selectNone} role="button" tabIndex={0} ref={(c) => { this.selectNoneLink = c; }}>None</a>
            </li>
          </ul>
        </MenuItem>
      ) : null;

    const classNames = this.props.block ? 'attivio-dropdown attivio-dropdown-block' : 'attivio-dropdown';

    return (
      <Dropdown
        id="myDropdown"
        className={classNames}
        onSelect={this.onSelect}
        componentClass="div"
        pullRight={this.props.right}
        style={this.props.width ? { width: `${this.props.width}px` } : {}}
      >
        <Dropdown.Toggle
          noCaret
          useAnchor
          className="attivio-smalltoolbar-btn"
          bsClass="attivio-smalltoolbar-btn"
          style={this.props.width ? { width: `${this.props.width}px` } : {}}
        >
          <div
            style={this.props.width ? {
              // adjusted to fit the carot
              width: `${this.props.width - 40}px`,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              float: 'left',
            } : { float: 'left' }}
          >
            {buttonLabel}
          </div>
          <span className="attivio-icon-arrow-down" />
        </Dropdown.Toggle>
        <Dropdown.Menu
          style={{
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          {menuPrefix}
          {menuItems}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

Menu.MenuItemDef = MenuItemDef;
