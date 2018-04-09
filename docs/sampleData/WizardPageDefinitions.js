// @flow

import React from 'react';
import { Button } from 'react-bootstrap';
import WizardPage from '../../src/components/WizardPage';

const wizardPages = [
  (<WizardPage pageKey="type" title="Type">
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
  </WizardPage>
  ),
  (<WizardPage pageKey="describe" title="Describe">
    <div>
      Name: <input type="text" placeholder="Enter the connector name" />
    </div>
    <div>
      Description: <textarea placeholder="Describe the connector" size={10} />
    </div>
  </WizardPage>
  ),
  (<WizardPage
    pageKey="configure"
    title="Configure"
    aboutToShow={(values) => { alert(`About to show the configure page. The values for the pages are: ${values.toString()}`); }}
  >
    <Button bsStyle="danger">Bad Button</Button>
  </WizardPage>
  ), (<WizardPage pageKey="map" title="Map">
    <div>Just some text</div>
  </WizardPage>
  ), (<WizardPage pageKey="enrich" title="Enrich">
    <div>Just some text</div>
  </WizardPage>
  ), (<WizardPage pageKey="process" title="Process">
    <div>Just some text</div>
  </WizardPage>
  ), (<WizardPage pageKey="secure" title="Secure">
    <div>Just some text</div>
  </WizardPage>
  ), (<WizardPage pageKey="schedule" title="Schedule">
    <div>Just some text</div>
  </WizardPage>
  ),
];
export default wizardPages;
