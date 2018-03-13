# Developing with SUIT

This document describes some techniques you may find helpful while developing with the SUIT library project.

## Development Environment

You will need to have Node and the Node Package Manager installed directly on your developmnent machine to build the SUIT library.

### Node and NPM

You can obtain Node from the [project’s website](nodejs.org). Installing Node on your machine will automatically install NPM as well.

### IDE

You are free to use whatever IDE or code editor you enjoy working with. However, in developing the SUIT library and the Search UI project, we have been using Microsoft’s free Visual Studio Code. You can download it from the [Microsoft website](code.visualstudio.com). It’s very configurable and has a lot of plug-ins available. We, for example, have it configured to automatically run Flow and ESLint on the code as we type, which helps eliminate errors more efficiently.

## Using with Search UI

When working on SUIT, you’ll want to update your Search UI project (or other application project, if you’re creating your own) to point to your version of the library rather than the versions published to the NPM server. This will enable you to see the changes you make to the lirary a lot more quickly and easily by seeing their effect on the end application.

### Building SUIT

First, make sure you’ve built the SUIT library. Use the `npm install` command to install all of SUIT’s dependencies and then execute `npm run build` to create the library’s output in the es and lib directories. Once your application is pointing to your local build of SUIT as described in the next step, you can re-run `npm run build` to update it every time you've made a change.

### The Missing Link

NPM has a cool feature that lets you pull the contents of a dependency from someplace other than the [npmjs.com](npmjs.com) repository. We'll use this to have your searchui project get the contents of the SUIT library from your local copy rather than the server. To set this up, do the following:

1. Open a terminal window in the directory where you cloned SUIT, making sure you have run `npm install` and `npm run build` to get it ready.
2. Use the command `npm link` in the SUIT directory. This tells NPM on your computer that you want to access the SUIT library ("@attivio/suit") from this directory. It will map the version in the SUIT library's package.json file, so this needs to match the version for the dependency in your application project's package.json file. (This is entirely done using NPM's configuration and not with any sort of file-system links.)
3. Now change to the front-end directory for the application (e.g., searchui/searchui-frontend), and execute this command: `npm link @attivio/suit`. This will cause NPM to obtain SUIT from your local copy rather than the server. (You can undo this by executing, not surprisingly, `npm unlink @attivio/suit`, which will cause NPM to start pulling the published version of SUIT again.)

You can read more about the link command [here](https://docs.npmjs.com/cli/link).

**IMPORTANT:** You can also set up links between NPM projects by changing the dependency's version in package.json to be a "file" URL (e.g., "file:///Users/yourname/dev/suit"). We don't recommend doing this for two reasons: 1) you have to worry about not checking in the updated package.json file and 2) if you are developing on Windows, you need to worry about a bug which causes Maven to **entirely delete the contents of your SUIT directory** when using the `clean` goal.

### Watching for Changes

In order to not need to constantly repeat the `npm run build` command, you can use the `npm run watch` command in the SUIT project to continuously build the library as changes are made to the source files. This will continue until you press control-C to stop it. (Note that building the module does a complete build every time and so takes a few seonds longer after saving a change than rebuilding the application itself.) Due to the links you've set up, if the application project is also `npm run watch`ing, then each time the SUIT library gets rebuilt, the application rebuild will be triggered.
