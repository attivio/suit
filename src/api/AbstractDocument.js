// @flow

/**
 * The basis for ingest and search documents.
 */
export default class AbstractDocument {
  constructor(fields: Map<string, Array<string>>) {
    this.fields = fields;
  }

  /**
   * A map of the document's field names to a list of their values
   * (the values are in an arry even if there is only one).
   */
  fields: Map<string, Array<string>>;

  getFirstValue(fieldName: string): string {
    let result = '';
    if (this.fields) {
      const values = this.fields.get(fieldName);
      if (values && values.length > 0) {
        result = values[0].toString();
      }
    }
    return result;
  }

  getAllValues(fieldName: string): Array<string> {
    let result = [];
    if (this.fields) {
      const values = this.fields.get(fieldName);
      if (values && values.length > 0) {
        result = values;
      }
    }
    return result;
  }
}
