// @flow

import React from 'react';

/**
 * Header for the Experts page.
 */
export default class ExpertsHeader extends React.Component<void, {}, void> {
  static displayName = 'ExpertsHeader';

  render() {
    return (
      <div className="attivio-expert-hed">
        <h2 className="attivio-expert-hed-title pull-left">Top Experts:</h2>
        <a className="attivio-expert-hed-link pull-right"><strong>{'All Experts\u2026'}</strong></a>
      </div>
    );
  }
}
