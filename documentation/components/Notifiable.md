#### Examples:

__1.__ Showing error notification.

```jsx
  <div>
    <Notifiable>
      <div>
        <h1>This is the simulated contents of your application page.</h1>
        <img src="img/attivio-logo.png" />
        <br />
        <br />
        <table
          style={{ marginTop: '15px', marginLeft: 'auto', marginRight: 'auto' }}
        >
          <tbody>
            <tr>
              <td style={{ padding: '5px', width: '50%' }}>
                <button
                  onClick={() => {
                    Notifiable.error('It\'s looking grim!');
                  }}
                  style={{ width: '100%' }}
                >
                  Show Me an Error
                </button>
              </td>
              <td style={{ padding: '5px', width: '50%' }}>
                <button
                  onClick={() => {
                    Notifiable.error('It\'s looking grim!', true);
                  }}
                  style={{ width: '100%' }}
                >
                  Show Me a Persistent Error
                </button>
              </td>
            </tr>
            <tr>
              <td style={{ padding: '5px', width: '50%' }}>
                <button
                  onClick={() => {
                  Notifiable.warn('It\'s looking meh!');
                  }}
                  style={{ width: '100%' }}
                >
                  Show Me a Warning
                </button>
              </td>
              <td style={{ padding: '5px', width: '50%' }}>
                <button
                  onClick={() => {
                    Notifiable.warn('It\'s looking meh!');
                  }}
                  style={{ width: '100%' }}
                >
                  Show Me a Persistent Warning
                </button>
              </td>
            </tr>
            <tr>
              <td style={{ padding: '5px', width: '50%' }}>
                <button
                  onClick={() => {
                    Notifiable.info('It\'s looking OK!');
                  }}
                  style={{ width: '100%' }}
                >
                  Show Me an Info Message
                </button>
              </td>
              <td style={{ padding: '5px', width: '50%' }}>
                <button
                  onClick={() => {
                    Notifiable.info('It\'s looking OK!');
                  }}
                  style={{ width: '100%' }}
                >
                  Show Me a Persistent Info Message
                </button>
              </td>
            </tr>
            <tr>
              <td style={{ padding: '5px', width: '50%' }}>
                <button
                  onClick={() => {
                    Notifiable.success('It\'s looking super awesome!');
                  }}
                  style={{ width: '100%' }}
                >
                  Show Me a Success Message
                </button>
              </td>
              <td style={{ padding: '5px', width: '50%' }}>
                <button
                  onClick={() => {
                    Notifiable.success('It\'s looking super awesome!');
                  }}
                  style={{ width: '100%' }}
                >
                  Show Me a Persistent Success Message
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Notifiable>
  </div>
```
