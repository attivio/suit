// @flow
import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import QueryString from 'query-string';

import Card from './Card';

type SpellCheckMessageProps = {
  location: PropTypes.object.isRequired;
}

/**
 * A suggested alternate query if one is available.
 */
class SpellCheckMessage extends React.Component<void, SpellCheckMessageProps, void> {
  static contextTypes = {
    searcher: PropTypes.any,
  };

  getMessage(): string {
    const searcher = this.context.searcher;
    if (searcher) {
      const response = searcher.state.response;
      if (response && response.totalHits === 0) {
        if (response.feedback) {
          const spellCheckMessages = response.feedback.filter((feedback): boolean => {
            return feedback.messageName === 'spellcheck.suggested';
          });
          return spellCheckMessages[0] ? spellCheckMessages[0].message : '';
        }
      }
    }
    return '';
  }

  getLink() {
    const message = this.getMessage();
    if (message) {
      const location = this.props.location;
      const search = QueryString.parse(location.search);
      search.query = message;
      const href = `${location.pathname}?${QueryString.stringify(search)}`;
      return (
        <a href={href}>
          {message}
        </a>
      );
    }
    return null;
  }

  render() {
    return this.getLink() && (
      <Card borderless style={{ paddingLeft: '20%', fontSize: '2rem' }}>
        Your search returned no results. <br />
        Did you mean: {this.getLink()}?
      </Card>
    );
  }
}

export default withRouter(SpellCheckMessage);
