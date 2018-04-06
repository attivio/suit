// @flow
import React from 'react';
import PropTypes from 'prop-types';

import Menu, { MenuItemDef } from './Menu';

type SearchLanguagePickerProps = {
  /** The label to show for the menu. Defaults to "Query Language". */
  label: string,
  /** The label to show for the Simple Query Language option. Defaults to "Simple". */
  simpleLabel: string,
  /** The label to show for the Advanced Query Language option. Defaults to "Advanced". */
  advancedLabel: string,
  /** If set, then the menu will be shown at the right end of the navbar. */
  right: boolean;
}

type SearchLanguagePickerDefaultProps = {
  label: string,
  simpleLabel: string,
  advancedLabel: string,
  right: boolean;
}

/**
 * A pop-up for choosing between the simple and advanced query language.
 */
export default class SearchLanguagePicker extends React.Component<SearchLanguagePickerDefaultProps, SearchLanguagePickerProps, void> { // eslint-disable-line max-len
  static defaultProps = {
    initialValue: 'simple',
    label: 'Query Language:',
    simpleLabel: 'Simple',
    advancedLabel: 'Advanced',
    right: false,
  };

  static contextTypes = {
    searcher: PropTypes.any,
  };

  static displayName = 'SearchLanguagePicker';

  constructor(props: SearchLanguagePickerProps) {
    super(props);
    (this: any).onSelect = this.onSelect.bind(this);
  }

  onSelect(item: MenuItemDef) {
    const searcher = this.context.searcher;
    if (searcher) {
      searcher.updateQueryLanguage(item.value);
    }
  }

  render() {
    const searcher = this.context.searcher;
    let value = 'simple';
    if (searcher) {
      value = searcher.state.queryLanguage;
    }

    const items = [
      new MenuItemDef(this.props.simpleLabel, 'simple'),
      new MenuItemDef(this.props.advancedLabel, 'advanced'),
    ];

    const leftRight = this.props.right ? 'attivio-globalmastnavbar-right' : '';

    return (
      <div className={leftRight}>
        <Menu
          label={this.props.label}
          items={items}
          selection={value}
          onSelect={this.onSelect}
        />
      </div>
    );
  }
}
