// @flow
import React, { Children } from 'react';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';

type TrianglePanelProps = {
  /** The title displayed in the header of the panel. */
  title: string;
  /** An ID used to coordinate between the various pieces. */
  id: string;
  /** If set, the panel will be drawn with a border, like a Card. */
  bordered: boolean;
  /** If set, then the panel's initial state will be collapsed. */
  initiallyCollapsed: boolean;
  /**
   * If set, then the open/closed state of this componenent will be saved
   * in the browser's local storage using this key. In this case, the
   * initial value of the open property will be obtained from the local
   * storage if possible, otherwise it will be determined by the
   * initiallyCollapsed property.
   */
  localStorageKey: string | null;
  /** The contents of the panel can be whatever you like. */
  children: Children;
  /**
   * Property that contains the value for data-test attribute added to elements to be uniquely
   * identified by testing tools like Selenium
   */
  dataTestValue? : string | null;
}

type TrianglePanelDefaultProps = {
  bordered: boolean;
  initiallyCollapsed: boolean;
  localStorageKey: string | null;
  dataTestValue: string | null;
}

type TrianglePanelState = {
  open: boolean;
}

/**
 * This is a panel that the user can expand or collapse by clicking
 * its header. It's similar to the CollapsiblePanel component except that
 * instead of a caret on the right side of the control, there's a triangle
 * icon to the left of the title which points to the right when closed and
 * down when open, the same as the "disclosure triangles" used in many UIs.
 * It can optionally remember the open/closed state between uses by using
 * the browser's local storage.
 */
export default class TrianglePanel extends React.Component<TrianglePanelDefaultProps, TrianglePanelProps, TrianglePanelState> { // eslint-disable-line max-len
  static defaultProps = {
    bordered: false,
    initiallyCollapsed: false,
    localStorageKey: null,
    dataTestValue: null,
  };

  static displayName = 'TrianglePanel';

  constructor(props: TrianglePanelProps) {
    super(props);

    // If the localStorageKey is set, try to get the initial value for "open" from there.
    // Otherwise use the value passed in as initallyCollapsed.
    let initiallyCollapsed = this.props.initiallyCollapsed;
    if (this.props.localStorageKey) {
      const collapsedString = window.localStorage.getItem(this.props.localStorageKey);
      if (collapsedString !== null) {
        initiallyCollapsed = collapsedString === 'true';
      }
    }
    this.state = {
      open: !initiallyCollapsed,
    };
    (this: any).toggleState = this.toggleState.bind(this);
  }

  state: TrianglePanelState;

  link: ?HTMLAnchorElement;

  toggleState() {
    const updatedOpen = !this.state.open;

    if (this.props.localStorageKey) {
      window.localStorage.setItem(this.props.localStorageKey, updatedOpen ? 'false' : 'true');
    }

    this.setState({ open: updatedOpen });
    if (this.link) {
      this.link.blur();
    }
  }

  render() {
    const outerClassName = this.props.bordered ? 'attivio-facet attivio-card' : 'attivio-facet';
    const bottomClassName = this.state.open ? 'panel-collapse collapse in' : 'panel-collapse collapse';
    const glyph = this.state.open ? 'triangle-bottom' : 'triangle-right';
    const { dataTestValue } = this.props;

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
            data-test={dataTestValue}
          >
            <Glyphicon glyph={glyph} />
            &nbsp;
            {this.props.title}
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
