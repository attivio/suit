// @flow

/**
 * Signal data needed for doing click tracking, etc., with a document.
 */
export default class SignalData {
  docId: string;
  docOrdinal: number;
  featureVector: string;
  locale: string;
  principal: string;
  query: string;
  queryTimestamp: number;
  relevancyModelName: string;
  relevancyModelNames: Array<string>;
  relevancyModelVersion: number;
  signalTimestamp: number;
  ttl: boolean;
  type: string;
  weight: number;

  static fromJson(json: any): SignalData {
    const result = new SignalData();

    result.docId = json.docId;
    result.docOrdinal = json.docOrdinal;
    result.featureVector = json.featureVector;
    result.locale = json.locale;
    result.principal = json.principal;
    result.query = json.query;
    result.queryTimestamp = json.queryTimestamp;
    result.relevancyModelName = json.relevancyModelName;
    result.relevancyModelNames = json.relevancyModelNames;
    result.relevancyModelVersion = json.relevancyModelVersion;
    result.signalTimestamp = json.signalTimestamp;
    result.ttl = json.ttl;
    result.type = json.type;
    result.weight = json.weight;

    return result;
  }

  updateForTracking(type: string = 'click', weight: number = 1) {
    this.type = type;
    this.weight = weight;
  }
}
