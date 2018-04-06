// @flow

import React from 'react';

type ProfilePhotoProps = {
  /** The URL of the profile photo. If not set, a placeholder will be shown. */
  url: string | null;
};

type ProfilePhotoDefaultProps = {
  url: string | null;
};

/**
 * Shows a person's profile photo.
 */
export default class ProfilePhoto extends React.Component<ProfilePhotoDefaultProps, ProfilePhotoProps, void> {
  static defaultProps = {
    url: null,
  };

  static displayName = 'ProfilePhoto';

  render() {
    const url = (this.props.url && this.props.url.length > 0) ? this.props.url : 'img/placeholder-person.svg';
    return <img src={url} className="attivio-expert360-img" alt="Profile" />;
  }
}
