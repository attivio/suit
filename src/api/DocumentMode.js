// @flow

import { Enum } from 'enumify';

export default class DocumentMode extends Enum {}

/** Add a document to the index. (implies a delete of any existing documents with the same ID prior to adding) */
const ADD = 'ADD';

/** Delete a document from the index. */
const DELETE = 'DELETE';

/**
 * Update a document, adding in fields, retaining values for fields not contained in update document.
 * <p>
 * The exact semantics are engine dependent as some may only work on real time fields while others may work on any field in the
 * document.
 */
const PARTIAL = 'PARTIAL';

/**
 * Update a document, uniquely appending values to multi-value fields.
 * <p>
 * NOTE: This operation will only affect multi-value fields. Any updates to single value fields will be ignored.
 */
const PARTIAL_APPEND_VALUES = 'PARTIAL_APPEND_VALUES';

/**
 * Update a document, removing matching values from multi-value fields.
 * <p>
 * Fields in this update act as a blacklist, filtering multi-value fields in the previously indexed document.
 * <p>
 * NOTE: This operation will only affect multi-value fields. Any updates to single value fields will be ignored.
 */
const PARTIAL_REMOVE_VALUES = 'PARTIAL_REMOVE_VALUES';

/**
 * Create a document in the index. (does not imply delete of document prior to add)
 * <p>
 * This document mode should only be used during an initial feed of the index or in situations where the same document will
 * never be feed twice. If the same document is added with this mode twice, the document will occur in the index twice.
 */
const CREATE = 'CREATE';

DocumentMode.initEnum([
  ADD,
  DELETE,
  PARTIAL,
  PARTIAL_APPEND_VALUES,
  PARTIAL_REMOVE_VALUES,
  CREATE,
]);
