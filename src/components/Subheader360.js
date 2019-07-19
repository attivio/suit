// @flow

import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

type Subheader360Props = {
  /**
   * The text that should be used for the subheader
   */
  label: string;
  /**
   * Optional tooltip string. If provided, an infomation icon will be displayed next to
   * the subheader with a tooltip containing this string. 
   */
  tooltip?: string;
};

type Subheader360DefaultProps = {
  tooltip?: string;
};

export default class Subheader360 extends React.Component<Subheader360DefaultProps, Subheader360Props, void> {
  static defaultProps = {
    tooltip: undefined,
  };

  static displayName = 'Subheader360';

  render() {
    const subheader = this.props.tooltip ?
      (
        <div>
          <h2 className="attivio-360-subhed">
            {this.props.label}
            <OverlayTrigger overlay={<Tooltip> {this.props.tooltip} </Tooltip>}>
              <img src="img/info.png" alt="Info" style={{ width: '1em', margin: '0em 0em 0em 0.5em' }} />
            </OverlayTrigger>
          </h2>
        </div>
      ) : (
        <h2 className="attivio-360-subhed">{this.props.label}</h2>
      );

    return subheader;
  }
}
