// @flow
import SearchDocument from './SearchDocument';
import StringUtils from '../util/StringUtils';
/**
 * Saved search queries marked/saved for future use
 */
export default class SavedSearch {
  setProperties(doc: SearchDocument) {
    const htmlString = doc.getFirstValue('title');
    this.id = doc.getFirstValue('.id');
    this.title = StringUtils.stripSimpleHtml(htmlString);
    this.query = doc.getFirstValue('query_s');
    this.queryString = doc.getFirstValue('query_string_s');
    this.titleLabel = this.title;
  }

  constructor() {
    this.id = '';
    this.title = '';
    this.query = '';
    this.queryString = '';
    this.titleLabel = '';
  }

  /** ID of the saved search query document */
  id: string;
  /** Title of the saved search */
  title: string;
  /** Query that fetches a particular saved search */
  query: string;
  /** Query string */
  queryString: string;
  /** A placeholder label for title, when the title is too long */
  titleLabel: string;
}
