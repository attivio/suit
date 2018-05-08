/* eslint-disable react/no-multi-comp */
// @flow
import React from 'react';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import { RootCloseWrapper } from 'react-overlays';

import FetchUtils from '../util/FetchUtils';

type AutoCompleteInputProps = {
  id: string;
  uri: string | null;
  updateValue: (newValue: string, doSearch: boolean) => void;
  placeholder: string;
  value: string;
  disabled: boolean;
  className: string;
  style: any;
};

type AutoCompleteInputDefaultProps = {
  id: string;
  placeholder: string;
  value: string;
  disabled: boolean;
  className: string;
  style: any;
};

type AutoCompleteInputState = {
  isLoading: boolean;
  suggestions: Array<string>;
  error: string;
  open: boolean;
  cursor: number;
  queryValue: string;
};

export default class AutoCompleteInput extends React.Component<AutoCompleteInputDefaultProps, AutoCompleteInputProps, AutoCompleteInputState> { // eslint-disable-line max-len
  static defaultProps = {
    id: 'autocomplete',
    placeholder: '',
    value: '',
    disabled: false,
    className: '',
    style: {},
  };

  static displayName = 'AutoCompleteInput';

  // Start looking for autocomplete values when there are at least 3 characters in the input field
  static AUTOCOMPLETE_THRESHOLD = 2;

  constructor(props: AutoCompleteInputProps) {
    super(props);
    this.state = {
      isLoading: false,
      suggestions: [],
      error: '',
      open: false,
      cursor: -1,
      queryValue: this.props.value,
    };
    (this: any).closeMenu = this.closeMenu.bind(this);
    (this: any).handleChange = this.handleChange.bind(this);
    (this: any).doKeyPress = this.doKeyPress.bind(this);
    (this: any).valueSelected = this.valueSelected.bind(this);
    (this: any).onToggle = this.onToggle.bind(this);
  }

  state: AutoCompleteInputState;

  onToggle(isOpen: boolean) {
    this.setState({ open: isOpen });
  }

  valueSelected(newValue: string) {
    this.props.updateValue(newValue, true);
    this.setState({
      queryValue: newValue,
    });
    this.closeMenu();
  }

  closeMenu() {
    this.setState({
      isLoading: false,
      suggestions: [],
      error: '',
      cursor: -1,
    });
  }

  handleChange(event: Event & { currentTarget: HTMLInputElement }) {
    const query = event.currentTarget.value;
    this.props.updateValue(query, false);
    if (query && query.length > AutoCompleteInput.AUTOCOMPLETE_THRESHOLD) {
      const uri = this.props.uri;
      if (uri) {
        const encodedValue = encodeURIComponent(query);
        this.setState({
          isLoading: true,
          open: true,
          error: '',
          suggestions: [],
          queryValue: query,
        });

        const callback = (response: any | null, errorString: string | null) => {
          if (response) {
            const suggestions = Array.isArray(response) ? response.map((item) => {
              return item.label;
            }) : [];
            const open = suggestions.length > 0;
            this.setState({
              isLoading: false,
              suggestions,
              error: '',
              open,
            });
          } else if (errorString) {
            this.setState({
              isLoading: false,
              suggestions: [],
              error: errorString,
              open: errorString.length > 0,
            });
          }
        };
        FetchUtils.fetch(`${uri}?term=${encodedValue}`, null, callback, 'GET', 'An error occured while looking for suggestions: ');
      }
    } else {
      this.setState({
        isLoading: false,
        suggestions: [],
        error: '',
        open: false,
        queryValue: query,
      });
    }
  }

  doKeyPress(event: Event & { currentTarget: HTMLInputElement, keyCode: number }) {
    const { suggestions } = this.state;
    // This condition is satisfied when a user presses the enter key.
    if (event.keyCode === 13) {
      const query = event.currentTarget.value;
      this.props.updateValue(query, true);
      this.setState({
        suggestions: [],
        open: false,
      });
    } else if (event.keyCode === 40 && this.state.cursor < suggestions.length - 1) {
      // This condition is satisfied when a user presses the down arrow key.
      const newCursor = this.state.cursor + 1;
      const value = suggestions[newCursor];
      this.setState({
        cursor: newCursor,
        queryValue: value,
      });
    } else if (event.keyCode === 38 && this.state.cursor > 0) {
      // This condition is satisfied when a user presses the up arrow key.
      const newCursor = this.state.cursor - 1;
      const value = suggestions[newCursor];
      this.setState({
        cursor: newCursor,
        queryValue: value,
      });
    }
  }

  render() {
    const menuItems = [];
    if (this.state.error && this.state.error.length > 0) {
      menuItems.push(<MenuItem eventKey="error" disabled>{this.state.error}</MenuItem>);
    } else if (this.state.loading) {
      menuItems.push(<MenuItem eventKey="loading" disabled>{'Loading\u2026'}</MenuItem>);
    } else {
      this.state.suggestions.forEach((suggestion, i) => {
        const activeState = this.state.cursor === i;
        menuItems.push((
          <MenuItem
            eventKey={suggestion}
            key={suggestion}
            active={activeState}
          >
            {suggestion}
          </MenuItem>
        ));
      });
    }

    return (
      <RootCloseWrapper
        onRootClose={this.closeMenu}
      >
        <Dropdown
          id={this.props.id}
          onSelect={this.valueSelected}
          className="attivio-dropdown"
          open={this.state.open}
          onToggle={this.onToggle}
        >
          <input
            placeholder={this.props.placeholder}
            value={this.state.queryValue}
            className={this.props.className}
            style={this.props.style}
            disabled={this.props.disabled}
            onChange={this.handleChange}
            onKeyDown={this.doKeyPress}
          />
          <Dropdown.Toggle
            style={{ display: 'none' }}
          />
          <Dropdown.Menu
            style={this.props.style}
          >
            {menuItems}
          </Dropdown.Menu>
        </Dropdown>
      </RootCloseWrapper>
    );
  }
}
