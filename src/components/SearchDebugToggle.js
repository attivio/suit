// @flow
import React from 'react';
import PropTypes from 'prop-types';

import ToggleSwitch from './ToggleSwitch';

type SearchDebugToggleProps = {
  /** The label to show for the menu. Defaults to "Details:". */
  label: string,
  /** If set, then the menu will be shown at the right end of the navbar. */
  right: boolean;
}

type SearchDebugToggleDefaultProps = {
  label: string,
  right: boolean;
}

/**
 * A toggle switch for deciding whether the search results should be shown in debug format.
 */
export default class SearchDebugToggle extends React.Component<SearchDebugToggleDefaultProps, SearchDebugToggleProps, void> { // eslint-disable-line max-len
  static defaultProps = {
    label: 'Details:',
    right: false,
  };

  static contextTypes = {
    searcher: PropTypes.any,
  };

  static displayName = 'SearchDebugToggle';

  render() {
    let isDebug = false;
    const searcher = this.context.searcher;
    if (searcher) {
      isDebug = searcher.state.format === 'debug';
    }

    const leftRight = this.props.right ? 'attivio-globalmastnavbar-right' : '';

    return (
      <div className={leftRight}>
        {this.props.label}
        {' '}
        <ToggleSwitch
          on={isDebug}
          onChange={(changingToDebug) => {
            if (searcher) {
              searcher.updateFormat(changingToDebug ? 'debug' : 'list');
            }
          }}
        />
      </div>
    );
  }
}
