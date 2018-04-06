// @flow

import React from 'react';

import { ExpertInfo } from './SimilarAuthorCard';

type ExpertDetailsProps = {
  expert: ExpertInfo;
};

export default class ExpertDetails extends React.Component<void, ExpertDetailsProps, void> {
  static displayName = 'ExpertDetails';

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

ExpertDetails.ExpertInfo = ExpertInfo;
