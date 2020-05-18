# SUIT

[![npmjs][npm-badge]][npm]

The Search User Interface Toolkit, or “SUIT,” is a library for creating search
applications on top of the index in an Attivio, Elasticsearch or Solr installation. For more information
about Attivio and the Attivio Platform, please visit our website at http://www.attivio.com.

## Working with the SUIT Library

To build an application using the SUIT library, we strongly recommend that you
start from the companion repository, [searchui](https://github.com/attivio/searchui),
in our [GitHub](https://github.com/attivio/searchui). The Search UI project
imports the SUIT library and builds a search application that uses the React
components and other classes in SUIT. Further documentation on the Search UI
application can be found in its repository.

## The SUIT Library’s Contents

SUIT consists of three main types of code:
* React components used to render the user interface,
* API classes which include code that makes calls to the Attivio server’s REST API to perform tasks such as querying your index, and
* Utility classes used by the library which can also be used by application-level code.

### SUIT’s Components

The UI components in the SUIT library are built on top of the React library.
There are many resources on the web for learning more about React, but a good
starting point is the [React library’s own website](https://reactjs.org).

#### The SUIT Style Guide

The documentation of individual components, as well as some more basic examples of
their use can be seen in the [SUIT Style Guide](styleguide/index.html). In addition, since most of the
components are used in various ways by the Search UI code, you can look there to
see examples of how they can be combined in “real-life” applications.

The style guide is particularly useful because you can not only see examples of the components but modify
their configuration in real time, right in your browser. (We actually use it while developing new components
to see our changes without needing to include them in an application layer.) The documentation presented by
the style guide comes directly from the comments in the individual components’ source files, so it should
always be up to date.

To build the SUIT style guide (which is built using
[React Styleguidist](https://github.com/styleguidist/react-styleguidist)) and serve it dynamically,
run the command `yarn start` (after having run `yarn install`) and then point your browser to
[http://localhost:6060](http://localhost:6060) to see the resulting interactive website. (Alternatively,
you can run `yarn styleguide:build` to build a static copy to the `styleguide` directory and then just load
the `index.html` file it contains.)

### SUIT’s API Layer

The API layer includes classes that implement the methods used to communicate with to the Attivio platform
and others that model the objects used by the APIs. In general, SUIT’s components (see above) encapsulate
all of the necessary calls to API classes but you may want/need to use some of the APIs directly. One class
in particular you may need to use is Search, which performs all queries to the back end.

Documentation for the API classes can be found [here](api/index.html). As with the components, this documentation
is taken directly from comments in the source code so should always be up to date. Many of the API classes
mirror the classes and methods provided by the Attivio REST API, so looking at the [REST API documentation](https://answers.attivio.com/display/extranet55/JSON+REST+API) can be helpful as well.

### SUIT’s Utility Classes

Like the API classes, the utility classes are mostly used by the component classes and you may only access them
indirectly; however, you might want to use some of their functionality in other ways. Some of the classes you
might want to look at include AuthUtils (which handles configuration of SUIT as well as keeping track of the
current user’s details), FetchUtils (which provides a wrapper around the built-in `fetch()` API that handles
authentication-related issues), and StringUtils (which provides some string manipulation functions).

For details about the methods in these classes, please check out their documentation, [here](util/index.html).

## Building the SUIT Library

In general, as a user of the SUIT library, you shouldn’t need to make any
changes to it or build it yourself. However, you may need to do so if, for example,
you are interested in submitting a pull request that fixes a bug or adds a new feature. For this,
see further information in the file [CONTRIBUTING.md](CONTRIBUTING.md).

### Publishing New Versions

If you are a contributor to the SUIT project who needs to create a new version of the library, you should use the
command `yarn updateversion` to bump the version of SUIT to the next patch release (use `yarn updateversion minor`
or `yarn updateversion major` to update the minor or major version instead). Then you can use the command
`yarn publishlib` to perform a clean, full build including all the available validation steps, and publish the
resulting files to the NPM repository. You must be logged into npmjs.com (via `npm login`) to do this. You will
also want to commit the changes in your source tree to GitHub since they will contain the updated documentation
files.

## Contributing to the SUIT Library

Details about how you can contribute to the SUIT library, including criteria for doing so, can be found [here](Contributing.md).

## All Yarn Scripts
The full list of yarn scripts that you can run on the SUIT library is listed here:

| Command | Description |
| ------- | ----------- |
| `yarn install` | Installs the project’s dependencies into the `node_modules` directory (note, don’t use `npm install` to do this). |
| `yarn build` | Performs a build of the library. |
| `yarn flow` | Run the Flow type checker on the library and report any errors. |
| `yarn lint` | Run the ES Lint style checker on the library and report any errors. |
| `yarn doclint` | Run the documentation.js checker to look for errors in the JSDoc comments in the `api` and `util` subdirectories. |
| `yarn validatecomponents` | Performs validation that all of the components in the library meet certain standards. |
| `yarn fullbuild` | Performs a full build of the project from scratch (removing the `node_modules` directory as well as any other build products and performs all validation steps before actually building the contents of the SUIT library and its documentation. |
| `yarn updateversion` | Updates the project’s version before publishing it to the NPM repository. |
| `yarn publishlib` | Does a full build and then publishes the resulting new version to the NPM repository. |
| `yarn styleguide` | Builds the style guide and serves it on your local machine’s port 6060. This continues watching for changes and re-compiles and updates the style guide if any are found. |
| `yarn styleguide:build` | Builds the style guide statically into the `styleguide` directory for the `components` directory. |
| `yarn doc` | Run the documentation.js builder to publish documentation for the classes in the `api` and `util` subdirectories. |
| `yarn watch` | Builds the library and watches for changes, rebuilding as they are found. |
| `yarn test ` | Runs the suite of tests for the library. |
| `yarn test:coverage ` | Generates a report of test coverage for the library. |
| `yarn test:watch ` | Continuously runs the suite of tests for the library, watching for changes and re-running as they are found. |

[npm-badge]: https://img.shields.io/npm/v/@attivio/suit.svg
[npm]: https://www.npmjs.org/package/@attivio/suit
