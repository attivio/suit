// @flow

import React from 'react';

import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';

import WizardSteps from './WizardSteps';

/**
 * Describes one page for an wizard. The body can be either
 * an element or a simple string. The keys need to be unique
 * within a given wizard.
 */
export class WizardPage {
  /**
   * The key used to identify this page. Must be unique within
   * the context of a wizard.
   */
  key: string;
  /**
   * The title to display for the wizard page. This appears in the
   * navigation/progress indicator as well as at the top of the
   * wizard page.
   */
  title: string;
  /**
   * The contents of the page itself.
   */
  body: React$Element<*>;
  /**
   * If set, the page must have a valid state in order
   * for the wizard to be finishable. If some pages have
   * this set to false, then they should be at the end
   * of the wizard to allow the user to finish early
   * (otherwise this flat will have no effect).
   */
  required: boolean;
  /**
   * A method used to get the current value of the page.
   * This value will be passed to the validation code as
   * well as to the finish method for the wizard.
   */
  getValue: () => any;
  /**
   * A method used to validate the contents of the page.
   * It is passed the current state of the page in the value
   * parameter and returns a promise. The promsise should
   * return an error string with the error message if the page
   * cannot be validated, in which case the method should
   * also deal with any updates to the page's contents for
   * the error state.
   */
  validation: (value: any) => Promise<void>;

  constructor(
    key: string,
    title: string,
    body: React$Element<*>,
    getValue: () => any = () => { return {}; },
    validation: (value: any) => Promise<void> = () => { return Promise.resolve(); },
    required: boolean = true) {
    this.title = title;
    this.key = key;
    this.body = body;
    this.required = required;
  }
}

export class WizardPageState {
  key: string;
  value: any;
  enabled: boolean;
  valid: boolean;
  complete: boolean;
  current: boolean;

  constructor(key: string, value: any = {}, enabled: boolean = true, valid: boolean = false,
    complete: boolean = false, current: boolean = false) {
    this.key = key;
    this.value = value;
    this.enabled = enabled;
    this.valid = valid;
    this.complete = complete;
    this.current = current;
  }
}

type WizardProps = {
  /**
   * An array of WizardPage objects defining the pages to show.
   */
  pages: Array<WizardPage>;
  /**
   * A callback used when the wizard is finished. If the value
   * parameter is not set, then the wizard is being cancelled.
   * Otherwise, the value parameter contains a map of each page's
   * key to its current value.
   */
  onFinish: (Map<string, any> | null) => void;
};

type WizardState = {
  pageState: Map<string, WizardPageState>;
  currentKey: string;
  currentPage: WizardPage;
  currentState: WizardPageState;
};

/**
 * This component presents a series of pages which are used by the user, in sequence,
 * to enter data. The pages in the list can be enabled or disabled at any time.
 */
export default class Wizard extends React.Component<void, WizardProps, WizardState> {
  static WizardPage;

  constructor(props: WizardProps) {
    super(props);
    const currentKey = this.props.pages.length > 0 ? this.props.pages[0].key : '';
    const pageState: Map<string, WizardPageState> = new Map();
    this.props.pages.forEach((page) => {
      pageState.set(page.key, new WizardPageState(page.key));
    });
    const currentPage = this.getPage(currentKey);
    const currentState = pageState.get(currentKey);
    if (currentState) {
      this.state = {
        pageState,
        currentKey,
        currentPage,
        currentState,
      };
    }
    (this: any).cancel = this.cancel.bind(this);
    (this: any).finish = this.finish.bind(this);
    (this: any).nextPage = this.nextPage.bind(this);
    (this: any).previousPage = this.previousPage.bind(this);
  }

  state: WizardState;

  getPage(key: string): WizardPage {
    const index = this.props.pages.findIndex((page: WizardPage) => {
      return page.key === key;
    });
    return this.props.pages[index];
  }

  getNextPageKey(): string | null {
    let nextPageKey = null;
    let wantNext = false;
    this.state.pageState.forEach((state: WizardPageState) => {
      if (!nextPageKey) {
        if (wantNext && state.enabled) {
          // Only find the next enabled page...
          nextPageKey = state.key;
        }
        if (state.key === this.state.currentKey) {
          wantNext = true;
        }
      }
    });
    return nextPageKey;
  }

  getPreviousPageKey(): string | null {
    let previousPageKey = null;
    let previousEnabledPage = null;
    this.state.pageState.forEach((state: WizardPageState) => {
      if (state.key === this.state.currentKey) {
        // We're done... save the previousEnabledPage
        previousPageKey = previousEnabledPage;
      } else if (!previousPageKey && state.enabled) {
        // We haven't gotten to the current page yet, so save the
        // one we're looking at, if it's enabled
        previousEnabledPage = state.key;
      }
    });
    return previousPageKey;
  }

  cancel() {
    this.props.onFinish(null);
  }

  finish() {
    const values: Map<string, any> = new Map();
    this.state.pageState.forEach((pageState) => {
      if (pageState.enabled) {
        values.set(pageState.key, pageState.value);
      }
    });
    this.props.onFinish(values);
  }


  validateCurrentPage(): Promise<void> {
    if (this.state.currentPage.validation) {
      return this.state.currentPage.validation(this.state.currentState.value);
    }
    return Promise.resolve();
  }

  nextPage() {
    this.validateCurrentPage().then(() => {
      const newPageKey = this.getNextPageKey();
      if (newPageKey) {
        this.setState({
          currentKey: newPageKey,
        });
      }
    }).catch((error) => {
      alert(`Received an error validating the current page: ${error.toString()}`);
    });
  }

  previousPage() {
    this.validateCurrentPage().then(() => {
      const newPageKey = this.getPreviousPageKey();
      if (newPageKey) {
        this.setState({
          currentKey: newPageKey,
        });
      }
    }).catch((error) => {
      alert(`Received an error validating the current page: ${error.toString()}`);
    });
  }

  render() {
    const steps = [];
    this.state.pageState.forEach((pageState, index) => {
      if (pageState.enabled) {
        steps.push(new WizardSteps.WizardStep(pageState.key, this.props.pages[index].title));
      }
    });

    const previousKey = this.getPreviousPageKey();
    const nextKey = this.getNextPageKey();

    const canPrevious = !!previousKey;
    const canNext = !!nextKey;
    const canFinish = false;
    const finishStyle = canFinish ? 'primary' : 'default';
    const nextStyle = canNext && !canFinish ? 'primary' : 'default';

    return (
      <div style={{ display: 'flex', flexFlow: 'column', height: '100%' }}>
        <WizardSteps steps={steps} currentStep={this.state.currentKey} goToPage={() => { }} style={{ flex: '0 1 auto' }} />
        <div style={{ flex: '1 1 auto' }}>
          <h3>{this.props.pages[currentIndex].title}</h3>
          {this.props.pages[currentIndex].body}
        </div>
        <div style={{ flex: '0 1 40px' }}>
          <ButtonToolbar style={{ float: 'right' }}>
            <Button
              onClick={this.cancel}
            >
              Cancel
            </Button>
            <Button
              disabled={!canPrevious}
              onClick={this.previousPage}
            >
              Previous
            </Button>
            <Button
              disabled={!canNext}
              bsStyle={nextStyle}
              onClick={this.nextPage}
            >
              Next
            </Button>
            <Button
              disabled={!canFinish}
              bsStyle={finishStyle}
              onClick={this.finish}
            >
              Finish
            </Button>
          </ButtonToolbar>
        </div>
      </div>
    );
  }
}

Wizard.WizardPage = WizardPage;
