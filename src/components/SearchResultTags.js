// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import QueryString from 'query-string';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import AutoCompleteInput from './AutoCompleteInput';
import Configurable from './Configurable';

type SearchResultTagsProps = {
  location: PropTypes.object.isRequired;
  history: PropTypes.object.isRequired;
  /** The list of tags on the document. */
  tags: Array<string>;
  /** If set, the list is rendered in a vertical column. */
  vertical: boolean;
  /**
   * The query to execute to see similar documents. If not set,
   * no "More Like This" link is displayed.
   */
  moreLikeThisQuery: string;
  /** The document’s ID, needed for adding/removing tags. */
  docId: string;
  /**
   * The label to show for the link to the 360 page for the document.
   * Set to null to not show a link. Defaults to "Show 360° View."
   */
  view360Label: string | null;
  /**
   * If set, the search bar’s input field will use autocomplete via this URI.
   * Otherwise, if the configuration is available, the autoCompleteUri in the
   * configuration will be used.
   * Otherwise, the search bar will not autocomplete.
   * Note that this is relative to the baseUri field in the configuration.
  */
  autoCompleteUri?: string,
  /**
   * Optional. The location of the node through which to interact with Attivio.
   * Defaults to the value in the configuration.
   */
  baseUri?: string,
};

type SearchResultTagsDefaultProps = {
  moreLikeThisQuery: string;
  vertical: boolean;
  view360Label: string | null;
  autoCompleteUri: string | null,
  baseUri: string,
};

type SearchResultTagsState = {
  adding: boolean;
  newTag: string;
  tags: Array<string>;
  tagError: string | null;
  updating: boolean;
};

/**
 * Show the tags for a document from the search results. Optionally
 * shows a link to view similar documents if the moreLikeThisQuery
 * property is set. If the vertical prop is set, then they're rendered
 * in a single column as opposed to in a horizontal row. Also allows
 * the user to add additional tags by clicking the Add button.
 */
class SearchResultTags extends React.Component<SearchResultTagsDefaultProps, SearchResultTagsProps, SearchResultTagsState> { // eslint-disable-line max-len
  static contextTypes = {
    searcher: PropTypes.any,
  };

  static defaultProps = {
    moreLikeThisQuery: '',
    vertical: false,
    view360Label: 'Show 360\u00B0 View',
    autoCompleteUri: null,
    baseUri: '',
  };

  static displayName = 'SearchResultTags';

  constructor(props: SearchResultTagsProps) {
    super(props);
    this.state = {
      adding: false,
      newTag: '',
      tags: [...props.tags],
      tagError: null,
      updating: false,
    };
    (this: any).updateTags = this.updateTags.bind(this);
    (this: any).removeTag = this.removeTag.bind(this);
    (this: any).addTag = this.addTag.bind(this);
    (this: any).updateNewTag = this.updateNewTag.bind(this);
    (this: any).updateNewTagFromString = this.updateNewTagFromString.bind(this);
    (this: any).keyUp = this.keyUp.bind(this);
    (this: any).onEscape = this.onEscape.bind(this);
    (this: any).moreLikeThis = this.moreLikeThis.bind(this);
    (this: any).show360View = this.show360View.bind(this);
  }

  state: SearchResultTagsState;

  onEscape() {
    this.setState({
      newTag: '',
      adding: false,
    });
  }

  inputField: ?HTMLInputElement;


  updateTags(tags: Array<string>) {
    if (this.context.searcher) {
      this.setState({
        updating: true,
      }, () => {
        const completionCallback = () => {
          this.setState({
            tags,
            newTag: '',
            adding: false,
            tagError: null,
            updating: false,
          });
        };

        const errorCallback = (error) => {
          this.setState({
            newTag: '',
            adding: false,
            tagError: error.toString(),
            updating: false,
          });
        };

        this.context.searcher.updateTags(tags, this.props.docId, completionCallback, errorCallback);
      });
    }
  }

  removeTag(tagName: string) {
    const tags = this.state.tags.slice();
    const index = tags.indexOf(tagName);
    if (index >= 0) {
      tags.splice(index, 1);
      this.updateTags(tags);
    }
  }

  addTag() {
    const tagName = this.state.newTag;
    if (tagName && tagName.length > 0) {
      const tags = this.state.tags.slice();
      tags.push(tagName);
      this.updateTags(tags);
    }
  }

