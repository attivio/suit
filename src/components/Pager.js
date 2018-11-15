// @flow
import React from 'react';

type PagerProps = {
  /**
   * The callback used when the user changes the page. It is passed the new page number (0-based).
   */
  onPageChange: (newPage: number) => void;
  /** The total number of pages in the data set. */
  totalPages: number;
  /** The current page in the data set (0-based). */
  currentPage: number;
  /** If set, then the pager control will be "pulled right" in its parent. */
  right: boolean;
};

type PagerDefaultProps = {
  right: boolean;
};

/**
 * A simple control for paging through a set of results with forward and back buttons.
 */
export default class Pager extends React.Component<PagerDefaultProps, PagerProps, void> {
  static defaultProps = {
    right: false,
  };

  static displayName = 'Pager';

  constructor(props: PagerProps) {
    super(props);
    (this: any).back = this.back.bind(this);
    (this: any).next = this.next.bind(this);
  }

  backButton: ?HTMLAnchorElement;
  nextButton: ?HTMLAnchorElement;

  back(): void {
    if (this.backButton) {
      this.backButton.blur();
    }
    if (this.props.currentPage > 0) {
      const newPage = this.props.currentPage - 1;
      this.props.onPageChange(newPage);
    }
  }

  next(): void {
    if (this.nextButton) {
      this.nextButton.blur();
    }
    if (this.props.currentPage < (this.props.totalPages - 1)) {
      const newPage = this.props.currentPage + 1;
      this.props.onPageChange(newPage);
    }
  }

  render() {
    const currentDisplayPage = Number(this.props.currentPage + 1).toLocaleString();
    const canGoLeft = this.props.currentPage > 0;
    const leftButton = canGoLeft ? (
      <a
        role="button"
        tabIndex={0}
        className="attivio-globalmastnavbar-pagination-previous attivio-globalmastnavbar-btn attivio-icon-arrow-left-gray"
        onClick={this.back}
        ref={(c) => {
          this.backButton = c;
        }}
      >
        Previous
      </a>
    ) : (
      <a
        className="attivio-globalmastnavbar-pagination-previous attivio-globalmastnavbar-btn attivio-icon-arrow-left-gray disabled" // eslint-disable-line max-len
      >
        Previous
      </a>
    );
    const canGoRight = this.props.currentPage < (this.props.totalPages - 1);
    const rightButton = canGoRight ? (
      <a
        role="button"
        tabIndex={0}
        className="attivio-globalmastnavbar-pagination-next attivio-globalmastnavbar-btn attivio-icon-arrow-right-gray"
        onClick={this.next}
        ref={(c) => {
          this.nextButton = c;
        }}
      >
        Next
      </a>
    ) : (
      <a
        className="attivio-globalmastnavbar-pagination-next attivio-globalmastnavbar-btn attivio-icon-arrow-right-gray disabled" // eslint-disable-line max-len
      >
        Next
      </a>
    );

    const leftRight = this.props.right ? 'attivio-globalmastnavbar-right' : '';

    return (
      <div className={leftRight}>
        <div className="attivio-globalmastnavbar-pagination">
          {leftButton}
          <div className="attivio-globalmastnavbar-pagination-page">Page {currentDisplayPage}</div>
          {rightButton}
        </div>
      </div>
    );
  }
}
