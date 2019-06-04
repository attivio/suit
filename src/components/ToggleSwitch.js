// @flow
import React from 'react';

type ToggleSwitchProps = {
  /** Whether the switch is in the “on” position. */
  on: boolean;
  /** An optional label to show for the “on” position. Defaults to “On”. */
  onLabel?: string;
  /** An optional label to show for the “off” position. Defaults to “Off”. */
  offLabel?: string;
  /** A callback used when the switch is toggled. */
  onChange: (newValue: boolean) => void;
  /** If set, the toggle switch is disabled. */
  disabled?: boolean;
  /** If set, the toggle will show no label and use the no label toggle styling. */
  noLabel?: boolean;
  /** Any extra css style parameters to apply to the container div (optional) */
  style?: any;
  /**
   * Any extra CSS class name(s) to apply to the container div (optional). Your CSS
   * can use this in conjunction with the styles applied to the inner buttons
   * (toggle-switch.toggle-switch-on or toggle-switch toggle-switch-off) to style them
   * as well.
   */
  className?: string;
};

type ToggleSwitchDefaultProps = {
  onLabel: string;
  offLabel: string;
  disabled: boolean;
  noLabel: boolean;
  style: any;
  className: string;
};

/**
 * This is a simple “sliding” toggle switch with customizable labels.
 */
export default class ToggleSwitch extends React.Component<ToggleSwitchDefaultProps, ToggleSwitchProps, void> {
  static defaultProps = {
    onLabel: 'On',
    offLabel: 'Off',
    disabled: false,
    noLabel: false,
    style: {},
    className: '',
  };

  static displayName = 'ToggleSwitch';

  onButton: ?HTMLDivElement;
  offButton: ?HTMLDivElement;

  render() {
    const {
      disabled,
      noLabel,
      offLabel,
      on,
      onChange,
      onLabel,
      style,
      className = '',
    } = this.props;

    const disabledClass = disabled ? 'disabled' : '';
    const containerClass = `toggle-switch-container ${className} ${disabledClass}`;

    const onClass = `toggle-switch toggle-switch-on ${on ? 'selected' : ''} ${disabledClass}`;
    const offClass = `toggle-switch toggle-switch-off ${on ? '' : 'selected'} ${disabledClass}`;

    if (noLabel) {
      const buttonStyle = on && !disabled ? { right: '12px' } : { right: '32px', backgroundColor: '#ffffff' };
      const buttonClassName = on && !disabled ? `attivio-primary-background ${onClass}` : offClass;

      const sliderClassName = on && !disabled
        ? 'attivio-primary-background'
        : 'attivio-gray-light-background';

      return (
        <div
          className={containerClass}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            className={sliderClassName}
            style={{
              width: '28px',
              height: '12px',
              borderRadius: '10px',
              opacity: '0.7',
            }}
          />
          <div
            className={buttonClassName}
            onClick={() => {
              if (!on && !disabled) {
                // Off now, turn it on
                onChange(true);
              }
              if (on && !disabled) {
                // On now, turn it off
                onChange(false);
              }
            }}
            role="button"
            tabIndex={0}
            style={{
              boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12)',
              height: '17px',
              width: '17px',
              borderRadius: '100%',
              position: 'relative',
              transitionDuration: '100ms',
              zIndex: '1',
              cursor: disabled ? 'default' : 'pointer',
              outline: 'none',
              border: 'none',
              transition: 'right 300ms cubic-bezier(0.26, 0.86, 0.44, 0.98)',
              ...buttonStyle,
            }}
          />
        </div>
      );
    }

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
