#### Examples:


__1:__ Simple wizard.

```jsx
  const wizardPages = require('../sampleData/WizardPageDefinitions').default;
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
