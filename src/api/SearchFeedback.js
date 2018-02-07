// @flow

/**
 * Feedback information about the query and how it was processed.
 */
export default class SearchFeedback {
  static fromJson(json: any): SearchFeedback {
    const result = new SearchFeedback();
    result.message = json.message;
    result.messageName = json.messageName;
    if (json.properties && Object.keys(json.properties).length > 0) {
      const resultProperties = new Map();
      Object.keys(json.properties).forEach((key) => {
        resultProperties.set(key, json.properties[key]);
      });
      result.properties = resultProperties;
    }
    result.stageName = json.stageName;
    return result;
  }

  /** A user-readable message describing the feedback */
  message: string;
  /** The name of the message */
  messageName: string;
  /** Properties for the message */
  properties: Map<string, string>;
  /** The name of the stage in the workflow that added the feedback */
  stageName: string;
}
