/* eslint-disable react/no-string-refs */
import React from 'react';
import ReactSwipe from 'react-swipe';
import { Row, Col, Glyphicon } from 'react-bootstrap';

type SwipeViewsProps = {
  /** array of different views/screens (anything that can be rendered) */
  views: Array<any>,
};

class SwipeViews extends React.Component<void, SwipeViewsProps, void> {
  constructor(props) {
    super(props);
    (this: any).next = this.next.bind(this);
    (this: any).prev = this.prev.bind(this);
  }

  static displayName = 'SwipeViews';

  next() {
    this.refs.reactSwipe.next();
  }

  prev() {
    this.refs.reactSwipe.prev();
  }

  render() {
    const swipeOptions = {
      startSlide: 0,
      auto: 0,
      speed: 10,
      disableScroll: false,
      continuous: true,
    };
    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} className="swipe-view-container">
          <Col xs={1} sm={1} md={1} lg={1}>
            <Glyphicon className="swipe-view-navigation-button" glyph="chevron-left" onClick={this.prev} />
          </Col>
          <Col xs={10} sm={10} md={10} lg={10} style={{ textAlign: 'center' }}>
            <ReactSwipe key={this.props.views} ref="reactSwipe" swipeOptions={{ swipeOptions }}>
              {this.props.views}
            </ReactSwipe>
          </Col>
          <Col xs={1} sm={1} md={1} lg={1}>
            <Glyphicon className="swipe-view-navigation-button" glyph="chevron-right" onClick={this.next} />
          </Col>
        </Col>
      </Row>
    );
  }
}

export default SwipeViews;
