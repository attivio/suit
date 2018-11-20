// @Flow
import React from 'react';

import DefaultImage from './DefaultImage';
import spinnyImage from '../img/spinner.gif';

type BusyIndicatorType = 'ellipsis' | 'spinny';

type BusyIndicatorProps = {
  /**
   * If true, the component will be visible.
   */
  show: boolean;
  /**
   * Optional message to show before the animated part. Defaults to the empty string.
   */
  message: string;
  /**
   * The type of busy indicator to show. Defaults to 'ellipsis'
   */
  type: BusyIndicatorType;
  /**
   * An optional CSS style to show for the component.
   */
  style: any;
};

type BusyIndicatorDefaultProps = {
  style: any;
  message: string;
  type: BusyIndicatorType;
};

type BusyIndicatorState = {
  dotCount: number;
};

/**
 * Component to indicate the app is busy with an animation and optional message.
 */
export default class BusyIndicator extends React.Component<BusyIndicatorDefaultProps, BusyIndicatorProps, BusyIndicatorState> { // eslint-disable-line max-len
  static defaultProps = {
    style: {},
    message: '',
    type: 'ellipsis',
  };

  static displayName = 'BusyIndicator';

  constructor(props: BusyIndicatorProps) {
    super(props);

    this.state = {
      dotCount: 3,
    };
    (this: any).advance = this.advance.bind(this);
  }

  state: BusyIndicatorState;

  componentDidMount() {
    this.start();
  }

  componentDidUpdate(previousProps: BusyIndicatorProps) {
    if (previousProps.show !== this.props.show) {
      if (this.props.show) {
        this.start();
      } else {
        this.stop();
      }
    }
  }

  componentWillUnmount() {
    this.stop();
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = 0;
    }
  }

  start() {
    this.stop();
    if (this.props.type === 'ellipsis') {
      this.timer = setInterval(this.advance, 500);
    }
  }

  timer: number;

  advance() {
    let newCount = this.state.dotCount + 1;
    if (newCount > 3) {
      newCount = 0;
    }
    this.setState({
      dotCount: newCount,
    });
  }

  render() {
    if (this.props.show) {
      const style = Object.assign({ display: 'inline-block' }, this.props.style);
      let contents;
      let messageToShow = this.props.message;
      switch (this.props.type) {
        case 'ellipsis':
          contents = '.'.repeat(this.state.dotCount);
          break;
        case 'spinny':
          if (messageToShow.length > 0) {
            // If we're showing a message, append a non-breaking space
            // so it doesn't butt up against the image
            messageToShow = `${messageToShow}\u00a0`;
          }
          contents = <DefaultImage src={spinnyImage} style={{ height: '1em' }} />;
          break;
        default:
          contents = null;
          break;
      }
      return (
        <div style={style}>
          {messageToShow}{contents}
        </div>
      );
    }
    return null;
  }
}
