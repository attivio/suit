// @flow

import React from 'react';
import type { Node } from 'react';

import DisclosureTriangle from './DisclosureTriangle';
import ObjectUtils from '../util/ObjectUtils';

/**
 * Class representing a single node in the hierarchical list's tree.
 */
export class HierarchicalNode {
  constructor(contents: Node, key: string, children: Array<HierarchicalNode> = []) {
    this.contents = contents;
    this.key = key;
    this.children = children;
  }

  /** The contents to render for the node. */
  contents: Node;
  /** A unique key for the node. */
  key: string;
  /** Any children of the node. */
  children: Array<HierarchicalNode>;
}

type HierarchicalListProps = {
  /** The root node. Should have its key set to null. */
  root: HierarchicalNode;
  /** An array containing the keys of all open nodes in the tree. This is maintained by the parent. */
  openNodes: Array<string>;
  /** Callback when the node's disclosure triangle is clicked to open/close it. */
  onToggle: (key: string, open: boolean) => void;
};

/**
 * Component to render tree of data in a hierarchical list format where nodes which have children
 * can be opened/closed by the user.
 */
export default class HierarchicalList extends React.Component<void, HierarchicalListProps, void> {
  static HierarchicalNode;

  static displayName = 'HierarchicalList';

  constructor(props: HierarchicalListProps) {
    super(props);
    (this: any).toggleRow = this.toggleRow.bind(this);
  }

  shouldComponentUpdate(nextProps: HierarchicalListProps) {
    return !ObjectUtils.deepEquals(this.props, nextProps);
  }

  toggleRow(key: string) {
    const newOpen = !this.props.openNodes.includes(key);
    this.props.onToggle(key, newOpen);
  }

  renderChildren(parent: HierarchicalNode, level: number = 0): Array<Node> {
    // We only get here if the parent node is open...
    if (parent.children && parent.children.length > 0) {
      const contents = parent.children.map((child: HierarchicalNode) => {
        // Create a spacer to indent nested items
        const spacerWidth = level > 0 ? `${level * 20}px` : 0;
        const spacer = (
          <span
            style={{
              display: 'inline-block',
              width: spacerWidth,
            }}
          />
        );

        const hasChildren = child.children && child.children.length > 0;
        const isOpen = hasChildren && this.props.openNodes.includes(child.key);

        let thisRow;
        if (hasChildren) {
          thisRow = (
            <div key={child.key}>
              {spacer}
              <DisclosureTriangle
                open={isOpen}
                onToggle={() => { this.toggleRow(child.key); }}
                style={{
                  display: 'inline-block',
                  width: '20px',
                  fontSize: '0.8em',
                  color: '#333',
                }}
              />
              {child.contents}
            </div>
          );
        } else {
          // No children, include a second spacer to account for the width of the missing disclosure triangle
          thisRow = (
            <div key={child.key}>
              {spacer}
              <span style={{ width: '20px', display: 'inline-block' }} />
              {child.contents}
            </div>
          );
        }
        if (hasChildren && isOpen) {
          // There are deeper kids, we need to render them too
          const grandchildren = this.renderChildren(child, level + 1);
          grandchildren.unshift(thisRow);
          return grandchildren;
        }
        // No further children... just return the current row.
        return [thisRow];
      });
      return contents;
    }
    return [];
  }

  render() {
    if (this.props.root && this.props.root.children && this.props.root.children.length > 0) {
      const children = this.renderChildren(this.props.root);
      return (
        <div>
          {children}
        </div>
      );
    }

    return null;
  }
}

HierarchicalList.HierarchicalNode = HierarchicalNode;
