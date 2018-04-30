// @flow

import React from 'react';

import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

type MiniIconButtonProps = {
  /** The tooltip to display describing the button. */
  title: string;
  /** This method is called when the button is clicked. */
  onClick: () => void;
  /**
   * The name of the Glyphicon to use for the button. If
   * set, this will be the button's image. Leave unset and
   * instead set the uri property if you want a custom
   * image used instead. You must use one or the other of
   * the glyph and uri properties. See http://glyphicons.com/
   * and click the "Halflings" tab to see the options
   * avaialble (without the "halflings-" prefix).
   */
  glyph: string | null;
  /**
   * The URI of the image to use for the button. Only used
   * if glyph is not set. You must use one or the other of
   * the glyph and uri properties.
   */
  uri: string | null;
};

type MiniIconButtonDefaultProps = {
  glyph: string | null;
  uri: string | null;  
};

export default class MiniIconButton extends React.Component<MiniIconButtonDefaultProps, MiniIconButtonProps, void> {
  static defaultProps = {
    glyph: null,
    uri: null,
  };

  constructor(props: MiniIconButtonProps) {
    super(props);
    (this: any).onClick = this.onClick.bind(this);
  }

  onClick() {
    if (this.button) {
      this.button.blur();
    }
    this.props.onClick();
  }

  button: ?HTMLButtonElement;

  render() {
    const buttonStyle = {
      minWidth: 0,
      border: 'none',
      boxShadow: 'none',
      padding: '5px 5px',
    };

    let contents;
    if (this.props.glyph) {
      contents = <Glyphicon glyph={this.props.glyph} />;
    } else if (this.props.uri) {
      contents = <img src={this.props.uri} alt={this.props.title} style={{ border: 'none' }} />;
    } else {
      contents = <span />;
    }
    return (
      <button
        title={this.props.title}
        onClick={this.onClick}
        style={buttonStyle}
        className="btn btn-default"
        ref={(c) => {
          this.button = c;
        }}
      >
        {contents}
      </button>
    );
  }
}
