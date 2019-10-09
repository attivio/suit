// @flow
import React from 'react';

import Configurable from './Configurable';

type NavbarFilterProps = {
  /** The name of the facet. */
  facetName: string;
  /** The value being filtered on. */
  bucketLabel: string;
  /** A callback that gets called when the user wants to remove the filter. */
  removeCallback: () => void;
  /**
   * The limit (in characters) for the segments to display when
   * displaying a hierarchical facet filter. Defaults to 0, which
   * means no truncation, but you can change this to trigger truncation
   * of the segments.
   */
  maxHierarchicalSegmentLength: number;
}

type NavbarFilterDefaultProps = {
  maxHierarchicalSegmentLength: number;
}

/** Displays a currently applied facet filter. */
class NavbarFilter extends React.Component<NavbarFilterDefaultProps, NavbarFilterProps, void> {
  static defaultProps = {
    maxHierarchicalSegmentLength: 0,
  };

  static displayName = 'NavbarFilter';

  constructor(props: NavbarFilterProps) {
    super(props);
    (this: any).remove = this.remove.bind(this);
  }

  processLabel(original: string) {
    if (original.includes('>>>')) {
      let truncated = false;
      const pieces = original.split('>>>').map((piece: string) => {
        let trimmed = piece.trim();
        if (this.props.maxHierarchicalSegmentLength > 0 && trimmed.length > this.props.maxHierarchicalSegmentLength) {
          trimmed = `${trimmed.substring(0, this.props.maxHierarchicalSegmentLength)}\u2026`; // Include the ellipsis
          truncated = true;
        }
        return trimmed;
      });
      const displayLabel = pieces.join(' > ');
      if (truncated) {
        const full = original.replace('>>>', '>');
        return (
          <span title={full}>
            {displayLabel}
          </span>
        );
      }
      return displayLabel;
    }
    return original;
  }

  remove(event: Event & { target: HTMLAnchorElement }) {
    this.props.removeCallback();
    event.target.blur();
  }

  render() {
    const label = this.processLabel(this.props.bucketLabel);
    return (
      <div className="attivio-globalmastnavbar-filter">
        {this.props.facetName}:
        &nbsp;
        <a
          className="attivio-globalmastnavbar-filter-link attivio-icon-remove"
          onClick={this.remove}
          role="button"
          tabIndex={0}
        >
          {label}
        </a>
      </div>
    );
  }
}

export default Configurable(NavbarFilter);
