// @flow

import React from 'react';

type ToggleSwitchProps = {
  /** Whether the switch is in the “on” position. */
  on: boolean;
  /** A label to show for the “on” position. Defaults to “On”. */
  onLabel: string;
  /** A label to show for the “off” position. Defaults to “Off”. */
  offLabel: string;
  /** A callback used when the switch is toggled. */
  onChange: (newValue: boolean) => void;
  /** If set, the toggle switch is disabled. */
  disabled: boolean;
};

type ToggleSwitchDefaultProps = {
  onLabel: string;
  offLabel: string;
  disabled: boolean;
};

/**
 * This is a simple “sliding” toggle switch with customizable labels.
 */
export default class ToggleSwitch extends React.Component<ToggleSwitchDefaultProps, ToggleSwitchProps, void> {
  static defaultProps = {
    onLabel: 'On',
    offLabel: 'Off',
    disabled: false,
  };

  static displayName = 'ToggleSwitch';

  onButton: ?HTMLDivElement;
  offButton: ?HTMLDivElement;

  render() {
    const disabledClass = this.props.disabled ? 'disabled' : '';
    const containerClass = `toggle-switch-container ${disabledClass}`;
    const onClass = `toggle-switch toggle-switch-on ${this.props.on ? 'selected' : ''} ${disabledClass}`;
    const offClass = `toggle-switch toggle-switch-off ${this.props.on ? '' : 'selected'} ${disabledClass}`;

    if (!this.props.disabled) {
      return (
        <div className={containerClass}>
          <div
            className={offClass}
            onClick={() => {
              if (this.props.on && !this.props.disabled) {
                // On now, turn it off
                this.props.onChange(false);
              }
              if (this.offButton) {
                this.offButton.blur();
              }
            }}
            role="button"
            tabIndex={0}
            ref={(c) => {
              this.offButton = c;
            }}
          >
            {this.props.offLabel}
          </div>
          <div
            className={onClass}
            onClick={() => {
              if (!this.props.on && !this.props.disabled) {
                // Off now, turn it on
                this.props.onChange(true);
              }
              if (this.onButton) {
                this.onButton.blur();
              }
            }}
            role="button"
            tabIndex={0}
            ref={(c) => {
              this.onButton = c;
            }}
          >
            {this.props.onLabel}
          </div>
        </div>
      );
    }
    return (
      <div className={containerClass}>
        <div
          className={offClass}
        >
          {this.props.offLabel}
        </div>
        <div
          className={onClass}
        >
          {this.props.onLabel}
        </div>
      </div>
    );
  }
}
