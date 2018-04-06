#### Examples:


__1:__ Steps for a wizard.

```jsx
  <WizardSteps
    steps={[
      new WizardSteps.WizardStep('one', 'Page 1', true, true),
      new WizardSteps.WizardStep('two', 'Page 2', true, true),
      new WizardSteps.WizardStep('three', 'Page 3'),
      new WizardSteps.WizardStep('four', 'Page 4', false),
      new WizardSteps.WizardStep('five', 'Page 5', false),
      new WizardSteps.WizardStep('six', 'Page 6', false),
    ]}
    currentStep="three"
    goToPage={(key) => { alert(`User wants to go to the page with key: ${key}.`); }}
  />
```
