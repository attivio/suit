---
to: tests/components/<%= name %>-test.js
---
import expect from 'expect';
import React from 'react';
import { renderToStaticMarkup as render } from 'react-dom/server';

import <%= name %> from 'src/components/<%= name %>';

describe('<%= name %>', () => {
  it('Renders a component of type <%= name %>', () => {
    expect(render(<<%= name %> />))
      .toContain('div');
  });
});
