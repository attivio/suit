// @flow

import SearchDocument from './SearchDocument';
import SignalData from './SignalData';
import FetchUtils from '../util/FetchUtils';

/**
 * Encapsulates the default Attivio search behavior.
 */
export default class Signals {
  baseUri: string;

  /**
   * Construct a Signals object.
   *
   * @param baseUri     the base URI for the Attivio instance to call when searching
   *                    (including the protocol, hostname or IP address, and port number,
   *                    with no trailing slash)
   */
  constructor(baseUri: string) {
    this.baseUri = baseUri;
  }

  /**
   * Add a signal for the given document. If the document has no signal information
   * inside it, this method does nothing.
   */
  addSignal(doc: SearchDocument, type: string = 'click', weight: number = 1) {
    if (doc.signal) {
      const updatedSignal = SignalData.fromJson(Object.assign({}, doc.signal, { type, weight }));
      this.addRawSignal(updatedSignal);
    }
  }

  /**
   * Add a signal for the given SignalData.
   */
  addRawSignal(signal: SignalData) {
    if (signal) {
      const uri = `${this.baseUri}/rest/signals/add`;
      const callback = (response: any | null, error: string | null) => {
        if (error) {
          console.warn('Failed to submit signal', signal, error);
        }
      };
      FetchUtils.fetch(uri, signal, callback, 'POST', 'Failed to submit signal');
    }
  }
}
