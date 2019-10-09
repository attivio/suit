// @flow

import React from 'react';

import SearchFacetBucket from '../api/SearchFacetBucket';

type ListWithBarsFacetContentsProps = {
  /** The facet’s buckets. */
  buckets: Array<SearchFacetBucket>;
  /** Callback to add a filter for this facet. */
  addFacetFilter: (bucket: SearchFacetBucket) => void;
  /** If set, the labels column will be right-aligned */
  right: boolean;
  /** If set, then the bars will be this color as opposed to the default blue */
  color: string;
  /** The maximum number of children to display initially. */
  shortSize: number;
  /** The prompt for displaying more children. Defaults to "More…" */
  morePrompt: string;
  /** The prompt for displaying fewer children. Defaults to "Fewer…" */
  fewerPrompt: string;
  /** boolean condition to remove hyperlinks from labels and show them as plain text */
  noLink: boolean;
};

type ListWithBarsFacetContentsDefaultProps = {
  right: boolean;
  color: string;
  noLink: boolean;
  shortSize: number;
  morePrompt: string;
  fewerPrompt: string;
};

type ListWithBarsFacetContentsState = {
  allVisible: boolean;
}

/**
 * Component to display the buckets of a facet in a table with
 * horizontal bars showing relative size.
 */
export default class ListWithBarsFacetContents extends React.Component<ListWithBarsFacetContentsDefaultProps, ListWithBarsFacetContentsProps, ListWithBarsFacetContentsState> { // eslint-disable-line max-len
  static defaultProps = {
    right: false,
    color: '#55B3E3',
    noLink: false,
    shortSize: 5,
    morePrompt: 'More\u2026',
    fewerPrompt: 'Fewer\u2026',
  };

  static displayName = 'ListWithBarsFacetContents';

  constructor(props: ListWithBarsFacetContentsProps) {
    super(props);
    this.state = {
      allVisible: false,
    };
    (this: any).toggleAllVisible = this.toggleAllVisible.bind(this);
  }

  state: ListWithBarsFacetContentsState;

  toggleButton: ?HTMLAnchorElement;

  toggleAllVisible() {
    this.setState({
      allVisible: !this.state.allVisible,
    });
    if (this.toggleButton) {
      this.toggleButton.blur();
    }
  }

  render() {
    // Calculate the max value for the count
    const maxValue = this.props.buckets.reduce((accumulator, currentBucket) => {
      return currentBucket.count > accumulator ? currentBucket.count : accumulator;
    }, 0);

    // Now generate the table rows for each bucket
    let bucketRows = this.props.buckets.map((bucket) => {
      const label = bucket.displayLabel();
      const percent = Math.round((bucket.count / maxValue) * 100);
      const percentage = `${percent}%`;
      const callback = (event: Event & { target: HTMLAnchorElement }) => {
        this.props.addFacetFilter(bucket);
        event.target.blur();
      };
      const labelValue = this.props.noLink ? (
        <span>
          {label}
        </span>) : (
          <a
            onClick={callback}
            role="button"
            tabIndex={0}
          >
            {label}
          </a>);
      return (
        <tr key={bucket.bucketKey()}>
          <td style={{ width: '100px' }}>
            {labelValue}
          </td>
          <td style={{ paddingRight: '10px' }}>
            {bucket.count}
          </td>
          <td className="attivio-linksbar-chart">
            <div
              className="attivio-linksbar-chart-percent"
              style={{
                width: percentage,
                backgroundColor: this.props.color,
              }}
            >
              {percentage}
            </div>
          </td>
        </tr>
      );
    });
    // If there are more items than the shortSize and we're not showing all,
    // then truncate the list of rows
    if (!this.state.allVisible && bucketRows.length > this.props.shortSize) {
      bucketRows = bucketRows.slice(0, this.props.shortSize);
    }

    // The "more" row is only there if there are more than this.props.shortSize
    // buckets in the facet. If so, it will say either "More" or "Fewer" depending
    // on this.state.allVisible.
    let moreRow = null;
    if (this.props.buckets && this.props.buckets.length > this.props.shortSize) {
      const label = this.state.allVisible ? this.props.fewerPrompt : this.props.morePrompt;
      moreRow = (
        <tr>
          <td colSpan={3}>
            <a
              className="attivio-facet-more attivio-more"
              onClick={this.toggleAllVisible}
              role="button"
              tabIndex={0}
              ref={(c) => { this.toggleButton = c; }}
            >
              {label}
            </a>
          </td>
        </tr>
      );
    }


    const className = this.props.right ? 'table attivio-linksbar ' : 'table attivio-linksbar attivio-linksbar-b';

    return (
      <table className={className}>
        <thead className="sr-only">
          <tr>
            <th>Facet Value</th>
            <th>Count</th>
            <th>Percent</th>
          </tr>
        </thead>
        <tbody>
          {bucketRows}
          {moreRow}
        </tbody>
      </table>
    );
  }
}
