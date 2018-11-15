#### Examples:


__1:__ A series of common entities.

```jsx
  const sampleDocs = require('../sampleData/Documents').default;

  const entities = new Map();
  entities.set('location', 'Location');
  entities.set('company', 'Company');
  entities.set('religion', 'Religion');
  entities.set('climate', 'Climate');
  entities.set('terrain', 'Terrain');
  entities.set('resource', 'Resources');
  entities.set('spokenLanguage', 'Spoken Languages');
  entities.set('ethnicity', 'Ethnicities');
  entities.set('agriprod', 'Agricultural Products');
  entities.set('industry', 'Industries');

  <DocumentEntityList doc={sampleDocs.elsalvador} entityFields={entities} />
```
