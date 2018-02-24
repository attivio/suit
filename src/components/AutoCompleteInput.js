/* eslint-disable react/no-multi-comp */
// @flow
import React from 'react';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import { RootCloseWrapper } from 'react-overlays';

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
};

export default class AutoCompleteInput extends React.Component<AutoCompleteInputDefaultProps, AutoCompleteInputProps, AutoCompleteInputState> { // eslint-disable-line max-len
  // Start looking for autocomplete values when there are at least 3 characters in the input field
  static AUTOCOMPLETE_THRESHOLD = 2;

  static defaultProps = {
    id: 'autocomplete',
    placeholder: '',
    value: '',
    disabled: false,
    className: '',
    style: {},
  };

  constructor(props: AutoCompleteInputProps) {
    super(props);
    this.state = {
      isLoading: false,
      suggestions: [],
      error: '',
      open: false,
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
    this.closeMenu();
  }

  closeMenu() {
    this.setState({
      isLoading: false,
      suggestions: [],
      error: '',
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
        });
        fetch(`${uri}?term=${encodedValue}`, { credentials: 'include' }).then((response) => {
          response.json().then((data) => {
            const suggestions = Array.isArray(data) ? data.map((item) => {
              return item.label;
            }) : [];
            const open = suggestions.length > 0;
            this.setState({
              isLoading: false,
              suggestions,
              error: '',
              open,
            });
          }).catch((error) => {
            this.setState({
              isLoading: false,
              suggestions: [],
              error,
              open: error.length > 0,
            });
          });
        }, (error) => {
          this.setState({
            isLoading: false,
            suggestions: [],
            error,
            open: error.length > 0,
          });
        });
      }
    } else {
      this.setState({
        isLoading: false,
        suggestions: [],
        error: '',
        open: false,
      });
    }
  }

  doKeyPress(event: Event & { currentTarget: HTMLInputElement, keyCode: number }) {
    if (event.keyCode === 13) {
      const query = event.currentTarget.value;
      this.props.updateValue(query, true);
    }
  }

  render() {
    const menuItems = [];
    if (this.state.error && this.state.error.length > 0) {
      menuItems.push(<MenuItem eventKey="error" disabled>{this.state.error}</MenuItem>);
    } else if (this.state.loading) {
      menuItems.push(<MenuItem eventKey="loading" disabled>{'Loading\u2026'}</MenuItem>);
    } else {
      this.state.suggestions.forEach((suggestion) => {
        menuItems.push((
          <MenuItem
            eventKey={suggestion}
            key={suggestion}
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
            value={this.props.value}
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
