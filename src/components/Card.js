// @flow

import React from 'react';

type CardProps = {
  /** The title of the card. Optional—if not set, none will be shown. */
  title: string | null;
  /** Optional subtitle of the card */
  subtitle?: any;
  /** If set, the card won't have a border around it. */
  borderless: boolean;
  children: React.Children;
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
  subtitle: null;
};

/**
 * A card is just a bordered &lt;div&gt; to wrap a set of
 * related elements.
 */
export default class Card extends React.Component<CardDefaultProps, CardProps, void> {
  static defaultProps = {
    borderless: false,
    title: null,
    subtitle: null,
    style: {},
    className: '',
  };

  static displayName = 'Card';

  render() {
    const { borderless, className, title, subtitle, style, children } = this.props;
    const cardClassName = borderless ? 'attivio-card attivio-card-borderless' : 'attivio-card';
    const finalClassName = `${cardClassName} ${className}`;
    return (
      <div className={finalClassName} style={style}>
        {title ? (
          <h2 className="attivio-card-title">
            {this.props.title}
          </h2>
        ) : ''}
        {subtitle ? (
          <p className="attivio-analytics-overlay-desc">
            {subtitle}
          </p>
        ) : null}
        {children}
      </div>
    );
  }
}
