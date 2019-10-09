// @flow
import React from 'react';
import type { Children } from 'react';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import { css } from 'glamor';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import StyleUtils from '../util/StyleUtils';

type NotificationType = toast.TYPE.ERROR | toast.TYPE.WARNING | toast.TYPE.INFO | toast.TYPE.SUCCESS;

type NotifiableProps = {
  children: Children;
};

export default class Notifiable extends React.Component<void, NotifiableProps, void> {
  /**
   * This does all the work of setting up colors and the contents of the notifications...
   */
  static showNotification(message: string, type: NotificationType, requireDismissal: boolean) {
    let icon;
    let mainColor;
    let label;
    switch (type) {
      case toast.TYPE.ERROR:
        icon = 'exclamation-sign';
        mainColor = '#d9534f';
        label = 'Error';
        break;
      case toast.TYPE.WARNING:
        icon = 'alert';
        mainColor = '#f0ad4e';
        label = 'Warning';
        break;
      case toast.TYPE.SUCCESS:
        icon = 'ok';
        mainColor = '#5cb85c';
        label = 'Success';
        break;
      case toast.TYPE.INFO:
      default:
        icon = 'info-sign';
        mainColor = '#5bc0de';
        label = 'Note';
        break;
    }
    const backgroundColor = StyleUtils.lightenColor(mainColor, 0.5);
    const autoClose = requireDismissal ? false : 5000;
    const contents = (
      <div>
        <div style={{ float: 'left', color: mainColor, marginRight: '10px', fontSize: '18px' }}>
          <Glyphicon glyph={icon} />
        </div>
        <div>
          <div style={{ color: mainColor, fontWeight: 'bold', fontSize: '1.2em' }}>{label}</div>
          {message}
        </div>
      </div>
    );
    const options = {
      type: toast.TYPE.ERROR,
      autoClose,
      className: css({
        backgroundColor,
        color: 'black',
        borderRadius: '4px',
        borderTop: `4px solid ${mainColor}`,
      }),
    };

    toast(contents, options);
  }
  static error(message: string, requireDismissal: boolean = false) {
    Notifiable.showNotification(message, toast.TYPE.ERROR, requireDismissal);
  }

  static warn(message: string, requireDismissal: boolean = false) {
    Notifiable.showNotification(message, toast.TYPE.WARNING, requireDismissal);
  }

  static info(message: string, requireDismissal: boolean = false) {
    Notifiable.showNotification(message, toast.TYPE.INFO, requireDismissal);
  }

  static success(message: string, requireDismissal: boolean = false) {
    Notifiable.showNotification(message, toast.TYPE.SUCCESS, requireDismissal);
  }

  static displayName = 'Notifiable';

  render() {
    return (
      <div>
        <ToastContainer
          position="top-center"
          closeButton={false}
          transition={Slide}
          hideProgressBar
          draggable={false}
        />
        {this.props.children}
      </div>
    );
  }
}
