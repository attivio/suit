#### Examples:


__1:__ Steps for a wizard. In this example, steps 1 and 2 have been completed and the user
is currently on step 3. Steps 4 through 6 are not yet accessible.

```jsx
  <WizardSteps
    steps={[
      new WizardSteps.WizardStep('one', 'Step 1', true, true),
      new WizardSteps.WizardStep('two', 'Step 2', true, true),
      new WizardSteps.WizardStep('three', 'Step 3'),
      new WizardSteps.WizardStep('four', 'Step 4', false),
      new WizardSteps.WizardStep('five', 'Step 5', false),
      new WizardSteps.WizardStep('six', 'Step 6', false),
    ]}
    currentStep="three"
    goToPage={(key) => { alert(`User wants to go to the step with key: ${key}.`); }}
  />
```
