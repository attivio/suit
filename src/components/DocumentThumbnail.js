// @flow
import React from 'react';

type DocumentThumbnailProps = {
  /**
   * The URI of the image to display as the document's
   * thumbnail. If not set, then a default placeholder
   * image is shown.
   */
  uri: string | null;
};

type DocumentThumbnailDefaultProps = {
  uri: string | null;
};

/**
 * A component to display the thumbnail for a document. If the
 * thumbnail isn't set, then a default image is displayed instead.
 */
export default class DocumentThumbnail extends React.Component<DocumentThumbnailDefaultProps, DocumentThumbnailProps, void> {
  static defaultProps = {
    uri: null,
  };

  render() {
    const haveImage = (this.props.uri && this.props.uri.length > 0);
    const imageUri = haveImage ? this.props.uri : 'img/placeholder-doc.svg';
    const className = haveImage ? 'attivio-search-result-preview img-responsive' :
      'attivio-search-result-preview img-responsive attivio-search-result-preview-placeholder';
    return <img src={imageUri} className={className} alt="Thumbnail" />;
  }
}
