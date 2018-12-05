// @flow

import React from 'react';

/**
 * Describes the help to display in a particular context.
 */
export class ContextHelpInfo {
  /** An ID for the help topic. */
  id: string;
  /** The title to show for the help. */
  title: string;
  /** The contents of the help, separated into paragraphs. */
  paragraphs: Array<string>;
  /** The label to use for showing more information. If not set, no link to more information will be shown. */
  moreName: string | null;
  /** A URL for more information. */
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
  /** Details about the help to show. */
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
              {'\u00a0'}
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
          more = (
            <p>
              To learn more, visit
              {'\u00a0'}
              <a href={info.moreLink} target="_blank" rel="noopener noreferrer">
                Attivio Answers
              </a>
              .
            </p>
          );
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
