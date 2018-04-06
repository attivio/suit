// @flow
import React, { Children } from 'react';

type CollapsiblePanelProps = {
  /** The contents of the panel can be whatever you like. */
  children: Children;
  /** The title displayed in the header of the panel. */
  title: string;
  /** An ID used to coordinate between the various pieces. */
  id: string;
  /** If set, the panel will be drawn with a border, like a Card. */
  bordered: boolean;
  /** If set, then the panel's initial state will be collapsed. */
  collapsed: boolean;
}

type CollapsiblePanelDefaultProps = {
  bordered: boolean;
  collapsed: boolean;
}

type CollapsiblePanelState = {
  open: boolean;
}

/**
 * This is a panel that the user can exapend or collapse by clicking
 * its header. It's used, for example, for displaying facets in
 * search results but can be used with whatever contents you like.
 */
export default class CollapsiblePanel extends React.Component<CollapsiblePanelDefaultProps, CollapsiblePanelProps, CollapsiblePanelState> { // eslint-disable-line max-len
  static defaultProps = {
    bordered: false,
    collapsed: false,
  };

  static displayName = 'CollapsiblePanel';

  constructor(props: CollapsiblePanelProps) {
    super(props);
    this.state = {
      open: !this.props.collapsed,
    };
    (this: any).toggleState = this.toggleState.bind(this);
  }

  state: CollapsiblePanelState;
  props: CollapsiblePanelProps;

  link: ?HTMLAnchorElement;

  toggleState() {
    this.setState({ open: !this.state.open });
    if (this.link) {
      this.link.blur();
    }
  }

  render() {
    const outerClassName = this.props.bordered ? 'attivio-facet attivio-card' : 'attivio-facet';
    const bottomClassName = this.state.open ? 'panel-collapse collapse in' : 'panel-collapse collapse';

    return (
      <div className={outerClassName}>
        <h3 className="attivio-facet-hed">
          <a
            data-toggle="collapse"
            aria-expanded={this.state.open}
            aria-controls="key-phrases"
            id={`${this.props.id}-hed`}
            onClick={this.toggleState}
            role="button"
            tabIndex={0}
            ref={(c) => {
              this.link = c;
            }}
          >
            {this.props.title} <i className="attivio-icon-arrow-down" />
          </a>
        </h3>
        <div
          id={this.props.id}
          className={bottomClassName}
          role="tabpanel"
          aria-labelledby={`${this.props.id}-hed`}
          aria-expanded={this.state.open}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
