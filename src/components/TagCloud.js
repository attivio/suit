// @flow

import React from 'react';

export class TagCloudValue {
  /** The string to display in the list. */
  label: string;
  /** The value for this item. */
  value: number;

  constructor(label: string, value: number) {
    this.label = label;
    this.value = value;
  }
}

type TagCloudProps = {
  /** The names and values to display. */
  tags: Array<TagCloudValue>;
  /**
   * The maximum number of items to show in the tag cloud. If there
   * are more than this many items, only this many, with the highest
   * value fields, will be shown. Defaults to 15.
   */
  maxValues: number;
  /**
   * A function that will get called with the selected TagCloudValue
   * object if one is clicked.
   */
  callback: (tcv: TagCloudValue) => void;
};

type TagCloudDefaultProps = {
  maxValues: number;
};

/**
 * Display a linear tag "cloud" where the items are proportionally sized
 * based on an associated value.
 */
export default class TagCloud extends React.Component<TagCloudDefaultProps, TagCloudProps, void> {
  static defaultProps = {
    maxValues: 15,
  };

  static displayName = 'TagCloud';

  static TagCloudValue;

  static getAdjustedValue(value: number, max: number): number {
    const ratio = value / max;
    const timesSeven = ratio * 7;
    const oneThroughEight = Math.round(timesSeven) + 1;
    return oneThroughEight;
  }

  render() {
    const maxValue = this.props.tags.reduce((max, tcv) => {
      return Math.max(tcv.value, max);
    }, 0,
    );

    let tagCloudValues = this.props.tags;
    if (tagCloudValues.length > this.props.maxValues) {
      // Sort numerically by value
      tagCloudValues.sort((tcv1: TagCloudValue, tcv2: TagCloudValue) => {
        if (tcv1.value === tcv2.value) {
          return 0;
        }
        if (tcv1.value < tcv2.value) {
          return 1;
        }
        return -1;
      });
      // Remove the items with the lowest values
      tagCloudValues = tagCloudValues.slice(0, this.props.maxValues);
    }

    // Sort alphabetically by label
    tagCloudValues.sort((tcv1: TagCloudValue, tcv2: TagCloudValue) => {
      return tcv1.label.localeCompare(tcv2.label);
    });

    const cloudItems = tagCloudValues.map((tcv) => {
      const size = TagCloud.getAdjustedValue(tcv.value, maxValue);
      const callback = (event: Event & { target: HTMLAnchorElement }) => {
        this.props.callback(tcv);
        event.target.blur();
      };
      return (
        <li key={tcv.label}>
          <a className={`attivio-cloud-level-${size}`} onClick={callback} role="button" tabIndex={0}>
            {tcv.label}
          </a>
        </li>
      );
    });

    return (
      <ul className="attivio-cloud list-inline">
        {cloudItems}
      </ul>
    );
  }
}

TagCloud.TagCloudValue = TagCloudValue;
