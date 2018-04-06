// @flow
import React from 'react';

import DisappearingImage from './DisappearingImage';
import StringUtils from '../util/StringUtils';

type DocumentThumbnailProps = {
  /**
   * The URI of the image to display as the document's
   * thumbnail.
   */
  uri: string | null;
};

type DocumentThumbnailDefaultProps = {
  uri: string | null;
};

/**
 * A component to display the thumbnail for a document. If the
 * thumbnail isn't set, then no image is displayed. If the URI
 * isn't valid, then the image is hidden rather than showing a
 * broken image in the browser.
 */
export default class DocumentThumbnail extends React.Component<DocumentThumbnailDefaultProps, DocumentThumbnailProps, void> {
  static defaultProps = {
    uri: null,
  };

  static displayName = 'DocumentThumbnail';

  render() {
    const haveImage = StringUtils.notEmpty(this.props.uri);
    if (haveImage) {
      let uri = this.props.uri;
      if (uri && uri.startsWith('/')) {
        uri = uri.substring(1);
      }
      const className = haveImage ? 'attivio-search-result-preview img-responsive' :
        'attivio-search-result-preview img-responsive attivio-search-result-preview-placeholder';
      return <DisappearingImage src={uri} className={className} style={{ maxHeight: '100px' }} alt="Thumbnail" />;
    }
    return null; // No thumbnail for this document
  }
}
