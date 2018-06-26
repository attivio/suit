// @flow

import React from 'react';

import SearchFacetBucket from '../api/SearchFacetBucket';
import MoreList from './MoreList';

type ListWithBarsFacetContentsProps = {
  /** The facet’s buckets. */
  buckets: Array<SearchFacetBucket>;
  /** Callback to add a filter for this facet. */
  addFacetFilter: (bucket: SearchFacetBucket) => void;
  /** If set, the labels column will be right-aligned */
  right: boolean;
  /** If set, then the bars will be this color as opposed to the default blue */
  color: string;
  /** boolean condition to remove hyperlinks from labels and show them as plain text */
  noLink: boolean;
};

type ListWithBarsFacetContentsDefaultProps = {
  right: boolean;
  color: string;
  noLink: boolean;
};

/**
 * Component to display the buckets of a facet in a table with
 * horizontal bars showing relatrive size.
 */
export default class ListWithBarsFacetContents extends React.Component<ListWithBarsFacetContentsDefaultProps, ListWithBarsFacetContentsProps, void> { // eslint-disable-line max-len
  static defaultProps = {
    right: false,
    color: '#55B3E3',
    noLink: false,
  };

  static displayName = 'ListWithBarsFacetContents';

  render() {
    // Calculate the max value for the count
    const maxValue = this.props.buckets.reduce((accumulator, currentBucket) => {
      return currentBucket.count > accumulator ? currentBucket.count : accumulator;
    }, 0);

    // Now generate the table rows for each bucket
    const bucketRows = this.props.buckets.map((bucket) => {
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
          <td>
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
          <MoreList shortSize={6}>{bucketRows}</MoreList>
        </tbody>
      </table>
    );
  }
}
