import React from 'react';

type SearchResultBodyProps = {
  /** The document’s body text. */
  body: string,
};

type SearchResultBodyDefaultProps = {
  onClick: null | () => {},
};

/**
 * The body of a given document in the search results, including its title
 * and text. Any HTML markup in the title and body are preserved so that
 * highlighting, entities, and sentiment can be displayed.
 */
export default class SearchResultBody extends React.Component<SearchResultBodyDefaultProps, SearchResultBodyProps, void> {
  static defaultProps = {
    onClick: null,
  };

  static displayName = 'SearchResultsBody';

  render() {
    return (
      <p
        className="attivio-search-result-desc"
        dangerouslySetInnerHTML={{ __html: this.props.body }} // eslint-disable-line react/no-danger
      />
    );
  }
}
