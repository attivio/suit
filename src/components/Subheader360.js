// @flow

import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

type Subheader360Props = {
  /**
   * The text that should be used for the subheader
   */
  label: string;
  /**
   * If true, shows an information icon next to the subheader
   */
  description: boolean;
  /**
   * The text that should be shown in the tooltip when the information icon is hovered over
   */
  descriptionText?: string;
};

type Subheader360DefaultProps = {
  description: boolean;
  descriptionText?: string;
};

export default class Subheader360 extends React.Component<Subheader360DefaultProps, Subheader360Props, void> {
  static defaultProps = {
    description: false,
    descriptionText: 'No description text provided',
  };

  static displayName = 'Subheader360';

  render() {
    const subheader = this.props.description ?
      (
        <div>
          <h2 className="attivio-360-subhed">
            {this.props.label}
            <OverlayTrigger overlay={<Tooltip> {this.props.descriptionText} </Tooltip>}>
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
