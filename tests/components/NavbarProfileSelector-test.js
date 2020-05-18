import expect from 'expect';
import React from 'react';
import { renderToStaticMarkup as render } from 'react-dom/server';

import NavbarProfileSelector from 'src/components/NavbarProfileSelector';

describe('NavbarProfileSelector', () => {
  it('Renders a div with a Menu in it', () => {
    expect(render(<NavbarProfileSelector profiles={['a', 'b']} />))
      .toContain('div')
      .toContain('a')
      .toContain('b');
  });
  it('Renders with a class to place it on the right', () => {
    expect(render(<NavbarProfileSelector right profiles={['a', 'b']} />))
      .toContain('div')
      .toContain('attivio-globalmastnavbar-right')
      .toContain('a')
      .toContain('b');
  });
  it('Renders with a custom label', () => {
    expect(render(<NavbarProfileSelector label="test label" profiles={['a', 'b']} />))
      .toContain('div')
      .toContain('test label')
      .toContain('a')
      .toContain('b');
  });
});
