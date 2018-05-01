---
to: src/components/<%= Name %>.js
---
// @flow

import React from 'react';
import PropTypes from 'prop-types';

// Import other library code
// E.g.:
// import Button from 'react-bootstrap/lib/Button';

// Import any required components modules
// E.g.:
// import Searcher from './Searcher';
// import QueryResponse from '../api/QueryResponse';
// import AuthUtils from '../util/AuthUtils';

type <%= Name %>Props = {
  /**
   * Property description...
   */
  prop: string;
};

type <%= Name %>DefaultProps = {
};

type <%= Name %>State = {
};

/**
 * Component description...
 */
export default class <%= Name %> extends React.Component<<%= Name %>DefaultProps, <%= Name %>Props, <%= Name %>State> { // eslint-disable-line max-len
  static defaultProps = {
  };

  static contextTypes = {
    searcher: PropTypes.any,
  };

  static childContextTypes = {
    <%= name %>: PropTypes.any,
  }

  static displayName = '<%= Name %>';

  constructor(props: <%= Name %>Props) {
    super(props);
    this.state = {
    };
    (this: any).callback = this.callback.bind(this);
  }

  state: <%= Name %>State;

  getChildContext() {
    return {
      <%= Name %>: this,
    };
  }

  callback() {
    console.log('Prop is set to', this.props.prop);
  }

  render() {
    return null;
  }
}
