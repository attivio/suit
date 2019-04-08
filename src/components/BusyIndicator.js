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
  message?: string;
  /**
   * Indicates message placement in relation to the spinner. Has no impact on ellipsis type. If type is spinner,
   * and this prop is omitted, the message will be positioned to the left of the spinner.
  */
  messagePosition?: 'right';
  /**
   * An optional CSS style to apply to the message.
   */
  messageStyle?: {};
  /**
   * The type of busy indicator to show. Defaults to 'ellipsis'
   */
  type?: BusyIndicatorType;
  /**
   * An optional CSS style to show for the component.
   */
  style?: {};
};

type BusyIndicatorDefaultProps = {
  message: string;
  messagePosition: 'right' | '';
  style: any;
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
    message: '',
    messagePosition: '',
    style: {},
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
    this.setState(({ dotCount }) => {
      const incrementedCount = dotCount + 1;
      const newCount = incrementedCount > 3 ? 0 : incrementedCount;
      return {
        dotCount: newCount,
      };
    });
  }

  renderBusySymbol = () => {
    const { type } = this.props;
    const { dotCount } = this.state;
    switch (type) {
      case 'ellipsis':
        return '.'.repeat(dotCount);
      case 'spinny':
        return <DefaultImage src={spinnyImage} style={{ height: '1em' }} />;
      default:
        return null;
    }
  }

  render() {
    const {
      message,
      messagePosition,
      messageStyle,
      show,
      style,
      type,
    } = this.props;

    if (show) {
      const containerStyle = {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        ...style,
      };

      const messageRightPositioned = type === 'spinny' && message && messagePosition === 'right';
      const messageMargin = messageRightPositioned
        ? 'marginLeft'
        : 'marginRight';

      const mergedMessageStyle = type === 'spinny'
        ? { [messageMargin]: '10px', ...messageStyle }
        : messageStyle;

      const messageToShow = message
        ? <div style={mergedMessageStyle}>{message}</div>
        : '';

      const leftContents = messageRightPositioned
        ? this.renderBusySymbol()
        : messageToShow;

      const rightContents = messageRightPositioned
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
