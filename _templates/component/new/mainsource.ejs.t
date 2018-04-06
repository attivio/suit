---
to: src/components/<%= h.capitalize(name) %>.js
---
// @flow

import React from 'react';

type <%= h.capitalize(name) %>Props = {
};

type <%= h.capitalize(name) %>DefaultProps = {
};

type <%= h.capitalize(name) %>State = {
};

export default class <%= h.capitalize(name) %> extends React.Component<<%= h.capitalize(name) %>DefaultProps, <%= h.capitalize(name) %>Props, <%= h.capitalize(name) %>State> {
  defaultProps = {
  };

  constructor(props: <%= h.capitalize(name) %>Props) {
    super(props);
    this.state = {
    };
    // Add any binding of methods here...
  }

  state: <%= h.capitalize(name) %>State;

  render() {
    // Add render code here
    return <div />;
  }
}
