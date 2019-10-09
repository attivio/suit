// @flow
import * as React from 'react';

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
  style: ?any;
  /**
   * Any extra CSS class name(s) to apply to the container div (optional). Your CSS
   * can use this in conjunction with the styles applied to the inner buttons
   * (toggle-switch.toggle-switch-on or toggle-switch toggle-switch-off) to style them
   * as well.
   */
  className?: string;
  /**
   * Property that contains the value for data-test attribute
   * added to elements to be uniquely identified by testing tools
   * like Selenium.
   */
  dataTest?: string | null;
};

type ToggleSwitchDefaultProps = {
  onLabel: string;
  offLabel: string;
  disabled: boolean;
  noLabel: boolean;
  style: any;
  className: string;
  dataTest : string | null;
};

/**
 * This is a simple “sliding” toggle switch with customizable labels.
 */
export default class ToggleSwitch extends React.Component<ToggleSwitchProps, void> {
  static defaultProps = {
    onLabel: 'On',
    offLabel: 'Off',
    disabled: false,
    noLabel: false,
    style: {},
    className: '',
    dataTest: null,
  };

  static displayName = 'ToggleSwitch';

  onClick = () => {
    const { noLabel, on, disabled, onChange } = this.props;
    if (!on && !disabled) {
      // Off now, turn it on
      onChange(true);
      if (!noLabel && this.labeledOnButton) {
        this.labeledOnButton.blur();
      }
    } else if (on && !disabled) {
      // On now, turn it off
      onChange(false);
      if (!noLabel && this.labeledOffButton) {
        this.labeledOffButton.blur();
      }
    }
  }

  getStyles() {
    const {
      disabled,
      noLabel,
      on,
      className = '',
      style,
    } = this.props;

    const disabledClass = disabled ? 'disabled' : '';

    const onClassName = `toggle-switch toggle-switch-on ${on ? 'selected' : ''} ${noLabel ? '' : disabledClass}`;
    const offClassName = `toggle-switch toggle-switch-off ${on ? '' : 'selected'} ${disabledClass}`;

    let buttonStyle = { right: '32px', backgroundColor: '#ffffff' };
    let buttonClassName = offClassName;

    let containerStyle = style;
    let containerClassName = `toggle-switch-container ${className} ${disabledClass}`;

    let sliderClassName = 'toggle-switch-off';
    let sliderStyle = {
      width: '28px',
      height: '12px',
      borderRadius: '10px',
      opacity: '0.7',
    };

    if (noLabel) {
      containerStyle = {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled ? 'default' : 'cursor',
      };
      sliderStyle = { ...sliderStyle, opacity: 0.5 };
      if (on) {
        buttonStyle = { right: '12px' };
        buttonClassName = `attivio-primary-background ${onClassName}`;
        containerClassName = `toggle-switch-container ${className}`;
        sliderClassName = 'attivio-primary-background';
        if (disabled) {
          buttonClassName = 'toggle-switch-on-disabled ';
          sliderClassName = 'toggle-switch-on-disabled';
          sliderStyle = { ...sliderStyle, opacity: 0.4 };
        }
      } else {
        sliderClassName = 'toggle-slider-off-no-label';
        containerClassName = 'toggle-switch-container';
        if (disabled) {
          buttonClassName = 'toggle-switch-off-no-label';
          sliderStyle = { ...sliderStyle, opacity: 0.4 };
        }
      }
      buttonStyle = {
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
      };
    }

    return {
      button: {
        className: buttonClassName,
        style: buttonStyle,
      },
      slider: {
        className: sliderClassName,
        style: sliderStyle,
      },
      container: {
        className: containerClassName,
        style: containerStyle,
      },
      onClassName,
      offClassName,
    };
  }

  labeledOnButton: ?HTMLDivElement;
  labeledOffButton: ?HTMLDivElement;

  renderNoLabel() {
    const { container, slider, button } = this.getStyles();
    const dataTest = this.props.dataTest;

    return (
      <div
        className={container.className}
        style={container.style}
        onClick={this.onClick}
        role="button"
        tabIndex={0}
        data-test={dataTest}
      >
        <div
          className={slider.className}
          style={slider.style}
        />
        <div
          className={button.className}
          style={button.style}
        />
      </div>
    );
  }

  renderWithLabel() {
    const {
      disabled,
      offLabel,
      onLabel,
      dataTest,
    } = this.props;

    const { container, onClassName, offClassName } = this.getStyles();

    if (!disabled) {
      return (
        <div
          className={container.className}
          style={container.style}
          data-test={dataTest}
        >
          <div
            className={offClassName}
            onClick={this.onClick}
            role="button"
            tabIndex={0}
            ref={(c) => {
              this.labeledOffButton = c;
            }}
          >
            {offLabel}
          </div>
          <div
            className={onClassName}
            onClick={this.onClick}
            role="button"
            tabIndex={0}
            ref={(c) => {
              this.labeledOnButton = c;
            }}
          >
            {onLabel}
          </div>
        </div>
      );
    }
    return (
      <div
        className={container.className}
        style={container.style}
        data-test={dataTest}
      >
        <div className={offClassName}>
          {offLabel}
        </div>
        <div className={onClassName}>
          {onLabel}
        </div>
      </div>
    );
  }

  render() {
    const { noLabel } = this.props;

    if (noLabel) {
      return this.renderNoLabel();
    }
    return this.renderWithLabel();
  }
}
