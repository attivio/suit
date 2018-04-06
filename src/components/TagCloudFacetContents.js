// @flow

import React from 'react';

import SearchFacetBucket from '../api/SearchFacetBucket';
import TagCloud, { TagCloudValue } from './TagCloud';

type TagCloudFacetContentsProps = {
  /** The facet's buckets. */
  buckets: Array<SearchFacetBucket>;
  /**
   * The maximum number of items to show in a facet. If there
   * are more than this many buckets for the facet, only this many, with
   * the highest counts, will be shown. Defaults to 15.
   */
  maxBuckets: number;
  /** Callback to add a filter for this facet. */
  addFacetFilter: (bucket: SearchFacetBucket) => void;
};

/** Display a facet's bucket values in a list with TagClouds. */
export default class TagCloudFacetContents extends React.Component<void, TagCloudFacetContentsProps, void> {
  static displayName = 'TagCloudFacetContents';

  constructor(props: TagCloudFacetContentsProps) {
    super(props);
    (this: any).tagCloudCallback = this.tagCloudCallback.bind(this);
  }

  tagCloudCallback(tcv: TagCloudValue) {
    const selectedBucket = this.props.buckets.find((bucket) => {
      const bucketLabel = bucket.displayLabel();
      return (bucketLabel === tcv.label);
    });
    if (selectedBucket) {
      this.props.addFacetFilter(selectedBucket);
    }
  }

  render() {
    const tagCloudValues = this.props.buckets.map((bucket) => {
      const bucketLabel = bucket.displayLabel();
      return new TagCloudValue(bucketLabel, bucket.count);
    });

    return <TagCloud tags={tagCloudValues} maxValues={this.props.maxBuckets} callback={this.tagCloudCallback} />;
  }
}
