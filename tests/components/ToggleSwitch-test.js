import React from 'react';
import { render, fireEvent, within } from '@testing-library/react';

import ToggleSwitch from '../../src/components/ToggleSwitch';

describe("ToggleSwitch", () => {
  test("Simple toggle", () => {
    let switchOn = true;
    const { getByText, rerender } = render(
      <ToggleSwitch
        on={switchOn}
        onChange={(newValue) => {
          switchOn = newValue;
        }}
      />
    );
    expect(getByText('On').className).toContain('selected');
    // Turn off the toggle
    fireEvent.click(getByText('On'));
    // Rerender the component with new value of switchOn
    rerender(
      <ToggleSwitch
        on={switchOn}
        onChange={(newValue) => {
          switchOn = newValue;
        }}
      />
    );
    expect(getByText('Off').className).toContain('selected');
  });

  test("Simple disabled toggle", () => {
    let switchOn = true;
    const { getByText, rerender } = render(
      <ToggleSwitch
        on={switchOn}
        onChange={(newValue) => {
          switchOn = newValue;
        }}
        disabled
      />
    );
    // On button should be selected and disabled
    const onBtnClass = getByText('On').className;
    expect(onBtnClass).toContain('selected');
    expect(onBtnClass).toContain('disabled');
    // Turn off the toggle
    fireEvent.click(getByText('On'));
    // Rerender the component with new value of switchOn
    rerender(
      <ToggleSwitch
        on={switchOn}
        onChange={(newValue) => {
          switchOn = newValue;
        }}
        disabled
      />
    );
    // Off button should be disabled and not selected
    const offBtnClass = getByText('Off').className;
    expect(offBtnClass).not.toContain('selected');
    expect(offBtnClass).toContain('disabled');
  });

  test('Check custom labels', () => {
    const switchOn = true;
    const { getByText } = render(
      <ToggleSwitch
        on={switchOn}
        onChange={(newValue) => {
          switchOn = newValue;
        }}
        onLabel="NEW ON LABEL"
        offLabel="NEW OFF LABEL"
      />
    );
    expect(getByText('NEW ON LABEL')).toBeDefined();
    expect(getByText('NEW OFF LABEL')).toBeDefined();
  });

  test('Check Toggle with no labels', () => {
    let switchOn = true;
    const { getByRole, rerender } = render(
      <ToggleSwitch
        on={switchOn}
        onChange={(newValue) => {
          switchOn = newValue;
        }}
        noLabel
      />
    );
    const btn = getByRole('button');
    // The button <div> has 2 children divs and the second div
    // would have the classes 'toggle-switch-on' and 'selected'
    // to indicate the toggle turned on.
    expect(btn.children[1].className).toContain('toggle-switch-on');
    expect(btn.children[1].className).toContain('selected');
    // Turn off the toggle
    fireEvent.click(getByRole('button'));
    rerender(
      <ToggleSwitch
      on={switchOn}
        onChange={(newValue) => {
          switchOn = newValue;
        }}
        noLabel
      />
    );
    // The button <div> has 2 children divs and the second div
    // would have the classes 'toggle-switch-off' and 'selected'
    // to indicate the toggle turned off.
    expect(btn.children[1].className).toContain('toggle-switch-off');
    expect(btn.children[1].className).toContain('selected');
  });

  test('Check disabled Toggle with no labels', () => {
    let switchOn = true;
    const { getByRole, rerender } = render(
      <ToggleSwitch
        on={switchOn}
        onChange={(newValue) => {
          switchOn = newValue;
        }}
        noLabel
        disabled
      />
    );
    const btn = getByRole('button');
    // The button <div> has 2 children divs and the second div
    // would have the classes 'toggle-switch-on' and 'selected'
    // to indicate the toggle turned on.
    expect(btn.children[1].className).toContain('toggle-switch-on-disabled');
    // Turn off the toggle
    fireEvent.click(getByRole('button'));
    rerender(
      <ToggleSwitch
      on={switchOn}
        onChange={(newValue) => {
          switchOn = newValue;
        }}
        noLabel
        disabled
      />
    );
    // click should not change the toggle when disabled.
    expect(btn.children[1].className).toContain('toggle-switch-on-disabled');
  });
});
