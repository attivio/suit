// @flow

import React from 'react';

import CardPickerCard from './CardPickerCard';
import GridLayout from './GridLayout';

export class CardPickerItem {
  label: string;
  key: string;
  iconUri: string | null;

  constructor(label: string, key: string, iconUri: string | null = null) {
    this.label = label;
    this.key = key;
    this.iconUri = iconUri;
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
   * one defined. If all of the items will have icons assigned,
   * you don't need to set this.
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
};

type CardPickerDefaultProps = {
  initialSelection: string | null;
  defaultIconUri: string | null;
  columns: number;
};

type CardPickerState = {
  selection: string | null;
};

export default class CardPicker extends React.Component<CardPickerDefaultProps, CardPickerProps, CardPickerState> {
  static defaultProps = {
    initialSelection: null,
    defaultIconUri: null,
    columns: 3,
  };

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
    const cardComponnents = this.props.cards.map((cardItem) => {
      return (
        <CardPickerCard
          key={`${cardItem.label}|${cardItem.iconUri ? cardItem.iconUri : 'noicon'}`}
          label={cardItem.label}
          iconUri={cardItem.iconUri || this.props.defaultIconUri}
          selected={cardItem.key === this.state.selection}
          onClick={() => { this.onClick(cardItem.key); }}
          columns={this.props.columns}
        />
      );
    });

    return (
      <GridLayout>
        {cardComponnents}
      </GridLayout>
    );
  }
}

CardPicker.CardPickerItem = CardPickerItem;

/*
      <Scrollable style={{ height: '100%' }}>
        <div
          style={{
            width: '100%',
            padding: 0,
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
        >
          {cardComponnents}
        </div>
      </Scrollable>
*/
