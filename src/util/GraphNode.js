// @flow

export default class GraphNode {
  id: number;
  label: string;
  title: string;
  group: string;
  docId: string | null;

  constructor(id: number, label: string, title: string | null = null, group: string | null = null) {
    this.id = id;
    this.label = label;
    if (title) {
      this.title = title;
    }
    if (group) {
      this.group = group;
    }
    this.docId = null;
  }
}
