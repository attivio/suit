// @flow

import React from 'react';

export type DetailsProps = {
  /**
   * The object to display in the details. May be null, in which case there is no selection
   * to display.
   */
  data: any;
};

/**
 * Component to display details for a row from the master-details component. This
 * placeholder/example one just shows the row data formatted as JSON.
 */
export default class Details extends React.Component<void, DetailsProps, void> {
  static displayName = 'Details';

  render() {
    let contents;

    if (this.props.data) {
      const data = Object.entries(this.props.data);
      const dataJson = data.map((obj) => { return JSON.stringify(obj, null, 2); });
      contents = (
        <pre style={{ backgroundColor: 'white' }}>
          {dataJson}
        </pre>
      );
    } else {
      contents = (
        <span className="none">
          Nothing selected.
        </span>
      );
    }

    return (
      <div>
        {contents}
      </div>
    );
  }
}
