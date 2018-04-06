// @flow
import React from 'react';

type NavbarPagerProps = {
  /** The currenlty displayed page number (0-based). */
  currentPage: number;
  /** The total number of pages. */
  maxPage: number;
  /**
   * A callback that is called with a new page number when
   * the user clicks the foreward or back button.
   */
  onChange: (newPage: number) => void;
}

type NavbarPagerDefaultProps = {
  maxPage: number;
};

/**
 * Display a page control which lets the user go forward and
 * backward in the search results. The currently displayed
 * page is also displayed. If at the beginning or end of the
 * pages, then the forward and back arrow buttons are disabled.
 */
export default class NavbarPager extends React.Component<NavbarPagerDefaultProps, NavbarPagerProps, void> {
  static defaultProps: NavbarPagerDefaultProps = {
    maxPage: Number.MAX_SAFE_INTEGER,
  };

  static displayName = 'NavbarPager';

  constructor(props: NavbarPagerProps) {
    super(props);
    (this: any).navBack = this.navBack.bind(this);
    (this: any).navNext = this.navNext.bind(this);
  }

  navBack() {
    if (this.props.currentPage > 0) {
      this.props.onChange(this.props.currentPage - 1);
    }
  }

  navNext() {
    if (this.props.currentPage < this.props.maxPage) {
      this.props.onChange(this.props.currentPage + 1);
    }
  }

  render() {
    const canPageBack = this.props.currentPage > 0;
    const canPageNext = this.props.currentPage < this.props.maxPage;
    const baseButtonClass = 'attivio-globalmastnavbar-btn';
    const previousButtonClass =
      `${baseButtonClass} attivio-globalmastnavbar-pagination-previous attivio-icon-arrow-left-gray ${canPageBack ? '' :
        'disabled'}`;
    const nextButtonClass =
      `${baseButtonClass} attivio-globalmastnavbar-pagination-next attivio-icon-arrow-right-gray ${canPageNext ? '' :
        'disabled'}`;

    return (
      <div className="attivio-globalmastnavbar-pagination">
        <a className={previousButtonClass}>
          Previous
        </a>
        <div className="attivio-globalmastnavbar-pagination-page">
          Page {this.props.currentPage + 1}
        </div>
        <a className={nextButtonClass}>
          Next
        </a>
      </div>
    );
  }
}
