// @flow
import SearchFacetBucket from './SearchFacetBucket';
import SearchFacetStatistics from './SearchFacetStatistics';

/**
 * A particular facet from a query, including all of its values.
 */
export default class SearchFacet {
  static fromJson(json: any): SearchFacet {
    let buckets = [];
    if (json.buckets && json.buckets.length > 0) {
      buckets = json.buckets.map((bucket) => {
        return SearchFacetBucket.fromJson(bucket);
      });
    }
    let statistics = null;
    if (json.statistics) {
      statistics = SearchFacetStatistics.fromJson(json.statistics);
    }
    return new SearchFacet(json.name, json.field, json.label, json.count, buckets, statistics);
  }

  constructor(name: string, field: string, label: string, count: number, buckets: Array<SearchFacetBucket> = [], statistics: SearchFacetStatistics | null = null) { // eslint-disable-line max-len
    this.name = name;
    this.field = field;
    this.label = label;
    this.count = count;
    this.buckets = buckets;
    this.statistics = statistics;
  }

  /** The facet buckets (the various values for the facet that can be used to limit the query) */
  buckets: Array<SearchFacetBucket>;
  /** The name of the facet */
  name: string;
  /** The field that the facet is for */
  field: string;
  /** The human-readable label for this facet, usually the name of the field being faceted on */
  label: string;
  /** The number of occurances for a facet. */
  count: number;
  /** Statistics for the facet (only available for numeric fields) */
  statistics: SearchFacetStatistics | null;

  findLabel(): string {
    if (this.label && this.label.length > 0) {
      return this.label;
    }
    if (this.name && this.name.length > 0) {
      return this.name;
    }
    // Field should always be set.
    return this.field;
  }
}
