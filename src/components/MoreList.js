// @flow
import React from 'react';
import type { Children } from 'react';

type MoreListProps = {
  /** Arbirary childen. */
  children: Children;
  /** The maximum number of children to display initially. */
  shortSize: number;
  /** The prompt for displaying more children. Defaults to "More…" */
  morePrompt: string;
  /** The prompt for displaying fewer children. Defaults to "Fewer…" */
  fewerPrompt: string;
}

type MoreListDefaultProps = {
  shortSize: number;
  morePrompt: string;
  fewerPrompt: string;
}

type MoreListState = {
  allVisible: boolean;
}

/**
 * Show the children of the component. If there are more than shortSize
 * children, then only the first shortSize children will be shown, followed by
 * a "More…" link to view the rest of the list. Once the user has clicked
 * the link, it will change to "Fewer…" and clicking it will revert to the
 * shortened version of the list.
 *
 * Depends on CSS classes: more-list-link
 */
export default class MoreList extends React.Component<MoreListDefaultProps, MoreListProps, MoreListState> {
  static defaultProps = {
    shortSize: 5,
    morePrompt: 'More\u2026',
    fewerPrompt: 'Fewer\u2026',
  };

  static displayName = 'MoreList';

  constructor(props: MoreListProps) {
    super(props);
    this.state = {
      allVisible: false,
    };
    (this: any).toggleAllVisible = this.toggleAllVisible.bind(this);
  }

  state: MoreListState;
  props: MoreListProps;

  toggleButton: ?HTMLAnchorElement;

  toggleAllVisible() {
    this.setState({
      allVisible: !this.state.allVisible,
    });
    if (this.toggleButton) {
      this.toggleButton.blur();
    }
  }

  shortenChildrenList(numChildrenToShow: number) {
    const childrenToShow = [];
    let i = 0;
    React.Children.forEach(this.props.children, (child) => {
      if (i < numChildrenToShow) {
        childrenToShow.push(child);
      }
      i += 1;
    });
    return childrenToShow;
  }

  render() {
    const numChildren = this.props.children ? React.Children.count(this.props.children) : 0;
    // If we're showing everything, then show all of the children.
    // If not, then show either shortSize children or, if there aren't that many, all of them

    const shortSize = this.props.shortSize ? this.props.shortSize : 5;

    const numChildrenToShow = this.state.allVisible ? numChildren : Math.min(shortSize, numChildren);

    let prompt;
    if (numChildrenToShow < numChildren) {
      // Show a "More…" link
      prompt = this.props.morePrompt;
    } else if (numChildrenToShow > shortSize) {
      // Show a "Fewer…" link
      prompt = this.props.fewerPrompt;
    }
    let link = '';
    if (prompt) {
      link = (
        <li data-more-pivot>
          <a
            className="attivio-facet-more attivio-more"
            onClick={this.toggleAllVisible}
            role="button"
            tabIndex="0"
            ref={(c) => { this.toggleButton = c; }}
          >
            {prompt}
          </a>
        </li>
      );
    }

    const childrenToShow = numChildrenToShow === numChildren ? this.props.children : this.shortenChildrenList(numChildrenToShow);

    return (
      <ul className="list-unstyled">
        {childrenToShow}
        {link}
      </ul>
    );
  }
}
