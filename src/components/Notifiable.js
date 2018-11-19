// @flow
import React from 'react';
import type { Children } from 'react';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import { css } from 'glamor';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type NotifiableProps = {
  children: Children;
};

export default class Notifiable extends React.Component<void, NotifiableProps, void> {
  static makeContents(message: string, type: toast.TYPE.ERROR | toast.TYPE.WARNING | toast.TYPE.INFO | toast.TYPE.SUCCESS) {
    let icon;
    let color;
    let label;
    switch (type) {
      case toast.TYPE.ERROR:
        icon = 'exclamation-sign';
        color = 'red';
        label = 'Error';
        break;
      case toast.TYPE.WARNING:
        icon = 'alert';
        color = 'orange';
        label = 'Warning';
        break;
      case toast.TYPE.SUCCESS:
        icon = 'ok';
        color = 'green';
        label = 'Success';
        break;
      case toast.TYPE.INFO:
      default:
        icon = 'info-sign';
        color = 'lightblue';
        label = 'Note';
        break;
    }

    return (
      <div>
        <div style={{ float: 'left', color, marginRight: '10px', fontSize: '24px' }}>
          <Glyphicon glyph={icon} />
        </div>
        <div>
          <div style={{ color, fontWeight: 'bold', fontSize: '1.2em' }}>{label}</div>
          {message}
        </div>
      </div>
    );
  }

  static error(message: string, requireDismissal: boolean = false) {
    toast(
      Notifiable.makeContents(message, toast.TYPE.ERROR),
      {
        type: toast.TYPE.ERROR,
        autoClose: requireDismissal ? false : 5000,
        className: css({
          backgroundColor: 'rgba(255, 0, 0, 0.05)',
          color: 'black',
          borderRadius: '4px',
          borderTop: '4px solid red',
        }),
      },
    );
  }

  static warn(message: string, requireDismissal: boolean = false) {
    toast(
      Notifiable.makeContents(message, toast.TYPE.WARNING),
      {
        type: toast.TYPE.WARNING,
        autoClose: requireDismissal ? false : 5000,
        className: css({
          backgroundColor: 'rgba(255, 165, 0, 0.05)',
          color: 'black',
          borderRadius: '4px',
          borderTop: '4px solid orange',
        }),
      },
    );
  }

  static info(message: string, requireDismissal: boolean = false) {
    toast(
      Notifiable.makeContents(message, toast.TYPE.INFO),
      {
        type: toast.TYPE.INFO,
        autoClose: requireDismissal ? false : 5000,
        className: css({
          backgroundColor: 'rgba(173, 216, 230, 0.05)',
          color: 'black',
          borderRadius: '4px',
          borderTop: '4px solid lightblue',
        }),
      },
    );
  }

  static success(message: string, requireDismissal: boolean = false) {
    toast(
      Notifiable.makeContents(message, toast.TYPE.SUCCESS),
      {
        type: toast.TYPE.SUCCESS,
        autoClose: requireDismissal ? false : 5000,
        className: css({
          backgroundColor: 'rgba(0, 255, 0, 0.05)',
          color: 'black',
          borderRadius: '4px',
          borderTop: '4px solid green',
        }),
      },
    );
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
