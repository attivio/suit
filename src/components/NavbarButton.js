// @flow
import React from 'react';

import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

type NavbarButtonProps = {
  /** The button's label. Optional—if not set, the button will only have an icon. */
  label: string | null;
  /**
   * The icon to display for the button. This should be the name of an icon in the
   * set of Glyphicons halflings (see here: )
   * Optional—if not set, the button will only have a text label. */
  icon: string | null;
  /** The callback for when the button is clicked. */
  onClick: () => void;
};

type NavbarButtonDefaultProps = {
  label: string | null;
  icon: string | null;
};

/**
 * A button to live in the navbar. Can have either an icon or a text label or both.
 * (It needs to at least have one or the other, though.) Clicking the butotn calls
 * the onClick handler.
 */
export default class NavbarButton extends React.Component<NavbarButtonDefaultProps, NavbarButtonProps, void> {
  static defaultProps = {
    label: '',
    icon: null,
  };

  static displayName = 'NavbarButton';

  constructor(props: NavbarButtonProps) {
    super(props);
    (this: any).onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onClick();
  }

  render() {
    const icon = this.props.icon ? (
      <span>
        <Glyphicon
          glyph={this.props.icon}
          style={{
            paddingRight: this.props.label ? '8px' : 0,
          }}
        />
      </span>
    ) : null;

    return (
      <Button onClick={this.onClick} {...this.props}>
        {icon}
        {this.props.label}
      </Button>
    );
  }
}
