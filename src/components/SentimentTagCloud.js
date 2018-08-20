// @flow

import React from 'react';

export class SentimentTagCloudValue {
  /** The string to display in the list. */
  label: string;
  /** The value for this item. */
  value: number;
  /** The sentiment for this item. */
  sentiment: string;

  constructor(label: string, value: number, sentiment: string) {
    this.label = label;
    this.value = value;
    this.sentiment = sentiment;
  }
}

type SentimentTagCloudProps = {
  /** The names and values for positive keyphrases to display. */
  positiveTags: Array<SentimentTagCloudValue>;
  /** The names and values for negative keyphrases to display. */
  negativeTags: Array<SentimentTagCloudValue>;
  /**
   * The maximum number of items to show in the tag cloud. If there
   * are more than this many items, only this many, with the highest
   * value fields, will be shown. Defaults to 15.
   */
  maxValues: number;
  /**
   * A function that will get called with the selected SentimentTagCloudValue
   * object if one is clicked.
   */
  callback: (tcv: SentimentTagCloudValue) => void;
};

type SentimentTagCloudDefaultProps = {
  maxValues: number;
};

/**
 * Display a linear tag "cloud" where the items are proportionally sized
 * based on an associated value.
 */
export default class SentimentTagCloud extends React.Component<SentimentTagCloudDefaultProps, SentimentTagCloudProps, void> {
  static defaultProps = {
    maxValues: 15,
  };

  static displayName = 'SentimentTagCloud';

  static SentimentTagCloudValue;

  static mapRange(num, sentiment) {
    if (sentiment === 'positive') {
      const inMin = 1;
      const inMax = 8;
      const outMin = 6;
      const outMax = 10;
      return (((num - inMin) * (outMax - outMin)) / (inMax - inMin)) + outMin;
    } else if (sentiment === 'negative') {
      const inMin = 1;
      const inMax = 8;
      const outMin = 1;
      const outMax = 5;
      return (((num - inMin) * (outMin - outMax)) / (inMax - inMin)) + outMax;
    }
    return -1;
  }

  static getAdjustedValue(value: number, max: number, sentiment: string): number {
    const ratio = value / max;
    const timesSeven = ratio * 7;
    const oneThroughEight = Math.round(timesSeven) + 1;
    const mappedValue = this.mapRange(oneThroughEight, sentiment);
    return Math.round(mappedValue);
  }

  render() {
    let tagCloudValues = this.props.positiveTags.concat(this.props.negativeTags);
    const maxValue = tagCloudValues.reduce((max, tcv) => {
      return Math.max(tcv.value, max);
    }, 0,
    );

    if (tagCloudValues.length > this.props.maxValues) {
      // Sort numerically by value
      tagCloudValues.sort((tcv1: SentimentTagCloudValue, tcv2: SentimentTagCloudValue) => {
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
    tagCloudValues.sort((tcv1: SentimentTagCloudValue, tcv2: SentimentTagCloudValue) => {
      return tcv1.label.localeCompare(tcv2.label);
    });

    const cloudItems = tagCloudValues.map((tcv) => {
      const size = SentimentTagCloud.getAdjustedValue(tcv.value, maxValue, tcv.sentiment);
      const callback = (event: Event & { target: HTMLAnchorElement }) => {
        this.props.callback(tcv);
        event.target.blur();
      };
      return (
        <li key={tcv.label}>
          <a className={`attivio-sentiment-cloud-level-${size}`} onClick={callback} role="button" tabIndex={0}>
            {tcv.label}
          </a>
        </li>
      );
    });

    return (
      <ul className="attivio-sentiment-cloud list-inline">
        {cloudItems}
      </ul>
    );
  }
}

SentimentTagCloud.SentimentTagCloudValue = SentimentTagCloudValue;
