#### Examples:

__1.__ Simple case with three tabs.

```jsx
  initialState = {
    activeTab: 'tab1',
  };

  <TabPanel
    tabInfos={[
      new TabPanel.TabInfo('First Tab', 'tab1', <div>The first tab’s contents</div>),
      new TabPanel.TabInfo('Second Tab', 'tab2', <div>The second tab’s contents</div>),
      new TabPanel.TabInfo('Third Tab', 'tab3', <div>The third tab’s contents</div>),
    ]}
    activeTabId={state.activeTab}
    tabChanged={(newTab) => {
      setState({
        activeTab: newTab,
      });
    }}
  />
```

__2.__ Another tab panel with a label before its tabs.

```jsx
  initialState = {
    activeTab: 'tab1',
  };

  <TabPanel
    tabLabel="These are my tabs:"
    tabInfos={[
      new TabPanel.TabInfo('First Tab', 'tab1', <div>The first tab’s contents</div>),
      new TabPanel.TabInfo('Second Tab', 'tab2', <div>The second tab’s contents</div>),
      new TabPanel.TabInfo('Third Tab', 'tab3', <div>The third tab’s contents</div>),
    ]}
    activeTabId={state.activeTab}
    tabChanged={(newTab) => {
      setState({
        activeTab: newTab,
      });
    }}
  />
```
