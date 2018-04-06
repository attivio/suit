// @Flow
import React from 'react';

import SearchDocument from '../api/SearchDocument';
import FieldNames from '../api/FieldNames';
import DataPairs, { DataPairInfo } from './DataPairs';
import DateUtils from '../util/DateUtils';
import DateFormat from '../util/DateFormat';

type DocumentEntityListProps = {
  /** The document whose entities we're showing */
  doc: SearchDocument;
  /** A map of the field names to the label to use for any entity fields */
  entityFields: Map<string, string>;
};

export default class DocumentEntityList extends React.Component<void, DocumentEntityListProps, void> {
  static displayName = 'DocumentEntityList';

  getEntityValues(doc: SearchDocument): Array<DataPairInfo> {
    const result = [];
    this.props.entityFields.forEach((fieldLabel: string, fieldName: string) => {
      const values = doc.getAllValues(fieldName);
      if (values && values.length > 0) {
        const valueString = values.join(', ');
        const dataPair = new DataPairInfo(fieldLabel, valueString, fieldName);
        result.push(dataPair);
      }
    });
    return result;
  }

  render() {
    let dataPairs = this.getEntityValues(this.props.doc);
    const date = this.props.doc.getFirstValue(FieldNames.DATE);
    if (date) {
      // If date is already there, then remove it before adding it on our own.
      dataPairs = dataPairs.filter((dataPair: DataPairInfo) => {
        return dataPair.type !== FieldNames.DATE;
      });
      const dateString = DateUtils.formatDateString(date, DateFormat.LONG_DATE);
      // We always want the date to come first
      dataPairs.unshift(new DataPairInfo('Date', dateString));
    }
    return <DataPairs pairs={dataPairs} />;
  }
}
