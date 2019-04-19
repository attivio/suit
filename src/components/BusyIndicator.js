// @Flow
import React from 'react';

import DefaultImage from './DefaultImage';
import Configurable from './Configurable';
import spinnyImage from '../img/spinner.gif';

type BusyIndicatorType = 'ellipsis' | 'spinny';

type BusyIndicatorProps = {
  /**
   * Indicates if the component will be visible, default is true.
   */
  show: boolean;
  /**
   * Optional path to the spinner file, defaults to 'img/spinner.gif'.
   */
  spinner?: string;
  /**
   * Optional height for the spinner, default is the actual height of the spinner file.
   */
  spinnerHeight?: string;
  /**
   * Optional width for the spinner, default is the actual height of the spinner file.
   */
  spinnerWidth?: string;
  /**
   * Optional message to show before the animated part. Defaults to the empty string.
   */
  message?: string;
  /**
   * Indicates message placement in relation to the spinner. Has no impact on ellipsis or spinnyCentered type. Defaults to false.
   * If type is spinner, and this prop is omitted, the message will be positioned to the left of the spinner by default.
  */
  positionMessageRight?: boolean;
  /**
   * An optional CSS style to apply to the message.
   */
  messageStyle?: {};
  /**
   * The type of busy indicator to show. Defaults to 'ellipsis'
   * 'SpinnyCentered' type shows a spinner that is centered in the middle of it's container.
   */
  type?: BusyIndicatorType;
  /**
   * An optional CSS style to show for the component. Has no impact on the spinnyCentered type.
   */
  style?: {};
};

type BusyIndicatorDefaultProps = {
  show: boolean,
  message: string;
  positionMessageRight: boolean;
  style: any;
  type: BusyIndicatorType;
  spinner: string;
  spinnerHeight: string;
  spinnerWidth: string;
};

type BusyIndicatorState = {
  dotCount: number;
};

/**
 * Component to indicate the app is busy with an animation and optional message.
 */
class BusyIndicator extends React.Component<BusyIndicatorDefaultProps, BusyIndicatorProps, BusyIndicatorState> { // eslint-disable-line max-len
  static defaultProps = {
    show: true,
    message: '',
    positionMessageRight: false,
    style: {},
    type: 'ellipsis',
    spinner: 'img/spinner.gif',
    spinnerHeight: '',
    spinnerWidth: '',
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
    this.setState(({ dotCount }) => {
      const incrementedCount = dotCount + 1;
      const newCount = incrementedCount > 3 ? 0 : incrementedCount;
      return {
        dotCount: newCount,
      };
    });
  }

  renderBusySymbol = () => {
    const { type, spinner, spinnerHeight, spinnerWidth } = this.props;
    const { dotCount } = this.state;

    switch (type) {
      case 'ellipsis':
        return '.'.repeat(dotCount);
      case 'spinny':
        return <DefaultImage src={spinner} defaultSrc={spinnyImage} style={{ height: '1em' }} />;
      case 'spinnyCentered':
        return (
          <img
            src={this.props.spinner}
            alt="Spinner"
            width={spinnerWidth}
            height={spinnerHeight}
          />
        );
      default:
        return null;
    }
  }

  render() {
    const {
      message,
      positionMessageRight,
      messageStyle,
      show,
      style,
      type,
    } = this.props;

    if (show) {
      const validRightPosition = type === 'spinny' && message && positionMessageRight;
      const messageMargin = validRightPosition
        ? 'marginLeft'
        : 'marginRight';

      const mergedMessageStyle = type === 'spinny'
        ? { [messageMargin]: '10px', ...messageStyle }
        : messageStyle;

      const messageToShow = message
        ? <div style={mergedMessageStyle}>{message}</div>
        : '';

      if (type === 'spinnyCentered') {
        return (
          <div className="attivio-spinner">
            {this.renderBusySymbol()}
            <br />
            <br />
            <b>{messageToShow}</b>
          </div>
        );
      }

      const containerStyle = {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        ...style,
      };

      const leftContents = validRightPosition
        ? this.renderBusySymbol()
        : messageToShow;

      const rightContents = validRightPosition
        ? messageToShow
        : this.renderBusySymbol();

      return (
        <div style={containerStyle}>
          {leftContents}{rightContents}
        </div>
      );
    }
    return null;
  }
}

export default Configurable(BusyIndicator);
