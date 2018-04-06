// @flow
import React from 'react';
import type { Children } from 'react';

import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

type BigButtonProps = {
  location: PropTypes.object.isRequired;
  history: PropTypes.object.isRequired;
  /** A CSS class name or names to apply to the button */
  className: string,
  /** A Bootstrap button style to apply to the button, such as <code>info</code> or <code>danger</code>. */
  bsStyle: string,
  /** If set, this button will trigger the router to change the current page to the route specified. */
  route: string,
  /** An optional handler that will be called when the user clicks the button. */
  onClick: () => void,
  /**
   * The button's contents are any children between the opening and closing
   * tags. The function takes no parameters and has no return value.
   */
  children: Children,
  /** Any custom CSS styles to apply to the button. */
  style: any,
};

type BigButtonDefaultProps = {
  className: string,
  bsStyle: string,
  route: string,
  onClick: () => void,
  style: any,
};

/**
 * A button control that can have arbitrary
 * contents and is clickable by the user. The contents of the
 * tag are rendered as the button's contents. You can pass
 * either an <code>onClick</code> callback or a <code>route</code>
 * name. If you pass the former, it , that will be called in response
 * to the user clickling the button; if, instead, you pass the name
 * of a route, when the user clicks the button, the application will
 * navigate to that route.
 * <p>By default, the <code>BigButton</code> will have a
 * rounded-corner border like a regular Bootstrap button (you can
 * pass a value to the <code>bsStyle</code> prop to change its style). Alternatively,
 * you can pass the name of a CSS class or a style object as to style it yourself.
 */
class BigButton extends React.Component<BigButtonDefaultProps, BigButtonProps, void> {
  static defaultProps = {
    className: '',
    bsStyle: 'default',
    route: '',
    onClick: () => {},
    style: {},
  };

  static displayName = 'BigButton';

  constructor(props: BigButtonProps) {
    super(props);
    (this: any).doClick = this.doClick.bind(this);
  }

  props: BigButtonProps;

  button: ?HTMLDivElement;

  doClick() {
    if (this.props.route) {
      this.props.history.push({ pathname: this.props.route, search: this.props.location.search });
    } else if (this.props.onClick) {
      this.props.onClick();
    }
    if (this.button) {
      this.button.blur();
    }
  }

  render() {
    let className = this.props.className ? this.props.className : 'btn big-button';
    if (this.props.bsStyle) {
      className = `${className} btn-${this.props.bsStyle}`;
    }
    return (
      <div
        onClick={this.doClick}
        className={className}
        style={this.props.style}
        role="button"
        tabIndex="0"
        ref={(c) => {
          this.button = c;
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(BigButton);
