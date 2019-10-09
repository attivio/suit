// @flow

import React from 'react';

import Modal from 'react-bootstrap/lib/Modal';
import Carousel from 'react-bootstrap/lib/Carousel';

import DefaultImage from './DefaultImage';
import StringUtils from '../util/StringUtils';

type DocumentPreviewProps = {
  uris: Array<string>;
  docTitle: string | null;
  show: boolean;
  onClose: () => void;
};

type DocumentPreviewDefaultProps = {
  docTitle: string | null;
};

type DocumentPreviewState = {
  currentItem: number;
};

export default class DocumentPreview extends React.Component<DocumentPreviewDefaultProps, DocumentPreviewProps, DocumentPreviewState> { // eslint-disable-line max-len
  static defaultProps = {
    docTitle: null,
  };

  static displayName = 'DocumentPreview';

  constructor(props: DocumentPreviewProps) {
    super(props);
    this.state = {
      currentItem: 0,
    };
    (this: any).handleSelect = this.handleSelect.bind(this);
  }

  state: DocumentPreviewState;

  componentWillReceiveProps(nextProps: DocumentPreviewProps) {
    // If we're going to be shown when we weren't previously, reset the image to display to the first one.
    if (nextProps.show && !this.props.show) {
      this.setState({
        currentItem: 0,
      });
    }
  }

  handleSelect(selectedIndex: number) {
    this.setState({
      currentItem: selectedIndex,
    });
  }

  render() {
    let previewComps;
    // If we have multiple images, display them in a carousel object
    if (this.props.uris.length > 1) {
      const items = this.props.uris.map((uri, index) => {
        const caption = `${index + 1} of ${this.props.uris.length}`;
        return (
          <Carousel.Item key={`image${(index * 2) / 2}-${uri}`}>
            <DefaultImage
              src={uri}
              alt="Thumbnail"
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                maxHeight: '75vh',
              }}
            />
            <Carousel.Caption>
              <em>
                {caption}
              </em>
            </Carousel.Caption>
          </Carousel.Item>
        );
      });
      previewComps = (
        <Carousel
          activeIndex={this.state.currentItem}
          interval={null}
          onSelect={this.handleSelect}
          slide={false}
          indicators={false}
          className="preview"
        >
          {items}
        </Carousel>
      );
    } else {
      // A single image doesn't warrant a carousel
      previewComps = (
        <DefaultImage
          src={this.props.uris[0]}
          alt="Thumbnail"
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'block',
            maxHeight: '75vh',
          }}
        />
      );
    }

    const title = this.props.docTitle ? `Preview of \u201c${StringUtils.stripSimpleHtml(this.props.docTitle)}\u201d` : 'Preview';

    return (
      <Modal show={this.props.show} bsSize="large" onHide={this.props.onClose}>
        <Modal.Header closeButton>
          <h3>
            {title}
          </h3>
        </Modal.Header>
        <Modal.Body>
          {previewComps}
        </Modal.Body>
      </Modal>
    );
  }
}
