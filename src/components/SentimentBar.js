import React from 'react';

type SentimentBarProps = {
  /** The amount of positive sentiment for this document/object. Defaults to 0. */
  posCount: number,
  /** The amount of negative sentiment for this document/object. Defaults to 0. */
  negCount: number,
  /** A callback used if the user clicks the positive or negative link. */
  onClick: (clickedPositive: boolean) => void;
};

type SentimentBarDefaultProps = {
  posCount: number,
  negCount: number,
  onClick: (clickedPositive: boolean) => void;
};

/**
 * Displays an indication of the overall sentiment for a particular document/object.
 * This includes a bar that can be part red and green for mixed sentiment, all red
 * for entirely negative sentiment, all green for entirely positive sentiment, or
 * and empty bar if there is no sentiment information to display.
 */
export default class SentimentBar extends React.Component<SentimentBarDefaultProps, SentimentBarProps, void> {
  static defaultProps = {
    posCount: 0,
    negCount: 0,
    onClick: () => {},
  };

  static displayName = 'SentimentBar';

  render() {
    let posWidthPct = 0;
    let negWidthPct = 0;
    let showPos = true;
    let showNeg = true;
    let showNeither = false;

    const clickPositive = (event: Event & { target: HTMLElement }) => {
      this.props.onClick(true);
      event.target.blur();
      event.target.parentElement.blur();
    };

    const clickNegative = (event: Event & { target: HTMLElement }) => {
      this.props.onClick(false);
      event.target.blur();
      event.target.parentElement.blur();
    };

    if (this.posCount === 0 && this.negCount === 0) {
      // Special case: don't show anything...
      showPos = false;
      showNeg = false;
      showNeither = true;
    } else if (this.posCount === 0) {
      // Special case: 100% positive
      showPos = false;
      negWidthPct = 100;
    } else if (this.negCount === 0) {
      // Special case: 100% negative
      showNeg = false;
      posWidthPct = 100;
    } else {
      // Figure out the percentages of the positive and negative bars
      const totalWidth = this.props.posCount + this.props.negCount;
      posWidthPct = Math.trunc(((this.props.posCount / totalWidth) * 100) + 0.5);
      negWidthPct = 100 - posWidthPct; // Do this so, in case of rounding issues, we'll always have 100% total
    }
    const posWidth = `${posWidthPct}%`;
    const negWidth = `${negWidthPct}%`;

    const posBar = showPos ? (
      <div
        className="attivio-sentiment-chart-bar-positive"
        aria-hidden="true"
        onClick={clickPositive}
        style={{
          width: posWidth,
        }}
      />
    ) : '';
    const negBar = showNeg ? (
      <div
        className="attivio-sentiment-chart-bar-negative"
        aria-hidden="true"
        onClick={clickNegative}
        style={{
          width: negWidth,
        }}
      />
    ) : '';

    return (
      <div className="attivio-sentiment-chart">
        <a
          className="attivio-sentiment-chart-positive"
          onClick={clickPositive}
          role="button"
          tabIndex={0}
        >
          Positive
          <span className="attivio-sentiment-chart-count">
            ({this.props.posCount})
          </span>
        </a>
        <a
          className="attivio-sentiment-chart-negative"
          onClick={clickNegative}
          role="button"
          tabIndex={0}
        >
          Negative
          <span className="attivio-sentiment-chart-count">
            ({this.props.negCount})
          </span>
        </a>
        <div className="attivio-sentiment-chart-bar">
          {posBar}
          {negBar}
          {showNeither ? <div className="attivio-sentiment-chart-bar-empty" aria-hidden="true" style={{ width: '100%' }} /> : ''}
        </div>
      </div>
    );
  }
}
