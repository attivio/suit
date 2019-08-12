// @flow

import React from 'react';
import PropTypes from 'prop-types';

import SearchFacetBucket from '../api/SearchFacetBucket';
import FacetFilter from '../api/FacetFilter';
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
  /** boolean condition to remove hyperlinks from tags and show them as plain text */
  noLink: boolean;
};

type TagCloudFacetContentsDefaultProps = {
  noLink: boolean;
};

/** Display a facet's bucket values in a list with TagClouds. */
export default class TagCloudFacetContents extends React.Component<TagCloudFacetContentsDefaultProps, TagCloudFacetContentsProps, void> { // eslint-disable-line max-len
  static displayName = 'TagCloudFacetContents';

  static defaultProps = {
    noLink: false,
  };

  static contextTypes = {
    searcher: PropTypes.any,
  };

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

  /**
   * Check if the search filter already has this bucket filter applied.
   * The tag should be noLink or non-clickable if the respective tag is applied to the filter.
   */
  isTagNoLink(bucket: SearchFacetBucket): boolean {
    const searcher = this.context.searcher;
    const facetFilters = searcher ? searcher.state.facetFilters : [];
    const isBucketFilterApplied = facetFilters.some((facetFilter: FacetFilter) => {
      return facetFilter.filter === bucket.filter;
    });
    return isBucketFilterApplied;
  }

  render() {
    const tagCloudValues = this.props.buckets.map((bucket) => {
      const bucketLabel = bucket.displayLabel();
      const noLink = this.isTagNoLink(bucket);
      return new TagCloudValue(bucketLabel, bucket.count, noLink);
    });

    return (
      <TagCloud
        tags={tagCloudValues}
        maxValues={this.props.maxBuckets}
        noLink={this.props.noLink}
        callback={this.tagCloudCallback}
      />
    );
  }
}
