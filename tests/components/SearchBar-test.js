import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import SearchBar from '../../src/components/SearchBar';

const placeholder = 'Test Placeholder';
const buttonLabel = 'Test Button';

test('renders in simplest form', () => {
  const { getByTestId } = render(
    <Router>
      <SearchBar
        autoCompleteUri={null}
        allowVoice={false}
        inMasthead={false}
        allowLanguageSelect={false}
        placeholder={placeholder}
        buttonLabel={buttonLabel}
      />
    </Router>
  );

  expect(getByTestId('search-bar-input')).toBeDefined();
  expect(getByTestId('search-bar-input')).toHaveProperty('placeholder', placeholder);

  expect(getByTestId('search-bar-button')).toBeDefined();
  expect(getByTestId('search-bar-button')).toHaveTextContent(buttonLabel);
});
