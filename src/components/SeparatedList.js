// @flow
import * as React from 'react';
/* $FlowFixMe This comment suppresses an error found when upgrading Flow to
 * v0.107.0. To view the error, delete this comment and run Flow. */
import type { Children } from 'react';

type SeparatedListProps = {
  /** The contents of the SeparatedList component to be rendered. */
  children: Children;
};

/**
 * Render a list of items with a separator bar in between them.
 */
export default class SeparatedList extends React.Component<SeparatedListProps, void> {
  static displayName = 'SeparatedList';

  render() {
    return (
      <ul className="attivio-list-inline list-inline">
        {this.props.children}
      </ul>
    );
  }
}
