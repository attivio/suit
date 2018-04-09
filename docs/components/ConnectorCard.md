#### Examples:

__1.__ Connector card.

```jsx
  <ConnectorCard
    id="medals"
    name="Medals Connector"
    typeName="Pre-Configured Connector"
    status="running"
    onStart={() => { alert('User wants to start the connector'); }}
    onStop={() => { alert('User wants to stop the connector'); }}
    onPreview={() => { alert('User wants to preview the connector'); }}
    onSchedule={() => { alert('User wants to schedule the connector'); }}
    onEdit={() => { alert('User wants to edit the connector'); }}
    onDelete={() => { alert('User wants to delete the connector'); }}
    onStart={() => { alert('User wants to start the connector'); }}
  />
```
