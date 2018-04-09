// @flow

import React from 'react';
// import { Button } from 'react-bootstrap';
import { WizardPageDefinition } from '../../src/components/Wizard';
import CardPicker, { CardPickerItem } from '../../src/components/CardPicker';

const typeCards = [
  new CardPickerItem('Avro Files', 'avro', 'https://upload.wikimedia.org/wikipedia/commons/5/58/1NumberOneInCircle.png'),
  new CardPickerItem('CSV Files', 'csv', 'https://upload.wikimedia.org/wikipedia/commons/5/58/1NumberOneInCircle.png'),
  new CardPickerItem('Excel Files', 'excel', 'https://upload.wikimedia.org/wikipedia/commons/5/58/1NumberOneInCircle.png'),
  new CardPickerItem('JDBC Database', 'jdbc', 'https://upload.wikimedia.org/wikipedia/commons/5/58/1NumberOneInCircle.png'),
  new CardPickerItem('XML Files', 'xml', 'https://upload.wikimedia.org/wikipedia/commons/5/58/1NumberOneInCircle.png'),
];

const wizardPages = [
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
        <div>
          Name: <input type="text" placeholder="Enter the connector name" />
        </div>
        <div>
          Description: <textarea placeholder="Describe the connector" size={10} />
        </div>
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
        Configuration form goes here.
      </div>
    ),
    false,
    null,
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
  new WizardPageDefinition(
    'enrich',
    'Enrich',
    () => {
      return {};
    },
    (
      <div>
        Mapping controls go here.
      </div>
    ),
    true,
  ),
];
export default wizardPages;
