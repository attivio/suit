// @flow

import React, { Children } from 'react';

type CodeProps = {
  /** The contents of the Code tag can be whatever you like. */
  /* $FlowFixMe This comment suppresses an error found when upgrading Flow to
   * v0.107.0. To view the error, delete this comment and run Flow. */
  children: Children;
};

/**
 * Component to show source code in a traditional, monospaced font etc.
 */
export default class Code extends React.Component<CodeProps, void> {
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
