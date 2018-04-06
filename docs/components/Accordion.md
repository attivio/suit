#### Examples:


__1:__ Accordion whose second panel is the default open one.

```jsx
  const { Button } = require('react-bootstrap');
  <Accordion 
    panels={[
      new Accordion.AccordionPanel('Panel 1', '1', <div>First panel's contents</div>),
      new Accordion.AccordionPanel('Panel 2', '2', 'Second panel's contents'),
      new Accordion.AccordionPanel('Panel 3', '3', (
        <div>
          <h1>Panel 3</h1>
          <input type="text" placeholder="Fill in a field" />
          <Button bsStyle="primary">Click me!</Button>
        </div>
      )),
      new Accordion.AccordionPanel('Panel 4', '4', <div>Fourth panel's contents</div>),
    ]}
    defaultPanelKey="4"
  />
```
