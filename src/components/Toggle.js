// @flow

import React, { Children } from 'react';

type ToggleProps = {
  /** The callback to run when the element is clicked */
  onClick: (e: Event) => void;
  /** The child components */
  children: Children;
  customClassName: ?string;
};

/**
 * A toggle component for use in DropdownButtons
 */
export default class Toggle extends React.Component<void, ToggleProps, void> {
  static displayName = 'Toggle';

  constructor(props: ToggleProps) {
    super(props);
    (this: any).handleClick = this.handleClick.bind(this);
  }

  handleClick(e: Event) {
    e.preventDefault();
    this.props.onClick(e);
  }

  render() {
    const { customClassName = '' } = this.props;
    const className = customClassName || 'attivio-smalltoolbar-btn';

    return (
      <a
        href
        className={className}
        onClick={this.handleClick}
      >
        {this.props.children}
      </a>
    );
  }
}
