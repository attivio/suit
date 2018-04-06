// @flow
import React from 'react';

type NavbarResultsProps = {
  /** The result message to display. */
  message: string;
}

/**
 * Displays a message about the results of your search.
 * It could be an error, a count of the documents found, etc.
 */
export default class NavbarResults extends React.Component<void, NavbarResultsProps, void> {
  static displayName = 'NavbarResults';

  render() {
    return <div className="attivio-globalmastnavbar-results">{this.props.message}</div>;
  }
}
