// @flow

import React from 'react';

import HierarchicalList, { HierarchicalNode } from './HierarchicalList';
import SearchFacetBucket from '../api/SearchFacetBucket';
import ObjectUtils from '../util/ObjectUtils';

type HierarchicalFacetContentsProps = {
  buckets: Array<SearchFacetBucket>;
  addFacetFilter: (bucket: SearchFacetBucket, label: string) => void;
};

type OpenState = 'closed' | 'open' | 'full';

type HierarchicalFacetContentsState = {
  root: HierarchicalNode;
  openness: Map<string, OpenState>;
  bucketMap: Map<string, SearchFacetBucket>;
};

export default class HierarchicalFacetContents extends React.Component<void, HierarchicalFacetContentsProps, HierarchicalFacetContentsState> { // eslint-disable-line max-len
  static displayName = 'HierarchicalFacetContents';

  constructor(props: HierarchicalFacetContentsProps) {
    super(props);

    this.state = this.getStateForBuckets(this.props.buckets);

    (this: any).toggleNode = this.toggleNode.bind(this);
    (this: any).handleMore = this.handleMore.bind(this);
    (this: any).handleClick = this.handleClick.bind(this);
  }

  state: HierarchicalFacetContentsState;

  componentWillReceiveProps(newProps: HierarchicalFacetContentsProps) {
    if (!ObjectUtils.deepEquals(this.props.buckets, newProps.buckets)) {
      this.setState(this.getStateForBuckets(newProps.buckets));
    }
  }

  shouldComponentUpdate(nextProps: HierarchicalFacetContentsProps, nextState: HierarchicalFacetContentsState) {
    const shouldDoIt = !ObjectUtils.deepEquals(this.props, nextProps)
      || !ObjectUtils.deepEquals(this.state, nextState);
    return shouldDoIt;
  }

  getStateForBuckets(buckets: Array<SearchFacetBucket>): HierarchicalFacetContentsState {
    const topLevelNodes = buckets.map((bucket: SearchFacetBucket) => {
      return this.createNodesFromBucket(bucket);
    });
    const root = new HierarchicalNode('', '', topLevelNodes);
    const bucketMap = new Map();
    this.addNodesToMap(buckets, bucketMap);

    const newOpenness: Map<string, OpenState> = new Map();
    if (this.state && this.state.openness) { // Won't be set when called from the constructor
      this.state.openness.forEach((value: OpenState, key: string) => {
        // If the key is in the new bucket map, copy it to the new openness map
        // so open nodes stay open
        const bucketForKey = bucketMap.get(key);
        if (bucketForKey) {
          newOpenness.set(key, value);
        }
      });
    }
    return {
      openness: newOpenness,
      root,
      bucketMap,
    };
  }

  getBucketParent(bucket: SearchFacetBucket): ?SearchFacetBucket {
    const allBuckets = Array.from(this.state.bucketMap.values());
    const parent = allBuckets.find((potentialParent: SearchFacetBucket) => {
      if (potentialParent.children) {
        const matchingChild = potentialParent.children.find((sameChild: SearchFacetBucket) => {
          return sameChild.filter === bucket.filter;
        });
        if (matchingChild) {
          // we found "bucket" as a child of potential parent, so call Jerry Springer...
          return true;
        }
      }
      return false;
    });
    return parent;
  }

  getHierarchicalBucketLabel(bucket: SearchFacetBucket): string {
    const bucketLabel = bucket.displayLabel();
    const parent = this.getBucketParent(bucket);
    if (parent) {
      const parentLabel = this.getHierarchicalBucketLabel(parent);
      return `${parentLabel} >>> ${bucketLabel}`;
    }
    return bucketLabel;
  }

  toggleNode(key: string, open: boolean) {
    const newOpenness = new Map(this.state.openness);
    const newOpenState = open ? 'open' : 'closed';
    newOpenness.set(key, newOpenState);
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
      const bucketLabel = this.getHierarchicalBucketLabel(bucket);
      this.props.addFacetFilter(bucket, bucketLabel);
    }
  }

  addNodesToMap(buckets: Array<SearchFacetBucket>, map: Map<string, SearchFacetBucket>) {
    if (buckets && buckets.length > 0) {
      buckets.forEach((bucket: SearchFacetBucket) => {
        map.set(bucket.bucketKey(), bucket);
        if (bucket.children && bucket.children.length > 0) {
          this.addNodesToMap(bucket.children, map);
        }
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
