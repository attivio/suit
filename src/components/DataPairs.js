// @flow

import React from 'react';

export class DataPairInfo {
  /** The label shown describing the value. */
  label: string;
  /**
   * The type of the value which, if present, is used to add
   * an indicator for well-known categories.
   */
  type: string | null;
  /** The value for the pair. */
  value: string;

  constructor(label: string, value: string, type: (string | null) = null) {
    this.label = label;
    this.value = value;
    this.type = type;
  }
}

type DataPairsProps = {
  /** An array of DataPairInfo objects which should be displayed. */
  pairs: Array<DataPairInfo>;
};

type DataPairsState = {
  showingAll: boolean;
};

/**
* Display a list of name/value pairs, with optional category type indicators
* in a side-by-side, two-column list format.
*/
export default class DataPairs extends React.Component<void, DataPairsProps, DataPairsState> {
  static DataPairInfo;

  static MAX_CHARACTERS = 100;

  constructor(props: DataPairsProps) {
    super(props);
    (this: any).showAll = this.showAll.bind(this);
    this.state = {
      showingAll: false,
    };
  }

  state: DataPairsState;

  showAllLink: ?HTMLAnchorElement;

  showAll() {
    if (this.showAllLink) {
      this.showAllLink.blur();
    }
    this.setState({ showingAll: true });
  }

  render() {
    const rows = [];
    let haveTruncated = false;
    this.props.pairs.forEach((pair) => {
      let value = pair.value;
      if (!this.state.showingAll && pair.value.length > DataPairs.MAX_CHARACTERS) {
        haveTruncated = true;
        value = `${pair.value.substr(0, 100)}\u2026`;
      }

      if (pair.type && pair.type !== '') {
        // Have a real type, use that class name
        const className = `attivio-labeldata-2col-search-results-entity attivio-labeldata-2col-search-results-${pair.type}`;
        rows.push(<dt className={className} key={`${pair.label}-label`}>{pair.label}</dt>);
      } else {
        // Simple label
        rows.push(<dt key={`${pair.label}-label`}>{pair.label}</dt>);
      }
      rows.push(<dd key={`${pair.label}-value`}>{value}</dd>);
    });
    if (!this.state.showingAll && haveTruncated) {
      // Add the show all link...
      rows.push(<dt key="allData-label" />);
      rows.push((
        <dd key="allData-value">
          <a
            className="attivio-labeldata-2col-search-results-more"
            onClick={this.showAll}
            role="button"
            tabIndex={0}
            ref={(c) => {
              this.showAllLink = c;
            }}
          >
            {'All data\u2026'}
          </a>
        </dd>
      ));
    }

    return (
      <dl className="attivio-labeldata-2col attivio-labeldata-2col-search-results">
        {rows}
      </dl>
    );
  }
}

DataPairs.DataPairInfo = DataPairInfo;
