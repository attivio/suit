// @flow

/**
 * A facet filter for a query
 */
export default class FacetFilter {
  /** The name of the facet */
  facetName: string;
  /** The human-readable label for this bucket */
  bucketLabel: string;
  /** The query string that will be used to filter the results for this facet/bucket */
  filter: string;
}
