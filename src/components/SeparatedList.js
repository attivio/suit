// @flow
import React from 'react';
import type { Children } from 'react';

type SeparatedListProps = {
  /** The contents of the SeparatedList component to be rendered. */
  children: Children;
};

/**
 * Render a list of items with a separater bar in between them.
 */
export default class SeparatedList extends React.Component<void, SeparatedListProps, void> {
  static displayName = 'SeparatedList';

  render() {
    return (
      <ul className="attivio-list-inline list-inline">
        {this.props.children}
      </ul>
    );
  }
}
