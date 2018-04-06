import React from 'react';

type DocumentTypeProps = {
  /**
   * The type of the document (generally the value of its table field).
   * If not set, this defaults to "Document".
   */
  docType: string,
  /** The ordinal position (1-based) of the document within the search results. */
  position: number,
};

type DocumentTypeDefaultProps = {
  docType: string,
};

/**
 * Display the type of the document and its position within the search results.
 */
export default class DocumentType extends React.Component<DocumentTypeDefaultProps, DocumentTypeProps, void> {
  static defaultProps = {
    docType: 'Document',
  }

  static displayName = 'DocumentType';

  getDocType(): string {
    if (this.props.docType && this.props.docType.length > 0) {
      return this.props.docType;
    }
    return 'Document';
  }

  render() {
    const type = this.getDocType();
    return (
      <a className="attivio-category">
        <span className="attivio-category-count">{this.props.position}</span>
        <span className="attivio-category-label">{type}</span>
      </a>
    );
  }
}
