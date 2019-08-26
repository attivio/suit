// @flow
import SearchDocument from './SearchDocument';

/**
 * A Briefcase
 */
export default class Briefcase {
  static fromDoc(doc: SearchDocument): Briefcase {
    const id = doc.getFirstValue('.id');
    const name = doc.getFirstValue('name_s');
    const username = doc.getFirstValue('username_s');
    const date = doc.getFirstValue('date');
    const docIds = doc.getAllValues('briefcaseDocIds');
    return new Briefcase(id, name, username, date, docIds);
  }

  /** The briefcase's ID */
  id: string;
  /** The name of the briefcase */
  name: string;
  /** The user who created the briefcase */
  username: string;
  /** The date when the briefcase was created */
  date: string;
  /** The IDs for all the documents in the briefcase */
  docIds: Array<string> | null;

  constructor(id: string, name: string, username: string, date: string, docIds: Array<string> | null) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.date = date;
    if (docIds && docIds.length > 0) {
      this.docIds = [...docIds];
    } else {
      this.docIds = [];
    }
  }
}
