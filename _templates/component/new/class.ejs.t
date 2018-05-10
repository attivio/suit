---
to: src/components/<%= name %>.js
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

type <%= name %>Props = {
  /**
   * Property description...
   */
  prop: string;
};

type <%= name %>DefaultProps = {
};

type <%= name %>State = {
};

/**
 * Component description...
 */
export default class <%= name %> extends React.Component<<%= name %>DefaultProps, <%= name %>Props, <%= name %>State> { // eslint-disable-line max-len
  static defaultProps = {
  };

  static contextTypes = {
    searcher: PropTypes.any,
  };

  static childContextTypes = {
    <%= name %>: PropTypes.any,
  }

  static displayName = '<%= name %>';

  constructor(props: <%= name %>Props) {
    super(props);
    this.state = {
    };
    (this: any).callback = this.callback.bind(this);
  }

  state: <%= name %>State;

  getChildContext() {
    return {
      <%= name %>: this,
    };
  }

  callback() {
    console.log('Prop is set to', this.props.prop);
  }

  render() {
    return null;
  }
}
