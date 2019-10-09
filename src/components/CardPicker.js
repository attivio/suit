// @flow

import React from 'react';

import CardPickerCard from './CardPickerCard';
import GridLayout from './GridLayout';

export class CardPickerItem {
  label: string;
  key: string;
  iconUri: string | null;
  description: string | null;

  constructor(label: string, key: string, iconUri: string | null = null, description: string | null) {
    this.label = label;
    this.key = key;
    this.iconUri = iconUri;
    this.description = description;
  }
}

type CardPickerProps = {
  /**
   * The cards to allow the user to pick from.
   */
  cards: Array<CardPickerItem>;
  /**
   * The key of the first item to select, if any. Defaults to not having
   * an initial selection.
   */
  initialSelection: string | null;
  /**
   * The icon to use if a particular card item doesn't have
   * one defined or if it cannot be found.
   */
  defaultIconUri: string | null;
  /**
   * Callback is called when the selection changes.
   */
  onChange: (key: string) => void;
  /**
   * The number of columns in the card picker. This determines
   * the width of each card. Defaults to 3 columns.
   */
  columns: number;
  /**
   * Property that contains the prefix for data-test attribute added to elements to be uniquely
   * identified by testing tools like Selenium
   */
  dataTestPrefix? : string | null;
};

type CardPickerDefaultProps = {
  initialSelection: string | null;
  defaultIconUri: string | null;
  columns: number;
  dataTestPrefix : string | null;
};

type CardPickerState = {
  selection: string | null;
};

export default class CardPicker extends React.Component<CardPickerDefaultProps, CardPickerProps, CardPickerState> {
  static defaultProps = {
    initialSelection: null,
    defaultIconUri: null,
    columns: 3,
    dataTestPrefix: null,
  };

  static displayName = 'CardPicker';

  static CardPickerItem;

  constructor(props: CardPickerProps) {
    super(props);
    this.state = {
      selection: this.props.initialSelection,
    };
    (this: any).onClick = this.onClick.bind(this);
  }

  state: CardPickerState;

  onClick(key: string) {
    this.setState({
      selection: key,
    }, () => {
      this.props.onChange(key);
    });
  }

  render() {
    const { dataTestPrefix, cards } = this.props;
    const cardComponents = cards.map((cardItem, index) => {
      const cardItemLabel = (cardItem.label) ? `${cardItem.label}-` : '';
      return (
        <CardPickerCard
          key={`${cardItem.label}|${cardItem.iconUri ? cardItem.iconUri : 'noicon'}`}
          label={cardItem.label}
          iconUri={cardItem.iconUri || this.props.defaultIconUri}
          description={cardItem.description}
          defaultIconUri={this.props.defaultIconUri}
          selected={cardItem.key === this.state.selection}
          onClick={() => { this.onClick(cardItem.key); }}
          columns={this.props.columns}
          dataTestValue={(dataTestPrefix) ? `${dataTestPrefix}-${cardItemLabel}${index}` : null}
        />
      );
    });

    return (
      <GridLayout>
        {cardComponents}
      </GridLayout>
    );
  }
}

CardPicker.CardPickerItem = CardPickerItem;
