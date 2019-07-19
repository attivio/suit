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
  confirmButtonLabel?: string;

  /**
   * The Label for the cancel button. Optional; defaults to "Cancel."
   */
  cancelButtonLabel?: string;

  /**
   * If true, the confirmation button is disabled. Defaults to false. Optional.
   */
  confirmButtonDisabled?: boolean;

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
  dangerous?: boolean;

  /**
   * The contents to display in body of the dialog box. May be a simple string
   * or more complex components.
   */
  children: Children;
};

type ConfirmationDialogDefaultProps = {
  cancelButtonLabel: string;
  confirmButtonDisabled: boolean;
  confirmButtonLabel: string;
  dangerous: boolean;
  show: boolean;
};

/**
 * Component to display a dialog box asking for confirmation from the user.
 */
export default class ConfirmationDialog extends React.Component<ConfirmationDialogDefaultProps,
  ConfirmationDialogProps, void> {
  static defaultProps = {
    cancelButtonLabel: 'Cancel',
    confirmButtonDisabled: false,
    confirmButtonLabel: 'OK',
    dangerous: false,
    show: false,
  };

  static displayName = 'ConfirmationDialog';

  render() {
    const {
      cancelButtonLabel,
      children,
      confirmButtonDisabled,
      confirmButtonLabel,
      dangerous,
      onCancel,
      onConfirm,
      show,
      title,
    } = this.props;
    const okButtonStyle = dangerous ? 'danger' : 'primary';
    return (
      <Modal show={show} onHide={onCancel}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>{children}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onCancel}>{cancelButtonLabel}</Button>
          <Button onClick={onConfirm} bsStyle={okButtonStyle} disabled={confirmButtonDisabled}>
            {confirmButtonLabel}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
