## Custom Search Results

As of version 0.0.35 of the SUIT library, search application developers now have the capability to fully customize the way search results are displayed in their SearchResults component.

In prior versions of SUIT, applicartion developers were limited to using the standard "List," "Simple," and "Debug" views. Those who needed more flexibility were forced to modify the SUIT library itself to customize their results display.

### Rendering Functions

If you look at the documentation for the SearchResults component, you will notice that the `format` property is no longer a simple union of string constants (i.e., `'list' | 'simple' | 'debug'`) but can be set to a function which is used to render individual search results. (The original string values can still be used, but internally they each map to a single function call that renders one of the built-in search result components: `<ListSearchResult>`, `<SimpleSearchResult>`, or `<DebugSearchResult>`.

When the `format` property is set to be a function, then that function is called with informaiton about a document in the results and it renders the document as it sees fit.

The function passed to the `format` property should look like this if it should return your custom component called `<MySearchResult>`:

```js
myResultRenderer(doc: SearchDocument, position: number, baseUri: string, key: string): any {
  return (
    <MySearchResult doc={doc} position={position} baseUri={baseUri} key={key} />
  );
}
```

* The `doc` parameter is the SearchDocument that's part of the result set.
* The `position` parameter is the 1-based ordinal position of the document in the search results (note that when paging through a result set, this will continue to increment—i.e. the first document on the second page, if the results are ten to a page, will have a position of 11).
* The `baseUri` parameter is needed for certain components you may want to include such as the <SearchResultTags> component.
* The `key` parameter should be set as the React `key` attribute on the outermost component returned to avoid having any warnings in the user's browser console.
* The function should return the React component to render or `null` if it doesn't want to render anything. If the function returns null, the SearchResults component will fall back to rendering the document using a `<ListSearchResult>` component.

### Passing an Array of Rendering Functions

In addition to being a single function, the property can be an array of functions, which allows much more flexibility in how document results are rendered: each function in the array is called in turn to render the document until one of them does so, at which point the rendering it returns is used and the remaining functions are ignored. Functions that don't want to render a given document should return the value `null` insted of a component. This allows the application to selectively choose the format for a document based on the document's contents or it's ordinal value. For example, you may want to render documents coming from different tables with different components—e.g., one component for PDF documents, one for personnel records, and another for customer support tickets. Or you might want to render the first document in the search results with a special component that differentiates it from the others.

### Rendering Built-In Components

As mentioned above, it is possible to still use the string values to specify one of the built-in component renderers. However, if you want to use one of these in conjunction with your own custom renderers, you can use the static renderer function defined in each of the built-in components' classes.

* Passing `ListSearchResult.renderer` will render the document as a `<ListSearchResult>` compoenent.
* Passing `SimpleSearchResult.renderer` will render the document as a `<SimpleSearchResult>` compoenent.
* Passing `DebugSearchResult.renderer` will render the document as a `<DebugSearchResult>` compoenent.

Note that following this same method of including the static renderer function inside the custom component classes will make your code more uniform.

### Examples

A very simple custom component which is rendered when the first document in the list is in the table "user" might look like this:

```js
import React from 'react';

import {
  DefaultImage,
  FieldNames,
  SearchDocument,
  SearchResultTitle,
} from '@attivio/suit';

type FirstUserProp = {
  doc: SearchDocument;
  baseUri: string;
  key: string;
};

export default class FirstUser extends React.Component<void, FirstUserProps, void> {
  static renderer(doc: SearchDocument, position: number, baseUri: string, key: string): any {
    if (position === 1 && doc.getFirstValue(FieldNames.TABLE) === 'user') {
      return <FirstUser doc={doc} key={key}
    }
    return null;
  }
  
  render() {
    const image = this.props.doc.getFirstValue('userPhoto');

    return (
      <div key={this.props.key}>
        <SearchResutTitle doc={this.props.doc} baseUri={this.props.baseUri} />
        <DefaultImage src={image} defaultSrc="img/userPlaceholder.png" />
      </div>
    );
  }
}
```
