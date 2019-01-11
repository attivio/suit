// @flow
import React from 'react';
import type { Node } from 'react';

type SeparatedListProps = {
  /** The contents of the SeparatedList component to be rendered. */
  children: Node;
};

/**
 * Render a list of items with a separator bar in between them.
 */
export default class SeparatedList extends React.Component<SeparatedListProps> {
  static displayName = 'SeparatedList';

  render() {
    return (
      <ul className="attivio-list-inline list-inline">
        {this.props.children}
      </ul>
    );
  }
}
