// @flow

import React from 'react';

/**
 * Descibes the help to display in a particulsar context.
 */
export class ContextHelpInfo {
  id: string;
  title: string;
  paragraphs: Array<string>;
  moreName: string | null;
  moreLink: string | null;

  constructor(id: string, title: string, paragraphs: Array<string>, moreName: string | null = null, moreLink: string | null = null) { // eslint-disable-line max-len
    this.id = id;
    this.title = title;
    this.paragraphs = paragraphs;
    this.moreName = moreName;
    this.moreLink = moreLink;
  }
}

type ContextHelpProps = {
  info: ContextHelpInfo | null;
};

/**
 * Component to display contextual help.
 */
export default class ContextHelp extends React.Component<void, ContextHelpProps, void> {
  static displayName = 'ContextHelp';

  static ContextHelpInfo;

  render() {
    const info = this.props.info;
    if (info) {
      const paragraphs = info.paragraphs ? info.paragraphs.map((paragraph, index) => {
        return <p key={`${index}:${paragraph}`}>{paragraph}</p>; // eslint-disable-line react/no-array-index-key
      }) : null;

      let more = null;
      if (info.moreLink) {
        if (info.moreName) {
          more = (
            <p>
              To learn more about {info.moreName}, visit
              <a
                ref={info.moreLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Attivio Answers
              </a>.
            </p>
          );
        } else {
          more = <p>To learn more, visit <a href={info.moreLink} target="_blank" rel="noopener noreferrer">Attivio Answers</a>.</p>;
        }
      }

      return (
        <div>
          <h4>
            <span
              className="attivio-icon-help"
              style={{
                display: 'inline-block',
                width: '1em',
                transform: 'scale(1.5, 1.5)',
              }}
            />
            {info.title}
          </h4>
          {paragraphs}
          {more}
        </div>
      );
    }
    // No help available
    return (
      <div>
        <h4>
          <span
            className="attivio-icon-help"
            style={{
              display: 'inline-block',
              width: '1em',
              transform: 'scale(1.5, 1.5)',
            }}
          />
          Help
        </h4>
        <p>No context help is currently available.</p>
      </div>
    );
  }
}

ContextHelp.ContextHelpInfo = ContextHelpInfo;
