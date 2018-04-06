// @Flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import SearchDocument from '../api/SearchDocument';
import Breadcrumbs, { BreadcrumbInfo } from './Breadcrumbs';

type Doc360BreadcrumbsProps = {
  currentDoc: SearchDocument;
  location: PropTypes.object.isRequired;
  history: PropTypes.object.isRequired;
};

class HistoryEntry {
  label: string;
  location: any & { pathname: string, search: string };

  constructor(label: string, location: any & { pathname: string, search: string }) {
    this.label = label;
    this.location = location;
  }
}

type Doc360BreadcrumbsState = {
  history: Array<HistoryEntry>;
  back: boolean;
};

class Doc360Breadcrumbs extends React.Component<void, Doc360BreadcrumbsProps, Doc360BreadcrumbsState> {
  static displayName = 'Doc360Breadcrumbs';

  constructor(props: Doc360BreadcrumbsProps) {
    super(props);
    (this: any).handleClick = this.handleClick.bind(this);
    this.state = {
      history: [],
      back: false,
    };
  }

  state: Doc360BreadcrumbsState;

  componentWillReceiveProps(nextProps: Doc360BreadcrumbsProps) {
    // we are going back, so we don't want this location added to the history
    if (!this.state.back) {
      if (nextProps.location.key !== this.props.location.key) {
        const history = this.state.history.slice();
        history.push(new HistoryEntry(this.findCurrentDocName(), this.props.location));
        this.setState({
          history,
        });
      }
    } else {
      this.setState({ back: false });
    }
  }

  handleClick(location: any) {
    let history = this.state.history.slice();
    let index = -1;
    history.forEach((entry, i) => {
      if (entry.location.key === location.key) {
        // We found the entry with the same location...
        index = i;
      }
    });
    let backwards;
    if (index !== -1) {
      // If we have the location in our history, then remove
      // it and things after it...
      history = history.slice(0, index);
      // Also, figure out how many jumps back that will be for the router's history
      backwards = 0 - (this.state.history.length - index);
      this.setState({
        history,
        // we are going back, so we don't want this location added to the history
        back: true,
      }, () => {
        this.props.history.go(backwards);
      });
    } else {
      this.props.history.push(location);
    }
  }

  findCurrentDocName() {
    let currentDocName;
    if (this.props.currentDoc) {
      currentDocName = this.props.currentDoc.getFirstValue('title');
      if (!currentDocName || currentDocName.length === 0) {
        currentDocName = 'Unknown';
      }
    } else {
      currentDocName = '';
    }
    return currentDocName;
  }

  render() {
    // Start with the base location, which is always the search results page
    const crumbs = [new BreadcrumbInfo('Results List', { pathname: '/results', search: this.props.location.search })];
    this.state.history.forEach((entry) => {
      crumbs.push(new BreadcrumbInfo(entry.label, entry.location));
    });
    // End with the current location
    crumbs.push(new BreadcrumbInfo(this.findCurrentDocName(), null));

    return <Breadcrumbs crumbs={crumbs} onClick={this.handleClick} />;
  }
}

export default withRouter(Doc360Breadcrumbs);
