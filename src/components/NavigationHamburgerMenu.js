// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import MenuItem from 'react-bootstrap/lib/MenuItem';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

class NavMenuItem {
  label: string;
  route: string;

  constructor(label: string, route: string) {
    this.label = label;
    this.route = route;
  }
}

type NavigationHamburgerMenuProps = {
  location: PropTypes.object.isRequired;
  history: PropTypes.object.isRequired;
  /** The ID of the menu. Required for screen reader accessibiltiy. */
  id: string;
  /** The icon to display as the menu's button. It can be
   * the name of any Glyphicon icon. Defaults to the
   * hamburger menu icon (three horizontal bars). */
  icon: string;
  /** A descriptive tooltip for the menu shown when the user hovers over it. */
  tooltip: string;
  /** Where the tooltip should appear relative to the menu icon (defaults to below) */
  tooltipPlacement: 'top' | 'left' | 'bottom' | 'right';
  /**
   * The list of items in the menu.
   */
  items: Array<NavMenuItem>;
  /** The currently active item’s route, if any. */
  currentItem: string | null;
  /**
   * The color to use for the hamburger menu. Can be any
   * valid css color (a name, a hex code, and rgb() value, etc.
   * Defaults to black.
   */
  color: string;
  /**
   * The color to use for the menu button's background.
   * It defaults to transparent.
   */
  backgroundColor: string;
  /** An arbitrary style object to override any additional styles. */
  style: any;
};

type NavigationHamburgerMenuDefaultProps = {
  icon: string,
  tooltip: string,
  tooltipPlacement: 'top' | 'left' | 'bottom' | 'right';
  currentItem: string | null;
  color: string;
  backgroundColor: string;
  style: any;
};

/**
 * A menu to allow the user to navigate between the various routes in
 * the application. It appears as an icon (the default has three horizontal
 * lines, like the bun and burger of a hamburger, hence the name) which the
 * user clicks to reveal a menu of options. Clicking one takes the user to
 * that route.
 */
class NavigationHamburgerMenu extends React.Component<NavigationHamburgerMenuDefaultProps, NavigationHamburgerMenuProps, void> { // eslint-disable-line max-len
  static defaultProps = {
    icon: 'menu-hamburger',
    tooltip: '',
    tooltipPlacement: 'bottom',
    currentItem: null,
    color: '#000',
    backgroundColor: 'transparent',
    style: null,
  };

  static displayName = 'NavigationHamburgerMenu';

  static NavMenuItem;

  constructor(props: NavigationHamburgerMenuProps) {
    super(props);
    (this: any).menuItemChosen = this.menuItemChosen.bind(this);
  }

  props: NavigationHamburgerMenuProps;

  menuItemChosen(route: string) {
    this.props.history.push({ pathname: route, search: this.props.location.search });
  }

  render() {
    const menuItems = this.props.items.map((item) => {
      const labelComp = item.route === this.props.currentItem ? <b>{item.label}</b> : item.label;
      return <MenuItem eventKey={item.route} key={`${item.label}-${item.route}`}>{labelComp}</MenuItem>;
    });

    let title = <Glyphicon glyph={this.props.icon} />;
    if (this.props.tooltip && this.props.tooltip.length > 0) {
      const hamburgerMenuTooltip = <Tooltip id="hamburgerMenuTooltip">{this.props.tooltip}</Tooltip>;
      title = (
        <OverlayTrigger placement={this.props.tooltipPlacement} overlay={hamburgerMenuTooltip}>
          {title}
        </OverlayTrigger>
      );
    }

    const style = {
      minWidth: '35px',
      color: this.props.color,
      backgroundColor: this.props.backgroundColor,
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: '2px',
      fontSize: 'large',
      border: 'none',
      // borderRadius: 0,
    };
    if (this.props.style) {
      Object.assign(style, this.props.style);
    }

    return (
      <ButtonToolbar>
        <Dropdown onSelect={this.menuItemChosen} id={this.props.id}>
          <Dropdown.Toggle noCaret style={style}>
            {title}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {menuItems}
          </Dropdown.Menu>
        </Dropdown>
      </ButtonToolbar>
    );
  }
}

NavigationHamburgerMenu.NavMenuItem = NavMenuItem;

export default withRouter(NavigationHamburgerMenu);
