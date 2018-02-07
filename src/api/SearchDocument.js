// @flow

import SignalData from './SignalData';
import AbstractDocument from './AbstractDocument';
/**
 * An individual document in a search result.
 */
export default class SearchDocument extends AbstractDocument {
  static fromJson(json: any) : SearchDocument {
    const result = new SearchDocument(new Map());
    if (json.fields && Object.keys(json.fields).length > 0) {
      Object.keys(json.fields).forEach((key) => {
        const values = json.fields[key];
        result.fields.set(key, values);
      });
    }
    if (json.children && json.children.length > 0) {
      const resultChildren = json.children.map((child) => {
        return SearchDocument.fromJson(child);
      });
      result.children = resultChildren;
    }
    if (json.signal) {
      result.signal = SignalData.fromJson(json.signal);
    }
    return result;
  }

  constructor(fields: Map<string, Array<string>>, signal: SignalData | null = null, children: Array<SearchDocument> = []) {
    super(fields);
    this.signal = signal;
    this.children = children;
  }

  /**
   * Signal data that is included if requested
   */
  signal: SignalData | null;
  /**
   * An array of any child documents (e.g., as the result of performing
   * a JOIN in the query).
   */
  children: Array<SearchDocument>;
}
