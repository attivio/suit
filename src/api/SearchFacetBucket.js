// @flow

/**
 * Details for a single value for a particular facet.
 */
export default class SearchFacetBucket {
  static fromJson(json: any): SearchFacetBucket {
    let children;
    if (json.children && json.children.buckets && Array.isArray(json.children.buckets)) {
      children = json.children.buckets.map((jsonChild: any) => {
        return SearchFacetBucket.fromJson(jsonChild);
      });
    } else {
      children = [];
    }

    let label = json.label;
    if (!label && json.range) {
      label = json.range.label;
    }

    return new SearchFacetBucket(
      json.value,
      label,
      json.count,
      json.filter,
      json.min,
      json.max,
      children,
      json.range,
    );
  }

  constructor(
    value: any,
    label: string,
    count: number,
    filter: string,
    min: string | null = null,
    max: string | null = null,
    children: Array<SearchFacetBucket> = [],
    range: any,
  ) {
    this.value = value;
    this.label = label;
    this.count = count;
    this.filter = filter;
    this.min = min;
    this.max = max;
    this.children = children;
    this.range = range;
  }

  /** Get the label to display for this bucket */
  displayLabel(): string {
    let result = 'Unknown';
    if (this.label) {
      result = this.label;
    } else if (this.value) {
      if (typeof this.value === 'string') {
        result = this.value;
      } else if (typeof this.value === 'object') {
        // If it's a position, with either y and y coordinate or
        // longitude and latitude values, show it within parentheses
        if (Object.prototype.hasOwnProperty.call(this.value, 'x') && Object.prototype.hasOwnProperty.call(this.value, 'y')) {
          result = `(${this.value.x}, ${this.value.y})`;
        } else if (Object.prototype.hasOwnProperty.call(this.value, 'longitude') &&
          Object.prototype.hasOwnProperty.call(this.value, 'latitude')) {
          result = `(${this.value.longitude}, ${this.value.latitude})`;
        } else {
          // Always convert to a string in any case...
          result = this.value.toString();
        }
      } else {
        result = this.value;
      }
    } else if (this.min) {
      if (this.max) {
        result = `${this.min} - ${this.max}`;
      }
      result = this.min;
    }
    return result;
  }

  /** Get a key to use for this bucket */
  bucketKey(): string {
    return `${this.displayLabel()}:${this.filter}`;
  }

  /** The value of the bucket */
  value: any;
  /**
   * If present (generally for filter facet requests or range facets), the label to display
   * as the facet bucket's value instead of the value field
   */
  label: string | null;
  /** The number of occurrences of this value in the facet */
  count: number;
  /** The filter that can be used to limit the original query to only show documents matching this value */
  filter: string;
  /** The minimum, or "from," value for the bucket's range (for range facets only) */
  min: string | null;
  /** The maximum, or "to," value for the bucket's range (for range facets only) */
  max: string | null;
  /** Any child buckets */
  children: Array<SearchFacetBucket>;
  /** The range if this is a range facet */
  range: any;
}
