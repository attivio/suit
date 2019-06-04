// @flow
import React from 'react';

type PagerProps = {
  /**
   * The callback used when the user changes the page. It is passed the new page number (0-based).
   */
  onPageChange: (newPage: number) => void;
  /** The current page in the data set (0-based). */
  currentPage: number;
  /**
   * The total number of pages in the data set if known. Used to determine whether the next button
   * is enabled. If not set, then the hasMore property must be set for the next button to be
   * enabled. (The previous button is always enabled based on whether the current page is 0 (disabled)
   * or greater than 0 (enabled).
   */
  totalPages: number;
  /**
   * If the totalPages property is not set, then this property is used to determine whether there are
   * more pages beyond the current one. (If totalPages is set, then hasMore is ignored.)
   */
  hasMore: boolean;
  /** If set, then the pager control will be "pulled right" in its parent. */
  right: boolean;
  /**
   * Property that contains the prefix for data-test attribute added to elements to be uniquely
   * identified by testing tools like Selenium
   */
  dataTestPrefix? : string | null;
};

type PagerDefaultProps = {
  right: boolean;
  totalPages: number;
  hasMore: boolean;
  dataTestPrefix : string | null;
};

/**
 * A simple control for paging through a set of results with forward and back buttons.
 */
export default class Pager extends React.Component<PagerDefaultProps, PagerProps, void> {
  static defaultProps = {
    right: false,
    totalPages: -1,
    hasMore: false,
    dataTestPrefix: null,
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
    const { currentPage, onPageChange } = this.props;
    if (this.backButton) {
      this.backButton.blur();
    }
    if (currentPage > 0) {
      const newPage = currentPage - 1;
      onPageChange(newPage);
    }
  }

  next(): void {
    const { currentPage, totalPages, hasMore, onPageChange } = this.props;

    if (this.nextButton) {
      this.nextButton.blur();
    }
    if ((totalPages >= 0 && currentPage < (totalPages - 1)) || (totalPages === -1 && hasMore)) {
      const newPage = currentPage + 1;
      onPageChange(newPage);
    }
  }

  render() {
    const { currentPage, totalPages, hasMore, dataTestPrefix } = this.props;
    const currentDisplayPage = Number(currentPage + 1).toLocaleString();
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
        data-test={(dataTestPrefix) ? `${dataTestPrefix}-Pager-Previous-Button` : null}
      >
        Previous
      </a>
    ) : (
      <a
        className="attivio-globalmastnavbar-pagination-previous attivio-globalmastnavbar-btn attivio-icon-arrow-left-gray disabled" // eslint-disable-line max-len
        data-test={(dataTestPrefix) ? `${dataTestPrefix}-Pager-Previous-Button-disabled` : null}
      >
        Previous
      </a>
    );
    let canGoRight = false;
    if (totalPages > 0 && currentPage < (totalPages - 1)) {
      canGoRight = true;
    } else if (totalPages === -1 && hasMore) {
      canGoRight = true;
    }
    const rightButton = canGoRight ? (
      <a
        role="button"
        tabIndex={0}
        className="attivio-globalmastnavbar-pagination-next attivio-globalmastnavbar-btn attivio-icon-arrow-right-gray"
        onClick={this.next}
        ref={(c) => {
          this.nextButton = c;
        }}
        data-test={(dataTestPrefix) ? `${dataTestPrefix}-Pager-Next-Button` : null}
      >
        Next
      </a>
    ) : (
      <a
        className="attivio-globalmastnavbar-pagination-next attivio-globalmastnavbar-btn attivio-icon-arrow-right-gray disabled" // eslint-disable-line max-len
        data-test={(dataTestPrefix) ? `${dataTestPrefix}-Pager-Next-Button-disabled` : null}
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
