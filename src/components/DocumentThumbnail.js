// @flow
import React from 'react';

import DisappearingImage from './DisappearingImage';
import StringUtils from '../util/StringUtils';

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
    const haveImage = StringUtils.notEmpty(this.props.uri);
    if (haveImage) {
      let uri = this.props.uri;
      if (uri && uri.startsWith('/')) {
        uri = uri.substring(1);
      }
      const className = haveImage ? 'attivio-search-result-preview img-responsive' :
        'attivio-search-result-preview img-responsive attivio-search-result-preview-placeholder';
      return <DisappearingImage src={uri} className={className} alt="Thumbnail" />;
    }
    return null; // No thumbnail for this document
  }
}
