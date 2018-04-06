// @flow
import React from 'react';
import PropTypes from 'prop-types';

type SearchButtonProps = {
  /** The button’s label. Defaults to "Go". */
  label: string,
};

type SearchButtonDefaultProps = {
  label: string,
};

/**
 * A button that can triggering an Attivio search. It must be
 * inside a Searcher component. Note that the SearchBar component,
 * designed to be used in the Masthead component, already has its
 * own search button.
 */
export default class SearchButton extends React.Component<SearchButtonDefaultProps, SearchButtonProps, void> {
  static defaultProps = {
    label: 'Go',
  };

  static contextTypes = {
    searcher: PropTypes.any,
  };

  static displayName = 'SearchButton';

  constructor(props: SearchButtonProps) {
    super(props);
    (this: any).doSearch = this.doSearch.bind(this);
  }

  doSearch() {
    const searcher = this.context.searcher;
    if (searcher) {
      searcher.doSearch();
    }
  }

  render() {
    const style = {
      height: 'calc(2em - 4px)',
      backgroundColor: '#40ace2',
      border: 'none',
      borderRadius: '2px',
      color: 'white',
      left: '-34px',
      position: 'relative',
      fontWeight: 'bold',
    };

    return (
      <button type="button" onClick={this.doSearch} style={style}>{this.props.label}</button>
    );
  }
}
