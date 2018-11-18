#### Examples:

__1.__ Showing error notification.

```jsx
  <div>
    <Notifiable>
      <div>
        <h1>This is the simulated contents of your application page.</h1>
        <img src="img/attivio-logo.png" />
        <br />
        <button onClick={() => {
          Notifiable.error('It\'s looking grim!');
        }}>Show Me an Error</button>
        <br />
        <button onClick={() => {
          Notifiable.error('It\'s looking grim!', true);
        }}>Show Me a Persistent Error</button>
        <br />
        <button onClick={() => {
          Notifiable.warn('It\'s looking meh!');
        }}>Show Me a Warning</button>
        <br />
        <button onClick={() => {
          Notifiable.warn('It\'s looking meh!', true);
        }}>Show Me a Persistent Warning</button>
        <br />
        <button onClick={() => {
          Notifiable.info('It\'s looking OK!');
        }}>Show Me an Info Message</button>
        <br />
        <button onClick={() => {
          Notifiable.info('It\'s looking OK!', true);
        }}>Show Me a Persistent Info Message</button>
        <br />
        <button onClick={() => {
          Notifiable.success('It\'s looking super awesome!');
        }}>Show Me a Success Message</button>
        <br />
        <button onClick={() => {
          Notifiable.success('It\'s looking super awesome!', true);
        }}>Show Me a Persistent Success Message</button>
      </div>
    </Notifiable>
  </div>
```
