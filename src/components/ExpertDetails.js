// @flow

import * as React from 'react';

import SimilarAuthorCard from './SimilarAuthorCard';

type ExpertDetailsProps = {
  expert: SimilarAuthorCard.ExpertInfo;
};

export default class ExpertDetails extends React.Component<ExpertDetailsProps, void> {
  static displayName = 'ExpertDetails';

  /* $FlowFixMe This comment suppresses an error found when upgrading Flow to
   * v0.107.0. To view the error, delete this comment and run Flow. */
  static ExpertInfo;

  render() {
    return (
      <dl className="attivio-labeldata-2col attivio-expert-details attivio-expert360-details">
        <dt>Title</dt>
        <dd>{this.props.expert.title}</dd>
        <dt><abbr className="attivio-abbr" title="Department">Dept</abbr></dt>
        <dd>{this.props.expert.department}</dd>
      </dl>
    );
  }
}

ExpertDetails.ExpertInfo = SimilarAuthorCard.ExpertInfo;
