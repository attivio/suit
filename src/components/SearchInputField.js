// @flow
import React from 'react';
import PropTypes from 'prop-types';

import SearchButton from './SearchButton';

type SearchInputFieldProps = {
  /** The placeholder to display if the field is empty. Defaults to "Search…". */
  placeholder: string;
};

type SearchInputFieldDefaultProps = {
  placeholder: string;
};

/**
 * This component renders an input field for entering a query string
 * for doing a search. It interacts with its parent Searcher component
 * to actually perform the search and the results will be displayed in
 * other children of the Searcher. It is designed to be used outside of
 * the masthead, unlike the <code>SearchBar</code> component.
 */
export default class SearchInputField extends React.Component<SearchInputFieldDefaultProps, SearchInputFieldProps, void> {
  static defaultProps = {
    placeholder: 'Search\u2026',
  };

  static contextTypes = {
    searcher: PropTypes.any,
  };

  static displayName = 'SearchInputField';

  constructor(props: SearchInputFieldProps) {
    super(props);
    (this: any).updateQuery = this.updateQuery.bind(this);
    (this: any).keyPressed = this.keyPressed.bind(this);
    (this: any).doSearch = this.doSearch.bind(this);
  }

  updateQuery(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      const searcher = this.context.searcher;
      searcher.updateQuery(event.target.value);
    }
  }

  keyPressed(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      if (event.key === 'Enter') {
        this.doSearch();
      }
    }
  }

  doSearch() {
    const searcher = this.context.searcher;
    searcher.doSearch();
  }

  render() {
    const style = {
      height: '2em',
      padding: '1em',
      borderRadius: '5px',
      border: '1px solid #ccc',
      width: '500px',
    };

    const searcher = this.context.searcher;
    let query = '';
    if (searcher) {
      query = searcher.state.query;
    }

    return (
      <span>
        <input
          type="text"
          defaultValue={query}
          placeholder={this.props.placeholder}
          onChange={this.updateQuery}
          style={style}
          onKeyPress={this.keyPressed}
        />
        <SearchButton doSearch={this.doSearch} />
      </span>
    );
  }
}
