// @flow

import React, { Children } from 'react';

type CardProps = {
  /** The title of the card. Optional—if not set, none will be shown. */
  title: string | null;
  /** If set, the card won't have a border around it. */
  borderless: boolean;
  children: Children;
  /** Any custom style information needed */
  style: any;
  /** Any classes you want applied to the card. */
  className: string;
};

type CardDefaultProps = {
  title: string | null;
  borderless: boolean;
  style: any;
  className: string;
};

/**
 * A card is just a bordered &lt;div&gt; to wrap a set of
 * related elements.
 */
export default class Card extends React.Component<CardDefaultProps, CardProps, void> {
  static defaultProps = {
    borderless: false,
    title: null,
    style: {},
    className: '',
  };

  static displayName = 'Card';

  render() {
    const cardClassName = this.props.borderless ? 'attivio-card attivio-card-borderless' : 'attivio-card';
    const className = `${cardClassName} ${this.props.className}`;
    const title = this.props.title ? <h2 className="attivio-card-title">{this.props.title}</h2> : '';
    return (
      <div className={className} style={this.props.style}>
        {title}
        {this.props.children}
      </div>
    );
  }
}
