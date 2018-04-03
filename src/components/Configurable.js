import React from 'react';
import PropTypes from 'prop-types';

type ConfigurableState = {
  filled: boolean;
  props: any;
};

/**
 * A functional wrapper component that uses the configuration properties in
 * place of any null | undefined values in the props of the wrapped component.
 *
 * @param {*} WrappedComponent
 */
function Configurable(WrappedComponent: React.Component): React.Component {
  return class extends React.Component<any, any, ConfigurableState> {
    static contextTypes = {
      configuration: PropTypes.any,
    };

    constructor(props: any) {
      super(props);
      this.state = {
        filled: false,
        props,
      };
    }

    componentDidMount() {
      this.fillWithDefaults(this.props);
    }

    componentWillReceiveProps(nextProps: any) {
      this.fillWithDefaults(nextProps);
    }

    fillWithDefaults(props: any) {
      const propKeys = Object.keys(Object.assign({}, WrappedComponent.defaultProps || {}, props));
      const filled = Object.assign({}, props);
      if (this.context && this.context.configuration) {
        propKeys.forEach((property: string) => {
          const name = WrappedComponent.displayName || WrappedComponent.name;
          filled[property] = this.context.configuration.get(name, property, props[property]);
        });
      }
      this.setState({
        filled: true,
        props: filled,
      });
    }

    render() {
      if (this.state.filled) {
        return <WrappedComponent {...this.state.props} />;
      }
      return <div />;
    }
  };
}

export default Configurable;
