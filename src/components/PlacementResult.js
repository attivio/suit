// @flow
import * as React from 'react';
import PropTypes from 'prop-types';

import Card from './Card';

type PlacementResultProps = {
  /** The address of the link. Optional. */
  linkUrl: string | null;
  /** The text to show as the link. Optional. */
  linkText: string | null;
  /** The address of an image to display as the link. Optional. */
  imageUrl: string | null;
  /** The raw html markup to display. Optional. */
  markup: string | null;
}

/**
 * The display card for a Placement query result.
 */
export default class PlacementResult extends React.Component<PlacementResultProps, void> {
  static defaultProps = {
    linkUrl: null,
    linkText: null,
    imageUrl: null,
    markup: null,
  }

  static displayName = 'PlacementResult';

  static contextTypes = {
    searcher: PropTypes.any,
  };

  onPromotionClick = () => {
    const { linkUrl, linkText, imageUrl } = this.props;
    const searcher = this.context.searcher;
    if (!searcher) {
      return;
    }
    // The docId for the signal is of the format:
    // '{Display Text} - {Destination Link}' -- if the promotion is Link
    // '{Image URL} - {Destination Link}' -- if the promotion is Image
    // The docOrdinal for link promotion is 1 and image promotion is 2
    const signalDocId = imageUrl ? `${imageUrl} - ${linkUrl || ''}` : `${linkText || ''} - ${linkUrl || ''}`;
    const signalDocOrdinal = imageUrl ? 2 : 1;
    searcher.addPromotionSignal(signalDocId, signalDocOrdinal);
  }

  renderMarkupIframe() {
    const getBlobURL = (code) => {
      const blob = new Blob([code], { type: 'text/html' });
      return URL.createObjectURL(blob);
    };

    const source = `
      <html>
        <body>
          ${this.props.markup || ''}
        </body>
      </html>
    `;
    const iframeSource = getBlobURL(source);

    return (
      <iframe
        title="Promotions frame"
        style={{ margin: '0px', border: '0px', width: '100%', height: '100%', frameBorder: '0', overflow: 'hidden' }}
        src={iframeSource}
      />
    );
  }

  render() {
    if (this.props.markup) {
      return (
        <Card style={{ marginBottom: '10px', border: '0px', padding: '0px' }}>
          {
            this.renderMarkupIframe()
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
          <a href={this.props.linkUrl} onClick={this.onPromotionClick} >
            {contents}
          </a>
        ) : contents}
      </Card>
    );
  }
}
