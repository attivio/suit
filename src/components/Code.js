// @flow

import React from 'react';
import type { Node } from 'react';

type CodeProps = {
  /** The contents of the Code tag can be whatever you like. */
  children: Node;
};

/**
 * Component to show source code in a traditional, monospaced font etc.
 */
export default class Code extends React.Component<CodeProps> {
  static displayName = 'Code';

  render() {
    return (
      <code className="attivio-code" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <pre>
          {this.props.children}
        </pre>
      </code>
    );
  }
}
