# SUIT Release Notes

This file tracks significant changes made to each version of the SUIT library that is published. The versions are listed here in reverse chronological order, starting with the most recent.

If you are _publishing_ a new build of the SUIT library that has changes users will need to be aware of, please update this file before doing so.

If you are _using_ the SUIT library and want to upgrade to a newer version, please check here to see if there have been changes that will affect your project and, if there are, what you will need to do about them.

(Note that some versions will have minor changes that don’t affect clients, and these may not be documented on this page.)

## Version 1.1.0

- Updates SUIT’s dependencies.
- Adds additional tests and test coverage report.
- Replaces npm with yarn.
- Replaces nwb with webpack 4 for building the library.

## Version 1.0.7

- Adds support to `<SearchResults />` for a `hide360Link` option which, when set, prevents the ”360°-view of the document” link from appearing in search results [**non-breaking change**].

## Version 1.0.6

- Fixes a regression where using a number type in the `SearchFacetBucket` class caused an error.

## Version 1.0.5

- Fixes a regression that caused the location pointer in the center of the map to be miscalculated.
- Adds logic to check whether a facet has already been added to the filter before adding a new facet filter.

## Version 1.0.4

**Do not use. This version is unavailable via npm due to a publishing error.**

## Version 1.0.3

- Filters autocomplete suggestions in the `<SearchBox />` component to remove punctuation that would
interfere with the suggested string being used as a “Simple Query Language” query.

## Version 1.0.2

- Allows signals to be added when promotions are clicked (requires a configuration change).

## Version 1.0.1

- Updates facet components to not render applied filters.
- Ensures that promotions are rendered even if there are no search results.
- Allows adding signals when facet filters are applied or removed (requires a configuration change).
- Fixes an issue with the Mabpox facet component where points were not showing up when running with Attivio 5.6.1.
- Fixes the build script to use the `npm ci` command instead of `npm install` and documents this as the recommended behavior.

## Version 1.0.0

- Updates the SUIT library to be based on version 16.8.6 of React. See https://github.com/facebook/react/releases?after=16.1.0-rc and https://reactjs.org/blog/2017/09/26/react-v16.0.html. To use versions of SUIT starting with this one, your application must match the version of React SUIT uses (and the `react-dom` version must match as well).

## Version 0.1.18

- Fixes an issue in the `<Table />` component where row data updates, unrelated to `rowcomparator` results, would erroneously reset the current selection.
- Fixes issues where promotions with markup didn’t render correctly in SUIT. If the markup in promotions contained JavaScript code in a `<script />` tag, the code was not rendered. To overcome this, the markup is now rendered inside an `<iframe />`, including its `<script />` tag. The `<iframe />` also required a unique title which is created using the new `markupCount` property required by the `<PlacementResult />` component.
- Modifies the `<Subheader360 />` component to show an “information” icon that provides additional information when hovered over.
Updates several of the date formats to use proper American English punctuation. For example, there is always a comma after the day of the week, if present, separating it from the rest of the date. Also, there is never a comma between the month and the year, if there’s no day of the month in between (e.g., Sep 11, 2001 but Sep 2001).
- Fixes Flow/ESLint errors in `SearchResultTags.js` and `ToggleSwitch.js`.
- Adds the ability to comment on a search result.

## Version 0.1.17

- Fixes an issue where previous filters were not being cleared when clicking the “Go” button in the search bar. The behavior of clicking “Go” or pressing “Enter” is now unified.

## Version 0.1.16

- Fixes an issue where clicking on the main document in the knowledge graph of 360° view would throw an exception.
- Adds machinery to optionally provide signal data to the `<AutoCompleteInput />` component whenever the user selects an entry.

## Version 0.1.15

- Fixes an issue where the selection for “multiselect” tables could be stale.
- Cleans up the `componentWillReceiveProps` method in the `<Table />` component and DRYed out the logic.

## Version 0.1.14

- Adds an event listener for window blur to the `<Table />` component and unconditionally marks meta keys as not pressed to prevent them being “stuck” down.

## Version 0.1.13

- Adds support for a new `data-test` attribute that can be used to provide an ID for testing to these components: `<Menu />`, `<TabPanel />`, and `<ToggleSwitch />`.

## Version 0.1.11

- Updates the `<ToggleSwitch />` component to distinguish between disabled off and disabled on states when the `noLabel` flag is set.
- Makes the entire `noLabel` `<ToggleSwitch />` clickable, not just the circle.

## Version 0.1.10

- Adds support for a new `data-test` attribute that can be used to provide an ID for testing to these components: `<CardPicker />`, `<CardPickerCard />`, `<Pager />`, and `<TrianglePanel />`.

## Version 0.1.9

