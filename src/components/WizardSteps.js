// @flow

import React from 'react';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';

export class WizardStep {
  key: string;
  title: string;
  enabled: boolean;
  complete: boolean;

  constructor(key: string, title: string, enabled: boolean = true, complete: boolean = false) {
    this.key = key;
    this.title = title;
    this.enabled = enabled;
    this.complete = complete;
  }
}

type WizardStepsProps = {
  steps: Array<WizardStep>;
  currentStep: string;
  goToPage: (key: string) => void;
  style: any;
};

/**
 * This component presents a series of pages which are used by the user, in sequence,
 * to enter data. The pages in the list can be enabled or disabled at any time.
 */
export default class WizardSteps extends React.Component<void, WizardStepsProps, void> {
  static WizardStep;

  render() {
    const pageLinks = [];
    const stepStyle = {
      width: `calc(100% / ${this.props.steps.length})`,
    };
    this.props.steps.forEach((step: WizardStep) => {
      let onClick;
      let classNames;
      let disabled = false;

      if (this.props.currentStep === step.key) {
        classNames = 'wizard-step-button wizard-step-button-current';
      } else if (step.enabled) {
        onClick = () => { this.props.goToPage(step.key); };
        if (step.complete) {
          classNames = 'wizard-step-button wizard-step-button-complete';
        } else {
          classNames = 'wizard-step-button';
        }
      } else {
        disabled = true;
        classNames = 'wizard-step-button wizard-step-button-disabled';
      }
      pageLinks.push((
        <button
          disabled={disabled}
          onClick={onClick}
          style={stepStyle}
          key={step.key}
          className={classNames}
        >
          {step.title}
        </button>
      ));
    });

    const mainStyle = Object.assign({}, {
      width: 'calc(100% - 8px)',
      paddingLeft: '4px',
      paddingRight: '4px',
    }, this.props.style);

    if (pageLinks.length > 0) {
      return (
        <div style={mainStyle} className="wizard-step-buttons">
          {pageLinks}
        </div>
      );
    }
    return null;
  }
}

WizardSteps.WizardStep = WizardStep;
