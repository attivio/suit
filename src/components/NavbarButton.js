// @flow
import React from 'react';

import Button from 'react-bootstrap/lib/Button';

type NavbarButtonProps = {
  /** The button's label. Optional—if not set, the button will only have an icon. */
  label: string;
  /** The icon to display for the button. Optional—if not set, the button will only have a text label. */
  icon: string;
  /** The callback for when the button is clicked. */
  onClick: () => void;
};

type NavbarButtonDefaultProps = {
  label: string;
  icon: string;
};

/**
 * A button to live in the navbar. Can have either an icon or a text label or both.
 * (It needs to at least have one or the other, though.) Clicking the butotn calls
 * the onClick handler.
 */
export default class NavbarButton extends React.Component<NavbarButtonDefaultProps, NavbarButtonProps, void> {
  static defaultProps = {
    label: '',
    icon: '',
  };

  constructor(props: NavbarButtonProps) {
    super(props);
    (this: any).onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onClick();
  }

  render() {
    return <Button onClick={this.onClick} {...this.props}>{this.props.label} {this.props.icon}</Button>;
  }
}
