// @flow

import React from 'react';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';

type DisclosureTriangleProps = {
  open: boolean;
  onToggle: (open: boolean) => void;
  style: any;
};

export default class DisclosureTriangle extends React.Component<void, DisclosureTriangleProps, void> {
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
