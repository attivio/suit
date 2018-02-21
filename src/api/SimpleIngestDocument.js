// @flow

import AbstractDocument from './AbstractDocument';
import SimplePrincipal from './SimplePrincipal';
import DocumentMode from '../util/DocumentMode';

export class SimplePermission {
  principal: SimplePrincipal;
  readable: boolean;

  constructor(principal: SimplePrincipal, readable: boolean = true) {
    this.principal = principal;
    this.readable = readable;
  }
}

export default class SimpleIngestDocument extends AbstractDocument {
  /** The document's ID */
  id: string;
  /** The index zone */
  zone: string | null;
  correlationId: string | null;
  /** How the document should be applied to the index */
  mode: DocumentMode;
  /** Permissions on the document */
  permissions: Array<SimplePermission>;

  constructor(
    id: string,
    fields: Map<string, Array<string>>,
    mode: DocumentMode = DocumentMode.ADD,
    zone: string | null = null,
    correlationId: string | null = null,
    permissions: Array<SimplePermission> = [],
  ) {
    super(fields);
    this.id = id;
    this.zone = zone;
    this.correlationId = correlationId;
    this.mode = mode;
    this.permissions = permissions;
  }
}
