# SUIT Release Notes

This file will keep track of notes about new versions of the SUIT library that are published. They are listed here in reverse chronological order, starting with the most recent.

If you are _publishing_ a new build of the library that has changes users will need to be aware of, please update this file before doing so.

If you are _using_ the SUIT library and want to upgrade to a newer version, please check here to see if there have been changes that will affect your project and, if there are, what you will need to do about them.

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

### Version 0.1.0

This introduces breaking changes to the `<Table />` and `<MasterDetails />` components.

Selection tracking has been moved to `<Table />`. `onSelect` is no longer a required function, it is now considered a convenience hook so a consumer may respond to selection changes and/or be aware of the current selection. This is a breaking change. Previously, the consumer of `<Table />` was responsible for passing in the current selection and `onSelect` drove the selection within `<Table />`. That is no longer true. `onSelect` no longer impacts the selections within `<Table />` and `<Table />` no longer accepts a `selection` prop to dictate the current selection.

* `<Table />` now supports key selection in multi-select mode.
* `rowComparator` is now required for comparison equality checking between rows.
* `<Table />` and `<MasterDetails />` now optionally accept `activeRowBackgroundColor` and `multiSelectBackgroundColor` props which, if specified, override any other className specifications for those colors. This change is intended to make it easier to indicate color selections. `selectedClassName` may still optionally be passed in, but takes a second seat to those props.

### Version 0.1.1

Fixes a bug introduced by the `<Table />` refactor in v0.1.0. Rows were not being properly updated when data within them changed.

### Version 0.1.2

Introduces optional no label version of `<ToggleSwitch />` similar to Material UI in styling.

### Version 0.1.3

Adds optional `messagePositionRight` and `messageStyle` to `<BusyIndicator />`.
Introduces option to disable the confirmation button in `<ConfirmationDialog />`.

## Version 0.1.4

Fixes issue in `<Table />` where `onSelect` was passed a `null` value for `activeRow` after row data change causing `<MasterDetails />` to be empty and causing any consumer to have incorrect selection data.

## Version 0.1.5

Fixes typo in `<Table />` where `selectedRowIndices` was updated in place of `selectedIndices`.

## Version 0.1.6

Adds a new component called `<SwipeViews />` which uses the `react-swipe` library to show multiple views that you can navigated through by using the left and right buttons.

## Version 0.1.7

Fixes issue in `<Table />` where selected row values became stale after data changed and selection did not.

## Version 0.1.8

Fixes issue in `AuthUtils.logout` where logout sometimes failed immediately after a page refresh.

## Version 0.1.9

Fixes issue in `FetchUtils.fetch` to properly redirect to login when html login page is returned.

## Version 0.1.10

Add support for `data-test` attribute to `<CardPicker />`, `<CardPickerCard />`, `<Pager />`, and `<TrianglePanel />`.
