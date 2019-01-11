// @flow

import React from 'react';
import type { Node } from 'react';
import validator from 'validator';

export class LabeledDataPair {
  label: string;
  value: string | Node;

  constructor(label: string, value: string | Node) {
    this.label = label;
    this.value = value;
  }
}

type LabeledDataProps = {
  /** The names and values. Defaults to an empty array. */
  data: Array<LabeledDataPair>;
  /**
   * If true, then the labels appear on top of the values
   * instead of in a two-column format.
   */
  stacked: boolean;
};

/**
 * Present a collection of name/value pairs. The values can
 * be either simple strings or entire React elements. If the
 * value is a string and appears to be a URL, it will be rendered
 * as a link that will navigate to that URL.
 */
export default class LabeledData extends React.Component<LabeledDataProps> {
  static defaultProps = {
    data: [],
    stacked: false,
  };

  static displayName = 'LabeledData';

  static LabeledDataPair: typeof LabeledDataPair;

  render() {
    const className = this.props.stacked ? 'attivio-labeldata-stacked' : 'attivio-labeldata-2col';
    const rows = [];
    this.props.data.forEach((item: LabeledDataPair) => {
      rows.push(<dt key={`${item.label}-label`}>{item.label}</dt>);
      if (typeof item.value === 'string' && validator.isURL(item.value)) {
        rows.push((
          <dd className="attivio-labeldata-url" key={`${item.label}-value`}>
            <a href={item.value} target="_blank" rel="noopener noreferrer">
              {item.value}
            </a>
          </dd>
        ));
      } else {
        rows.push((
          <dd key={`${item.label}-value`}>
            <span>{item.value}</span>
          </dd>
        ));
      }
    });

    return (
      <dl className={className}>
        {rows}
      </dl>
    );
  }
}

LabeledData.LabeledDataPair = LabeledDataPair;
