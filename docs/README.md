# SUIT

[![npmjs][npm-badge]][npm]

The Search User Interface Toolkit, or SUIT, is a library for creating search
applications on top of the index in an Attivio, Elasticsearch or Solr installation. For more information
on Attivio and the Attivio Platform, please visit our website at http://www.attivio.com.

## Working with the SUIT Library

To build an application using the SUIT library, we strongly recommend that you
start from the companion repository, [searchui](https://github.com/attivio/searchui),
in our [GitHub](https://github.com/attivio/searchui). The Search UI project
imports the SUIT library and builds a search application that uses the React
components and other classes in SUIT. Further documentation on the Search UI
layer can be found in its repository.

## The SUIT Library’s Contents

SUIT consists of three main types of classes:
* The React components used to render the user interface,
* A set of API classes which include code that makes calls to the Attivio server’s REST API to perform tasks such as querying your index, and
* A set of utility classes that can be used both by the library and by the application-level code.

### SUIT’s Components

The UI components in the SUIT library are built on top of the React library.
There are many resources on the web for learning more about React, but a good
starting point is the [React library’s own website](https://reactjs.org).

The documentation of individual components, as well as some more basic examples of
their use can be seen in the [SUIT style guide](styleguide/index.html). In addition, since most of the components
are used in various ways by the Search UI application’s code, you can look there to
see examples of how they are combined in "real life."

The style guide is particularly useful because you can not only see examples of the components but modify
their configuration in real time, right in your browser. (We actually use it while developing new components to see how
the changes we make will look.) The documentation presented by the style guide comes directly from the comments
in the individual components' source files, so it's never out of date.

To build the SUIT style guide and serve it dynamically, run the command `npm run styleguide:serve`
(after having run `npm install`) and then point a browser to http://localhost:6060 to see the
resulting interactive website. (Alternatively, you can run `npm run styleguide` to build a static
copy to the `styleguide` directory and then just load the `index.html` file it contains.)  

### SUIT’s API Layer

The API layer includes both classes that implement the methods used to talk to the Attivio platform and others that model the objects used by the APIs. In general, there are components (see above) which
encapsulate all of the functionality of the API classes. However, you can see documentation for each of them in its source file. The class you’ll likely find the most interesting is Search, which performs all queries to the back end, but others will be useful, such as AuthUtils, which is where the configuration of SUIT occurs.

Documentation for the API classes can be found [here](api/index.html). Many of these classes mirror the classes and methods provided by the Attivio REST API, so looking at the [REST API documentation](https://answers.attivio.com/display/extranet55/JSON+REST+API) can be helpful as well for those classes.

### SUIT’s Utility Classes

Like the API classes, the utility classes are mostly used by the component classes and you will probably only access them indirectly; however, you might want to use some of their functionality in other ways. For details about the methods in each one, however, feel free to check out the documentation, [here](util/index.html).

## Building the SUIT Library

In general, as a user of the SUIT library, you shouldn’t need to make any
changes to it or build it yourself. However, if you may need to do so if, for example,
you are interested in submitting a pull request that fixes a bug or adds a new feature. For this,
see further information in the file [CONTRIBUTING.md](CONTRIBUTING.md).

If you are a developer in the SUIT project who needs to build a new version of the library, you use the command `npm run updateversion` to bump the version of SUIT to the next patch release (or use `npm run updateversion minor` or `npm run uipdateversion major` to update the minor or major version). Then you can use the command `npm run publishlib` to perform a clean, full build including all the available validation steps, and publish the resulting files to the NPM repository. You must be logged into npmjs.com (via `npm login`) to do this.

### Contributing to the SUIT Library

Details about how you can contribute to the SUIT library, including criteria for doing so, can be found [here](Contributing.md).

## All NPM Scripts
The full list of scripts that you can run on the SUIT library is listed here:
In this case, you can
use the following commands:

| Command | Description |
| ------- | ----------- |
| `npm install` | Installs the project's dependencies into the `node_modules` directory. |
| `npm run clean` | Cleans the build products from your copy of the library. |
| `npm run build` | Performs a build of the library. |
| `npm run flow` | Run the Flow type checker on the library and report any errors. |
| `npm run lint` | Run the ES Lint style checker on the library and report any errors. |
| `npm run doclint` | Run the documentation.js checker to look for errors in the JSDoc comments in the `api` and `util` subdirectories. |
| `npm run validatecomponents` | Performs validation that all of the components in the library meet certain standards. |
| `npm run fullbuild` | Performs a full buid of the project from scratch (removing the `node_modules` direcotory as well as any other build products and performs all validation steps before actually building the contents of the SUIT library and its documentation. |
| `npm run updateversion` | Updates the project's version before publishing it to the NPM repository. |
| `npm run publishlib` | Does a full build and then publishes the resulting new version to the NPM repository. |
| `npm run styleguide:serve` | Buids the style guide and serves it on your local machine's port 6060. This continues watching for changes and re-compiles and updates the style guide if any are found. |
| `npm run styleguide` | Buids the style guide statically into the `styleguide` directory for the `components` directory. |
| `npm run doc` | Run the documentation.js builder to publish documentation for the classes in the `api` and `util` subdirectories. |
| `npm run watch` | Builds the library and watches for changes, rebuilding as they are found. |
| `npm run test ` | Runs the suite of tests for the library. |
| `npm run test:coverage ` | Generates a report of test coverage for the library. |
| `npm run test:watch ` | Continuously runs the suite of tests for the library, watching for changes and re-running as they are found. |

[npm-badge]: https://img.shields.io/npm/v/@attivio/suit.svg
[npm]: https://www.npmjs.org/package/@attivio/suit
