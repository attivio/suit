// @flow

import React from 'react';

import SearchFacetBucket from '../api/SearchFacetBucket';

import MoreList from './MoreList';

type MoreListFacetContentsProps = {
  /** The facet's buckets. */
  buckets: Array<SearchFacetBucket>;
  /** Callback to add a filter for this facet. */
  addFacetFilter: (bucket: SearchFacetBucket) => void;
};

/** Display a facet's bucket values in a MoreList component. */
export default class MoreListFacetContents extends React.Component<void, MoreListFacetContentsProps, void> {
  static displayName = 'MoreListFacetContents';

  constructor(props: MoreListFacetContentsProps) {
    super(props);
    (this: any).addFilter = this.addFilter.bind(this);
  }

  addFilter(event: Event & { target: HTMLAnchorElement }) {
    this.props.addFacetFilter(this.props.buckets[event.target.tabIndex]);
    event.target.blur();
  }

  render() {
    const rows = this.props.buckets.map((bucket, index) => {
      return (
        <li key={bucket.bucketKey()}>
          <a onClick={this.addFilter} role="button" tabIndex={index}>
            {bucket.displayLabel()}
          </a>
          {' '}
          ({bucket.count})
        </li>
      );
    });
    return <MoreList shortSize={6}>{rows}</MoreList>;
  }
}
