// @flow

import React, { Children } from 'react';
import PropTypes from 'prop-types';

type ConfigurationProps = {
  /** The configuration read in from the configuration.properties.js file. */
  config: any;
  /**
   * Any child components can access the configuration's settings
   * using the "configuration" object in their context
   */
  children: Children;
};

export default class Configuration extends React.Component<void, ConfigurationProps, any> {
  static childContextTypes = {
    configuration: PropTypes.any,
  }

  static displayName = 'Configuration';

  constructor(props: ConfigurationProps) {
    super(props);
    this.state = Object.assign({}, this.props.config);

    (this: any).set = this.set.bind(this);
    (this: any).get = this.get.bind(this);
  }

  getChildContext() {
    return {
      configuration: this,
    };
  }

  /**
   * Children can use this to store global information for the
   * application in our state. Note that this currently doesn't
   * allow removing objects from the state, just adding or replacing
   * them. If a child has multiple values to store, it probably
   * makes sense to encapsulate them into an object and store that
   * single object.
   *
   * @param {*} prefix the namespace within which to set the property
   * @param {*} newConfigItems the property:value pairs to set on the configuration
   * @param {*} callback a callback to run after the values have been set
   */
  set(prefix: string, newConfigItems: any, callback?: () => void) {
    this.setState(Object.assign({}, this.state[prefix || 'ALL'], newConfigItems), callback);
  }

  /**
   * Children can use this to retrieve global information for the
   * application in our state.
   *
   * @param {*} prefix the namespace containing the property
   * @param {*} property the name of the property
   * @param {*} override this value will be used instead if it isn't null or undefined
   */
  get(prefix: string, property: string, override?: any) {
    if (override === null || override === undefined) {
      const prefixVersion = this.state[prefix] ? this.state[prefix][property] : null;
      if (prefixVersion === null || prefixVersion === undefined) {
        return this.state.ALL[property];
      }
      return prefixVersion;
    }
    return override;
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
