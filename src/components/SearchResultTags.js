// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import QueryString from 'query-string';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import AutoCompleteInput from './AutoCompleteInput';
import Configurable from './Configurable';
import Comments from './Comments';

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
   * Defaults to "Show 360° View."
   * Deprecated: Set to null to not show a link. Supported for backwards compatibility. Use `hide360Link`
   *  to omit 360 link instead.
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
  /** Whether to show a Comment option. Defaults to false. */
  comments?: boolean;
  /** Table field for the comment documents */
  commentsTable?: string;
  /**
   * Whether or not to show 360 page link. Defaults to false.
   */
  hide360Link?: boolean;
};

type SearchResultTagsDefaultProps = {
  autoCompleteUri: string | null;
  baseUri: string;
  comments: boolean;
  commentsTable: string;
  moreLikeThisQuery: string;
  hide360Link: boolean;
  vertical: boolean;
  view360Label: string | null;
};

type SearchResultTagsState = {
  adding: boolean;
  newTag: string;
  tagError: string | null;
  tags: Array<string>;
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
    autoCompleteUri: null,
    baseUri: '',
    comments: false,
    commentsTable: 'comments',
    moreLikeThisQuery: '',
    hide360Link: false,
    vertical: false,
    view360Label: 'Show 360\u00B0 View',
  };

  static displayName = 'SearchResultTags';

  constructor(props: SearchResultTagsProps) {
    super(props);
    this.state = {
      adding: false,
      newTag: '',
      tagError: null,
      tags: [...props.tags],
      updating: false,
    };
  }

  state: SearchResultTagsState;

  onEscape = () => {
    this.setState({
      newTag: '',
      adding: false,
    });
  }

  inputField: ?HTMLInputElement;

  updateTags = (tags: Array<string>) => {
    const { searcher = null } = this.context;
    const { docId } = this.props;

    if (searcher) {
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

        searcher.updateTags(tags, docId, completionCallback, errorCallback);
      });
    }
  }

  removeTag = (tagName: string) => {
    const tags = this.state.tags.slice();
    const index = tags.indexOf(tagName);
    if (index >= 0) {
      tags.splice(index, 1);
      this.updateTags(tags);
    }
  }

  addTag = () => {
    const { newTag: tagName } = this.state;

    if (tagName && tagName.length > 0) {
      const tags = this.state.tags.slice();
      tags.push(tagName);
      this.updateTags(tags);
    }
  }

  updateNewTag = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({
        newTag: event.target.value,
      });
    }
  }

  updateNewTagFromString = (tagValue: string, addNow?: boolean) => {
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

  keyUp = (event: Event) => {
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

  moreLikeThis = () => {
    const { moreLikeThisQuery } = this.props;
    const { searcher = null } = this.context;

    if (searcher) {
      searcher.performQueryImmediately(moreLikeThisQuery, true);
    }
  }

  show360View = () => {
    const {
      docId,
      history,
      location,
    } = this.props;

    const escapedDocId = encodeURIComponent(docId);
    const path = '/doc360';
    const search = QueryString.parse(location.search);
    search.docId = escapedDocId;
    history.push({ pathname: path, search: `${QueryString.stringify(search)}` });
  }

  render360Link() {
    const { view360Label, hide360Link } = this.props;

    return view360Label && !hide360Link && (
      <a
        className="attivio-tags-more"
        onClick={this.show360View}
        role="button"
        tabIndex={0}
      >
        {view360Label}
      </a>
    );
  }

  renderInputComponent() {
    const {
      autoCompleteUri,
      baseUri,
    } = this.props;

    const { newTag } = this.state;

    return autoCompleteUri && autoCompleteUri.length > 0
    ? (
      <AutoCompleteInput
        uri={`${baseUri || ''}${autoCompleteUri || ''}`}
        onChange={this.updateNewTagFromString}
        updateValue={this.updateNewTagFromString}
        onEscape={this.onEscape}
        placeholder={'Tag\u2026'}
        value={newTag}
        className="form-control"
      />
    ) : (
      <input
        type="email"
        className="form-control"
        id="attivio-tags-more-add"
        placeholder={'Tag\u2026'}
        value={newTag}
        onChange={this.updateNewTag}
        onKeyUp={this.keyUp}
        ref={(comp) => {
          this.inputField = comp;
        }}
      />
    );
  }

  renderExtraLinks() {
    const {
      adding,
      newTag,
      updating,
    } = this.state;

    const addButtonText = updating ? 'Adding\u2026' : 'Add';

    return adding ? (
      <div className="form-inline attivio-tags-form">
        <div className="form-group">
          <label htmlFor="attivio-tags-more-add" className="sr-only">Tag</label>
          {this.renderInputComponent()}
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-xs"
          onClick={this.addTag}
          disabled={newTag.length === 0 || updating}
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
  }

  renderTags() {
    const { tags } = this.state;

    if (tags && tags.length > 0) {
      return tags.map(tag => (
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
      ));
    }

    return <span className="attivio-tags-link none">None</span>;
  }

  renderMoreLikeThis() {
    const { moreLikeThisQuery } = this.props;

    return moreLikeThisQuery.length > 0 ? (
      <a
        className="attivio-tags-more"
        onClick={this.moreLikeThis}
        role="button"
        tabIndex={0}
      >
        More like this
      </a>
    ) : '';
  }

  render() {
    const {
      comments,
      commentsTable,
      docId,
      vertical,
    } = this.props;

    const { tagError } = this.state;

    const outerDivClassName = `attivio-tags ${vertical ? 'attivio-tags-vertical' : ''}`;

    return (
      <div className={outerDivClassName}>
        {this.render360Link()}
        {this.renderMoreLikeThis()}
        {comments && (
          <Comments docId={docId} commentsTable={commentsTable} />
        )}
        <span className="attivio-tags-label">Tags:</span>
        {tagError && (
          <span title={tagError}>
            <Glyphicon glyph="exclamation-sign" style={{ color: '#d9534f', marginRight: '4px' }} />
          </span>
        )}
        {this.renderTags()}
        {this.renderExtraLinks()}
      </div>
    );
  }
}

export default withRouter(Configurable(SearchResultTags));
