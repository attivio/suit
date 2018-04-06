// @flow
import React from 'react';

import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

import Code from './Code';

type RelevancyScoreProps = {
  /** An ID for the score component; generally set to the document’s ID (should be unique). */
  id: string;
  /** The relevancy score to display. */
  score: number;
  /** The explanation of the score, if known. If not set, no explaination is displayed. */
  explanation: string | null;
};

type RelevancyScoreDefaultProps = {
  explanation: string | null;
};

/**
 * Display the relevancy score for a document, including providing
 * a popover with the explanation of the score.
 */
export default class RelevancyScore extends React.Component<RelevancyScoreDefaultProps, RelevancyScoreProps, void> {
  static defaultProps = {
    explanation: null,
  };

  static displayName = 'RelevancyScore';

  render() {
    let result;
    if (this.props.explanation) {
      const popover = (
        <Popover
          id={`relevancyScore-${this.props.id}`}
          title="Relevancy Score Explanation"
        >
          <Code>
            {this.props.explanation}
          </Code>
        </Popover>
      );
      result = (
        <OverlayTrigger trigger="click" placement="right" overlay={popover} rootClose>
          <a className="attivio-search-result-score">
            {this.props.score}
            {' '}
            <span className="attivio-icon-help" />
          </a>
        </OverlayTrigger>
      );
    } else {
      result = (
        <span className="attivio-search-result-score">
          {this.props.score}
        </span>
      );
    }
    return result;
  }
}
