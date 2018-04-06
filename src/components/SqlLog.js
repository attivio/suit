// @flow

import React from 'react';

type SqlLogProps = {
  /** An array of the log entires, one line each. */
  lines: Array<string>;
  /**
   * A label to display at the top of the log list. Defaults to "Search Query"
   * which is what the query analytics functionality uses.
   */
  label: string;
};

type SqlLogDefaultProps = {
  label: string;
};

/**
 * Shows a list of log entries, with alternating backgrounds like old-fashioned
 * green-bar printer paper.
 */
export default class SqlLog extends React.Component<SqlLogDefaultProps, SqlLogProps, void> {
  static defaultProps = {
    label: 'Search Query',
  };

  static displayName = 'SqlLog';

  render() {
    const lines = this.props.lines.map((line, index) => {
      const key = `${index}: ${line}`;
      return (
        <tr key={key}>
          <td>
            <code className="attivio-code">
              {line}
            </code>
          </td>
        </tr>
      );
    });

    return (
      <table className="table table-striped attivio-table attivio-table-card attivio-table-card-detail">
        <thead>
          <tr>
            <th>{this.props.label}</th>
          </tr>
        </thead>
        <tbody>
          {lines}
        </tbody>
      </table>
    );
  }
}
