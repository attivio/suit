import React from 'react';
import { render } from '@testing-library/react';
import Card from '../../src/components/Card';

describe('Card', () => {
  it('Renders a card component', () => {
    const { getByTestId } = render(<Card />);
    expect(getByTestId('card')).toBeDefined();
  });
  it('Renders a card component with children', () => {
    const { getByTestId } = render(
      <Card>
        <img src="foo" alt="foo" data-testid="test-image" />
      </Card>
    );
    expect(getByTestId('card')).toBeDefined();
    expect(getByTestId('test-image')).toBeDefined();
  });
  it('Renders a card component with a title', () => {
    const { getByText } = render(<Card title="My Card" />);
    expect(getByText('My Card')).toBeDefined();
  });
  it('Renders a card with a subtitle', () => {
    const { getByText } = render(<Card subtitle="My Subtitle" />);
    expect(getByText('My Subtitle')).toBeDefined();
  });
});
