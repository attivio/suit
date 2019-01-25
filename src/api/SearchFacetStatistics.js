// @flow

/**
 * Statistics about the values in a given facet. Only
 * applies to numeric fields.
 */
export default class SearchFacetStatistics {
  static fromJson(json: any): SearchFacetStatistics {
    const result = new SearchFacetStatistics();
    result.count = json.count;
    result.max = json.max;
    result.min = json.min;
    result.mean = json.mean;
    result.midpoint = json.midpoint;
    result.stdev = json.stdev;
    result.sum = json.sum;
    result.var = json.var;

    return result;
  }

  /** The number of the counts for all buckets */
  count: number;
  /** The lowest value for all buckets */
  min: number;
  /** The highest value for all buckets */
  max: number;
  /** The arithmetic mean for all buckets' values */
  mean: number;
  /** The midpoint between the min and max values */
  midpoint: number;
  /** The standard deviation for all values in the field */
  stdev: number;
  /** The sum of all values in the field */
  sum: number;
  /** The statistical variance for all values in the field */
  var: number;
}

// cspell:ignore stdev
