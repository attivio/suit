// @flow

import React from 'react';

import Button from 'react-bootstrap/lib/Button';
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
      color: '#444',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: 0,
      boxShadow: 'none',
      textTransform: 'none',
      padding: '5px',
      minWidth: 0,
      width: `calc(100% / ${this.props.steps.length})`,
    };
    const disabledStepStyle = Object.assign({}, stepStyle, {
      color: '#ccc',
      fontStyle: 'italic',
    });
    const currentStepStyle = Object.assign({}, stepStyle, {
      backgroundColor: 'lightblue',
      fontWeight: 'bold',
    });
    this.props.steps.forEach((step: WizardStep) => {
      const complete = step.complete ? <Glyphicon glyph="ok" style={{ fontSize: '75%', color: 'green', paddingLeft: '4px' }} /> : null;
      if (this.props.currentStep === step.key) {
        pageLinks.push((
          <Button disabled style={currentStepStyle} key={step.key}>
            {step.title}
            {complete}
          </Button>
        ));
      } else if (step.enabled) {
        // Can only go there if the page is enabled...
        pageLinks.push((
          <Button onClick={() => { this.props.goToPage(step.key); }} style={stepStyle} key={step.key}>
            {step.title}
            {complete}
          </Button>
        ));
      } else {
        pageLinks.push((
          <Button disabled style={disabledStepStyle} key={step.key}>
            {step.title}
            {complete}
          </Button>
        ));
      }
    });

    const mainStyle = Object.assign({}, {
      borderBottom: '1px dotted #666',
      width: '100%',
    }, this.props.style);

    if (pageLinks.length > 0) {
      return (
        <div style={mainStyle}>
          {pageLinks}
        </div>
      );
    }
    return null;
  }
}

WizardSteps.WizardStep = WizardStep;
