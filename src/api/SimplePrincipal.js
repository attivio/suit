// @flow

/**
 * Principal object used by the Attivio server.
 */
export default class SimplePrincipal {
  /** The principal's name */
  name: string;
  /** The principal's realm */
  realm: string;
  /** Any groups the principal belongs to (they should all have their type field set to 'group') */
  groupMemberships: Array<SimplePrincipal>;
  /** Whether this is a user or a group */
  type: 'user' | 'group';

  constructor(name: string, realm: string, groupMemberships: Array<SimplePrincipal> = [], type: 'user' | 'group' = 'user') {
    this.name = name;
    this.realm = realm;
    this.groupMemberships = groupMemberships;
    this.type = type;
  }

  static fromJson(json: any): SimplePrincipal {
    let groupMemberships = [];
    if (json.groupMemberships && json.groupMemberships.length > 0) {
      groupMemberships = json.groupMemberships.map((group) => {
        return new SimplePrincipal(json.name, json.realm, group, json.type);
      });
    }
    return new SimplePrincipal(json.name, json.realm, groupMemberships, json.type);
  }
}
