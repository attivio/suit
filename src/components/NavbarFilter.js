// @flow
import React from 'react';

type NavbarFilterProps = {
  /** The name of the facet. */
  facetName: string;
  /** The value being filtered on. */
  bucketLabel: string;
  /** A callback that gets called when the user wants to remove the filter. */
  removeCallback: () => void;
}

/** Displays a currently applied facet filter. */
export default class NavbarFilter extends React.Component<void, NavbarFilterProps, void> {
  static displayName = 'NavbarFilter';

  constructor(props: NavbarFilterProps) {
    super(props);
    (this: any).remove = this.remove.bind(this);
  }

  remove(event: Event & { target: HTMLAnchorElement }) {
    this.props.removeCallback();
    event.target.blur();
  }

  render() {
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
          {this.props.bucketLabel}
        </a>
      </div>
    );
  }
}
