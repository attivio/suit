// @flow
import React from 'react';
import type { Children } from 'react';

import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/lib/Button';

type NavigationButtonProps = {
  location: PropTypes.object.isRequired;
  history: PropTypes.object.isRequired;
  /* A CSS class to use on the button. Optional. */
  className: string,
  /** A Bootstrap style for the button. Defaults to "default". */
  bsStyle: string,
  /** The route to navigate to when the button is clicked. */
  route: string,
  /** Any arbitray CSS styling to apply to the button. Optional. */
  style: any,
  /** The contents of the button. Usually just text. */
  children: Children;
};

type NavigationButtonDefaultProps = {
  className: string,
  bsStyle: string,
  style: any,
  children: Children,
};

/**
 * Wrapper for a React-Boostrap Button that will navigate to a route
 * using the react router. You can pass a className, bsStyle, and arbitrary
 * style object to change the look of your button, similarly to the standard
 * one. Use the route property to specify where the router should take the
 * user when clicked.
 */
class NavigationButton extends React.Component<NavigationButtonDefaultProps, NavigationButtonProps, void> {
  static defaultProps = {
    className: '',
    bsStyle: 'default',
    style: {},
    children: null,
  };

  static displayName = 'NavigationButton';

  constructor(props: NavigationButtonProps) {
    super(props);
    (this: any).doClick = this.doClick.bind(this);
  }

  props: NavigationButtonProps;

  doClick() {
    if (this.props.route) {
      this.props.history.push({ pathname: this.props.route, search: this.props.location.search });
    }
  }

  render() {
    return (
      <Button onClick={this.doClick} className={this.props.className} style={this.props.style} bsStyle={this.props.bsStyle}>
        {this.props.children}
      </Button>
    );
  }
}

export default withRouter(NavigationButton);
