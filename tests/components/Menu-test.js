import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
// this import is for the 'toHaveClass' expectation
import '@testing-library/jest-dom/extend-expect'

import Menu, { MenuItemDef } from '../../src/components/Menu';

let selected = null;
const label = 'Test Menu';
const optionLabel1 = 'Test 1';
const optionLabel2 = 'Test 2';
const optionLabel3 = 'Test 3';
const optionValue1 = 'test1';
const optionValue2 = 'test2';
const optionValue3 = 'test3';
const items = [
  new MenuItemDef(optionLabel1, optionValue1),
  new MenuItemDef(optionLabel2, optionValue2),
  new MenuItemDef(optionLabel3, optionValue3),
];
const promptLabel = 'Select a Test Option';

const toggleDataTest = 'menu-dropdown-toggle';
const dropdownDataTest = 'menu-dropdown';
const optionDataTestPrefix = 'menu-option-';

const simpleRender = (onSelect) => {
  return render(
    <Router>
      <Menu
        label={label}
        items={items}
        onSelect={onSelect}
        promptLabel={promptLabel}
        dataTest={toggleDataTest}
      />
    </Router>
  );
}

test('renders in simplest form', () => {
  const { getByTestId } = simpleRender(() => {});

  // confirm that these elements and text exist
  expect(getByTestId(dropdownDataTest)).toBeDefined();
  expect(getByTestId(dropdownDataTest)).toHaveTextContent(promptLabel);
  expect(getByTestId(toggleDataTest)).toBeDefined();
});

test('menu opens', () => {
  const { getByTestId } = simpleRender(() => { });

  // open the menu
  expect(getByTestId(dropdownDataTest)).not.toHaveClass('open');
  fireEvent.click(getByTestId(toggleDataTest));
  expect(getByTestId(dropdownDataTest)).toHaveClass('open');
});

test('selection changes', () => {
  let selected = null;
  const onSelect = (selection: MenuItemDef) => {
    selected = selection.value;
  };
  const { getByTestId } = simpleRender(onSelect);
  const option1 = getByTestId(`${optionDataTestPrefix}${optionValue1}`);
  const option2 = getByTestId(`${optionDataTestPrefix}${optionValue2}`);
  const option3 = getByTestId(`${optionDataTestPrefix}${optionValue3}`);

  // select option 1
  expect(option1).toBeDefined();
  expect(option1).toHaveTextContent(optionLabel1);
  fireEvent.click(option1);
  expect(selected).toBe(optionValue1);

  // select option 2
  expect(option2).toBeDefined();
  expect(option2).toHaveTextContent(optionLabel2);
  fireEvent.click(option2);
  expect(selected).toBe(optionValue2);

  // select option 3
  expect(option3).toBeDefined();
  expect(option3).toHaveTextContent(optionLabel3);
  fireEvent.click(option3);
  expect(selected).toBe(optionValue3);
});
