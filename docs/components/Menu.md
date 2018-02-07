#### Examples:

__1.__  Standard menu to choose one of the options

```jsx
  initialState = {
    selectedItem: 'first',
  }
  const myState = state;
  const mySetState = setState;
  <Menu
    label="Choose One:"
    selection={myState.selectedItem}
    items={[
      new Menu.MenuItemDef('First Menu Item', 'first'),
      new Menu.MenuItemDef('Second Menu Item', 'second'),
      new Menu.MenuItemDef('Third Menu Item', 'third'),
    ]}
    onSelect={(item) => {
      mySetState({
        selectedItem: item.value,
      });
    }}
  >
  </Menu>
```

__2.__ Multi-select menu.

```jsx
  initialState = {
    selectedItems: [],
  }
  const myState = state;
  const mySetState = setState;
  <Menu
    multiSelect
    right
    label="Choose Something"
    selection={myState.selectedItems}
    items={[
      new Menu.MenuItemDef('First Menu Item', 'first'),
      new Menu.MenuItemDef('Second Menu Item', 'second'),
      new Menu.MenuItemDef('Third Menu Item', 'third'),
    ]}
    onSelect={(item) => {
      const selection = myState.selectedItems;
      if (selection.length > 0 && selection.includes(item.value)) {
        const newSelection = selection.filter((selectedItem) => {
          // Filter out the selected item since we want to remove it
          return selectedItem !== item.value;
        });
        mySetState({
          selectedItems: newSelection,
        });
      } else {
        selection.push(item.value);
        mySetState({
          selectedItems: selection,
        });
      }
    }}
  />
```

__3.__ Multi-select menu with CHECK ALL | NONE

```jsx
  initialState = {
    selectedItems: [],
  }
  const myState = state;
  const mySetState = setState;
  <Menu
    multiSelect
    right
    label="Choose Something:"
    selection={myState.selectedItems}
    items={[
      new Menu.MenuItemDef('First Menu Item', 'first'),
      new Menu.MenuItemDef('Second Menu Item', 'second'),
      new Menu.MenuItemDef('Third Menu Item', 'third'),
    ]}
    onSelect={(item) => {
      const selection = myState.selectedItems;
      if (selection.length > 0 && selection.includes(item.value)) {
        const newSelection = selection.filter((selectedItem) => {
          // Filter out the selected item since we want to remove it
          return selectedItem !== item.value;
        });
        mySetState({
          selectedItems: newSelection,
        });
      } else {
        selection.push(item.value);
        mySetState({
          selectedItems: selection,
        });
      }
    }}
    selectAllNone={(allNone) => {
      if (allNone) {
        const newSelection = menuItemDefs.map((item) => {
          return item.value;
        });
        mySetState({
          selectedItems: newSelection,
        });
      } else {
        mySetState({
          selectedItems: [],
        });
      }
    }}
  />
```

__4.__ Block-style menu with a prompt (
```jsx
  initialState = {
    selectedItem: null,
  };
  const myState = state;
  const mySetState = setState;
  <Menu
    block
    label="Selection:"
    promptLabel="Choose one of these items…"
    selection={myState.selectedItem}
    items={[
      new Menu.MenuItemDef('First Menu Item', 'first'),
      new Menu.MenuItemDef('Second Menu Item', 'second'),
      new Menu.MenuItemDef('Third Menu Item', 'third'),
    ]}
    onSelect={(item) => {
      mySetState({
        selectedItem: item.value,
      });
    }}
  />
```

__5.__ Menu with custom icons. If an item has an icon, it will appear in the menu when closed alongside the item’s label.
```jsx
  initialState = {
    selection: 'DESC',
  };
  const myState = state;
  const mySetState = setState;
  const menuItemDefsWithIcons = [];
  let menuItemDefWithIcon = new Menu.MenuItemDef('Going Up', 'ASC');
  menuItemDefWithIcon.customIconClass = 'attivio-icon-sort-ascending';
  menuItemDefsWithIcons.push(menuItemDefWithIcon);
  menuItemDefWithIcon = new Menu.MenuItemDef('Going Down', 'DESC');
  menuItemDefWithIcon.customIconClass = 'attivio-icon-sort-descending';
  menuItemDefsWithIcons.push(menuItemDefWithIcon);
  menuItemDefWithIcon = new Menu.MenuItemDef('Staying Put', 'stay');
  menuItemDefsWithIcons.push(menuItemDefWithIcon);

  <Menu
    label="Custom Icons:"
    selection={myState.selection}
    items={menuItemDefsWithIcons}
    onSelect={(item) => {
      mySetState({
        selection: item.value,
      });
    }}
  />
```
