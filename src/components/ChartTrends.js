// @flow

import React from 'react';

type ChartTrendsProps = {
  /** The change to display, including any ± signs, %, etc… */
  change: string;
  /** If set, this is shown as a positive change. */
  up: boolean;
  /** If set, this is shown as a negative change. */
  down: boolean;
  /** The label to display for changed values. Defaults to “Change” */
  changedLabel: string;
  /** The label to display for unchanged values. Defaults to “Average” */
  unchangedLabel: string;
};

type ChartTrendsDefaultProps = {
  up: boolean;
  down: boolean;
  changedLabel: string;
  unchangedLabel: string;
};

/**
 * Show a change in a value. If the neither the up or down
 * properties are set, then it is displayed as an average
 * value, with no up/down arrows.
 */
export default class ChartTrends extends React.Component<ChartTrendsDefaultProps, ChartTrendsProps, void> {
  static defaultProps = {
    up: false,
    down: false,
    changedLabel: 'Change',
    unchangedLabel: 'Average',
  };

  static displayName = 'ChartTrends';

  render() {
    let classNames = 'attivio-trend';
    let label = this.props.unchangedLabel;
    let icon = '';

    if (this.props.up) {
      classNames = 'attivio-trend attivio-trend-up';
      icon = <span className="attivio-icon-trend-up" />;
      label = this.props.changedLabel;
    } else if (this.props.down) {
      classNames = 'attivio-trend attivio-trend-down';
      icon = <span className="attivio-icon-trend-down" />;
      label = this.props.changedLabel;
    }

    return (
      <h3 className={classNames}>
        {icon}
        {this.props.change}
        {' '}
        <span className="attivio-trend-label">{label}</span>
      </h3>
    );
  }
}
