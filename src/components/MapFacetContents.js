// @flow
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

import React from 'react';
// Uncommenting DrawControl import would enable Polygon selection
// feature and render it in Chrome but won't render in IE11.
// import DrawControl from 'react-mapbox-gl-draw';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import PropTypes from 'prop-types';
import sizeMe from 'react-sizeme';

import Configurable from '../components/Configurable';
import SearchFacetBucket from '../api/SearchFacetBucket';
import PositionUtils from '../util/PositionUtils';
import ObjectUtils from '../util/ObjectUtils';
import StringUtils from '../util/StringUtils';

const ReactMapboxGl = require('react-mapbox-gl');

type MapFacetContentsProps = {
  /** The facet’s buckets. */
  buckets: Array<SearchFacetBucket>;
  /** Callback to add a filter for this facet. */
  addFacetFilter: (bucket: SearchFacetBucket) => void;
  /** The size for the component. An object with height and width properties. Optional. */
  size: any;
  /** The public key with which to connect to the mapbox public apis. */
  mapboxKey: string;
};

type MapFacetContentsDefaultProps = {
  size: any;
  mapboxKey: string;
};

type MapFacetContentsState = {
  latitude: number;
  longitude: number;
  zoom: number;
  geoFilters: Array<string>;
  updating: string;
};

/**
 * Component to display the buckets of a facet using a MapBox map.
 */
class MapFacetContents extends React.Component<MapFacetContentsDefaultProps, MapFacetContentsProps, MapFacetContentsState> {
  static defaultProps = {
    size: null,
    mapboxKey: '',
  };

  static contextTypes = {
    searcher: PropTypes.any,
  };

  static displayName = 'MapFacetContents';

  static calcState(buckets: Array<SearchFacetBucket>, zoom: number,
    geoFilters: Array<string>, updating: string): MapFacetContentsState {
    const center = PositionUtils.calcCenter(buckets.map((bucket) => {
      return bucket.value;
    }));
    return {
      latitude: center.latitude,
      longitude: center.longitude,
      zoom,
      geoFilters,
      updating,
    };
  }

  static getFilter(e: any): string {
    let filter: string = 'position:POLYGON(';
    e.features[0].geometry.coordinates[0].forEach((point: Array<number>) => {
      filter = `${filter}(${point[0]},${point[1]}),`;
    });
    filter = filter.substr(0, filter.length - 1).concat(')');
    return filter;
  }

  constructor(props: MapFacetContentsProps) {
    super(props);
    this.state = MapFacetContents.calcState(this.props.buckets, 1, [], '');
    (this: any).viewportChange = this.viewportChange.bind(this);
    (this: any).create = this.create.bind(this);
    (this: any).delete = this.delete.bind(this);
    (this: any).select = this.select.bind(this);
    (this: any).update = this.update.bind(this);
    (this: any).apply = this.apply.bind(this);
  }

  state: MapFacetContentsState;

  componentDidMount() {
    this.handleNewData(this.props.buckets);
  }

  componentWillReceiveProps(nextProps: MapFacetContentsProps) {
    this.handleNewData(nextProps.buckets);
  }

  shouldComponentUpdate(nextProps: MapFacetContentsProps, nextState: MapFacetContentsState) {
    const stateTemp = Object.assign({}, this.state);
    stateTemp.geoFilters = [];
    stateTemp.proximityBoosts = [];
    stateTemp.updating = '';
    const nextStateTemp = Object.assign({}, nextState);
    nextStateTemp.geoFilters = [];
    nextStateTemp.proximityBoosts = [];
    nextStateTemp.updating = '';
    return !ObjectUtils.deepEquals(this.props.buckets, nextProps.buckets) ||
           !ObjectUtils.deepEquals(nextStateTemp, stateTemp);
  }

  create(e: any) {
    const geoFilters = this.state.geoFilters.slice();
    let updating = this.state.updating;
    updating = MapFacetContents.getFilter(e);
    geoFilters.push(updating);
    this.setState({
      geoFilters,
      updating,
    });
  }

  delete(e: any) {
    const geoFilters = this.state.geoFilters.slice();
    const index = geoFilters.indexOf(MapFacetContents.getFilter(e));
    if (index !== -1) {
      geoFilters.splice(index, 1);
    }
    this.setState({
      geoFilters,
      updating: '',
    });
  }

  select(e: any) {
    let updating = '';
    if (e.features.length) {
      updating = MapFacetContents.getFilter(e);
    }
    this.setState({
      updating,
    });
  }

  update(e: any) {
    const geoFilters = this.state.geoFilters.slice();
    let updating = this.state.updating;
    updating = MapFacetContents.getFilter(e);
    const index = geoFilters.indexOf(this.state.updating);
    if (index !== -1) {
      geoFilters.splice(index, 1, updating);
    }
    this.setState({
      geoFilters,
      updating,
    });
  }

  apply() {
    if (this.context.searcher) {
      if (this.state.geoFilters.length) {
        let geoFilter = '';
        this.state.geoFilters.forEach((filter: string) => {
          geoFilter = geoFilter ? `OR(${filter}, ${geoFilter})` : filter;
        });
        this.context.searcher.addGeoFilter(geoFilter);
      }
    }
  }

