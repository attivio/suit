// @flow

import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';

import ListEditor from './ListEditor';

type StringListEditorProps = {
  /**
   * The tooltip to use for the add (plus) button. Defaults to 'Add.'
   */
  addButtonTooltip: string;
  /**
   * The placeholder text to show in the input control. Defaults to 'Enter a value…'
   */
  placeholder: string;
  /**
   * The list of strings being edited.
   */
  items: Array<string>,
  /**
   * Callback that is called when the list of items has changed so the parent
   * knows and can update itself.
   */
  updateList: (items: Array<string>) => void;
};

type StringListEditorDefaultProps = {
  addButtonTooltip: string;
  placeholder: string;
};

type StringListEditorState = {
  value: string;
}

export default class StringListEditor extends React.Component<StringListEditorDefaultProps, StringListEditorProps, StringListEditorState> { // eslint-disable-line max-len
  static defaultProps = {
    addButtonTooltip: 'Add',
    placeholder: 'Enter a value\u2026',
  };

  static displayName = 'StringListEditor';

  static itemAsString(item: any) {
    return item.toString();
  }

  constructor(props: StringListEditorProps) {
    super(props);
    this.state = {
      value: '',
    };
    (this: any).onChange = this.onChange.bind(this);
    (this: any).renderControl = this.renderControl.bind(this);
    (this: any).getValue = this.getValue.bind(this);
    (this: any).resetControl = this.resetControl.bind(this);
  }

  state: StringListEditorState;

  onChange(event: Event & { currentTarget: HTMLInputElement }) {
    const newValue = event.currentTarget.value;
    this.setState({
      value: newValue,
    });
  }

  getValue() {
    return this.state.value;
  }

  resetControl() {
    this.setState({
      value: '',
    });
  }

  renderControl() {
    return (
      <FormControl type="text" placeholder={this.props.placeholder} onChange={this.onChange} value={this.state.value} />
    );
  }

  render() {
    return (
      <ListEditor
        addButtonTooltip={this.props.addButtonTooltip}
        items={this.props.items}
        itemAsString={StringListEditor.itemAsString}
        renderControl={this.renderControl}
        updateList={this.props.updateList}
        getValue={this.getValue}
        resetControl={this.resetControl}
      />
    );
  }
}
