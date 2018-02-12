# SUIT

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

The Search User Interface Toolkit, or SUIT, is a library for creating search
applications on top of the index in the Attivio platform. For more information
on Attivio, please visit our website at http://www.attivio.com.

## Working with the SUIT Library

To build an application using the SUIT library, we strongly recommend that you
fork the companion repository, [search-ui](https://github.com/attivio/search-ui),
from our [GitHub](https://github.com/attivio/search-ui). The Search UI project
imports the SUIT library and builds a search application that uses the React
components and other classes in SUIT. Further documentation on the Search UI
layer can be found in its repository.

## The SUIT Library’s Contents

SUIT consists of three main types of classes: the React-based components used
to render the user interface and interact with the lower-layer of classes, a
set of API classes which includes code that makes calls to the Attivio server’s 
REST API to perform tasks such as querying your index, and a set of utility
classes used both by the library and by the application-level code.

### SUIT’s Components

The UI components in the SUIT library are built on top of the React library.
There are many resources on the web for learning more about React, but a good
starting point is the [React library’s own website](https://reactjs.org).

The individual components are documented in their source files. Most of the components
are used in various ways in the code in the Search UI application’s pages, as well—you
can see there how they are combined in real life.

The documentation of individual components, as well as some more basic examples of
their use can be seen in the style guide. You can build and serve it dynamically using
the `npm run styleguide:serve` command and then pointing your browser to
http://localhost:6060 to see the resulting interactive website. Alternatively, you can
run `npm run styleguide` to build a static copy to put on a server somewhere. It’s
useful because you can not only see the components but modify their configuration in
real time, right in your browser.

### SUIT’s API Layer

The API layer includes both classes that implement the methods used to talk to the Attivio platform and others that model the objects used by the APIs. In general, there are components (see above) which
encapsulate all of the functionality of the API classes. However, you can see documentation for each of them in its source file. The class you’ll likely find the most interesting is Search, which performs all queries to the back end.

### SUIT’s Utility Classes

Like the API classes, the utility classes are mostly used by the component classes and you will probably only access them indirectly. For details about the methods in each one, however, feel free
to check out the documentation in the sources.

## Building the SUIT Library

In general, as a user of the SUIT library, you shouldn’t need to make any
changes to it or build it yourself. If you are interested in submitting a pull
request for a bug, for example, you may want to build it. In this case, you can
use the folllowing commands:

| Command | Description |
| ------- | ----------- |
| `npm run clean` | Cleans the build products from your copy of the library. |
| `npm run build` | Performs a build of the library. |
| `npm run start` | Builds the library and watches for changes, rebuilding as they are found. |
| `npm run test ` | Runs the suite of tests for the library. |
| `npm run test:coverage ` | Generates a report of test coverage for the library. |
| `npm run test:watch ` | Continuously runs the suite of tests for the library, watching for changes and re-running as they are found. |

You may find it helpful to make use of NPM’s `link` functionality to facilitate seeing changes you make to the SUIT library code in the front-end application code that uses it, particularly in conjunction with the `npm run start` command. See the NPM documentation for details about doing this.

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
