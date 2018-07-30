// @flow

import React from 'react';

import SearchFacetBucket from '../api/SearchFacetBucket';
import SentimentTagCloud, { SentimentTagCloudValue } from './SentimentTagCloud';

type SentimentTagCloudFacetContentsProps = {
  /** The buckets for positive keyphrases. */
  positiveBuckets: Array<SearchFacetBucket>;
  /** The buckets for negative keyphrases. */
  negativeBuckets: Array<SearchFacetBucket>;
  /**
   * The maximum number of items to show in a facet. If there
   * are more than this many buckets for the facet, only this many, with
   * the highest counts, will be shown. Defaults to 15.
   */
  maxBuckets: number;
  /** Callback to add a filter for this facet. */
  addFacetFilter: (bucket: any) => void;
};

/** Display the values for positive and negative keyphrases in a list with TagClouds. */
export default class SentimentTagCloudFacetContents extends React.Component<void, SentimentTagCloudFacetContentsProps, void> {
  static displayName = 'SentimentTagCloudFacetContents';

  // Check if keyphrase bucket is a part of keyphrase bucketList
  // and if the count for bucket is greater than it's match in the bucketList,
  // if so, return bucket with count updated as the difference in values of count of matching buckets;
  // otherwise return null
  static handleDuplicateBucketInBucketList(bucket: SearchFacetBucket, bucketList: Array<SearchFacetBucket>) {
    let i;
    const currentBucket = bucket;
    for (i = 0; i < bucketList.length; i += 1) {
      if (bucketList[i].value === currentBucket.value) {
        if (bucketList[i].count < currentBucket.count) {
          currentBucket.count -= bucketList[i].count;
          return currentBucket;
        } else if (bucketList[i].count > currentBucket.count) {
          return null;
        } else if (bucketList[i].count === currentBucket.count) {
          return currentBucket;
        }
      }
    }
    return currentBucket;
  }

  constructor(props: SentimentTagCloudFacetContentsProps) {
    super(props);
    (this: any).tagCloudCallback = this.tagCloudCallback.bind(this);
  }

  tagCloudCallback(tcv: SentimentTagCloudValue) {
    const selectedBucket = {};
    if (tcv.sentiment === 'positive') {
      selectedBucket.value = this.props.positiveBuckets.find((bucket) => {
        const bucketLabel = bucket.displayLabel();
        return (bucketLabel === tcv.label);
      });
      selectedBucket.sentiment = 'positive';
    } else if (tcv.sentiment === 'negative') {
      selectedBucket.value = this.props.negativeBuckets.find((bucket) => {
        const bucketLabel = bucket.displayLabel();
        return (bucketLabel === tcv.label);
      });
      selectedBucket.sentiment = 'negative';
    }

    if (selectedBucket) {
      this.props.addFacetFilter(selectedBucket);
    }
  }

  render() {
    const positiveTagCloudValues = [];
    this.props.positiveBuckets.forEach((bucket) => {
      const record = this.constructor.handleDuplicateBucketInBucketList(bucket, this.props.negativeBuckets);
      if (record) {
        const bucketLabel = record.displayLabel();
        positiveTagCloudValues.push(new SentimentTagCloudValue(bucketLabel, record.count, 'positive'));
      }
    });
    const negativeTagCloudValues = [];
    this.props.negativeBuckets.forEach((bucket) => {
      const record = this.constructor.handleDuplicateBucketInBucketList(bucket, this.props.positiveBuckets);
      if (record) {
        const bucketLabel = record.displayLabel();
        negativeTagCloudValues.push(new SentimentTagCloudValue(bucketLabel, record.count, 'negative'));
      }
    });

    return (<SentimentTagCloud
      positiveTags={positiveTagCloudValues}
      negativeTags={negativeTagCloudValues}
      maxValues={this.props.maxBuckets}
      callback={this.tagCloudCallback}
    />);
  }
}
