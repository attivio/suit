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
  /** Any extra css style parameters to apply to the container div */
  style?: any;
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
    const { disabled, style, on, onLabel, offLabel, onChange } = this.props;
    const disabledClass = disabled ? 'disabled' : '';
    const containerClass = `toggle-switch-container ${disabledClass}`;
    const onClass = `toggle-switch toggle-switch-on ${on ? 'selected' : ''} ${disabledClass}`;
    const offClass = `toggle-switch toggle-switch-off ${on ? '' : 'selected'} ${disabledClass}`;

    if (!disabled) {
      return (
        <div className={containerClass} style={style}>
          <div
            className={offClass}
            onClick={() => {
              if (on && !disabled) {
                // On now, turn it off
                onChange(false);
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
            {offLabel}
          </div>
          <div
            className={onClass}
            onClick={() => {
              if (!on && !disabled) {
                // Off now, turn it on
                onChange(true);
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
            {onLabel}
          </div>
        </div>
      );
    }
    return (
      <div className={containerClass} style={style}>
        <div
          className={offClass}
        >
          {offLabel}
        </div>
        <div
          className={onClass}
        >
          {onLabel}
        </div>
      </div>
    );
  }
}
