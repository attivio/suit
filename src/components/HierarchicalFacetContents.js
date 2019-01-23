// @flow

import React from 'react';

import HierarchicalList, { HierarchicalNode } from './HierarchicalList';
import SearchFacetBucket from '../api/SearchFacetBucket';
import ObjectUtils from '../util/ObjectUtils';

type HierarchicalFacetContentsProps = {
  buckets: Array<SearchFacetBucket>;
  addFacetFilter: (bucket: SearchFacetBucket) => void;
  // bucketsPerLevel: number;
};

type OpenState = 'closed' | 'open' | 'full';

type HierarchicalFacetContentsState = {
  root: HierarchicalNode;
  openness: Map<string, OpenState>;
  bucketMap: Map<string, SearchFacetBucket>;
};

export default class HierarchicalFacetContents extends React.Component<void, HierarchicalFacetContentsProps, HierarchicalFacetContentsState> { // eslint-disable-line max-len
  static defaultProps = {
    bucketsPerLevel: 5,
  };

  static displayName = 'HierarchicalFacetContents';

  constructor(props: HierarchicalFacetContentsProps) {
    super(props);

    this.state = this.getStateForBuckets(this.props.buckets);

    (this: any).toggleNode = this.toggleNode.bind(this);
    (this: any).handleMore = this.handleMore.bind(this);
    (this: any).handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(newProps: HierarchicalFacetContentsProps) {
    if (!ObjectUtils.deepEquals(this.props.buckets, newProps.buckets)) {
      this.setState(this.getStateForBuckets(newProps.buckets));
    }
  }

  getStateForBuckets(): HierarchicalFacetContentsState {
    const topLevelNodes = this.props.buckets.map((bucket: SearchFacetBucket) => {
      return this.createNodesFromBucket(bucket);
    });
    const root = new HierarchicalNode('', null, topLevelNodes);
    const bucketMap = new Map();
    this.addNodesToMap(this.props.buckets, bucketMap);

    return {
      openness: (new Map(): Map<string, OpenState>),
      root,
      bucketMap,
    };
  }

  toggleNode(key: string, open: boolean) {
    const newOpenness = new Map(this.state.openness);
    const newOpenState = open ? 'open' : 'closed';
    newOpenness.set(key, newOpenState);
    this.setState({
      openness: newOpenness,
    });
  }

  addNodesToMap(buckets: Array<SearchFacetBucket>, map: Map<string, SearchFacetBucket>) {
    if (buckets && buckets.length > 0) {
      buckets.forEach((bucket: SearchFacetBucket) => {
        this.addNodesToMap(bucket, map);
        map.set(bucket.bucketKey(), bucket);
      });
    }
  }

  handleMore(key: string) {
    // Note that the key here is for the parent bucket...
    const newOpenness = new Map(this.state.openness);
    newOpenness.set(key, 'full');
    this.setState({
      openness: newOpenness,
    });
  }

  handleClick(key: string) {
    const element = this.linkRefs.get(key);
    if (element) {
      element.blur();
    }
    const bucket = this.state.bucketMap.get(key);
    if (bucket) {
      this.props.addFacetFilter(bucket);
    }
  }

  linkRefs: Map<string, any> = new Map();

  createNodeContents(bucket: SearchFacetBucket) {
    const key = bucket.bucketKey();
    return (
      <div style={{ display: 'inline-block' }}>
        <a
          onClick={() => { this.handleClick(key); }}
          role="button"
          tabIndex={0}
          ref={(a) => {
            this.linkRefs.set(key, a);
          }}
        >
          {bucket.displayLabel()}
        </a>
        {' '}
        <span>
          ({bucket.count})
        </span>
      </div>
    );
  }

  createNodesFromBucket(bucket: SearchFacetBucket): HierarchicalNode {
    let childNodes;
    if (bucket.children && bucket.children.length > 0) {
      childNodes = bucket.children.map((childBucket: SearchFacetBucket) => {
        return this.createNodesFromBucket(childBucket);
      });
    } else {
      childNodes = [];
    }
    const contents = this.createNodeContents(bucket);
    return new HierarchicalNode(contents, bucket.bucketKey(), childNodes);
  }

  render() {
    const openNodes = Array.from(this.state.openness.keys());
    return (
      <HierarchicalList
        root={this.state.root}
        openNodes={openNodes}
        onToggle={this.toggleNode}
      />
    );
  }
}
