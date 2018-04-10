#### Examples:


__1:__ Simple wizard.

```jsx
  initialState = {
    currentConfigurationTab: 'simple',
  };
  const wizardPages = require('../sampleData/WizardPageDefinitions').default(state, setState);
  const { Button } = require('react-bootstrap');
  <div style={{ height: '600px' }}>
    <Wizard
      pages={wizardPages}
      onFinish={(values) => {
        if (values) {
          alert('Wizard called to finish!');
        } else {
          alert('Wizard called to cancel!');
        }
      }}
      show
    />
  </div>
```
