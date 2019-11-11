// @flow
import * as React from 'react';

type NavbarSearchProps = {
  /** The placeholder to show when the field is empty. Defaults to "Search…" */
  placeholder: string;
  /** The current value of the search field. */
  value: string;
  /** The function to call when the user changes the contents of the search field. */
  updateSearchString: (newValue: string) => void;
  /** The function to call when the user presses enter or clicks the search button */
  onSearch: () => void;
};

type NavbarSearchDefaultProps = {
  placeholder: string;
};

/**
 * A search bar to include inside a Navbar component. This isn't connected to
 * a Searcher component but is instead to be used for operations such as filtering.
 */
export default class NavbarSearch extends React.Component<NavbarSearchProps, void> {
  static defaultProps: NavbarSearchDefaultProps = {
    placeholder: 'Search\u2026',
  };

  static displayName = 'NavbarSearch';

  constructor(props: NavbarSearchProps) {
    super(props);
    (this: any).onChange = this.onChange.bind(this);
    (this: any).onSearch = this.onSearch.bind(this);
  }

  onChange(e: Event) {
    if (e.target instanceof HTMLInputElement) {
      this.props.updateSearchString(e.target.value);
    }
  }

  onSearch() {
    this.props.onSearch();
    if (this.button) {
      this.button.blur();
    }
  }

  doKeyPress = (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
    // If the user presses enter, do the search
    if (e.keyCode === 13) {
      this.onSearch();
    }
  }

  button: ?HTMLButtonElement;

  render() {
    const { placeholder, value, updateSearchString, onSearch, ...otherProps } = this.props; // eslint-disable-line no-unused-vars

    return (
      <div className="navbar-form navbar-left attivio-search" {...otherProps}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder={this.props.placeholder}
            value={this.props.value}
            onChange={this.onChange}
            onKeyDown={this.doKeyPress}
          />
        </div>
        <button
          type="button"
          className="btn btn-link attivio-icon-search"
          onClick={this.onSearch}
          ref={(i) => {
            /* $FlowFixMe This comment suppresses an error found when upgrading
             * Flow to v0.107.0. To view the error, delete this comment and run
             * Flow. */
            this.button = i;
          }}
        >
          <span className="sr-only">Search</span>
        </button>
      </div>
    );
  }
}