  updateNewTag(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      this.setState({
        newTag: event.target.value,
      });
    }
  }

  updateNewTagFromString(tagValue: string, addNow?: boolean) {
    if (addNow) {
      this.setState({
        newTag: tagValue,
      }, this.addTag);
    } else {
      this.setState({
        newTag: tagValue,
      });
    }
  }

  keyUp(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      if (event.key === 'Enter') {
        // If the user presses enter, then add the new tag
        this.addTag();
      } else if (event.key === 'Escape') {
        // Otherwise, if the press escape, to back to showing the Add… link instead of the input field
        this.onEscape();
      }
    }
  }

  moreLikeThis() {
    if (this.context.searcher) {
      this.context.searcher.performQueryImmediately(this.props.moreLikeThisQuery, true);
    }
  }

  show360View() {
    const escapedDocId = encodeURIComponent(this.props.docId);
    const path = '/doc360';
    const search = QueryString.parse(this.props.location.search);
    search.docId = escapedDocId;
    this.props.history.push({ pathname: path, search: `${QueryString.stringify(search)}` });
  }

  render() {
    const {
      autoCompleteUri = '',
      baseUri = '',
      moreLikeThisQuery,
      vertical,
      view360Label,
    } = this.props;

    const outerDivClassName = `attivio-tags ${vertical ? 'attivio-tags-vertical' : ''}`;
    const moreLikeThisComponent =
      moreLikeThisQuery.length > 0 ? (
        <a
          className="attivio-tags-more"
          onClick={this.moreLikeThis}
          role="button"
          tabIndex={0}
        >
          More like this
        </a>
      ) : '';
    let tagList;
    if (this.state.tags.length > 0) {
      tagList = this.state.tags.map((tag) => {
        return (
          <span key={tag}>
            <a
              className="attivio-tags-link"
              onClick={() => { this.removeTag(tag); }}
              role="button"
              tabIndex={0}
            >
              {tag}
              {' '}
              <span className="attivio-icon-remove" />
            </a>
            {' '}
          </span>
        );
      });
    } else {
      tagList = <span className="attivio-tags-link none">None</span>;
    }

    const inputComponent = autoCompleteUri && autoCompleteUri.length > 0 ?
    (<AutoCompleteInput
      uri={`${baseUri}${autoCompleteUri}`}
      onChange={this.updateNewTagFromString}
      updateValue={this.updateNewTagFromString}
      onEscape={this.onEscape}
      placeholder={'Tag\u2026'}
      value={this.state.newTag}
      className="form-control"
    />
    ) : (
      <input
        type="email"
        className="form-control"
        id="attivio-tags-more-add"
        placeholder={'Tag\u2026'}
        value={this.state.newTag}
        onChange={this.updateNewTag}
        onKeyUp={this.keyUp}
        ref={(comp) => {
          this.inputField = comp;
        }}
      />
    );

    const addButtonText = this.state.updating ? 'Adding\u2026' : 'Add';
    const extra = this.state.adding ? (
      <div className="form-inline attivio-tags-form">
        <div className="form-group">
          <label htmlFor="attivio-tags-more-add" className="sr-only">Tag</label>
          {inputComponent}
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-xs"
          onClick={this.addTag}
          disabled={this.state.newTag.length === 0 || this.state.updating}
        >
          {addButtonText}
        </button>
      </div>
    ) : (
      <a
        className="attivio-tags-link"
        onClick={() => {
          this.setState({
            adding: true,
          }, () => {
            if (this.inputField) {
              this.inputField.focus();
            }
          });
        }}
        role="button"
        tabIndex={0}
      >
        {'Add\u2026'}
      </a>
    );

    const show360Component = view360Label ? (
      <a
        className="attivio-tags-more"
        onClick={this.show360View}
        role="button"
        tabIndex={0}
      >
        {view360Label}
      </a>
    ) : '';

    const tagError = this.state.tagError ? (
      <span title={this.state.tagError}>
        <Glyphicon glyph="exclamation-sign" style={{ color: '#d9534f', marginRight: '4px' }} />
      </span>
    ) : '';

    return (
      <div className={outerDivClassName}>
        {show360Component}
        {moreLikeThisComponent}
        <span className="attivio-tags-label">Tags:</span>
        {tagError}
        {tagList}
        {extra}
      </div>
    );
  }
}

export default withRouter(Configurable(SearchResultTags));
