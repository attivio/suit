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

  noLink: boolean;
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
    noLink: false,
  };

  static displayName = 'TagCloud';

  static TagCloudValue;

  static getAdjustedValue(value: number, min: number, max: number): number {
    if (max === min) {
      // Special case where there's no variation... just use a "middling" value
      return 4;
    }
    // Make sure we only base the adjusted values on the range of min - max
    // rather than on the absolute values of the items.
    const ratio = (value - min) / (max - min);
    // Get a value from 0 to 7
    const timesSeven = ratio * 7;
    // Make it into an integer between 1 and 8, inclusive
    const oneThroughEight = Math.round(timesSeven) + 1;
    return oneThroughEight;
  }

  /**
   * Get the CSS class name to use for the tag level.
   * Note that we do this rather than something like
   * `attivio-cloud-level-${level}` because having
   * synthetic class names here can lead to them being
   * missed when doing searches/replaces, etc.
   */
  static getClassNameForLevel(level: number): string {
    switch (level) {
      case 1:
        return 'attivio-cloud-level-1';
      case 2:
        return 'attivio-cloud-level-2';
      case 3:
        return 'attivio-cloud-level-3';
      case 4:
        return 'attivio-cloud-level-4';
      case 5:
        return 'attivio-cloud-level-5';
      case 6:
        return 'attivio-cloud-level-6';
      case 7:
        return 'attivio-cloud-level-7';
      case 8:
        return 'attivio-cloud-level-8';
      default:
        return 'attivio-cloud-level-4';
    }
  }

  render() {
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

    const maxValue = tagCloudValues.reduce((max, tcv) => {
      return Math.max(tcv.value, max);
    }, 0,
    );
    const minValue = tagCloudValues.reduce((min, tcv) => {
      return Math.min(tcv.value, min);
    }, maxValue,
    );

    // Sort alphabetically by label
    tagCloudValues.sort((tcv1: TagCloudValue, tcv2: TagCloudValue) => {
      return tcv1.label.localeCompare(tcv2.label);
    });

    const cloudItems = tagCloudValues.map((tcv) => {
      const size = TagCloud.getAdjustedValue(tcv.value, minValue, maxValue);
      const callback = (event: Event & { target: HTMLAnchorElement }) => {
        this.props.callback(tcv);
        event.target.blur();
      };
      const className = TagCloud.getClassNameForLevel(size);
      return (
        this.props.noLink ? (<li key={tcv.label}>
          <span className={className}>
            {tcv.label}
          </span>
        </li>) : (<li key={tcv.label}>
          <a className={className} onClick={callback} role="button" tabIndex={0}>
            {tcv.label}
          </a>
        </li>)
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
