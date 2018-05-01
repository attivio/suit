---
to: tests/components/<%= Name %>-test.js
---
import expect from 'expect';
import React from 'react';
import { renderToStaticMarkup as render } from 'react-dom/server';

import <%= Name %> from 'src/components/<%= Name %>';

describe('<%= Name %>', () => {
  it('Renders a component of type <%= name %>', () => {
    expect(render(<<%= Name %> />))
      .toContain('div');
  });
});
