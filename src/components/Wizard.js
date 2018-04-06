// @flow

import React from 'react';

import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';

import Scrollable from './Scrollable';
import WizardSteps, { WizardStep } from './WizardSteps';
import WizardPage from './WizardPage';

export class WizardPageState {
  pageKey: string;
  value: any;
  enabled: boolean;
  valid: boolean;

  constructor(pageKey: string, value: any = {}, enabled: boolean = true, valid: boolean = false) {
    this.pageKey = pageKey;
    this.value = value;
    this.enabled = enabled;
    this.valid = valid;
  }
}

type WizardProps = {
  /**
   * An array of WizardPage components defining the pages to show.
   */
  pages: Array<WizardPage>;
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
  currentPage: WizardPage;
  currentPageValid: boolean;
  currentPageError: string | null;
};

/**
 * This component presents a series of pages which are used by the user, in sequence,
 * to enter data. The pages in the list can be enabled or disabled at any time.
 */
export default class Wizard extends React.Component<void, WizardProps, WizardState> {
  static WizardPage;

  constructor(props: WizardProps) {
    super(props);
    // Set the initial state
    const visiblePages = [];
    this.props.pages.forEach((page) => {
      visiblePages.push(page.props.pageKey);
    });
    this.state = {
      visiblePages,
      currentKey: this.props.pages[0].props.pageKey,
      currentPage: this.props.pages[0],
      currentPageValid: false,
      currentPageError: null,
    };
    // Try to validate the first page
    this.validateCurrentPage();
    (this: any).cancel = this.cancel.bind(this);
    (this: any).finish = this.finish.bind(this);
    (this: any).nextPage = this.nextPage.bind(this);
    (this: any).previousPage = this.previousPage.bind(this);
  }

  state: WizardState;

  getPage(pageKey: string): WizardPage {
    const index = this.props.pages.findIndex((page: WizardPage) => {
      return page.props.pageKey === pageKey;
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
      const pageValue = page.props.getValue();
      values.set(visiblePageKey, pageValue);
    });
    return values;
  }

  validateCurrentPage() {
    const values = this.getAllPageValues();
    this.state.currentPage.props.validate(values).then(() => {
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
      newPage.props.aboutToShow(this.getAllPageValues());
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
        return !this.getPage(remainingPageKey).props.optional;
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
        steps.push(new WizardStep(visiblePageKey, visiblePage.props.title));
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
            <h3>{this.state.currentPage.props.title}</h3>
            {this.state.currentPage}
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

Wizard.WizardPage = WizardPage;