- Fixes an issue in the `FetchUtils.fetch` method so the user is properly redirected to the login page when the Ajax call gets the HTML of the login page instead of the JSON it was expecting.

## Version 0.1.8

- Fixes issue in the `AuthUtils.logout` method where logout sometimes failed when coming immediately after a page refresh.

## Version 0.1.7

- Fixes issue in the `<Table />` component where selected row values became stale after data changed and selection did not.

## Version 0.1.6

- Adds a new component called `<SwipeViews />` which uses the `react-swipe` library to show multiple views that users can navigate through.

## Version 0.1.5

- Fixes a typo in the `<Table />` component that caused `selectedRowIndices` to be updated instead of `selectedIndices`.

## Version 0.1.4

- Fixes an issue in the `<Table />` component where the `onSelect` method was passed a `null` value for `activeRow` after row data changed causing the `<MasterDetails />` component to be empty and causing any consumers to have the wrong selection data.

### Version 0.1.3

- Adds an optional `messagePositionRight` and `messageStyle` to the `<BusyIndicator />` component.
- Introduces an option to disable the confirmation button in the `<ConfirmationDialog />` component.

### Version 0.1.2

- Introduces an optional unlabeled version of the `<ToggleSwitch />` component (similar to Material UI in styling); this can be used when the label is already in another place or the meaning of the toggle is clear without a label.

### Version 0.1.1

- Fixes a bug introduced by the `<Table />` refactor in v0.1.0 where rows were not being properly updated when data within them changed.

### Version 0.1.0

- Introduces breaking changes to the `<Table />` and `<MasterDetails />` components.
  - Selection tracking has been moved to `<Table />`.
  - The `onSelect` property is no longer required, it is now considered a convenience hook so a consumer may respond to selection changes and/or be aware of the current selection. **This is a breaking change**; previously, the owner of the `<Table />` component was responsible for passing in the current selection and the function passed to `onSelect` drove the selection within the table. That is no longer true—`onSelect` no longer impacts the selections within the table and `<Table />` no longer accepts a `selection` prop to dictate the current selection.
  - The `<Table />` component now supports key selection in multi-select mode.
  - The `rowComparator` property is now required for comparison equality checking between rows.	
  - The `<Table />` and `<MasterDetails />` components now optionally accept `activeRowBackgroundColor` and `multiSelectBackgroundColor` properties which override any other `className` specifications for those colors. This change is intended to make it easier to indicate color selections. The `selectedClassName` property may still optionally be passed in, but the other properties take precedence.

### Version 0.0.53

- Adds full support for logging out when running as an Attivio module or using XML-based authentication (for testing purposes). SAML-based authentication doesn’t show the option for logging out. Applications which use SUIT should provide a configuration property called ALL.loginPage which is the route to the page to use for app-based login (e.g., XML-based). (Note that in the cases of SAML- and Attivio-based authentication, the Identity Provider’s login page or the Attivio login page is used instead and the ALL.loginPage property is not needed.)

### Version 0.0.47

- Fixes or updates many of the broken/incomplete examples in the Style Guide.	
-	The renderer functions for DebugSearchResult, ListSearchResult, and SimpleSearchResult must now be accessed as static methods on the classes, not as a separately exported function.
-	The versions of dependencies in package.json are no-longer open-ended and must be upgraded manually when needed.
-	Adds new `<MasterDetails />`, `<Table />`, and `<Details />` components.
-	Makes some updates to the `<DummySearcher />` component to allow more Style Guide examples to work.
- Changes the `<SimilarAuthorCard />` component to no longer export the `ExpertInfo` class as a separate item; it must now be accessed as `SimilarAuthorCard.ExpertInfo` instead of using the `{ }` syntax when importing.
-	Adds a missing callback to the `<ExpertsHeader />` component that allows the “All Experts” link to do something when clicked (and to be hidden if the callback is not set).
-	Adds a new, basic `<Pager />` component to be used in all situations, including the `<Table />` component.
-	Updates the `<SearchResultsPager />` component to wrap the new `<Pager />` component.
-	Adds a key to items created by the `<PlacementResults />` component to avoid browser warnings.
-	Tweaks the look of the `<SpellCheckMessage />` component.
-	Makes the `TimeSeriesPoint` class accessible as `TimeSeries.TimeSeriesPoint`.
-	Adds the new `<TrianglePanel />` component, similar to the `<CollapsiblePanel />` component, but with a “disclosure triangle” to the left of the panel’s title instead of the caret off to the right. This is especially useful for cases where the panel will be wide and the caret won’t be visible way off to the right.
-	Fixes an issue in the `AuthUtils` class where we could have been checking for permissions on a `null` `user.roles` array.
-	Updates the version of the `react-styleguidist` library from 6.0.20 to 7.3.6 and updates the configuration appropriately.
