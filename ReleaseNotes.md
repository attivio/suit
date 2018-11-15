# SUIT Release Notes

This file will keep track of notes about new versions of the SUIT library that are published. They are listed here in reverse chronological order, starting with the most recent.

If you are _publishing_ a new build of the library that has changes users will need to be aware of, please update this file before doing so.

If you are _using_ the SUIT library and want to upgrade to a newer version, please check here to see if there have been changes that will affect your project and, if there are, what you will need to do about them.

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
