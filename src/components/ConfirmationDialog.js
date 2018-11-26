// @flow
import React from 'react';
import type { Children } from 'react';

import { Modal, Button } from 'react-bootstrap';

type ConfirmationDialogProps = {
  /**
   * The title to display in the dialog box.
   */
  title: string;

  /**
   * The Label for the submit button. Optional; defaults to "OK."
   */
  confirmButtonLabel: string;

  /**
   * The Label for the cancel button. Optional; defaults to "Cancel."
   */
  cancelButtonLabel: string;

  /**
   * If set, then the dialog box is shown. Otherwise, it's hidden.
   */
  show: boolean;

  /**
   * The function that gets called when the user doesn't want to
   * go along with what the dialog is asking.
   */
  onCancel: () => void;

  /**
   * The function that gets called when the user confirms the
   * message displayed by the dialog box.
   */
  onConfirm: () => void;

  /**
   * If set, then the dialog box's submit button will be
   * displayed using the "danger" color (generally red) instead of
   * the default "primary" color (generally blue).
  */
  dangerous: boolean;

  /**
   * The contents to display in body of the dialog box. May be a simple string
   * or more complex components.
   */
  children: Children;
};

type ConfirmationDialogDefaultProps = {
  confirmButtonLabel: string;
  cancelButtonLabel: string;
  show: boolean;
  dangerous: boolean;
};

/**
 * Component to display a dialog box asking for confirmation from the user.
 */
export default class ConfirmationDialog extends React.Component<ConfirmationDialogDefaultProps,
  ConfirmationDialogProps, void> {
  static defaultProps = {
    confirmButtonLabel: 'OK',
    cancelButtonLabel: 'Cancel',
    show: false,
    dangerous: false,
  };

  static displayName = 'ConfirmationDialog';

  render() {
    const okButtonStyle = this.props.dangerous ? 'danger' : 'primary';
    return this.props.show ? (
      <Modal show>
        <Modal.Header>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>{this.props.children}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onCancel}>{this.props.cancelButtonLabel}</Button>
          <Button onClick={this.props.onConfirm} bsStyle={okButtonStyle}>{this.props.confirmButtonLabel}</Button>
        </Modal.Footer>
      </Modal>
    ) : null;
  }
}
