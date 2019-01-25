// @flow

import React from 'react';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';

type DisclosureTriangleProps = {
  /**
   * If set, then the triangle is drawn in the downward, or open, direction.
   * Otherwise it's drawn pointing to the right.
   */
  open: boolean;
  /**
   * Callback used when the user toggles the button.
   */
  onToggle: (open: boolean) => void;
  /**
   * Any style information you want on the icon (you can style it as a font).
   * By default, it will be black, in the current text size.
   */
  style: any;
};

type DisclosureTriangleDefaultProps = {
  open: boolean;
  style: any;
};

/**
 * A component to render a toggle button in the shape of a triangle.
 */
export default class DisclosureTriangle extends React.Component<DisclosureTriangleDefaultProps, DisclosureTriangleProps, void> {
  static defaultProps = {
    open: false,
    style: {},
  };

  static displayName = 'DisclosureTriangle';

  constructor(props: DisclosureTriangleProps) {
    super(props);
    (this: any).doToggle = this.doToggle.bind(this);
  }

  link: ?HTMLAnchorElement;

  doToggle() {
    this.props.onToggle(!this.props.open);
    if (this.link) {
      this.link.blur();
    }
  }

  render() {
    const glyph = this.props.open ? 'triangle-bottom' : 'triangle-right';
    const style = Object.assign({}, { textDecoration: 'none', color: '#000' }, this.props.style);

    return (
      <a
        onClick={this.doToggle}
        role="button"
        tabIndex={0}
        style={style}
        ref={(c) => {
          this.link = c;
        }}
      >
        <Glyphicon glyph={glyph} />
      </a>
    );
  }
}
