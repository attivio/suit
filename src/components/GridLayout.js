// @flow

import * as React from 'react';
/* $FlowFixMe This comment suppresses an error found when upgrading Flow to
 * v0.107.0. To view the error, delete this comment and run Flow. */
import type { Children } from 'react';

import Scrollable from './Scrollable';

type GridLayoutProps = {
  /**
   * Whether the grid should be laid out and scrollable
   * in the horizontal direction (in a single row)
   * Defaults to false.
   */
  oneRow: boolean;
  /**
   * The contents that will be laid out.
   */
  children: Children;
};

export default class GridLayout extends React.Component<GridLayoutProps, void> {
  static defaultProps = {
    oneRow: false,
  };

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
