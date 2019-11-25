// @flow
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

import * as React from 'react';
// Uncommenting DrawControl import would enable Polygon selection
// feature and render it in Chrome but won't render in IE11.
// import DrawControl from 'react-mapbox-gl-draw';
import { Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';

import PropTypes from 'prop-types';
import sizeMe from 'react-sizeme';

import Configurable from '../components/Configurable';
import SearchFacetBucket from '../api/SearchFacetBucket';
import PositionUtils from '../util/PositionUtils';
import ObjectUtils from '../util/ObjectUtils';
import StringUtils from '../util/StringUtils';

import ReactMapboxGl from 'react-mapbox-gl';

type MapFacetContentsProps = {
  /** The facet’s buckets. */
  buckets: Array<SearchFacetBucket>;
  /** Callback to add a filter for this facet. */
  addFacetFilter: (bucket: SearchFacetBucket) => void;
  /**
   * The size for the component. This is set by the react-sizeme library
   * so that the Mapbox control can be updated when our size changes
   * and should not be set by the component's parent.
  */
  size: any;
  /**
   * The key for connecting to the Mapbox public APIs. This must be set to your
   * own key in order for the MapFacetContents component to be rendered.
   */
  mapboxKey: string;
  /** Custom location pointer glyphicon name; default is the "map-marker" glyphicon */
  pointerGlyph?: string;
  /** Custom location pointer image URI; if set, this image is shown instead of a glyphicon */
  pointerImageUri?: string;
  /**
   * Custom tooltip text to convey what the location pointers are for, for e.g. customers,
   * transactions, etc. It uses the same format as is used by StringUtils.fmt. For example,
   * '{} cat|{} cats' to differentiate between singular and plural cats. See StringUtils.fmt()'s
   * documentation for further details.
   *
   * Note that if this isn't parameterized with "{}" then it is treated as a plain-text suffix
   * and is appended to the count for the given facet. For example, if this is set to "ethnic foods"
   * then the tooltips would read "7 ethnic foods," "15 ethnic foods," etc.
   *
   * If this is not set at all, then just the count for the facet bucket is used (e.g., "7" or "15").
   */
  tooltip?: string;
};

type MapFacetContentsState = {
  latitude: number;
  longitude: number;
  zoom: number;
  geoFilters: Array<string>;
  updating: string;
};

/**
 * Component to display the buckets of a facet using a Mapbox map. See
 * https://www.mapbox.com for details on Mapbox.
 */
class MapFacetContents extends React.Component<MapFacetContentsProps, MapFacetContentsState> {
  static defaultProps = {
    size: null,
    mapboxKey: '',
    pointerGlyph: 'map-marker',
    pointerImageUri: undefined,
    tooltip: '{}',
  };

  static contextTypes = {
    searcher: PropTypes.any,
  };

  static displayName = 'MapFacetContents';

  static calcState(buckets: Array<SearchFacetBucket>, zoom: number,
    geoFilters: Array<string>, updating: string): MapFacetContentsState {
    // Calculate the center from all the coordinates in the buckets.
    // The output from map() is filtered to remove null values as
    // getCoordinatesFromBucket() can return null.
    const center = PositionUtils.calcCenter(buckets.map((bucket) => {
      return MapFacetContents.getCoordinatesFromBucket(bucket);
    }).filter(coordinates => coordinates !== null));
    return {
      latitude: center.latitude,
      longitude: center.longitude,
      zoom,
      geoFilters,
      updating,
    };
  }

  /**
   * Gets the latitude and longitude from the SearchFacetBucket value.
   * The SearchFacetBucket value returned from backend can have 2 different formats:
   * 1. Comma separated string. Eg. "22.56,17.53"
   * 2. Plain JS Object. Eg. { longitude: 22.56, latitude: 17.53 }
   * This method returns null if bucket.value is different from these above 2 formats.
   */
  static getCoordinatesFromBucket(bucket: SearchFacetBucket):any {
    const value = bucket.value;
    let longitude = NaN;
    let latitude = NaN;
    if (typeof value === 'string') {
      const valueArr = value.split(',');
      if (valueArr.length === 2) {
        longitude = Number.parseFloat(valueArr[0]);
        latitude = Number.parseFloat(valueArr[1]);
      }
    } else {
      longitude = value.longitude;
      latitude = value.latitude;
    }
    if (Number.isNaN(longitude) || Number.isNaN(latitude)) {
      return null;
    }
    return { longitude, latitude };
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
    const { buckets, tooltip } = this.props;
    if (StringUtils.notEmpty(this.props.mapboxKey)) {
      const Map = ReactMapboxGl.Map({
        accessToken: this.props.mapboxKey,
        attributionControl: false,
      });

      let locationPointer = <Glyphicon glyph="map-marker" style={{ fontSize: '18px', color: '#2a689c' }} />;
      if (this.props.pointerImageUri) {
        locationPointer = <img src={this.props.pointerImageUri} alt="location pointer" style={{ height: '20px', width: '20px' }} />;
      } else if (this.props.pointerGlyph) {
        locationPointer = <Glyphicon glyph={this.props.pointerGlyph} style={{ fontSize: '18px', color: '#2a689c' }} />;
      }
      const points = this.props.buckets.map((bucket) => {
        // Return null if getCoordinatesFromBucket() returns null value
        const coordinates = MapFacetContents.getCoordinatesFromBucket(bucket);
        if (!coordinates) {
          return null;
        }
        const { longitude, latitude } = coordinates;
        // Keep track of the boundaries of the coordinates
        let formattedTooltip;
        if (tooltip) {
          formattedTooltip = StringUtils.fmt(tooltip, bucket.count);
          if (formattedTooltip === tooltip) {
            // If the tooltip string isn't parameterized, treat it as a suffix.
            formattedTooltip = `${bucket.count} ${tooltip}`;
          }
        } else {
          formattedTooltip = `${bucket.count}`;
        }
        return (
          <Marker
            coordinates={[longitude, latitude]}
            onClick={() => {
              this.props.addFacetFilter(bucket);
            }}
            key={`${longitude},${latitude}`}
            style={{ cursor: 'pointer' }}
          >
            <OverlayTrigger overlay={
              <Tooltip id="tooltip-bottom">
                {formattedTooltip} in this region
              </Tooltip>}
            >
              {locationPointer}
            </OverlayTrigger>
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
                Uncommenting below code would enable Polygon selection feature and render it in Chrome but won't render in IE11.
                When DrawControl is re-enabled, ensure signal of type 'facet' is created when applying geofilters to the search.
                See PLAT-44214 for details on signals of type 'facet'. */}
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
