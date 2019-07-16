// @flow
import SearchDocument from './SearchDocument';

export default class Comment {
  /** The comment's ID */
  id: string;
  /** The comment text */
  text: string;
  /** The timestamp for when the comment is posted */
  timestamp: string;
  /** The username of the user who posted this comment */
  username: string;

  constructor(id: string, text: string, timestamp: string, username: string) {
    this.id = id;
    this.text = text;
    this.timestamp = timestamp;
    this.username = username;
  }

  static fromDoc(doc: SearchDocument): Comment {
    const id = doc.getFirstValue('.id');
    const text = doc.getFirstValue('comment_s');
    const timestamp = doc.getFirstValue('timestamp_s');
    const username = doc.getFirstValue('username_s');
    return new Comment(id, text, timestamp, username);
  }
}
