#### Examples:


__1:__ Simple wizard.

```jsx
  const { Button } = require('react-bootstrap');
  <div style={{ height: '600px' }}>
    <Wizard
      pages={[
        new Wizard.WizardPage('one', 'Page 1', (<div>
          <Button bsStyle="primary">Wizard Button</Button>
        </div>)),
        new Wizard.WizardPage('two', 'Page 2', <div />),
        new Wizard.WizardPage('three', 'Page 3', <div />),
        new Wizard.WizardPage('four', 'Page 4', <div />),
        new Wizard.WizardPage('five', 'Page 5', <div />),
      ]}
      onFinish={(values) => {
        alert('Wizard called to finish!');
      }}
    />
  </div>
```
