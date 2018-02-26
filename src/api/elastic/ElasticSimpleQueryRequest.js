// @flow
import SimpleQueryRequest from "../SimpleQueryRequest";

/**
 * This is a extended version of SimpleQueryRequest,
 * aimed to support ElasticSearch requests
 */

export default class ElasticSimpleQueryRequest extends SimpleQueryRequest {
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
    rp: Map<string, Array<string>> = new Map()
  ) {
    super(q, wf, ql, l, r, flt, f, s, fds, un, rlm, ff, rp);
  }
}