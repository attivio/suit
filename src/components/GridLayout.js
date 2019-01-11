// @flow

import React from 'react';
import type { Node } from 'react';

import Scrollable from './Scrollable';

type GridLayoutProps = {
  /**
   * The contents that will be laid out.
   */
  children: Node;
};

export default class GridLayout extends React.Component<GridLayoutProps> {
  static displayName = 'GridLayout';

  render() {
    return (
      <Scrollable style={{ height: '100%' }}>
        <div
          style={{
            width: '100%',
            padding: 0,
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
        >
          {this.props.children}
        </div>
      </Scrollable>
    );
  }
}
