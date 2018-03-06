// @flow

import React from 'react';

type ContextHelpProps = {
  id: string;
};

export default class ContextHelp extends React.Component < void, ContextHelpProps, void> {
  getHelpInfo() {
    const id = this.props.id;
    return {
      id,
      paragraphs: [
        'A Search Profile rofile is a group of settings applied to a serch request.',
        'Each search profile can contain several query frames that define the actions that occur based on the query executed.',
        'Each query frame inherits settings from its parent search profile but can override them if necessary.',
      ],
      moreName: 'search profiles and query frames',
      moreLink: 'http://answers.attivio.com/Search-Profiles',
    };
  }

  render() {
    const info = this.getHelpInfo();

    const paragraphs = info.paragraphs ? info.paragraphs.map((paragraph, index) => {
      return <p key={`${index}:${paragraph}`}>{paragraph}</p>; // eslint-disable-line react/no-array-index-key
    }) : null;

    let more = null;
    if (info.moreLink) {
      if (info.moreName) {
        more = <p>To learn more about {info.moreName}, visit <a href={info.moreLink} target="_blank" rel="noopener noreferrer">Attivio Answers</a>.</p>;
      } else {
        more = <p>To learn more, visit <a href={info.moreLink} target="_blank" rel="noopener noreferrer">Attivio Answers</a>.</p>;
      }
    }

    return (
      <div>
        {paragraphs}
        {more}
      </div>
    );
  }
}
