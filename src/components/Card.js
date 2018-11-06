// @flow

import React, { Children } from 'react';

type CardProps = {
  /** The title of the card. Optional—if not set, none will be shown. */
  title: string | null;
  /** If set, the card won't have a border around it. */
  borderless: boolean;
  /** Any custom style information needed for the card overall. Optional. */
  style: any;
  /** Any CSS classes you want applied to the card overall. Optional. */
  className: string | null;
  /** Any CSS classes you want applied to the card's title. Optional. */
  titleClassName: string | null;
  /** This defines the CSS style for title, if any. Optional. */
  titleStyle: any;
  /** The contents to display inside the card. */
  children: Children;
};

type CardDefaultProps = {
  title: string | null;
  borderless: boolean;
  className: string | null;
  style: any;
  titleClassName: string | null;
  titleStyle: any;
};

/**
 * A card is just a bordered &lt;div&gt; to wrap a set of
 * related elements.
 */
export default class Card extends React.Component<CardDefaultProps, CardProps, void> {
  static defaultProps = {
    borderless: false,
    title: null,
    className: null,
    style: {},
    titleClassName: null,
    titleStyle: {},
  };

  static displayName = 'Card';

  render() {
    const cardClassName = this.props.borderless ? 'attivio-card attivio-card-borderless' : 'attivio-card';
    const className = `${cardClassName} ${this.props.className ? this.props.className : ''}`;

    const titleClassName = `${this.props.titleStyle ? this.props.titleStyle : ''} attivio-card-title`; // 'custom-title-style'
    const title = this.props.title ? <h2 className={titleClassName} style={this.props.titleStyle}>{this.props.title}</h2> : '';

    return (
      <div className={className} style={this.props.style}>
        {title}
        {this.props.children}
      </div>
    );
  }
}
