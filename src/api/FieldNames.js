// @flow

/**
 * The names of fields in the default Attivio schema that can be used to access values
 * in a document.
 */
export default class FieldNames {
  /** The internal field that holds the document id. */
  static ID = '.id';

  /** The internal field used for populating/querying the zone for a document. */
  static ZONE = '.zone';

  /** The virtual field used for requesting/sorting by the score for a document. */
  static SCORE = '.score';

  /** The virtual field used for sorting documents randomly */
  static RANDOM_SORT = '.random';

  /** Field indicating the maximum number of times an IngestDocument will be retried for fault tolerance */
  static FT_RETRY_COUNT = '.ftRetryCount';

  // /** The field that holds the 'default search field'. Value: FieldNames.CONTENT */
  // static DEFAULT_SEARCH_FIELD = FieldNames.CONTENT;

  /** The field that holds the title of the document; string. */
  static TITLE = 'title';

  /** The field that holds the document's primary language; string. */
  static LANGUAGE = 'language';

  /** The field that holds the languages that are contained in the document in addition to primary language; string. */
  static LANGUAGES = 'languages';

  /** The field that holds the date. */
  static DATE = 'date';

  /** The field that holds the source URI of the document; string. */
  static SOURCEURI = 'sourceuri';

  /** The field where the primary raw text content for the document is placed. */
  static TEXT = 'text';

  // /** The field containing all searchable content for the document. */
  // static CONTENT = 'content';

  /** The field for XML represented as DOM4J Document. */
  static XML_DOM = 'xmldom';

  /** The field that contains the filepath of the document. Default: 'sourcepath' */
  static SOURCEPATH = 'sourcepath';

  /** The field that contains the filename of the document. */
  static FILENAME = 'filename';

  /** The field that contains the document type. */
  static DOCTYPE = 'doctype';

  /** The field that contains the parent document type. */
  static PARENT_DOCTYPE = 'parentdoctype';

  /** The field that holds the category of the document. */
  static CATEGORY = 'cat';

  /** The field that contains the sentiment of the document. */
  static SENTIMENT = 'sentiment';

  /** The field that contains the concepts of the document. */
  static CONCEPTS = 'concepts';

  /** The field that contains people mentioned in the document. */
  static PEOPLE = 'people';

  /** The field that contains organizations mentioned in the document. */
  static ORGANIZATIONS = 'orgs';

  /** The field that contains the MIME type. Value = 'mimetype' */
  static MIME_TYPE = 'mimetype';

  /** The field that holds the parent MIME type, if any. */
  static PARENT_MIME_TYPE = 'parentmimetype';

  /** The field that holds the document content specified as a byte array. */
  static CONTENT_POINTER = 'bytes';

  /** The field that contains the URI of a document. */
  static URI = 'uri';

  /** The field that contains the hostname of a document. */
  static HOSTNAME = 'hostname';

  /** The field that contains the default document string encoding. */
  static ENCODING = 'encoding';

  /** The field that will contain the explain map for scoring in a SearchDocument. */
  static SCORE_EXPLAIN = 'score.explain';

  /** The field that will store a document's original size. */
  static SIZE = 'size';

  /** The field that will store the document id of the parent document. */
  static PARENT_ID = 'parentid';

  /** The field that will store the document id of the parent document. */
  static PROGENATOR_ID = 'progenatortid';

  /** The field that will store the ID's of documents that are ancestors of a given document. */
  static ANCESTOR_IDS = 'ancestorids';

  /**
   * Name of the field that will store the IDs of containers (typically, folders) that are ancestors of
   * a given document in a particular data source. Also includes the ID of the document itself and is
   * primarily used for document deletions.
   */
  static LINEAGE_IDS = 'lineageids';

  /** Name of the field that will store encoded position for geo search. */
  static POSITION = 'position';

  /** Name of the field that will store latitude information for geo search. */
  static LATITUDE = 'latitude';

  /** Name of the field that will store longitude information for geo search. */
  static LONGITUDE = 'longitude';

  /**
   * Name of the field that will store the name or path of the child document by which it is
   * referred to in the parent document. For example, 'dir1/dir2/doc1.txt' would be the value
   * for a ZIP archive entry 'dir1/dir2/doc1.txt'.
   */
  static CHILD_PATH = 'childpath';

  /* Internal Fields */

  /** This field contains the name of all fields indexed for a document. */
  static FIELD_NAMES = '.fields';

  /**
   * This is the field that will return the name of the join clause (if annotated)
   * for child documents.
   */
  static JOIN_CLAUSE_NAME = '.joinClauseName';

  /**
   * This field contains the engine name that the document came from. Primarily used
   * in federation scenarios at response time to indicate where a document came from
   * for front end presentation purposes.
   */
  static SOURCE_ENGINE = 'engine';

  /**
   * This field holds the name of the connector type. Useful to know what connector
   * was used to bring a doc into index.
   */
  static CONNECTOR_TYPE = 'connectortype';

  /* Fields common in extracted documents */

  /** This field holds internal document status values. */
  static DOC_STATUS = 'docstatus';

  /** This field holds document conversion error strings. */
  static CONVERSION_ERROR = 'conversionError';

  /** This field holds document conversion error codes. */
  static CONVERSION_ERROR_CODE = 'conversionErrorCode';

  /** This field holds document conversion error codes. */
  static CONVERTED_FILE_PATH = 'convertedfilepath';

  /** This field holds the count of the number of children a particular document has. */
  static CHILD_COUNT = 'childcount';

  /** This field holds the index of the child. */
  static CHILD_INDEX = 'childindex';

  /**
   * This field holds the commonly used table designation for a record for
   * join-based applications.
   */
  static TABLE = 'table';

  /** This field holds a static teaser for a document's search result. */
  static TEASER = 'teaser';

  /** This field holds all of the anchor text for the links that point to this page/document. */
  static ANCHOR_TEXT = 'anchortext';

  /** This field holds the number of inbound links that point to this page/document. */
  static LINK_COUNT = 'linkcount';

  /**
   * This field holds the a scaled factor of the number of inbound links that point to
   * this page/document. This field is primarily used for relevancy weighting purposes.
   */
  static LINK_FACTOR = 'linkfactor';

  /** This field holds a list of duplicate uris or doc ids of this page/document. */
  static DUPLICATES = 'duplicates';

  /** This field holds the SHA-256 checksum of this page/document. */
  static CHECKSUM = 'checksum';

  /** Field for unparsed JSON text */
  static JSON = 'json';

  /** Field for level of processing feedback  */
  static PROCESSING_FEEDBACK_LEVEL = 'processing.feedback.level';

  /** Field for message of processing feedback */
  static PROCESSING_FEEDBACK_MESSAGE = 'processing.feedback.message';

  /** Field for component of processing feedback  */
  static PROCESSING_FEEDBACK_COMPONENT = 'processing.feedback.component';

  /** Field for error code of processing feedback  */
  static PROCESSING_FEEDBACK_ERROR_CODE = 'processing.feedback.code';

  /** Field containing the list of static field names */
  static STATIC_FIELD_NAME = '.staticfields';

  /** Dynamic field containing any user-added tags on the document */
  static TAGS = 'tags';
}
