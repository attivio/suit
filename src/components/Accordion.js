// @flow

import * as React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';

/**
 * Describes one panel for an Accordion component. The body can be either
 * an element or a simple string.
 */
export class AccordionPanel {
  heading: string;
  key: string;
  body: React.Element<any> | string;

  constructor(heading: string, key: string, body: React.Element<any> | string) {
    this.heading = heading;
    this.key = key;
    this.body = body;
  }
}

type AccordionProps = {
  /**
   * An array of AccordionPanel objects defining the panels to show.
   */
  panels: Array<AccordionPanel>;
  /**
   * The ID of the panel that should be the default open one. If not
   * set, the first panel's ID will be used.
   */
  defaultPanelKey: string | null;
};

/**
 * This component presents a series of titled, collapsible panels, only one of which can be open at
 * any given time.
 */
export default class Accordion extends React.Component<AccordionProps, void> {
  /* $FlowFixMe This comment suppresses an error found when upgrading Flow to
   * v0.107.0. To view the error, delete this comment and run Flow. */
  static AccordionPanel;

  static defaultProps = {
    defaultPanelKey: null,
  };

  static displayName = 'Accordion';

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

    if (panels.length > 0) {
      const defaultPanelKey = this.props.defaultPanelKey ? this.props.defaultPanelKey : this.props.panels[0].key;
      return (
        <PanelGroup accordion id="queryFrameDescriptionAccordion" defaultActiveKey={defaultPanelKey}>
          {panels}
        </PanelGroup>

      );
    }
    return null;
  }
}

Accordion.AccordionPanel = AccordionPanel;
