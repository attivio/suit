import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
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
const optionsDataTest = 'menu-options';

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
    console.warn(`onSelect called with value "${selection.value}!"`);
    selected = selection;
  };
  const { getByTestId } = simpleRender(onSelect);

  // select an option
  expect(getByTestId(optionsDataTest)).toBeDefined();
  expect(getByTestId(optionsDataTest).firstChild).toBeDefined();
  expect(getByTestId(optionsDataTest).firstChild).toHaveTextContent(optionLabel1);
  expect(fireEvent.click(getByTestId(optionsDataTest).firstChild)).toBe(true);
  expect(selected).toBe(optionValue1);
});
