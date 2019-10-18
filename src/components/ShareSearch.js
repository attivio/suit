// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import Configurable from './Configurable';
import AuthUtils from '../util/AuthUtils';

type ShareSearchProps = {
  history: PropTypes.object.isRequired,
  /**
   * The message body for when a search is shared.
   */
  shareMessage?: string,
  /**
   * Subject of the email for when a search is shared.
   */
  subject?: string,
  /**
   * Email address the search will be shared with when using shareSearch.
   */
  email?: string,
};

type ShareSearchDefaultProps = {
  shareMessage: string,
  subject: string,
  email: string,
};

/**
 * Component to include in the Masthead for entering the query
 * to use when searching. Must be inside a Searcher component.
 */
class ShareSearch extends React.Component<ShareSearchDefaultProps, ShareSearchProps, void> {
  static defaultProps: ShareSearchDefaultProps = {
    shareMessage: `Hey,
    
    I think you would be interested in these search results that I found using Attivio, a leader in cognitive search and knowledge discovery. Here is the link:`,
    subject: 'Search results I found using Attivio!',
    email: '',
  };

  static contextTypes = {
    searcher: PropTypes.any,
  };

  static displayName = 'ShareSearch';

  render() {
    const {
      shareMessage: message,
      history: {
        location: { pathname: searchlink },
      },
      subject = '',
      email: emailAddress = '',
    } = this.props;
    const username = AuthUtils.getUserName(AuthUtils.getSavedUser());
    const signature = `\nfrom \n${username}`;
    const emailBody = message + searchlink + signature;
    const href = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    return (
      <span
        className="attivio-smalltoolbar-btn"
        title="Share this search via email"
        style={{
          position: 'relative',
          top: '2px',
          left: '-1px',
          color: '#fff',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
        }}
      >
        <a href={href}>
          <Glyphicon glyph="share" style={{ color: 'white', fontSize: '1.1em' }} />
        </a>
      </span>
    );
  }
}

export default withRouter(Configurable(ShareSearch));
