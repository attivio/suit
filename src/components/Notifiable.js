// @flow
import React from 'react';
import type { Children } from 'react';

import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type NotifiableProps = {
  children: Children;
};

export default class Notifiable extends React.Component<void, NotifiableProps, void> {
  static error(message: string, requireDismissal: boolean = false) {
    toast(
      (
        <div
          style={{
            backgroundColor: 'white',
            borderTop: '1px solid green',
            width: '100%',
          }}
        >
          {message}
        </div>
      ),
      {
        type: toast.TYPE.ERROR,
        autoClose: requireDismissal ? false : 5000,
      },
    );
  }

  static warn(message: string, requireDismissal: boolean = false) {
    toast(
      (
        <div
          style={{
            backgroundColor: 'white',
            borderTop: '1px solid orange',
            width: '100%',
          }}
        >
          {message}
        </div>
      ),
      {
        type: toast.TYPE.WARNING,
        autoClose: requireDismissal ? false : 5000,
      },
    );
  }

  static info(message: string, requireDismissal: boolean = false) {
    toast(
      (
        <div
          style={{
            backgroundColor: 'white',
            borderTop: '1px solid orange',
            width: '100%',
          }}
        >
          {message}
        </div>
      ),
      {
        type: toast.TYPE.INFO,
        autoClose: requireDismissal ? false : 5000,
      },
    );
  }

  static success(message: string, requireDismissal: boolean = false) {
    toast(
      (
        <div
          style={{
            backgroundColor: 'white',
            borderTop: '1px solid orange',
            width: '100%',
          }}
        >
          {message}
        </div>
      ),
      {
        type: toast.TYPE.SUCCESS,
        autoClose: requireDismissal ? false : 5000,
      },
    );
  }

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
