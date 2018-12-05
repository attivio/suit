// @flow

import React from 'react';

type DefaultImageProps = {
  /**
   * The address of the image you want to display.
   */
  src: string;
  /**
   * The address of a default image to display if there's an issue displaying the prefered image address. Optional.
   */
  defaultSrc: string | null;
};

type DefaultImageDefaultProps = {
  defaultSrc: string | null;
}

type DefaultImageState = {
  src: string | null;
};

/**
 * Display a backup image if there is some error with the desired image source.
 * If neither provided source is successfully displayed, then display nothing.
 * You can pass in any props that work for a standard <img> tag and they'll be added to the inserted image.
 */
export default class DefaultImage extends React.Component<DefaultImageDefaultProps, DefaultImageProps, DefaultImageState> {
  static defaultProps = {
    defaultSrc: null,
  }

  static displayName = 'DefaultImage';

  constructor(props: DefaultImageProps) {
    super(props);
    this.state = {
      src: props.src,
    };
    (this: any).onError = this.onError.bind(this);
  }

  state: DefaultImageState;

  componentWillReceiveProps(newProps: DefaultImageProps) {
    if (newProps.src !== this.props.src) {
      this.setState({
        src: newProps.src,
      });
    }
  }

  onError() {
    let src = null;
    if (this.state.src !== this.props.defaultSrc) {
      src = this.props.defaultSrc;
    }
    this.setState({
      src,
    });
  }

  render() {
    const { src, defaultSrc, ...props } = this.props;
    if (this.state.src !== null) {
      return <img src={this.state.src} onError={this.onError} {...props} />; // eslint-disable-line jsx-a11y/alt-text
    }
    return null;
  }
}
