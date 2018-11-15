// @flow

import React from 'react';

type ExpertsHeaderProps = {
  /**
   * The callback used when the user clicks the "All Experts" link in the header.
   * Optional; if not set, the link won't be shown,
   */
  doAllExperts: null | () => void;
};

type ExpertsHeaderDefaultProps = {
  doAllExperts: null | () => void;
};

/**
 * Header for the Experts page.
 */
export default class ExpertsHeader extends React.Component<ExpertsHeaderDefaultProps, ExpertsHeaderProps, void> {
  static defaultProps = {
    doAllExperts: null,
  };

  static displayName = 'ExpertsHeader';

  render() {
    const all = this.props.doAllExperts ? (
      <a
        className="attivio-expert-hed-link pull-right"
        onClick={this.props.doAllExperts}
        role="button"
        tabIndex={0}
      >
        <strong>{'All Experts\u2026'}</strong>
      </a>
    ) : null;

    return (
      <div className="attivio-expert-hed">
        <h2 className="attivio-expert-hed-title pull-left">Top Experts:</h2>
        {all}
      </div>
    );
  }
}
