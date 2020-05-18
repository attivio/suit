// @flow

/**
 * The base class for ingest and search documents.
 */
export default class AbstractDocument {
  constructor(fields: Map<string, Array<string>>) {
    this.fields = fields;
  }

  /**
   * A map of the document’s field names to a list of their values
   * (the values must always be in an array, even if there is only one).
   */
  fields: Map<string, Array<string>>;

  /**
   * Get the first value for a given field. Will return the
   * empty string if the field doesn’t exist in the document.
   */
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

  /**
   * Get an array with all of the values for a given field.
   * Will return an empty array if the field doesn’t exist
   * in the document.
   */
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
