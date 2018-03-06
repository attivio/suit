// @flow

import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';

export class AccordionPanel {
  heading: string;
  key: string;
  body: React$Element<*> | string;

  constructor(heading: string, key: string, body: React$Element<*> | string) {
    this.heading = heading;
    this.key = key;
    this.body = body;
  }
}

type AccordionPanelsProps = {
  panels: Array<AccordionPanel>;
};

export default class AccordionPanels extends React.Component<void, AccordionPanelsProps, void> {
  static AccordionPanel;

  render() {
    const panels = this.props.panels.map((panel: AccordionPanel) => {
      let body;
      if (typeof panel.body === 'string') {
        body = <div>{panel.body}</div>;
      } else {
        body = panel.body;
      }
      return (
        <Panel
          eventKey={panel.key}
          bsStyle="primary"
          key={panel.key}
          style={{
            border: 'none',
            borderBottom: '1px solid #ccc',
          }}
        >
          <Panel.Heading
            style={{
              color: '#2f75b0',
              backgroundColor: 'white',
              border: 'none',
              borderBottom: '1px solid #2f75b0',
              borderRadius: '0px',
            }}
          >
            <Panel.Title toggle>{panel.heading}</Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
            {body}
          </Panel.Body>
        </Panel>
      );
    });

    return (
      <PanelGroup accordion id="queryFrameDescriptionAccoerdion" defaultActiveKey="metadata">
        {panels}
      </PanelGroup>

    );
  }
}

AccordionPanels.AccordionPanel = AccordionPanel;
