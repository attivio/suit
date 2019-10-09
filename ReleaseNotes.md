# SUIT Release Notes

This file will keep track of notes about new versions of the SUIT library that are published. They are listed here in reverse chronological order, starting with the most recent.

If you are _publishing_ a new build of the library that has changes users will need to be aware of, please update this file before doing so.

If you are _using_ the SUIT library and want to upgrade to a newer version, please check here to see if there have been changes that will affect your project and, if there are, what you will need to do about them.

## Version 1.0.7

Adds support for `hide360Link` option to `<SearchResults />` which omits the 360 link entirely from search result if specified. Non-breaking change.

## Version 1.0.6

Fixes regression where using a number type in `<SearchFacetBuckets />` caused an error.

## Version 1.0.5

Fixes regression that caused the location pointer in the center of the map to be be miscalculated.
Adds logic to check if a facet is already added to the filter before adding a new facet filter.

## Version 1.0.4

Do not use. This version is unavailable via npm due to a publishing error.

## Version 1.0.3

The when a user chooses an autocomplete suggestion in the SearchBox component, the string is now filtered to remove punctuation that would interfere with it being used as a Simple Query Language query.

## Version 1.0.2

Signals can now be added when promotions are clicked (requires a configuration change).

## Version 1.0.1

* Update facet components to not render applied filters.
* Ensure promotions are rendered even if there are no search results.
* Allow adding signals when facet filters are applied or removed (requires a configuration change).
* Fix issue with the Mabpox facet component where points were not showing up when running with Attivio 5.6.1.
* Fix the build script to use the `npm ci` command instead of `npm install` and documented this as the recommended behavior.

## Version 1.0.0

Updates to react v.16.8.6.
https://github.com/facebook/react/releases?after=16.1.0-rc
https://reactjs.org/blog/2017/09/26/react-v16.0.html

To use attivio/suit `v1.x.x+`, consuming libraries must match the
version of react in this library: `react` `v16.8.6`. If using
`react-dom`, keep in mind that it must always match your version of
react. 

## Version 0.1.18

### Row Update Bug

Fixes issue where row data updates, unrelated to rowcomparator results, would erroneously reset the current selection.

### Promotions

Fixes issues where promotions with markup didn't render correctly in SUIT

If the markup in promotions contained javascript code in `<script>`, the code was not rendered.
To overcome this, the `<div>` wrapper for the markup in `<PlacementResult>` is changed to `<iframe>`.
The markup is added in the body of the iframe to ensure script as well as html is rendered.

Additionally, `iframe` also required a unique title which is created using the new `markupCount` prop passed
to `PlacementResult`.

### Subheader360

Modifies the Subheader360 component to show an information icon that shows additional information about the components when hovered over.

### Date Formats

Update several of the date formats to use proper American English punctuation:

There is always a comma after the day of the week, if present, separating it from the rest of the date.
There is never a comma between the month and the year, if there's no day of the month in between 
(e.g., Sep 11, 2001 but Sep 2001)

Update the comments in DateFormat.js to match these.

Fixed Flow/ESLint errors in `SearchResultTags.js` and `ToggleSwitch.js`.

### Search Result Comments

Adds the ability to comment on a search result.

## Version 0.1.17

Fixes an issue where on the click of Go the filters of the old query were not being cleared. Unified the behavior on the click of Go & Enter to reset and search on new query being searched and on the same query being searched again no reset of filters is performed.

## Version 0.1.16

Fixes an issue where clicking on the main document from within the knowledge graph of 360 view gave an exception.

Adds machinery to optionally provide signal data to <AutoCompleteInput /> whenever user clicks/selects an entry.

## Version 0.1.15

Fixes issue where the selection for multiselect is stale. Cleaned up componentWillReceiveProps in <Table /> and DRYed out the logic.

## Version 0.1.14

Adds an event listener for window blur to `<Table />` and unconditionally marks meta keys as not pressed.

## Version 0.1.13

Added support for data-test attribute for testing components `<Menu />`, `<TabPanel />`, and `<ToggleSwitch />`.

## Version 0.1.11

Updates `noLabel` `<ToggleSwitch />` to distinguish between disabled off and disabled on. Makes all of the `noLabel` `<ToggleSwitch />` clickable, not just the circle.

## Version 0.1.10

Add support for `data-test` attribute to `<CardPicker />`, `<CardPickerCard />`, `<Pager />`, and `<TrianglePanel />`.

