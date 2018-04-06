// @flow

import React from 'react';

type Header360Props = {
  /** The label to show. */
  label: string;
};

/**
 * Show the supplied label in a format for use as the header on a 360° page.
 */
export default class Header360 extends React.Component<void, Header360Props, void> {
  static displayName = 'Header360';

  render() {
    return <h1 className="attivio-360-hed">{this.props.label}</h1>;
  }
}
