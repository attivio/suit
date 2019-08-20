/* eslint-disable react/no-multi-comp */
// @flow
import React from 'react';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import { RootCloseWrapper } from 'react-overlays';
import SignalData from '../api/SignalData';

import FetchUtils from '../util/FetchUtils';
import StringUtils from '../util/StringUtils';

type AutoCompleteInputProps = {
  /**
   * The ID to give the outer dropdown component for the
   * menu of suggestions. Defaults to "autocomplete" and only
   * needs to be provided (with unique values) if there are
   * multiple AutoCompleteInput components on the same page.
   */
  id: string;
  /**
   * The URI to call to get the list of autocomplete suggestions for
   * the text the user has typed. It will be passed a single parameter
   * called "term" that contains the user's query. The call should return
   * an array of objects which each contain a "label" property containing
   * the text of the suggestion.
   */
  uri: string | null;
  /**
   * The callback used when the user edits the text in the <input> element
   * or chooses an item from the suggestion menu. If a suggestion is chosen,
   * then the doSearch parameter will be set to true and it is expected that
   * the callee will trigger a new query with the given query string passed
   * as newValue. A signal object is passed as well and the callee can use it
   * to add a signal to the server tracking the user's autocomplete choice.
   */
  updateValue: (newValue: string, doSearch: boolean, signalData?: SignalData) => void;
  /**
   * A placeholder string to display in the <input> element.
   */
  placeholder: string;
  /**
   * The current value of the underlying <input> element.
   */
  value: string;
  /**
   * If true, the component will be disabled.
   */
  disabled: boolean;
  /**
   * Any CSS class that should be applied on the underlying <input> component.
   */
  className: string;
  /**
   * Any CSS styling that should be applied on the underlying <input> component.
   */
  style: any;
  /**
   * This is called when the user uses the escape key to close the
   * autocomplete suggestion menu.
   */
  onEscape?: () => void;
  /**
   * If set, then the autocomplete input will allow punctuation
   * to be passed from suggestions to the underlying input. (By default,
   * punctuation is stripped out to prevent issues with the Attivio
   * Simple Query Language, except for a couple cases—see the method
   * normalizeAutocompleteSuggestion() method in StringUtils.js for
   * more detail.)
   */
  allowPunctuation: boolean;
};

type AutoCompleteInputDefaultProps = {
  id: string;
  placeholder: string;
  value: string;
  disabled: boolean;
  className: string;
  style: any;
  allowPunctuation: boolean;
};

type AutoCompleteInputState = {
  isLoading: boolean;
  suggestions: Array<string>;
  error: string;
  open: boolean;
  cursor: number;
  queryValue: string;
  userInput: string;
  queryTimestamp: number;
  queryIsAutocomplete: boolean;
};

export default class AutoCompleteInput extends React.Component<AutoCompleteInputDefaultProps, AutoCompleteInputProps, AutoCompleteInputState> { // eslint-disable-line max-len
  static defaultProps = {
    id: 'autocomplete',
    placeholder: '',
    value: '',
    disabled: false,
    className: '',
    style: {},
    allowPunctuation: false,
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
      userInput: this.props.value,
      queryTimestamp: 0,
      queryIsAutocomplete: false,
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
    this.updateValueAndAddSignal(newValue, true);
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
          userInput: query,
          queryTimestamp: Date.now(),
          queryIsAutocomplete: false,
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
        FetchUtils.fetch(`${uri}?term=${encodedValue}`, null, callback, 'GET', 'An error occured while looking for suggestions.');
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

  updateValueAndAddSignal(newQuery: string, doSearch: boolean = false) {
    const { suggestions, queryTimestamp, userInput } = this.state;
    const { updateValue, allowPunctuation } = this.props;
    const docOrdinal = suggestions.findIndex((suggestion) => {
      return suggestion === newQuery;
    });
    const signalData = new SignalData();
    // index starts at 1
    signalData.docOrdinal = docOrdinal + 1;
    signalData.query = userInput;
    signalData.queryTimestamp = queryTimestamp;

    let queryToSet = newQuery;
    if (!allowPunctuation) {
      queryToSet = StringUtils.normalizeAutocompleteSuggestion(newQuery);
    }

    this.setState({
      queryValue: queryToSet,
      userInput: queryToSet,
    }, () => {
      updateValue(queryToSet, doSearch, signalData);
    });
  }

  doKeyPress(event: Event & { currentTarget: HTMLInputElement, keyCode: number }) {
    const { suggestions } = this.state;
    // This condition is satisfied when a user presses the enter key.
    if (event.keyCode === 13) {
      const query = event.currentTarget.value;
      // This condition is satisfied when the user presses the enter key
      // after selecting entry from the autocomplete list
      if (this.state.queryIsAutocomplete) {
        this.updateValueAndAddSignal(query, true);
      } else {
        this.props.updateValue(query, true);
      }
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
        queryIsAutocomplete: true,
      });
    } else if (event.keyCode === 38 && this.state.cursor > 0) {
      // This condition is satisfied when a user presses the up arrow key.
      const newCursor = this.state.cursor - 1;
      const value = suggestions[newCursor];
      this.setState({
        cursor: newCursor,
        queryValue: value,
        queryIsAutocomplete: true,
      });
    } else if (event.keyCode === 27 && this.props.onEscape) {
      // This condition is satisfied when a user presses the escape key
      this.props.onEscape();
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
            onInput={this.handleChange}
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
