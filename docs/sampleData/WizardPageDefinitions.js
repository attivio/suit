// @flow

import React from 'react';
// import { Button } from 'react-bootstrap';
import { WizardPageDefinition } from '../../src/components/Wizard';

const wizardPages = [
  new WizardPageDefinition(
    'type',
    'Type',
    () => {
      return {};
    },
    (
      <div>
        <select size={9}>
          <option>AVRO Files</option>
          <option>CSV Files</option>
          <option>Excel Files</option>
          <option>JDBC Database</option>
          <option>ORC Files</option>
          <option>Parquet Files</option>
          <option>Web Crawler</option>
          <option>Windows File System</option>
          <option>XML Files</option>
        </select>
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
