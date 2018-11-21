// @flow

import React from 'react';

import Scrollable from './Scrollable';
import SimpleAutoCompleteInput from './SimpleAutoCompleteInput';

type LozengeFilterProps = {
  /** The title to display at the top of the list, as a header */
  title: string;
  /**
   * The string to display for the first item which is the selected
   * when not filtering.
   */
  allLabel: string;
  /**
   * The array of potential values to filter from.
   */
  values: Array<string>;
  /**
   * The number of values to display in the list initially (not counting
   * the "all" value). If there are more than this many items, then
   * the list becomes scrollable and the user can scroll up and down to
   * find them. If not specified, it defaults to 9 items (which, together
   * with the "all" item, makes 10 total).
   */
  itemCutoff: number;
  /**
   * If set, the picker lets the user choose multiple items at the same
   * time (selecting the "all" item will clear all other selections).
   */
  multiSelect: boolean;
  /**
   * The currently selected item(s). If multiSelect is set, then this can
   * be an array containing multiple items. If not, then this may be
   * a single string (if it is, if fact, an array, the first value will
   * be used). Null, the default, means that there is no filter currently
   * applied and the "all" item will be selected.
   */
  currentValue: Array<string> | string | null;
  /**
   * A callback sent when the user changes the selection. If multiSelect
   * is set, then newValue will be an array of strings otherwise it will
   * be a single string. In either case, a value of null means that the
   * user chose the "all" button, effectively removing the filter.
   */
  onChange: (newValue: Array<string> | string | null) => void;
  /**
   * The placeholder to use in the filter box if the component has more
   * items than will fit at once. Optional; defaults to "Filter…"
   */
  filterPlaceholder: string;
};

type LozengeFilterDefaultProps = {
  allLabel: string;
  itemCutoff: number;
  multiSelect: boolean;
  currentValue: Array<string> | string | null;
  filterPlaceholder: string;
};

type LozengeFilterState = {
  filterString: string;
  filteredItems: Array<string>;
};

export default class LozengeFilter extends React.Component<LozengeFilterDefaultProps, LozengeFilterProps, LozengeFilterState> {
  static defaultProps = {
    allLabel: 'All Items',
    itemCutoff: 9,
    multiSelect: false,
    currentValue: null,
    filterPlaceholder: 'Filter\u2026',
  };

  static displayName = 'LozengeFilter';

  constructor(props: LozengeFilterProps) {
    super(props);
    this.state = {
      filterString: '',
      filteredItems: [],
    };
    (this: any).itemClicked = this.itemClicked.bind(this);
  }

  state: LozengeFilterState;

  /**
   * Given a filter string the user has typed in, find any of the items in
   * our list that match it.
   */
  getFilteredItems(filterString: string): Array<string> {
    if (filterString.length > 0) {
      const lowercaseFilter = filterString.toLocaleLowerCase();
      return this.props.values.filter((value: string) => {
        if (value.toLocaleLowerCase().startsWith(lowercaseFilter)) {
          return true;
        }
        return false;
      });
    }
    return [];
  }

  makeItem(label: string, value: string | null, current: boolean) {
    const baseStyle = {
      display: 'block',
      width: '100%',
      lineHeight: '1em',
      paddingTop: '6px',
      paddingLeft: '8px',
      paddingBottom: '5px',
      paddingRight: '8px',
      marginBottom: '1px',
    };
    const additionalStyle = current ? {
      color: '#fff',
      backgroundColor: '#2e75b3',
      borderRadius: '3px',
      border: 'none',
    } : {
      color: '#000',
      backgroundColor: 'inherit',
      borderRadius: '3px',
      borderBottom: '1px solid #fff',
    };

    const style = Object.assign({}, baseStyle, additionalStyle);

    return (
      <div
        key={value}
        onClick={(event) => {
          this.itemClicked(event, value);
        }}
        role="button"
        tabIndex={0}
        style={style}
        ref={(item) => {
          if (typeof value === 'string') {
            this.divs.set(value, item);
          } else {
            this.divs.set('null', item);
          }
        }}
      >
        {label}
      </div>
    );
  }

  /**
   * Add the specified value to the multi-select selection.
   */
  addToSelection(value: string): Array<string> {
    let updatedSelection: Array<string>;
    if (typeof this.props.currentValue === 'string') {
      updatedSelection = [this.props.currentValue];
    } else if (Array.isArray(this.props.currentValue)) {
      updatedSelection = this.props.currentValue;
    } else {
      updatedSelection = [];
    }
    if (!updatedSelection.includes(value)) {
      updatedSelection.push(value);
    }
    return updatedSelection;
  }

