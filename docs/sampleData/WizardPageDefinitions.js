// @flow

import React from 'react';

import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import CardPicker, { CardPickerItem } from '../../src/components/CardPicker';
import TabPanel, { TabInfo } from '../../src/components/TabPanel';
import { WizardPageDefinition } from '../../src/components/Wizard';

const typeCards = [
  new CardPickerItem('Avro Files', 'avro', 'http://avro.apache.org/images/avro-logo.png'),
  new CardPickerItem('CSV Files', 'csv', 'https://upload.wikimedia.org/wikipedia/commons/1/18/Text-csv-text.svg'),
  new CardPickerItem('Excel Files', 'excel', 'https://upload.wikimedia.org/wikipedia/commons/2/2d/LibreOffice_Calc_icon_3.3.1_48_px.svg'), // eslint-disable-line max-len
  new CardPickerItem('JDBC Database', 'jdbc', 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Database_icon_simple.png'),
  new CardPickerItem('XML Files', 'xml', 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Oxygen480-mimetypes-application-xml.svg'), // eslint-disable-line max-len
];

const configurationTabs = [
  new TabInfo('Simple', 'simple', (
    <div>
      <FormGroup>
        <ControlLabel>Name</ControlLabel>
        <FormControl type="text" placeholder="Enter the connector’s name" />
        <HelpBlock>This is the name that will be used when displaying the connector.</HelpBlock>
      </FormGroup>
      <FormGroup>
        <ControlLabel>Description</ControlLabel>
        <FormControl componentClass="textarea" placeholder="Enter a description for the connector." />
        <HelpBlock>This will help users know what the connector is used to ingest.</HelpBlock>
      </FormGroup>
    </div>
  )),
  new TabInfo('Security', 'security', (
    <div>
      <FormGroup>
        <ControlLabel>Name</ControlLabel>
        <FormControl type="text" placeholder="Enter the connector’s name" />
        <HelpBlock>This is the name that will be used when displaying the connector.</HelpBlock>
      </FormGroup>
      <FormGroup>
        <ControlLabel>Description</ControlLabel>
        <FormControl componentClass="textarea" placeholder="Enter a description for the connector." />
        <HelpBlock>This will help users know what the connector is used to ingest.</HelpBlock>
      </FormGroup>
    </div>
  )),
  new TabInfo('Advanced', 'advanced', (
    <div>
      <FormGroup>
        <ControlLabel>Name</ControlLabel>
        <FormControl type="text" placeholder="Enter the connector’s name" />
        <HelpBlock>This is the name that will be used when displaying the connector.</HelpBlock>
      </FormGroup>
      <FormGroup>
        <ControlLabel>Description</ControlLabel>
        <FormControl componentClass="textarea" placeholder="Enter a description for the connector." />
        <HelpBlock>This will help users know what the connector is used to ingest.</HelpBlock>
      </FormGroup>
    </div>
  )),
];

const wizardPages = (state, setState) => {
  return [
    new WizardPageDefinition(
      'type',
      'Type',
      () => {
        return {};
      },
      (
        <div style={{ height: '375px' }}>
          <CardPicker
            cards={typeCards}
            onChange={(key) => { alert(`User chose card with key ${key}`); }}
            columns={4}
          />
        </div>
      ),
    ),
    new WizardPageDefinition(
      'describe',
      'Describe',
      () => {
        return {};
      },
      (
        <div>
          <FormGroup>
            <ControlLabel>Name</ControlLabel>
            <FormControl type="text" placeholder="Enter the connector’s name" />
            <HelpBlock>This is the name that will be used when displaying the connector.</HelpBlock>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Description</ControlLabel>
            <FormControl componentClass="textarea" placeholder="Enter a description for the connector." />
            <HelpBlock>This will help users know what the connector is used to ingest.</HelpBlock>
          </FormGroup>
        </div>
      ),
    ),
    new WizardPageDefinition(
      'configure',
      'Configure',
      () => {
        return {};
      },
      (
        <div>
          <TabPanel
            tabInfos={configurationTabs}
            activeTabId={state.currentConfigurationTab}
            tabChanged={(newTabId) => {
              alert(`Setting the configration page's tab to ${newTabId}.`);
              setState({ currentConfigurationTab: newTabId });
            }}
          />
        </div>
      ),
      false,
      null,
      (values) => { alert(`About to show the configure page. The values for the pages are: ${values.toString()}`); },
    ),
    new WizardPageDefinition(
      'map',
      'Map',
      () => {
        return {};
      },
      (
        <div>
          Mapping controls go here.
        </div>
      ),
    ),
    new WizardPageDefinition(
      'enrich',
      'Enrich',
      () => {
        return {};
      },
      (
        <div>
          Enrichment controls go here.
        </div>
      ),
      true,
    ),
  ];
};

export default wizardPages;
