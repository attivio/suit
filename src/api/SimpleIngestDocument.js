// @flow

import AbstractDocument from './AbstractDocument';
import SimplePrincipal from './SimplePrincipal';
import DocumentMode from '../util/DocumentMode';

import ObjectUtils from '../util/ObjectUtils';

export class SimplePermission {
  principal: SimplePrincipal | null;
  readable: boolean;

  constructor(principal: SimplePrincipal | null = null, readable: boolean = true) {
    this.principal = principal;
    this.readable = readable;
  }

  static fromJson(json: any): SimplePermission {
    let principal = null;
    if (json.principal) {
      principal = SimplePrincipal.fromJson(json.principal);
    }
    return new SimplePermission(principal, json.readable);
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

  static fromJson(json: any): SimpleIngestDocument {
    let permissions = [];
    if (json.permissions && json.permissions.length > 0) {
      permissions = json.permissions.map((permission) => {
        return SimplePermission.fromJson(permission);
      });
    }
    return new SimpleIngestDocument(json.id,
      ObjectUtils.toMap(json.fields), json.zone, json.correlationId, json.mode, permissions);
  }
}
