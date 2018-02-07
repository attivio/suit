import React from 'react';

type SearchResultTitleProps = {
  /** The document’s title */
  title: string,
  /** The callback to use if the user clicks the document's title (optional) */
  onClick: null | () => {},
};

type SearchResultTitleDefaultProps = {
  onClick: null | () => {},
};

/**
 * The title of a given document in the search results. Any HTML markup in
 * the title is preserved so that highlighting, entities, and sentiment can
 * be displayed. It can optionally be made clickable, by passing a callback.
 */
export default class SearchResultTitle extends React.Component<SearchResultTitleDefaultProps, SearchResultTitleProps, void> {
  static defaultProps = {
    onClick: null,
  };

  render() {
    let titleComp;
    if (this.props.onClick) {
      titleComp = (
        <a
          onClick={this.props.onClick}
          role="button"
          tabIndex={0}
          dangerouslySetInnerHTML={{ __html: this.props.title }} // eslint-disable-line react/no-danger
        />
      );
    } else {
      titleComp = <span dangerouslySetInnerHTML={{ __html: this.props.title }} />; // eslint-disable-line react/no-danger
    }

    return (
      <h2 className="attivio-search-result-title">
        {titleComp}
      </h2>
    );
  }
}

