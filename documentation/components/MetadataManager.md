The `<MetadataManager>` component does all of the work to perform actions that are not related to authentic searches of the Attivio index but are about the metadata for an authentic search. You can take it as a component that does all the work that searcher is not supposed to do. Currently it makes the API calls and response rendering related to saved searches. More features can be added as other components are refactored in the future.

#### Examples:

**1.** Majorly, the idea is to use MetadataManager from the context. For an example, you can wrap `<Switch>` component with `<MetadataManager>` in `SearchUIApp`. Another option is to wrap `<SavedSearchRenderer>` component with `<MetadataManager>` as it uses functions from `MetadataManager`. Note that the MetadataManager doesn't itself render any UI but relies on its children to do so. This component is a manager with various functions that are performed to get information from the Attivio index. The purpose of this component does not have anything to do with rendering any UI.

```jsx
<MetadataManager>
  <Switch>
    <div>
      Here resides various child components.
      <Button
        onClick={() => {
          this.context.metadataManager.saveThisSearch(this.hideSaveSearchModal);
        }}
      >
        Save Search
      </Button>
    </div>
  </Switch>
</MetadataManager>
```
