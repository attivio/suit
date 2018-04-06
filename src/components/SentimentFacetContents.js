// @flow

import React from 'react';

import SearchFacetBucket from '../api/SearchFacetBucket';
import SentimentBar from './SentimentBar';

type SentimentFacetContentsProps = {
  /** The facet's buckets. */
  buckets: Array<SearchFacetBucket>;
  /** Callback to add a filter for this facet. */
  addFacetFilter: (bucket: SearchFacetBucket) => void;
};

/** Display a facet's bucket values using a sentiment bar. */
export default class SentimentFacetContents extends React.Component<void, SentimentFacetContentsProps, void> {
  static displayName = 'SentimentFacetContents';

  constructor(props: SentimentFacetContentsProps) {
    super(props);
    (this: any).handleClick = this.handleClick.bind(this);
  }

  handleClick(positive: boolean) {
    const clickedBucket = this.props.buckets.find((bucket) => {
      if (positive) {
        return bucket.value === 'pos';
      }
      return bucket.value === 'neg';
    });
    if (clickedBucket) {
      const label = positive ? 'Positive' : 'Negative';
      const prettierBucket = new SearchFacetBucket(clickedBucket.value, label, clickedBucket.count,
        clickedBucket.filter, clickedBucket.max, clickedBucket.min);
      this.props.addFacetFilter(prettierBucket);
    }
  }

  render() {
    let posCount = 0;
    let negCount = 0;
    this.props.buckets.forEach((bucket) => {
      if (bucket.value === 'pos') {
        posCount = bucket.count;
      } else if (bucket.value === 'neg') {
        negCount = bucket.count;
      }
    });

    return (
      <SentimentBar
        posCount={posCount}
        negCount={negCount}
        onClick={this.handleClick}
      />
    );
  }
}
