#### Examples:


__1:__ Simple wizard.

// ```jsx
  // initialState = {
  //   currentConfigurationTab: 'simple',
  //   shown: false,
  // };
  // const wizardPages = require('../sampleData/WizardPageDefinitions').default(state, setState);
  // <div style={{ height: '600px' }}>
  //   <button onClick={setState({ shown: true })}>Show Wizard</button>
  //   <Wizard
  //     pages={wizardPages}
  //     onFinish={(values) => {
  //       if (values) {
  //         alert('Wizard called to finish!');
  //         setState({ shown: false });
  //       } else {
  //         alert('Wizard called to cancel!');
  //         setState({ shown: false });
  //       }
  //     }}
  //     show={state.shown}
  //   />
  // </div>
//```
