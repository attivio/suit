// @flow
import React from 'react';

import Button from 'react-bootstrap/lib/Button';

import DefaultImage from './DefaultImage';
import DocumentPreview from './DocumentPreview';

type DocumentThumbnailProps = {
  /**
   * The URI of the image to display as the document's
   * thumbnail.
   */
  uri: string | null;
  /**
   * The URIs of any images to display as previews for the document.
   * If there are none or this isn't set, then no previews will be
   * available when clicking the thumbnail. Otherwise, a modal
   * will open up to display the preview(s). If there are multiple
   * URIs, then they will be displayed in a carousel-type control
   * and the user can flip through them.
   */
  previewUris: Array<string>;
  /** The title to display for the document in the preview, if desired. */
  previewTitle: string | null;
};

type DocumentThumbnailDefaultProps = {
  uri: string | null;
  previewUris: Array<string>;
  previewTitle: string | null;
};

type DocumentThumbnailState = {
  previewing: boolean;
};

/**
 * A component to display the thumbnail for a document. If the
 * thumbnail isn't set, then no image is displayed. If the URI
 * isn't valid, then the image is hidden rather than showing a
 * broken image in the browser.
 */
export default class DocumentThumbnail extends React.Component<DocumentThumbnailDefaultProps, DocumentThumbnailProps, DocumentThumbnailState> { // eslint-disable-line max-len
  static defaultProps = {
    uri: null,
    previewUris: [],
    previewTitle: null,
  };

  static displayName = 'DocumentThumbnail';

  constructor(props: DocumentThumbnailProps) {
    super(props);
    this.state = {
      previewing: false,
    };
    (this: any).doPreview = this.doPreview.bind(this);
    (this: any).stopPreview = this.stopPreview.bind(this);
  }

  state: DocumentThumbnailState;

  doPreview() {
    this.setState({
      previewing: true,
    });
  }

  stopPreview() {
    this.setState({
      previewing: false,
    });
  }

  render() {
    const haveImage = this.props.uri && this.props.uri.length > 0;
    const havePreview = this.props.previewUris && this.props.previewUris.length > 0;

    let previews;
    if (this.props.previewUris) {
      if (typeof previews === 'string') {
        previews = [previews];
      } else {
        previews = this.props.previewUris;
      }
    }

    // We show something if there's a thumbnail URI or there are preview images...
    if (haveImage || havePreview) {
      let uri = this.props.uri;
      if (uri && uri.startsWith('/')) {
        uri = uri.substring(1);
      }

      const imageComp = uri ? (
        <DefaultImage
          src={uri}
          className="attivio-search-result-preview img-responsive"
          style={{ maxHeight: '100px' }}
          alt="Thumbnail"
        />
      ) : (
        <Button bsSize="small">
          Preview
        </Button>
      );

      return (
        <div>
          <a
            onClick={this.doPreview}
            role="button"
            tabIndex={0}
          >
            {imageComp}
          </a>
          { havePreview ? (
            <DocumentPreview
              uris={previews}
              show={this.state.previewing}
              onClose={this.stopPreview}
              docTitle={this.props.previewTitle}
            />
          ) : null }
        </div>
      );
    }

    return null; // No thumbnail for this document
  }
}