  handleNewData(buckets: Array<SearchFacetBucket>) {
    this.setState(MapFacetContents.calcState(buckets, this.state.zoom, this.state.geoFilters, this.state.updating));
  }

  viewportChange(viewport: any) {
    this.setState({
      latitude: viewport.latitude,
      longitude: viewport.longitude,
      zoom: viewport.zoom,
    });
  }

  render() {
    const Marker = ReactMapboxGl.Marker;
    const ZoomControl = ReactMapboxGl.ZoomControl;
    if (StringUtils.notEmpty(this.props.mapboxKey)) {
      const Map = ReactMapboxGl.Map({
        accessToken: this.props.mapboxKey,
        attributionControl: false,
      });

      const points = this.props.buckets.map((bucket) => {
        const value = bucket.value; // JSON.parse(bucket.value);
        // Keep track of the boundaries of the coordinates
        return (
          <Marker
            coordinates={[value.longitude || 0, value.latitude || 0]}
            onClick={() => {
              this.props.addFacetFilter(bucket);
            }}
            key={`${value.longitude || 0},${value.latitude || 0}`}
            style={{ cursor: 'pointer' }}
          >
            <Glyphicon glyph="map-marker" style={{ fontSize: '18px', color: '#2a689c' }} />
          </Marker>
        );
      });

      const height = this.props.size && this.props.size.height ? this.props.size.height : 400;
      const width = this.props.size && this.props.size.width ? this.props.size.width : 400;

      // style filters
      // const selected = ['==', 'active', 'true'];
      // const deselected = ['==', 'active', 'false'];
      // const polygon = ['==', '$type', 'Polygon'];
      // const line = ['==', '$type', 'LineString'];

      // styles
      // const selectedColor = '#f9c448';
      // const deselectedColor = '#3276b1';
      // const lineLayout = {
      //   'line-cap': 'round',
      //   'line-join': 'round',
      // };
      // const selectedLinePaint = {
      //   'line-color': selectedColor,
      //   'line-dasharray': [0.2, 2],
      //   'line-width': 2,
      // };

      return (
        <div>
          <a
            className="btn btn-primary btn-xs"
            style={{
              position: 'relative',
              display: 'inline',
              zIndex: 1,
              top: '30px',
              left: '35px',
            }}
            role="button"
            tabIndex={0}
            onClick={this.apply}
          >
            Update Results
          </a>
          <Map
            style="mapbox://styles/mapbox/light-v9" // eslint-disable-line react/style-prop-object
            containerStyle={{
              height,
              width,
            }}
            center={[this.state.longitude || 0, this.state.latitude || 0]}
            zoom={[this.state.zoom || 1]}
            onStyleLoad={(map: any) => {
              // add a filter query to the state on draw.create
              map.on('draw.create', this.create);
              // find and remove the appropriate filter query from the state on draw.delete
              map.on('draw.delete', this.delete);
              // keep track of the selected polygon whenever the selection changes
              map.on('draw.selectionchange', this.select);
              // find and remove the selected filter from the state then add the updated filter back to it on draw.update
              map.on('draw.update', this.update);
            }}
          >
            <ZoomControl position="bottom-right" />
            {/* DrawControl has no ES5 support yet, hence we won't use it until we have a fix for this.
                Uncommenting below code would enable Polygon selection feature and render it in Chrome but won't render in IE11. */}
            {/* <DrawControl
              controls={{
                point: false,
                line_string: false,
                polygon: true,
                trash: true,
                combine_features: false,
                uncombine_features: false,
              }}
              styles={[{
                id: 'selected-line',
                type: 'line',
                filter: ['all', line, selected],
                layout: lineLayout,
                paint: selectedLinePaint,
              }, {
                id: 'selected-polygon-fill',
                type: 'fill',
                filter: ['all', polygon, selected],
                paint: {
                  'fill-color': selectedColor,
                  'fill-outline-color': selectedColor,
                  'fill-opacity': 0.1,
                },
              }, {
                id: 'selected-polygon-outline',
                type: 'line',
                filter: ['all', polygon, selected],
                layout: lineLayout,
                paint: selectedLinePaint,
              }, {
                id: 'vertex',
                type: 'circle',
                filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point']],
                paint: {
                  'circle-radius': 5,
                  'circle-color': selectedColor,
                },
              }, {
                id: 'deselected-polygon-fill',
                type: 'fill',
                filter: ['all', polygon, deselected],
                paint: {
                  'fill-color': deselectedColor,
                  'fill-outline-color': deselectedColor,
                  'fill-opacity': 0.1,
                },
              }, {
                id: 'deselected-polygon-outline',
                type: 'line',
                filter: ['all', polygon, deselected],
                layout: lineLayout,
                paint: {
                  'line-color': deselectedColor,
                  'line-width': 3,
                },
              }]}
            /> */}
            {points}
          </Map>
        </div>
      );
    }
    return (
      <div className="none">
        You must configure a Mapbox key to display map facets.
      </div>
    );
  }
}

const hoc = sizeMe({
  monitorHeight: true,
  refreshRate: 10000,
});

export default hoc(Configurable(MapFacetContents));
