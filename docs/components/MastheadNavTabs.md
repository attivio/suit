#### Examples:

__1:__ Three navigation buttons for use in the masthead.

```jsx
const { MemoryRouter, Route, Switch } = require('react-router-dom');
const tabDivStyle = { border: '1px solid #3276b1', padding: '10px' };
<MemoryRouter initialEntries={['/insights']}>
  <div>
    <MastheadNavTabs
      tabInfo={[
        new MastheadNavTabs.NavTabInfo('Insights', '/insights'),
        new MastheadNavTabs.NavTabInfo('Results', '/results'),
        new MastheadNavTabs.NavTabInfo('Experts', '/experts'),
      ]}
      initialTab="/insights"
    />
    <Switch>
      <Route path="/insights">
        <div style={tabDivStyle}>
          Insights tab.
        </div>
      </Route>
      <Route path="/results">
        <div style={tabDivStyle}>
          Results tab.
        </div>
      </Route>
      <Route path="/experts">
        <div style={tabDivStyle}>
          Experts tab.
        </div>
      </Route>
    </Switch>
  </div>
</MemoryRouter>
```
