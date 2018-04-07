// @flow

import React from 'react';

import Scrollable from './Scrollable';

export class CardPickerItem {
  label: string;
  key: string;
  iconUrl: string | null;

  constructor(label: string, key: string, iconUrl: string | null = null) {
    this.label = label;
    this.key = key;
    this.iconUrl = iconUrl;
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
   * Callback is called when the selection changes.
   */
  onChannge: (key: string) => void;
};

type CardPickerDefaultProps = {
  initialSelection: string | null;
};

type CardPickerState = {
  selection: string | null;
};

export default class CardPicker extends React.Component<CardPickerDefaultProps, CardPickerProps, CardPickerState> {
  static defaultProps = {
    initialSelection: null,
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
      this.props.onChannge(key);
    });
  }

  createCard(item: CardPickerItem) {
    const style = {
      width: `calc(${100 / 3}% - 6px)`,
      padding: '3px',
      margin: '3px',
      border: '1px solid #888',
      height: '120px',
    };
    if (item.key === this.state.selection) {
      style.border = '2px solid blue';
    }
    const cardComp = (
      <div style={style}>
        {item.label}
      </div>
    );
    return cardComp;
  }

  render() {
    const cardComponnents = this.props.cards.map((cardItem) => {
      return this.createCard(cardItem);
    });

    return (
      <Scrollable
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          padding: 0,
        }}
      >
        {cardComponnents}
      </Scrollable>
    );
  }
}

CardPicker.CardPickerItem = CardPickerItem;
