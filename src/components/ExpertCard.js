// @flow
import React from 'react';

import FormattedDate from './FormattedDate';
import DateFormat from '../util/DateFormat';
import StringUtils from '../util/StringUtils';

export class ExpertiseItem {
  label: string;
  link: string;

  constructor(label: string, link: string) {
    this.label = label;
    this.link = link;
  }
}

type ExpertCardProps = {
  /** The full name of the expert. */
  expertName: string;
  /** The URI of the expert's photo. If not set, then a placeholder image is used. */
  expertImage: string;
  /** The title of the expert. */
  expertTitle: string;
  /** The department the expert belongs to. */
  expertDepartment: string;
  /** The employee ID for the expert. If missing, no ID will be displayed. */
  expertId: string | null;
  /** The expert's date of birth. If missing, no birthdate will be displayed. */
  expertBirthdate: Date | null;
  /** A list of areas of expertise for this expert. */
  expertiseList: Array<ExpertiseItem>;
  /** The number of documents the expert has authored */
  authorCount: number;
  /**
   * A message (to be formatted) saying how many documents the author has formatted.
   * Should contian a placeholder for the count.
   */
  authoredMessage: string;
};

type ExpertCardDefaultProps = {
  expertImage: string;
  expertId: string | null;
  expertBirthdate: Date | null;
  authorCount: number;
  authoredMessage: string;
};

/**
 * Displays a card with details about an "expert" within the company.
 */
export default class ExpertCard extends React.Component<ExpertCardDefaultProps, ExpertCardProps, void> {
  static defaultProps = {
    expertImage: 'img/placeholder-person.svg',
    expertId: null,
    expertBirthdate: null,
    authorCount: 0,
    authoredMessage: '{} document|{} documents',
  };

  static displayName = 'ExpertCard';

  static ExpertiseItem;

  render() {
    const imageAlt = this.props.expertImage ? this.props.expertName : 'Expert placeholder';
    const expertiseLinks = [];
    this.props.expertiseList.forEach((item) => {
      if (expertiseLinks.length > 0) {
        // Add a comma if we already have items in the list.
        expertiseLinks.push(', ');
      }
      expertiseLinks.push(<a href={item.link} key={`${item.label}:${item.link}`}>{item.label}</a>); // eslint-disable-line react/no-array-index-key,max-len
    });

    // Only show these if they're set on the component
    const expertId = this.props.expertId ? [<dt key="expertId-label">Employee</dt>, <dd key="expertId-value">{this.props.expertId}</dd>] : ''; // eslint-disable-line max-len
    const expertBirthdate = this.props.expertBirthdate ?
      [<dt key="expertDOB-label">Birthdate</dt>, <dd key="expertDOB-value"><FormattedDate date={this.props.expertBirthdate} format={DateFormat.MEDIUM_DATE} /></dd>] : ''; // eslint-disable-line max-len

    let authorOf = '';
    if (this.props.authorCount > 0) {
      const formattedAuthorMessage = StringUtils.fmt(this.props.authoredMessage, this.props.authorCount);
      authorOf = (
        <p className="attivio-expert-detail">
          Authored <a className="attivio-expert-detail-link">{formattedAuthorMessage}</a>
        </p>
      );
    }

    return (
      <div className="attivio-card attivio-expert">
        <img src={this.props.expertImage} alt={imageAlt} className="img-responsive attivio-expert-img" />
        <h2 className="attivio-expert-title">
          <a>{this.props.expertName}</a>
        </h2>
        {authorOf}
        <div className="row">
          <div className="col-xs-6 col-sm-6">
            <dl className="attivio-labeldata-2col attivio-expert-details">
              <dt>Title</dt>
              <dd>{this.props.expertTitle}</dd>
              <dt><abbr className="attivio-abbr" title="Department">Dept</abbr></dt>
              <dd>{this.props.expertDepartment}</dd>
            </dl>
          </div>
          <div className="col-xs-6 col-sm-6">
            <dl className="attivio-labeldata-2col attivio-expert-details">
              {expertId}
              {expertBirthdate}
            </dl>
          </div>
        </div>
        <dl className="attivio-labeldata-2col attivio-expert-details">
          <dt>Expertise</dt>
          <dd>
            {expertiseLinks}
          </dd>
        </dl>
      </div>
    );
  }
}

ExpertCard.ExpertiseItem = ExpertiseItem;
