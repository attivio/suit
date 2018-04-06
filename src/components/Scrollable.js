// @flow

import React from 'react';
import type { Children } from 'react';

type ScrollableProps = {
  /**
   * The style to use foer the outer div. Either the style or the individual
   * size parameters must be set or the inner div won't scroll. For vertical
   * scrolling, the height must be set, for horizontal scrolling, the width
   * must be.
   */
  style: any;
  /**
   * The height to use for the outer div. If set, this overrides the height value
   * in the style property.
   */
  height: string | null;
  /**
   * The width to use for the outer div. If set, this overrides the width value
   * in the style property.
   */
  width: string | null;
  /**
   * Whether the Scrollable should work in the vertical direction.
   * Defaults to true.
   */
  vertical: boolean;
  /**
   * Whether the Scrollable should work in the horizontal direction.
   * Defaults to false.
   */
  horizontal: boolean;
  /**
   * If set, the scrollbars will always appear. If not, they will
   * only be there if the contents are large enough to warrant scrolling.
   */
  force: boolean;
  /**
   * The contents that will be scrolled.
   */
  children: Children;
};

type ScrollableDefaultProps = {
  style: any;
  vertical: boolean;
  horizontal: boolean;
  force: boolean;
  height: string | null;
  width: string | null;
};

/**
 * A scrollable contianer for other components. If the size of the children is large enough that
 * they won't fit, scroll bars are enabled to let the user scroll to see the rest of the contents.
 */
export default class Scrollable extends React.Component<ScrollableDefaultProps, ScrollableProps, void> {
  static defaultProps = {
    style: {},
    height: null,
    width: null,
    vertical: true,
    horizontal: false,
    force: false,
  };

  static displayName = 'Scrollable';

  render() {
    const overflowType = this.props.force ? 'scroll' : 'auto';
    const outerStyle = Object.assign({}, this.props.style);
    if (this.props.height) {
      outerStyle.height = this.props.height;
    }
    if (this.props.width) {
      outerStyle.width = this.props.width;
    }
    if (this.props.vertical) {
      outerStyle.overflowX = overflowType;
    }
    if (this.props.horizontal) {
      outerStyle.overflowY = overflowType;
    }

    return (
      <div style={outerStyle}>
        {this.props.children}
      </div>
    );
  }
}
