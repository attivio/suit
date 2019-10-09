// @flow

import React, { Children } from 'react';

import Dropdown from 'react-bootstrap/lib/Dropdown';
import Toggle from './Toggle';

type DropdownButtonProps = {
  /** An optional custom className for the dropdown button */
  buttonClassName: ?string;
  /** The DOM element's id property */
  id: string;
  /** The title to display on the un-opened dropdown button */
  title: string;
  /** The menu items to display when the dropdown is opened */
  children: Children;
  /** An optional custom className for the button title */
  titleClassName: ?string;
  /** The callback to run when the dropdown is opened */
  onOpen: (e: Event) => void;
  /** The callback to run when a menu item is selected */
  onSelect: (value: any, e: Event) => void;
  /** An optional custom className for the dropdown options */
  optionsClassName: ?string;
};

/**
 * A button that displays a menu below it when clicked.
 */
export default class DropdownButton extends React.Component<void, DropdownButtonProps, void> {
  static displayName = 'DropdownButton';

  render() {
    const { titleClassName = '', buttonClassName = '', optionsClassName = '' } = this.props;

    return (
      <Dropdown
        id={this.props.id}
        className={buttonClassName || 'attivio-dropdown'}
        style={{ verticalAlign: 'unset' }}
      >
        <Toggle bsRole="toggle" onClick={this.props.onOpen} customClassName={titleClassName}>
          {this.props.title}
        </Toggle>
        <Dropdown.Menu bsRole="menu" onSelect={this.props.onSelect} className={optionsClassName}>
          {this.props.children}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
