// @flow

/**
 * Signal data needed for doing click tracking, etc., with a document.
 */
export default class SignalData {

  constructor(
    docId: string = '',
    docOrdinal: number = -1,
    featureVector: string = '',
    locale: string = '',
    principal: string = '',
    query: string = '',
    queryTimestamp: number = 0,
    relevancyModelName: string = '',
    relevancyModelNames: Array<string> = [],
    relevancyModelVersion: number = 1,
    signalTimestamp: number = 0,
    ttl: boolean = true,
    type: string = '',
    weight: number = 1,
  ) {
    this.docId = docId;
    this.docOrdinal = docOrdinal;
    this.featureVector = featureVector;
    this.locale = locale;
    this.principal = principal;
    this.query = query;
    this.queryTimestamp = queryTimestamp;
    this.relevancyModelName = relevancyModelName;
    this.relevancyModelNames = relevancyModelNames;
    this.relevancyModelVersion = relevancyModelVersion;
    this.signalTimestamp = signalTimestamp;
    this.ttl = ttl;
    this.type = type;
    this.weight = weight;
  }

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

  clone(): SignalData {
    return new SignalData(
      this.docId,
      this.docOrdinal,
      this.featureVector,
      this.locale,
      this.principal,
      this.query,
      this.queryTimestamp,
      this.relevancyModelName,
      this.relevancyModelNames,
      this.relevancyModelVersion,
      this.signalTimestamp,
      this.ttl,
      this.type,
      this.weight,
    );
  }
}
