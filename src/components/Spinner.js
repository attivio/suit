// @flow

import React from 'react';
import Configurable from './Configurable';

type SpinnerProps = {
  spinner?: string;
  spinnerHeight?: string;
  spinnerWidth?: string;
  spinnerLabel?: string;
};

type SpinnerDefaultProps = {
  spinner?: string;
  spinnerHeight?: string;
  spinnerWidth?: string;
  spinnerLabel?: string;
};

class Spinner extends React.Component<SpinnerDefaultProps, SpinnerProps, void> {
  static defaultProps = {
    spinner: 'img/spinner.gif',
    spinnerHeight: '50%',
    spinnerWidth: '50%',
    spinnerLabel: '',
  };

  render() {
    const label = this.props.spinnerLabel ? (
      <div>
        <br />
        <b>{this.props.spinnerLabel}</b>
      </div>
    ) : (
        ''
      );
    return (
      <div className="attivio-spinner">
        <img src={this.props.spinner} alt="Spinner" width={this.props.spinnerWidth} height={this.props.spinnerHeight} />
        {label}
      </div>
    );
  }
}

export default Configurable(Spinner);
