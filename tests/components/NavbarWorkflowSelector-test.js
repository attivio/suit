import expect from 'expect';
import React from 'react';
import { renderToStaticMarkup as render } from 'react-dom/server';

import NavbarWorkflowSelector from 'src/components/NavbarWorkflowSelector';

describe('NavbarWorkflowSelector', () => {
  it('Renders a div with a Menu in it', () => {
    expect(render(<NavbarWorkflowSelector workflows={['a', 'b']} />))
      .toContain('div')
      .toContain('a')
      .toContain('b');
  });
  it('Renders with a class to place it on the right', () => {
    expect(render(<NavbarWorkflowSelector right workflows={['a', 'b']} />))
      .toContain('div')
      .toContain('attivio-globalmastnavbar-right')
      .toContain('a')
      .toContain('b');
  });
  it('Renders with a custom label', () => {
    expect(render(<NavbarWorkflowSelector label="test label" workflows={['a', 'b']} />))
      .toContain('div')
      .toContain('test label')
      .toContain('a')
      .toContain('b');
  });
});
