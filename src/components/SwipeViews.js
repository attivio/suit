/* eslint-disable react/no-string-refs */
import React from 'react';
import ReactSwipe from 'react-swipe';
import { Row, Col, Glyphicon } from 'react-bootstrap';

type SwipeViewsProps = {
  /** array of different views/screens (anything that can be rendered) */
  views: Array<any>;
  /** if true, create an infinite feel with no endpoints. True by default  */
  continuous: boolean;
  /** index position Swipe should start at, 0 by default */
  startSlide: number;
  /** speed of view transition in milliseconds, 10 by default */
  speed: number;
  /** begin with auto slideshow (time in milliseconds between slides), 3000 by default */
  auto: number;
  /** stops any touches on this container from scrolling the page, false by default */
  disableScroll: boolean;
};

type SwipeViewsDefaultProps = {
  continuous: boolean;
};

class SwipeViews extends React.Component<SwipeViewsDefaultProps, SwipeViewsProps, void> {
  static defaultProps = {
    continuous: true,
    startSlide: 0,
    auto: 3000,
    speed: 10,
    disableScroll: false,
  }
  static displayName = 'SwipeViews';

  constructor(props) {
    super(props);
    (this: any).next = this.next.bind(this);
    (this: any).prev = this.prev.bind(this);
  }

  next() {
    this.refs.reactSwipe.next();
  }

  prev() {
    this.refs.reactSwipe.prev();
  }

  render() {
    const swipeOptions = {
      startSlide: this.props.startSlide,
      auto: this.props.auto,
      speed: this.props.speed,
      disableScroll: this.props.disableScroll,
      continuous: this.props.continuous,
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
