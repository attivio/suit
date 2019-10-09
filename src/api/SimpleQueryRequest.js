// @flow

import FacetFilter from './FacetFilter';
import AuthUtils from '../util/AuthUtils';

/**
 * An object that embodies the various parameters needed to
 * make a query of the Attivio index.
 */
export default class SimpleQueryRequest {
  constructor(
    q: string = '*:*',
    wf: string = 'search',
    ql: 'simple' | 'advanced' = 'simple',
    l: string = 'en',
    r: number = 10,
    flt: Array<string> = [],
    f: Array<string> = [],
    s: Array<string> = [],
    fds: Array<string> = [],
    un: string | null = null,
    rlm: string | null = null,
    ff: Array<FacetFilter> = [],
    rp: Map<string, Array<string>> = new Map(),
  ) {
    this.query = q;
    this.workflow = wf;
    this.queryLanguage = ql;
    this.locale = l;
    this.rows = r;
    this.filters = flt;
    this.facets = f;
    this.sort = s;
    this.fields = fds;
    this.facetFilters = ff;
    this.restParams = rp;

    if (un === null) {
      this.username = AuthUtils.getConfig().ALL.defaultUsername;
    } else {
      this.username = un;
    }
    if (rlm === null) {
      this.realm = AuthUtils.getConfig().ALL.defaultRealm;
    } else {
      this.realm = rlm;
    }
  }

  /** The workflow to use when processing the query */
  workflow: string;
  /** The query string */
  query: string;
  /** Whether the query is in Simple Query Language or Advanced Query Language */
  queryLanguage: 'simple' | 'advanced';
  /** The locale to use when performing the query */
  locale: string;
  /** The number of documents to return with the query results */
  rows: number;
  /** Any filters to apply to the query */
  filters: Array<string>;
  /** Which facets you want to have returned with the results */
  facets: Array<string>;
  /** How you want the query results sorted */
  sort: Array<string>;
  /** The fields to return for each document */
  fields: Array<string>;
  /** The name of the user performing the query */
  username: string;
  /** The user's realm */
  realm: string;
  /** Any facet filters to apply to the query */
  facetFilters: Array<FacetFilter>;
  /** Any additional REST parameters to pass. Note that the values MUST be arrays, even if there's only one instance. */
  restParams: Map<string, Array<string>>;
}
