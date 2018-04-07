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
};

export default class CardPickerCard extends React.Component<void, CardPickerCardProps, void> {
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
      width: `calc(${100 / 3}% - 6px)`,
      padding: '3px',
      margin: '3px',
      border: this.props.selected ? '2px solid blue' : '1px solid #888',
      height: '120px',
      textAlign: 'center',
      color: 'blue',
      backgroundColor: '#fff',
      position: 'relative',
    };

    const icon = this.props.iconUri ? (
      <img
        src={this.props.iconUri}
        style={{
          border: 'none',
          maxHeight: '60px',
          maxWidth: '60px',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '15px',
        }}
        alt={`${this.props.label} icon`}
      />
    ) : (
      <div
        style={{
          height: '60px',
          width: '60px',
          marginTop: '15px',
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
            verticalAlign: 'middle',
          }}
        >
          {icon}
          <div
            style={{
              marginTop: '7px',
              whiteSpace: 'nowrap',
              overflowX: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {this.props.label}
          </div>
        </div>
      </div>
    );
  }
}
