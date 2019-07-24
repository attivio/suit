// @flow

import React from 'react';
import PropTypes from 'prop-types';

import Configurable from './Configurable';
import SearchFacet from '../api/SearchFacet';
import SearchFacetBucket from '../api/SearchFacetBucket';
import BusyIndicator from './BusyIndicator';

type FacetTabsProps = {
  /**
   * Name of the facet that should be displayed as Tabs, default is 'table'
   */
  facetName: string; //eslint-disable-line
  /**
   * Optional callback to be used when a tab is clicked instead of default (which applies the facet filter)
   */
  handleClick?: () => void;
  /**
   * Optional facet that should be used instead of facetName
   */
  facet?: SearchFacet | null; //eslint-disable-line
  /**
   * The color that should be used for the background of facet tabs
   */
  backgroundColor?: string;
};

type FacetTabsState = {
  tabsList: Array<any>;
};

class FacetTabs extends React.Component<FacetTabsProps, FacetTabsProps, FacetTabsState> {
  static contextTypes = {
    searcher: PropTypes.any,
  };

  static defaultProps = {
    facetName: 'table',
    facet: null,
    backgroundColor: '#add8e6',
  };

  static displayName = 'FacetTabs';

  constructor(props: FacetTabsProps) {
    super(props);
    this.state = {
      tabsList: [],
    };

    (this: any).getTabsFromFacet = this.getTabsFromFacet.bind(this);
    (this: any).populateTabs = this.populateTabs.bind(this);
    (this: any).handleTabClick = this.handleTabClick.bind(this);
  }

  componentWillMount() {
    this.populateTabs(this.props);
  }

  componentWillReceiveProps(newProps: FacetTabsProps) {
    this.populateTabs(newProps);
  }

  //eslint-disable-next-line
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  handleTabClick(bucket: SearchFacetBucket, label: string) {
    this.context.searcher.addFacetFilter(label, bucket.value, bucket.filter);
  }

  getTabsFromFacet(facet: SearchFacet) {
    const tabs = [];
    facet.buckets.forEach((bucket: SearchFacetBucket) => {
      const value = bucket.value;
      const count = this.numberWithCommas(bucket.count);
      if (this.props.handleClick) {
        tabs.push(
          <div //eslint-disable-line
            onClick={() => {
              this.props.handleClick(bucket);
            }}
            className="facet-tab"
          >
            <div className="facet-tab-text">
              {value} <span style={{ color: 'gray' }}>({count})</span>
            </div>
          </div>,
        );
      } else {
        tabs.push(
          <div //eslint-disable-line
            onClick={() => {
              this.handleTabClick(bucket, facet.label);
            }}
            className="facet-tab"
          >
            <div className="facet-tab-text">
              {value} <span style={{ color: 'gray' }}>({count})</span>
            </div>
          </div>,
        );
      }
    });
    this.setState({ tabsList: tabs });
  }

  populateTabs(props: FacetTabsProps) {
    const { facetName, facet } = props;

    if (facet && facet.buckets) {
      this.getTabsFromFacet(facet);
    } else if (facetName) {
      const searcher = this.context.searcher;
      if (searcher && searcher.state.response) {
        if (searcher.state.response.facets) {
          searcher.state.response.facets.forEach((currentFacet: SearchFacet) => {
            if (currentFacet.field === facetName && currentFacet.buckets) {
              this.getTabsFromFacet(currentFacet);
            }
          });
        }
      }
    }
  }

  render() {
    const tabData = this.state.tabsList;
    const tabs =
      tabData.length > 0 ? (
        <div
          className="facet-tab-container"
          style={{ backgroundColor: `${this.props.backgroundColor}` }}
        >
          {tabData}
        </div>
      ) : (
        <BusyIndicator
          show
          type="spinny"
          message="Loading Facet Tabs..."
          messageStyle={{ fontWeight: 600, color: '#2f75b0' }}
          positionMessageRight
        />
      );
    return <div>{tabs}</div>;
  }
}

export default Configurable(FacetTabs);
