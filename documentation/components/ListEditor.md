#### Examples:


__1:__ Example showing an editor for list of phone numbers.

```jsx
  initialState = {
    list: [],
    currentAreaCode: '',
    currentExchange: '',
    currentLineNumber: '',
  };

  <ListEditor
    addbuttonTooltip="Add a phone number..."
    items={state.list}
    itemAsString={(item) => {
      return `(${item.areaCode})\u00a0${item.exchange}\u00a0\u2013\u00a0${item.lineNumber}`;
    }}
    renderControl={() => {
      return (
        <div>
          {'(\u00a0'}
          <input
            type="text"
            value={state.currentAreaCode}
            onChange={(event) => {
              if (event.target instanceof HTMLInputElement) {
                const newValue = event.target.value;
                if (parseInt(newValue, 10) !== NaN) {
                  setState({
                    currentAreaCode: event.target.value,
                  });
                }
              }
            }}
            style={{
              width: '3em',
            }}
          />
          {'\u00a0)\u00a0'}
          <input
            type="text"
            value={state.currentExchange}
            onChange={(event) => {
              if (event.target instanceof HTMLInputElement) {
                const newValue = event.target.value;
                if (parseInt(newValue, 10) !== NaN) {
                  setState({
                    currentExchange: event.target.value,
                  });
                }
              }
            }}
            style={{
              width: '3em',
            }}
          />
          {'\u00a0\u2013\u00a0'}
          <input
            type="text"
            value={state.currentLineNumber}
            onChange={(event) => {
              if (event.target instanceof HTMLInputElement) {
                const newValue = event.target.value;
                if (parseInt(newValue, 10) !== NaN) {
                  setState({
                    currentLineNumber: event.target.value,
                  });
                }
              }
            }}
            style={{
              width: '4em',
            }}
          />
        </div>
      );
    }}
    updateList={(newList) => {
      setState({ list: newList });
    }}
    getValue={() => {
      // Make sure that the 3 components are numbers and of the right length...
      if (parseInt(state.currentAreaCode, 10) !== NaN && state.currentAreaCode.length === 3) {
        if (parseInt(state.currentExchange, 10) !== NaN && state.currentExchange.length === 3) {
          if (parseInt(state.currentLineNumber, 10) !== NaN && state.currentLineNumber.length === 4) {
            return {
              areaCode: state.currentAreaCode,
              exchange: state.currentExchange,
              lineNumber: state.currentLineNumber,
            };
          }
        }
      }
      return null;
    }}
    resetControl={() => {
      setState({
        currentAreaCode: '',
        currentExchange: '',
        currentLineNumber: '',
      });
    }}
  />
```
