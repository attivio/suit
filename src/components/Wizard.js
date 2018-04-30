// @flow

import React from 'react';

import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';

import Scrollable from './Scrollable';
import WizardSteps, { WizardStep } from './WizardSteps';

export class WizardPageDefinition {
  /**
   * This is an identifier for this wizard page. It must be
   * unique among the pages in a given wizard.
   */
  key: string;
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
   * The component to display for the wizard page.
   */
  page: React$Element<*>;

  constructor(
    key: string,
    title: string,
    page: React$Element <*>,
    getValue: null | () => any = null,
    validate: null | (values: Map<string, any>) => Promise < void> = null,
    aboutToShow: null | (values: Map<string, any>) => void = null,
    optional: boolean = false,
  ) {
    this.key = key;
    this.title = title;
    this.getValue = getValue;
    this.page = page;
    this.optional = optional;
    this.validate = validate;
    this.aboutToShow = aboutToShow;
  }
}

export class WizardPageState {
  key: string;
  value: any;
  enabled: boolean;
  valid: boolean;

  constructor(key: string, value: any = {}, enabled: boolean = true, valid: boolean = false) {
    this.key = key;
    this.value = value;
    this.enabled = enabled;
    this.valid = valid;
  }
}

type WizardProps = {
  /**
   * An array of WizardPageDefinitions defining the pages to show.
   */
  pages: Array<WizardPageDefinition>;
  /**
   * A callback used when the wizard is finished. If the value
   * parameter is not set, then the wizard is being cancelled.
   * Otherwise, the value parameter contains a map of each page's
   * pageKey to its current value.
   */
  onFinish: (Map<string, any> | null) => void;
  /**
   * If set, then the wizard will be shown.
   */
  show: boolean;
};

type WizardState = {
  visiblePages: Array<string>;
  currentKey: string;
  currentPage: WizardPageDefinition;
  currentPageValid: boolean;
  currentPageError: string | null;
};

/**
 * This component presents a series of pages which are used by the user, in sequence,
 * to enter data. The pages in the list can be enabled or disabled at any time.
 */
export default class Wizard extends React.Component<void, WizardProps, WizardState> {
  static WizardPageDefinition;

  constructor(props: WizardProps) {
    super(props);
    // Set the initial state
    const visiblePages = [];
    this.props.pages.forEach((page) => {
      visiblePages.push(page.key);
    });
    this.state = {
      visiblePages,
      currentKey: this.props.pages[0].key,
      currentPage: this.props.pages[0],
      currentPageValid: false,
      currentPageError: null,
    };
    (this: any).cancel = this.cancel.bind(this);
    (this: any).finish = this.finish.bind(this);
    (this: any).nextPage = this.nextPage.bind(this);
    (this: any).previousPage = this.previousPage.bind(this);
  }

  state: WizardState;

  componentDidMount() {
    // Try to validate the first page
    this.validateCurrentPage();
  }

  getPage(pageKey: string): WizardPageDefinition {
    const index = this.props.pages.findIndex((page: WizardPageDefinition) => {
      return page.key === pageKey;
    });
    return this.props.pages[index];
  }

  getNextPageKey(): string | null {
    const currentPageIndex = this.state.visiblePages.findIndex((pageKey) => {
      return pageKey === this.state.currentKey;
    });
    if (currentPageIndex >= 0) {
      const nextPageIndex = currentPageIndex + 1;
      if (nextPageIndex < this.state.visiblePages.length) {
        return this.state.visiblePages[nextPageIndex];
      }
    }
    return null;
  }

  getPreviousPageKey(): string | null {
    const currentPageIndex = this.state.visiblePages.findIndex((pageKey) => {
      return pageKey === this.state.currentKey;
    });
    if (currentPageIndex >= 1) {
      const previousPageIndex = currentPageIndex - 1;
      return this.state.visiblePages[previousPageIndex];
    }
    return null;
  }

  getAllPageValues(): Map<string, any> {
    const values: Map<string, any> = new Map();
    this.state.visiblePages.forEach((visiblePageKey) => {
      const page = this.getPage(visiblePageKey);
      const pageValue = page.getValue ? page.getValue() : {};
      values.set(visiblePageKey, pageValue);
    });
    return values;
  }

  validateCurrentPage() {
    const values = this.getAllPageValues();
    if (this.state.currentPage.validate) {
      this.state.currentPage.validate(values).then(() => {
        this.setState({
          currentPageValid: true,
          currentPageError: null,
        });
      }).catch((error) => {
        this.setState({
          currentPageValid: false,
          currentPageError: error,
        });
      });
    } else {
      // No callback = always valid
      this.setState({
        currentPageValid: true,
        currentPageError: null,
      });
    }
  }

  cancel() {
    this.props.onFinish(null);
  }

  finish() {
    const values = this.getAllPageValues();
    this.props.onFinish(values);
  }

  changePage(newPageKey: string | null) {
    if (newPageKey) {
      const newPage = this.getPage(newPageKey);
      const aboutToShow = newPage.aboutToShow;
      if (aboutToShow !== null) {
        aboutToShow(this.getAllPageValues());
      }
      this.setState({
        currentKey: newPageKey,
        currentPage: newPage,
      }, () => {
        this.validateCurrentPage();
      });
    }
  }

  nextPage() {
    this.changePage(this.getNextPageKey());
  }

  previousPage() {
    this.changePage(this.getPreviousPageKey());
  }

  doneWithRequired(): boolean {
    const currentPageIndex = this.state.visiblePages.indexOf(this.state.currentKey);
    const remainingPages = this.state.visiblePages.slice(currentPageIndex + 1);
    if (remainingPages && remainingPages.length) {
      // There are remaining visible pages... check if any is required.
      return !remainingPages.some((remainingPageKey) => {
        return !this.getPage(remainingPageKey).optional;
      });
    }
    // We're on the last visible page, so we're done!
    return true;
  }

  render() {
    if (this.props.show) {
      const steps = [];
      this.state.visiblePages.forEach((visiblePageKey) => {
        const visiblePage = this.getPage(visiblePageKey);
        steps.push(new WizardStep(visiblePageKey, visiblePage.title));
      });

      const previousKey = this.getPreviousPageKey();
      const nextKey = this.getNextPageKey();

      // We can always go back if there's a previous page
      const canPrevious = !!previousKey;
      // We can go forward if there's a next page AND the current one is valid
      const canNext = !!nextKey && this.state.currentPageValid;
      // We can finish if there is no next page or the remaining pages are not required
      // AND the current(last) one is valid
      const canFinish = !nextKey || this.doneWithRequired();
      const finishStyle = canFinish ? 'primary' : 'default';
      const nextStyle = canNext && !canFinish ? 'primary' : 'default';

      return (
        <div style={{ display: 'flex', flexFlow: 'column', height: '100%' }}>
          <WizardSteps steps={steps} currentStep={this.state.currentKey} goToPage={() => { }} style={{ flex: '0 1 auto' }} />
          <Scrollable style={{ flex: '1 1 auto' }}>
            <h3>{this.state.currentPage.title}</h3>
            {this.state.currentPage.page}
          </Scrollable>
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
    // Not shown...
    return null;
  }
}

Wizard.WizardPageDefinition = WizardPageDefinition;
