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

  // eslint-disable-next-line class-methods-use-this
  static createTimestamp(date) {
    const d = new Date(date);
    return `Posted on ${d.toDateString()} at ${d.toLocaleTimeString()}`;
  }

  static fromDoc(doc: SearchDocument): Comment {
    const id = doc.getFirstValue('.id');
    const text = doc.getFirstValue('comment_s');
    const date = doc.getFirstValue('date');
    const timestamp = Comment.createTimestamp(date);
    //  const timestamp = doc.getFirstValue('date');
    const username = doc.getFirstValue('username_s');
    return new Comment(id, text, timestamp, username);
  }
}
