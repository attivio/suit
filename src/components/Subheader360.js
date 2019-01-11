// @flow

import React from 'react';

type Subheader360Props = {
  label: string;
};

export default class Subheader360 extends React.Component<Subheader360Props> {
  static displayName = 'Subheader360';

  render() {
    return <h2 className="attivio-360-subhed">{this.props.label}</h2>;
  }
}
