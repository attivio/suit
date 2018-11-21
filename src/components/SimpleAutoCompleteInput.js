/* eslint-disable react/no-multi-comp */
// @flow
import React from 'react';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import { RootCloseWrapper } from 'react-overlays';

type AutoCompleteInputProps = {
  /**
   * A unique ID for the input. This is required to make the
   * pop-up work properly.
   *
   * The same value will be added as an
   * attribute called "data-id" on the actual input element
   * to enable it to be styled with CSS.
   */
  id: string;
  /**
   * The callback that is used to tell the parent that the value
   * has changed. If the "chosen" parameter is true, then the
   * user has actually chosen the value.
   */
  updateValue: (newValue: string, chosen: boolean) => void;
  /**
   * Placeholder text to show in the input when it's empty. Optional.
   */
  placeholder: string;
  /**
   * The value of the input field.  The state or whatever is used to
   * set this value should be updated when the updateValue() callback
   * is called.
   */
  value: string;
  /**
   * The static list of possible values. Shouldn't ever be empty
   * (if there are no options, then the component probably shouldn't
   * be included at all.
   */
  values: Array<string>;
  /**
   * If set, then even values not in the list of values can be
   * entered. Otherwise, we don't let users submit items that
   * aren't on the list.
   */
  allowCustomValues: boolean;
  /**
   * If set, then the input is disabled.
   */
  disabled: boolean;
  /**
   * The CSS class name to apply to the outer &lt;div&gt;. Optional.
   */
  className: string;
  /**
   * Specific CSS styling to apply to the &lt;input&gt; element. Optional.
   */
  style: any;
  /**
   * Specific CSS styling to apply to the outer &lt;div&gt; element. Optional.
   */
  outerStyle: any;
};

type AutoCompleteInputDefaultProps = {
  placeholder: string;
  allowCustomValues: boolean;
  disabled: boolean;
  className: string;
  style: any;
  outerStyle: any;
};

type AutoCompleteInputState = {
  suggestions: Array<string>;
  open: boolean;
  cursor: number;
  queryValue: string;
};

/**
 * A component to do autocomplete. It differs from the AutoCompleteInput
 * component in that it uses a static list of options and not a dynamically
 * fetched one. Also, since it doesn't have the expense of doing the fetch,
 * the look up and suggestions happen with the first key stroke instead of
 * waiting to have at least three characters.
 */
export default class SimpleAutoCompleteInput extends React.Component<AutoCompleteInputDefaultProps, AutoCompleteInputProps, AutoCompleteInputState> { // eslint-disable-line max-len
  static defaultProps = {
    placeholder: '',
    allowCustomValues: false,
    disabled: false,
    className: '',
    style: {},
    outerStyle: {},
  };

  static displayName = 'SimpleAutoCompleteInput';

  constructor(props: AutoCompleteInputProps) {
    super(props);
    this.state = {
      open: false,
      suggestions: [],
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
    this.closeMenu();
  }

  closeMenu() {
    this.setState({
      cursor: -1,
      open: false,
      suggestions: [],
      queryValue: '',
    });
  }

  findSuggestions(query: string): Array<string> {
    if (query && query.length > 0) {
      const lowercaseFilter = query.toLocaleLowerCase();
      return this.props.values.filter((value: string) => {
        if (value.toLocaleLowerCase().startsWith(lowercaseFilter)) {
          return true;
        }
        return false;
      });
    }
    return [];
  }

  handleChange(event: Event & { currentTarget: HTMLInputElement }) {
    const query = event.currentTarget.value;
    this.props.updateValue(query, false);
    if (!query || query.length === 0) {
      this.setState({
        queryValue: '',
        open: false,
        suggestions: [],
      });
    } else {
      const suggestions = this.findSuggestions(query);
      const open = suggestions.length > 0;
      if (query && query.length > 0) {
        this.setState({
          queryValue: query,
          open,
          suggestions,
        });
      }
    }
  }

  submitChoice(choice: string) {
    let valueToSubmit = choice;
    if (!this.props.allowCustomValues) {
      // If we don't allow custom values, we need to make sure that the
      // choice is in the list of possible values before calling the
      // callback.
      const lcChoice = choice.toLocaleLowerCase();
      valueToSubmit = this.props.values.find((value: string) => {
        return value.toLocaleLowerCase() === lcChoice;
      });
    }
    if (valueToSubmit) {
      this.props.updateValue(valueToSubmit, true);
      this.closeMenu();
    }
  }

  doKeyPress(event: Event & { currentTarget: HTMLInputElement, keyCode: number }) {
    const suggestions = this.state.suggestions;
    // This condition is satisfied when a user presses the enter key.
    if (event.keyCode === 13) {
      const query = event.currentTarget.value;
      this.submitChoice(query);
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
    const menuItems = this.state.suggestions.map((suggestion, i) => {
      const activeState = this.state.cursor === i;
      return (
        <MenuItem
          eventKey={suggestion}
          key={suggestion}
          active={activeState}
        >
          {suggestion}
        </MenuItem>
      );
    });

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
          style={this.props.outerStyle}
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
            data-id={this.props.id}
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
