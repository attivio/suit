import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import BigButton from '../../src/components/BigButton';

test('renders', () => {
  const { getByTestId } = render(
    <Router>
      <BigButton />
    </Router>
  );
  expect(getByTestId('big-button')).toBeDefined();
});