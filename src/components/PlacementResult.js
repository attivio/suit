// @flow
import React from 'react';

import Card from './Card';

type PlacementResultProps = {
  /** The address of the link. Optional. */
  linkUrl: string | null;
  /** The anchortext of the link. Optional. */
  linkText: string | null;
  /** The address of an image to display. Optional. */
  imageUrl: string | null;
  /** The raw html markup to display. Optional. */
  markup: string | null;
}

type PlacementResultDefaultProps = {
  linkUrl: string | null;
  linkText: string | null;
  imageUrl: string | null;
  markup: string | null;
}

/**
 * The display card for a Placement query result.
 */
export default class PlacementResult extends React.Component<PlacementResultDefaultProps, PlacementResultProps, void> {
  static defaultProps = {
    linkUrl: null,
    linkText: null,
    imageUrl: null,
    markup: null,
  }

  static displayName = 'PlacementResult';

  render() {
    if (this.props.markup) {
      return (
        <Card style={{ marginBottom: '10px' }}>
          {
            <div dangerouslySetInnerHTML={{ __html: this.props.markup }} /> // eslint-disable-line react/no-danger
          }
        </Card>
      );
    }
    const rawText = this.props.linkText || '';
    const text = <h4>{rawText}</h4>;
    const contents = this.props.imageUrl ? (
      <div>
        <img
          src={this.props.imageUrl}
          title={rawText}
          alt={rawText}
        />
        {text}
      </div>
    ) : text;
    return (
      <Card style={{ marginBottom: '10px' }}>
        {this.props.linkUrl ? (
          <a href={this.props.linkUrl} >
            {contents}
          </a>
        ) : contents}
      </Card>
    );
  }
}
