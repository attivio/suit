// @Flow

import React from 'react';

type DisappearingImageState = {
  error: boolean;
};

/**
 * Component that will hide an image if it can't be displayed due to, e.g.,
 * a URL to a non-existant file. You can pass in any props that work for
 * a standard <img> tag and they'll be added to the inserted image.
 */
export default class DisappearingImage extends React.Component<DisappearingImageState, {}, void> {
  static displayName = 'DisappearingImage';

  constructor(props: any) {
    super(props);
    (this: any).onError = this.onError.bind(this);
    this.state = {
      error: false,
    };
  }

  state: DisappearingImageState;

  onError() {
    this.setState({
      error: true,
    });
  }

  render() {
    // Note: all required props should being passed in
    if (!this.state.error) {
      return <img onError={this.onError} {...this.props} />; // eslint-disable-line jsx-a11y/alt-text
    }
    return null; // If we had an error loading the image, don't show it.
  }
}
