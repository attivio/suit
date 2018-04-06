import React from 'react';

type StarRatingProps = {
  /** The number of stars to show, from 0 to 5. */
  stars: number,
  /**
   * If provided, the user will be able to assign their own rating
   * and this function will be called when that has happened. If this
   * is not set, then the star rating will be purely for display.
   */
  onRated: null | (starRating: 1 | 2 | 3 | 4 | 5) => void;
};

type StarRatingDefaultProps = {
  stars: number,
  chooseable: boolean,
  onRated: null | (starRating: 1 | 2 | 3 | 4 | 5) => void;
};

type StarRatingState = {
  stars: number,
};

/**
 * Component to show a "star" rating for a document. It can display
 * between 0 and 5 stars, including fractional values rounded to the
 * nearest half star. If the chooseable flag is set, then the user
 * will be able to choose their own rating for the document and call
 * the enclosing Searcher to apply the value to the document in the
 * index.
 */
export default class StarRating extends React.Component<StarRatingDefaultProps, StarRatingProps, StarRatingState> {
  static defaultProps = {
    stars: 0,
    onRated: null,
  };

  static displayName = 'StarRating';

  constructor(props: StarRatingProps) {
    super(props);
    this.state = {
      stars: this.props.stars,
    };
  }

  state: StarRatingState;

  handleClick(numberOfStars: number) {
    this.setState({
      stars: numberOfStars,
    }, () => {
      // Won't get here unless the callback is set, but this check makes flow happy
      if (this.props.onRated) {
        this.props.onRated(numberOfStars);
      }
      this.starDivElems.forEach((elem) => {
        if (elem) {
          elem.blur();
        }
      });
    });
  }

  starDivElems: Array<?HTMLDivElement> = [];

  render() {
    const origStars = this.state.stars;
    const numFull = Math.trunc(origStars);
    const halfIndex = origStars - numFull > 0 ? numFull : -1;
    const starCount = origStars === 1 ? '1 star' : `${origStars} stars`;

    const starDivs = [];
    for (let i = 0; i < 5; i += 1) {
      // If we're chooseable, then add click handling stuff
      const clickableProps = this.props.onRated === null ? {} : {
        onClick: () => { this.handleClick(i + 1); },
        role: 'button',
        tabIndex: 0,
        ref: (elem) => { this.starDivElems.push(elem); },
      };

      if (i < numFull) {
        starDivs.push(
          (
            <div
              key={`starDiv${i}`}
              className="attivio-stars-star attivio-icon-star-full"
              {...clickableProps}
            />
          ),
        );
      } else if (i === halfIndex) {
        starDivs.push(
          (
            <div
              key={`starDiv${i}`}
              className="attivio-stars-star attivio-icon-star-half"
              {...clickableProps}
            />
          ),
        );
      } else {
        starDivs.push(
          (
            <div
              key={`starDiv${i}`}
              className="attivio-stars-star attivio-icon-star-empty"
              {...clickableProps}
            />
          ),
        );
      }
    }

    return (
      <div className="attivio-stars">
        <div className="sr-only">{starCount}</div>
        {starDivs}
      </div>
    );
  }
}
