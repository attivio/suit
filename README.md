# SUIT

[![TravisCI][build-badge]][build]
[![npmjs][npm-badge]][npm]

The Search User Interface Toolkit, or SUIT, is a library for creating search applications on top of the index in an Attivio, Elasticsearch or Solr installation.

SUIT is built using components based on the React library, along with additional functionality necessary to communicate with the back-end servers. It is used as the basis for the Search UI application, which is available in [its own repository](https://github.com/attivio/searchui). You can create your own applications by using Search UI as a starting point or by simply including SUIT as a dependency in your own project.

## React
SUIT is built using React and is intended to be used by other applications also using React. Details about React can be found on the [project’s website](https://reactjs.org).

### Versions
To ensure your application functions as expected, the version of react in your application should match the version of react used in the version of SUIT you are using. (See the `package.json` file in the version of SUIT you are using to find the specific React version to use.)

- version 1.0.0 and later of SUIT use version 16 of React
- earlier versions of SUIT use version 15 of React

### Upgrading

If you are upgrading a project from version 0.1 to version 1.0 of SUIT, you might wish to look at information from the [React 16 Release Notes](https://github.com/facebook/react/releases?after=16.1.0-rc) and the [React 16 Guide](https://reactjs.org/blog/2017/09/26/react-v16.0.html) for assistance.

## Documentation
For detailed documentation about SUIT including both how to use it and how to contribute to it, see the [SUIT Documentation site](https://attivio.github.io/suit/).

## Issues
To report an issue, please click the *Issues* tab above and then click the *New Issue* button. Please provide a detailed description of the issue along with any code excerpts, logs, or screenshots which describe the issue.

## Contributing
To provide your own fixes and improvements to the SUIT library, please feel free to submit pull requests to the repository. More information on this process can be found [here](CONTRIBUTING.md).

## Attivio
For more information on Attivio and the Attivio Platform, please visit our website at [http://www.attivio.com](http://www.attivio.com).

[build-badge]: https://travis-ci.org/attivio/suit.svg?branch=master
[build]: https://travis-ci.org/attivio/suit

[npm-badge]: https://img.shields.io/npm/v/@attivio/suit.svg
[npm]: https://www.npmjs.org/package/@attivio/suit

