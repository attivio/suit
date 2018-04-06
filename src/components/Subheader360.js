// @flow

import React from 'react';

type Subheader360Props = {
  label: string;
};

export default class Subheader360 extends React.Component<void, Subheader360Props, void> {
  static displayName = 'Subheader360';

  render() {
    return <h2 className="attivio-360-subhed">{this.props.label}</h2>;
  }
}
