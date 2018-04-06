// @flow
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Menu, { MenuItemDef } from './Menu';

type SearchRelevancyModelProps = {
  /**
   * The list of relevancy models to show that will be availale for the user
   * to choose from. If this is set to a single-element array, then that one
   * relevancy model will be used for all queries and the user will not see
   * a menu for choosing the model. If this is not set (and the value is the
   * default, empty array), then the back-end will be queried to obtain the list
   * of known model names.
   */
  models: Array<string>;
  /** If set, then the menu will be shown at the right end of the navbar. */
  right: boolean;
  /**
   * Optional. The location of the node through which to interact with Attivio.
   * Defaults to the value in the configuration.
   */
  baseUri: string;
};

type SearchRelevancyModelState = {
  models: Array<string>;
  loading: boolean;
  errorMessage: string | null;
};

/**
 * A pop-up for choosing how many search results should be
 * on each page. It works with the parent Searcher component to
 * update its property and to show the current value.
 */
export default class SearchRelevancyModel extends React.Component<SearchRelevancyModelProps, SearchRelevancyModelProps, SearchRelevancyModelState> { // eslint-disable-line max-len
  static defaultProps = {
    models: [],
    right: false,
    baseUri: '',
  };

  static contextTypes = {
    searcher: PropTypes.any,
  };

  static displayName = 'SearchRelevancyModel';

  constructor(props: SearchRelevancyModelProps) {
    super(props);
    this.state = {
      models: this.props.models,
      loading: this.props.models.length === 0,
      errorMessage: null,
    };
    (this: any).onSelect = this.onSelect.bind(this);
  }

  state: SearchRelevancyModelState;

  componentWillMount() {
    // If our parent didn't set a list of models for us
    // to use, ask the server what we should do.
    const uri = `${this.props.baseUri}/rest/relevancyModelApi/getRelevancyModelNames`;
    if (!this.state.models || this.state.models.length === 0) {
      axios.get(uri).then((response) => {
        if (response && response.data && response.data.length > 0) {
          // If there's just a single relevancy model, tell the searcher to use it
          if (response.data.length === 1) {
            const searcher = this.context.searcher;
            if (searcher) {
              searcher.updateRelevancyModels([this.state.models[0]]);
            }
          }
          // Save the models
          this.setState({
            models: response.data,
            loading: false,
            errorMessage: null,
          });
        } else {
          this.setState({
            models: [],
            loading: false,
            errorMessage: null,
          });
        }
      }).catch((error) => {
        let errorMessage = 'Unknown';
        if (error) {
          if (error.message) {
            errorMessage = error.message;
          } else if (error.response) {
            if (error.response.status && error.response.statusText) {
              errorMessage = `${error.response.status}: ${error.response.statusText}`;
            } else if (error.response.statusText) {
              errorMessage = error.response.statusText;
            } else if (error.response.status) {
              errorMessage = `Error code: ${error.response.status}`;
            }
          }
        }
        this.setState({
          models: [],
          loading: false,
          errorMessage,
        });
      });
    } else if (this.state.models && this.state.models.length === 1) {
      // If there's just a single relevancy model, tell the searcher to use it
      const searcher = this.context.searcher;
      if (searcher) {
        searcher.updateRelevancyModels([this.state.models[0]]);
      }
    }
  }

  onSelect(item: MenuItemDef) {
    const newValue = item.value;
    const searcher = this.context.searcher;
    if (searcher) {
      searcher.updateRelevancyModels([newValue]);
    }
  }

  render() {
    let menu;
    if (this.state.loading) {
      const loadingMenuItem = new MenuItemDef('Loading\u2026', 'loading');
      loadingMenuItem.disabled = true;
      menu = (
        <Menu
          label="Relevancy Model:"
          selection="loading"
          items={[loadingMenuItem]}
          onSelect={() => {}}
          right
        />
      );
    } else if (this.state.errorMessage) {
      const errorMenuItem = new MenuItemDef('Error', 'error');
      errorMenuItem.disabled = true;
      const errorDescriptionMenuItem = new MenuItemDef(this.state.errorMessage, 'errorDescription');
      errorDescriptionMenuItem.disabled = true;
      menu = (
        <Menu
          label="Relevancy Model:"
          selection="error"
          items={[errorMenuItem, errorDescriptionMenuItem]}
          onSelect={() => {}}
          right
        />
      );
    } else if (this.state.models.length <= 1) {
      // If there is only one model or if there are no models, then we don't show the list.
      // In the case of a single model, the searcher will always use that one.
      menu = '';
    } else {
      // Normal case with models provided either by the parent or the back-end
      let currentModel;
      const searcher = this.context.searcher;
      if (searcher && searcher.state.relevancyModels && searcher.state.relevancyModels.length > 0) {
        currentModel = searcher.state.relevancyModels[0];
      }
      if (!currentModel) {
        currentModel = 'default'; // If the searcher has none set, use default
      }
      const modelNames = this.state.models.slice();
      if (!modelNames.includes(currentModel)) {
        modelNames.unshift(currentModel);
      }
      const items = modelNames.map((modelName) => {
        return new MenuItemDef(modelName, modelName);
      });
      menu = (
        <Menu
          label="Relevancy Model:"
          selection={currentModel}
          items={items}
          onSelect={this.onSelect}
          right
        />
      );
    }
    const leftRight = this.props.right ? 'attivio-globalmastnavbar-right' : '';
    return (
      <div className={leftRight}>
        {menu}
      </div>
    );
  }
}
