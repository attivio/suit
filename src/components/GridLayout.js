// @flow

import React from 'react';
import type { Children } from 'react';

import Scrollable from './Scrollable';

type GridLayoutProps = {
  children: Children;
};

export default class GridLayout extends React.Component<void, GridLayoutProps, void> {
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
