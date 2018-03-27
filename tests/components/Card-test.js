import expect from 'expect';
import React from 'react';
import { renderToStaticMarkup as render } from 'react-dom/server';

import Card from 'src/components/Card';

describe('Card', () => {
  it('Renders a card component', () => {
    expect(render(<Card />))
      .toContain('div')
      .toContain('attivio-card');
  });
  it('Renders a card component with children', () => {
    expect(render(<Card><img src="foo" alt="foo" /></Card>))
      .toContain('<img')
      .toContain('alt="foo"');
  });
  it('Renders a borderless card component', () => {
    expect(render(<Card borderless />))
      .toContain('attivio-card attivio-card-borderless');
  });
  it('Renders a card component with a title', () => {
    expect(render(<Card title="My Card" />))
      .toContain('My Card')
      .toContain('attivio-card-title');
  });
  it('Renders a styled card component', () => {
    expect(render(<Card style={{ color: 'red' }} />)).toContain('color:red');
  });
  it('Renders a card component with a custom class', () => {
    expect(render(<Card className="myClass" />)).toContain('myClass');
  });
});
