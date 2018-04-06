// @flow

import React from 'react';

export class ExpertInfo {
  name: string;
  title: string;
  department: string;
  imageUrl: string;
  link: string;

  constructor(name: string, title: string, department: string, imageUrl: string = '', link: string = '#') {
    this.name = name;
    this.title = title;
    this.department = department;
    this.imageUrl = imageUrl;
    this.link = link;
  }
}

type SimilarAuthorCardProps = {
  expert: ExpertInfo;
};

export default class SimilarAuthorCard extends React.Component<void, SimilarAuthorCardProps, void> {
  static displayName = 'SimilarAuthorCard';

  static ExpertInfo;

  render() {
    return (
      <div className="attivio-card attivio-expert360-similar">
        <img
          src={this.props.expert.imageUrl}
          alt={this.props.expert.name}
          className="img-responsive attivio-expert360-similar-img"
        />
        <h2 className="attivio-expert360-similar-title">
          <a href={this.props.expert.link}>
            {this.props.expert.name}
          </a>
        </h2>
        <dl className="attivio-labeldata-2col attivio-expert-details attivio-expert360-details attivio-expert360-similar-details">
          <dt>Title</dt>
          <dd>{this.props.expert.title}</dd>
          <dt><abbr className="attivio-abbr" title="Department">Dept</abbr></dt>
          <dd>{this.props.expert.department}</dd>
        </dl>
      </div>
    );
  }
}

SimilarAuthorCard.ExpertInfo = ExpertInfo;
