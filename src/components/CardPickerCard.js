// @flow

import React from 'react';

type CardPickerCardProps = {
  /**
   * The label to show in the card.
   */
  label: string;
  /**
   * The URI for the icon to display. If unset, no icon is shown.
   * The icon is limited in size to 60x60 pixels.
   */
  iconUri: string | null;
  /**
   * If set, then the card is drawn with a selected border and is not
   * clickable.
   */
  selected: boolean;
  /**
   * The callback to use when the card is clicked by the user.
   */
  onClick: () => void;
  /**
   * The number of columns in the card picker. This determines
   * the width of each card. Defaults to 3 columns.
   */
  columns: number;
};

type CardPickerCardDefaultProps = {
  columns: number;
};

export default class CardPickerCard extends React.Component<CardPickerCardDefaultProps, CardPickerCardProps, void> {
  static defaultProps = {
    columns: 3,
  };

  constructor(props: CardPickerCardProps) {
    super(props);
    (this: any).onClick = this.onClick.bind(this);
  }

  onClick() {
    if (!this.props.selected) {
      this.props.onClick();
    }
    if (this.card) {
      this.card.blur();
    }
  }

  card: ?HTMLAnchorElement;

  render() {
    const style = {
      height: '120px',
      width: `calc(${100 / this.props.columns}% - 6px)`,
      margin: '3px',
      padding: '3px',
      color: '#2f75b0',
      backgroundColor: '#fff',
      border: this.props.selected ? '2px solid #2f75b0' : '1px solid #888',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    };

    const icon = this.props.iconUri ? (
      <img
        src={this.props.iconUri}
        style={{
          maxHeight: '60px',
          maxWidth: '60px',
        }}
        alt={`${this.props.label} icon`}
      />
    ) : (
      <div
        style={{
          height: '60px',
          width: '60px',
        }}
      />
    );

    return (
      <div
        style={style}
        onClick={this.onClick}
        role="button"
        tabIndex={0}
        ref={(c) => {
          this.card = c;
        }}
      >
        <div
          style={{
            height: '80px',
            paddingBottom: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          {icon}
        </div>
        <div
          style={{
            width: 'calc(100% - 6px)',
            marginTop: '7px',
            paddingBottom: '10px',
            textAlign: 'center',
            overflowX: 'hidden',
            overflowY: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {this.props.label}
        </div>
      </div>
    );
  }
}
