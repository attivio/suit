// @flow

import React from 'react';
import type { Children } from 'react';

type WizardPageProps = {
  /**
   * This is an identifier for this wizard page. It must be
   * unique among the pages in a given wizard.
   */
  pageKey: string;
  /**
   * The title for this page in the wizard. Will be displayed in
   * the list of pages that lets the user know where they are
   * in the process of completing the forms.
   */
  title: string;
  /**
   * This callback is used to get the object representing the current
   * value for this page. This value is included in the map of all
   * values sent to the finish method for the wizard. Ideally, your
   * page will cache this as the user edits the values in the page's
   * controls so returning the value is fast.
   *
   * If your page updates the value object in the state when it changes,
   * you don't need to implement this method. In addition, if your
   * page is purely informational, you can omit this method.
   */
  getValue: null | () => any;
  /**
   * Callback used to validate the current state of the page. Returns a
   * promise so that you may make asynchronous calls to the server
   * if necessary to validate your fields. This Promise should resolve
   * to void in the case of the page being valid or to a string
   * describing the validation error in case it doesn't pass muster,
   * in which case the method should also deal with any updates to the
   * page's contents to show the error state to the user. The parameter
   * to this method is a map containing the values of all of the pages
   * in the wizard that are visible, in case the page's validation
   * depends on another page's state.
   *
   * If your page is always valid, you can omit this method.
   */
  validate: null | (values: Map<string, any>) => Promise<void>;
  /**
   * Callback used to allow the page to update itself based on
   * the state of the other pages in the wizard. Called right
   * before the wizard switches to show the page.
   *
   * If your page doesn't care, you can omit this method.
   */
  aboutToShow: null | (values: Map<string, any>) => void;
  /**
   * Set to true if this page is not required to be complete for the user to finish
   * the wizard. Defaults to false.
   */
  optional: boolean;
  /**
   * The contents of the WizardPage component are the controls for
   * the page.
   */
  children: Children;
};

type WizardPageDefaultProps = {
  optional: boolean;
  getValue: null | () => any;
  validate: null | (values: Map<string, any>) => Promise<void>;
  aboutToShow: null | (values: Map<string, any>) => void;
}

type WizardPageState = {
  value: any;
};

export default class WizardPage extends React.Component<WizardPageDefaultProps, WizardPageProps, WizardPageState> {
  static defaultProps = {
    optional: false,
    getValue: null,
    validate: null,
    aboutToShow: null,
  };

  constructor(props: WizardPageProps) {
    super(props);
    this.state = {
      value: {},
    };
    (this: any).getKey = this.getKey.bind(this);
  }

  state: WizardPageState;

  getValue() {
    if (this.props.getValue) {
      return this.props.getValue();
    }
    return this.state.value;
  }

  getKey() {
    return this.props.pageKey;
  }

  getTitle() {
    return this.props.title;
  }

  aboutToShow(values: Map<string, any>) {
    if (this.props.aboutToShow) {
      this.props.aboutToShow(values);
    }
  }

  updateValue(value: any) {
    this.setState({ value });
  }

  validate(values: Map<string, any>) {
    if (this.props.validate) {
      return this.props.validate(values);
    }
    return Promise.resolve();
  }

  isOptional() {
    return this.props.optional;
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
