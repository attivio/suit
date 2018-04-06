#### Examples:


__1:__ Simple wizard.

```jsx
  const { Button } = require('react-bootstrap');
  const WizardPage = require('../../src/components/WizardPage').default;
  <div style={{ height: '600px' }}>
    <Wizard
      pages={[
        (
          <WizardPage pageKey="one" title="Step 1">
            <Button bsStyle="primary">Wizard Button</Button>
          </WizardPage>
        ), (
          <WizardPage pageKey="two" title="Step 2">
            <Button bsStyle="warning">Iffy Button</Button>
          </WizardPage>
        ), (
          <WizardPage pageKey="three" title="Step 3">
            <Button bsStyle="danger">Bad Button</Button>
          </WizardPage>
        ), (
          <WizardPage pageKey="four" title="Step 4">
            <div>Just some text</div>
          </WizardPage>
        ),
      ]}
      onFinish={(values) => {
        alert('Wizard called to finish!');
      }}
      show
    />
  </div>
```