  /**
   * Toggle the specified value in the multi-select selection.
   */
  toggleSelection(value: string): Array<string> {
    let updatedSelection: Array<string>;
    if (typeof this.props.currentValue === 'string') {
      updatedSelection = [this.props.currentValue];
    } else if (Array.isArray(this.props.currentValue)) {
      updatedSelection = this.props.currentValue;
    } else {
      updatedSelection = [];
    }
    const valueIndex = updatedSelection.indexOf(value);
    if (valueIndex > -1) {
      // It's already in the selection, need to remove it
      updatedSelection.splice(valueIndex, 1);
    } else {
      // It's not in the selection, so just add it
      updatedSelection.push(value);
    }
    return updatedSelection;
  }

  itemClicked(event: any, value: string | null) {
    let newSelection;
    // Single select case or clearing selection by using the "All" button
    if (value === null || !this.props.multiSelect) {
      // If it's null, we're clearing everything, so multi is moot
      // and if we're not multi, then we're replacing the existing
      // selection. In either case, we just use value as-is.
      newSelection = value;
    } else if (event.ctrlKey || event.metaKey) {
      // The user has the control key (command key on the Mac) down
      // while clicking, toggle the state instead of just selecting
      newSelection = this.toggleSelection(value);
    } else {
      // Normal multi-select case, just add the new value to the
      // selection if it's not already there
      newSelection = this.addToSelection(value);
    }
    if (Array.isArray(newSelection) && newSelection.length === 0) {
      newSelection = null;
    }
    // Make sure to remove focus from the item that was clicked
    const div = this.divs.get(value || 'null');
    if (div) {
      div.blur();
    }
    this.props.onChange(newSelection);
  }

  isSelected(item: string): boolean {
    if (this.props.currentValue === item) {
      // If the item is null or the selection is a single string,
      // this will tell us if it matches
      return true;
    } else if (Array.isArray(this.props.currentValue)) {
      // If the selection is an array, we need to check if item is in the array
      if (this.props.currentValue.includes(item)) {
        return true;
      }
    }
    return false;
  }

  divs: Map<string, HTMLDivElement> = new Map();

  render() {
    const items = this.props.values.map((value) => {
      return this.makeItem(value, value, this.isSelected(value));
    });

    const allItem = this.makeItem(this.props.allLabel, null, this.props.currentValue === null);

    let contents;
    if (this.props.values.length > this.props.itemCutoff) {
      // Set the height of the scrollable to fit the items we want to have visible and make the
      // user scroll for the rest (each item has a line height of 1em plus 6 pixels of padding
      // above and below).
      const height = `calc(${this.props.itemCutoff}em + ${(this.props.itemCutoff * 12) + 6}px)`;
      // In this case, we keep the "all" item outside the scrollable so it's always visible
      contents = (
        <div>
          {allItem}
          <Scrollable style={{ height }}>
            {items}
          </Scrollable>
          <style>
            {`input[data-id='${this.props.title}']::placeholder {
              color: #ccc
            }`}
          </style>
          <SimpleAutoCompleteInput
            id={this.props.title}
            value={this.state.filterString}
            values={this.props.values}
            updateValue={(newValue: string, chosen: boolean) => {
              if (chosen) {
                // Turn on the item with the text of newValue
                const newSelection = this.props.multiSelect ?
                  this.addToSelection(newValue) : newValue;

                this.setState({
                  filterString: '',
                }, () => {
                  this.props.onChange(newSelection);
                  // Scroll to the div of the newly selected item...
                  const div = this.divs.get(newValue);
                  if (div) {
                    div.scrollIntoView({ block: 'end', behavior: 'smooth' });
                  }
                });
              } else {
                // Just update the filter string
                this.setState({
                  filterString: newValue,
                });
              }
            }}
            placeholder={this.props.filterPlaceholder}
            style={{
              width: '100%',
              marginTop: '5[x',
              borderRadius: '3px',
              padding: '2px 4px',
              lineHeight: '1em',
              border: '1px solid #eee',
            }}
            outerStyle={{
              width: '100%',
              marginTop: '6px',
              marginBottom: '10px',
            }}
          />
        </div>
      );
    } else {
      // Add the "all" item to the top of the list
      items.unshift(allItem);
      contents = (
        <div>
          {items}
        </div>
      );
    }

    return (
      <div style={{ padding: '10px' }}>
        <h4 style={{ fontWeight: 'bold' }}>{this.props.title}</h4>
        {contents}
      </div>
    );
  }
}
