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

__2.__ Another connector card set to live in a 4-column grid (rather than the default 3).

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
    columns={4}
  />
```