## Version 0.1.9

Fixes issue in `FetchUtils.fetch` to properly redirect to login when html login page is returned.

## Version 0.1.8

Fixes issue in `AuthUtils.logout` where logout sometimes failed immediately after a page refresh.

## Version 0.1.7

Fixes issue in `<Table />` where selected row values became stale after data changed and selection did not.

## Version 0.1.6

Adds a new component called `<SwipeViews />` which uses the `react-swipe` library to show multiple views that you can navigated through by using the left and right buttons.

## Version 0.1.5

Fixes typo in `<Table />` where `selectedRowIndices` was updated in place of `selectedIndices`.

## Version 0.1.4

Fixes issue in `<Table />` where `onSelect` was passed a `null` value for `activeRow` after row data change causing `<MasterDetails />` to be empty and causing any consumer to have incorrect selection data.

### Version 0.1.3

Adds optional `messagePositionRight` and `messageStyle` to `<BusyIndicator />`.
Introduces option to disable the confirmation button in `<ConfirmationDialog />`.

### Version 0.1.2

Introduces optional no label version of `<ToggleSwitch />` similar to Material UI in styling.

### Version 0.1.1

Fixes a bug introduced by the `<Table />` refactor in v0.1.0. Rows were not being properly updated when data within them changed.

### Version 0.1.0

This introduces breaking changes to the `<Table />` and `<MasterDetails />` components.

Selection tracking has been moved to `<Table />`. `onSelect` is no longer a required function, it is now considered a convenience hook so a consumer may respond to selection changes and/or be aware of the current selection. This is a breaking change. Previously, the consumer of `<Table />` was responsible for passing in the current selection and `onSelect` drove the selection within `<Table />`. That is no longer true. `onSelect` no longer impacts the selections within `<Table />` and `<Table />` no longer accepts a `selection` prop to dictate the current selection.

* `<Table />` now supports key selection in multi-select mode.
* `rowComparator` is now required for comparison equality checking between rows.
* `<Table />` and `<MasterDetails />` now optionally accept `activeRowBackgroundColor` and `multiSelectBackgroundColor` props which, if specified, override any other className specifications for those colors. This change is intended to make it easier to indicate color selections. `selectedClassName` may still optionally be passed in, but takes a second seat to those props.

### Version 0.0.53

* Add full support for logging out when running as an Attivio module or using XML-based authentication (for testing purposes). SAML-based authentication doesn't show the option for logging out. Applications which use SUIT should provide a configuration property called ALL.loginPage which is the route to the page to use for app-based login (e.g., XML-based). (Note that in the cases of SAML- and Attivio-based authentication, the Identity Provider's login page or the Attivio login page is used instead and the ALL.loginPage property is not needed.)

### Version 0.0.47

*	Many of the broken/incomplete examples in the Style Guide have been fixed/updated.
*	The renderer functions for DebugSearchResult, ListSearchResult, and SimpleSearchResult must now be accessed as static methods on the classes, not as a separately exported function.
*	The versions of dependencies in package.json are no-longer open-ended and must be upgraded manually when needed.
*	The MasterDetails, Table, and Details components have been added.
*	Some updates have been made to the DummySearcher component to allow more Style Guide examples to work.
*	SimilarAuthorCard no longer exports the ExpertInfo class as a separate item, It must now be accessed as SimilarAuthorCard.ExpertInfo instead of using the { } syntax when importing.
*	Adding missing callback to the ExpertsHeader component that allows the “All Experts” link to do something when clicked (and to be hidden if the callback is not set).
*	Added a new, basic Pager component to be used in all situations, including the Table component.
*	Updated the SearchResultsPager to use the new Pager component.
*	Added a key to items created by PlacementResults to avoid browser warnings.
*	Tweaked the look of the SpellCheckMessage component (as per PLAT-42728).
*	Made the TimeSeriesPoint accessible as TimeSeries.TimeSeriesPoint.
*	Added the new TrianglePanel component, similar to the CollapsiblePanel component, but with a “disclosure triangle” to the left of the panel’s title instead of the caret off to the right. This is especially useful for cases where the panel will be wide and the caret won’t be visible way off to the right.
*	Fix an issue in AuthUtils where we could have been checking for permissions on a null user.roles array.
*	Updated the version of the react-styleguidist library from 6.0.20 to 7.3.6 and updated the configuration appropriately.
