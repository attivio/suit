#### Examples:

__1:__ Three navigation buttons for use in the masthead.

```jsx
<MastheadNavTabs
  tabInfo={[
    new MastheadNavTabs.NavTabInfo('Insights', '/insights'),
    new MastheadNavTabs.NavTabInfo('Results', '/results'),
    new MastheadNavTabs.NavTabInfo('Experts', '/experts'),
  ]}
  currentTab="/results"
/>
```
