# Developing with SUIT

This document describes some techniques you may find helpful while developing with the SUIT library project.

## Development Environment

You will need to have Node and the Node Package Manager (NPM) installed directly on your developmnent machine to build the SUIT library. While not required, having an IDE designed for working with JavaScript is very useful.

### Node and NPM

You can obtain Node from the [project’s website](nodejs.org). Installing Node on your machine will automatically install NPM as well.

### IDE

You are free to use whatever IDE or code editor you enjoy working with. However, in developing the SUIT library and the Search UI project, we have been using Microsoft’s free Visual Studio Code. You can download it from the [Microsoft website](code.visualstudio.com). It’s very configurable and has a lot of plug-ins available. We, for example, have it configured to automatically run Flow and ESLint on the code as we type, which helps eliminate errors more efficiently.

### Building SUIT

First, make sure you’ve built the SUIT library. Use the `npm install` command to install all of SUIT’s dependencies and then execute `npm run build` to create the library’s output in the es and lib directories. Once your application is pointing to your local build of SUIT as described in the next step, you can re-run `npm run build` to update it every time you've made a change.

### Putting SUIT to Work

NPM has a feature that lets you pull the contents of a dependency from someplace other than the [npmjs.com](npmjs.com) repository. We'll use this to have your Search UI project get the contents of the SUIT library from your local copy rather than the server. To set this up, do the following:

1. Open a terminal window in the directory where you cloned SUIT, making sure you have run `npm install` and `npm run build` to get it ready.
2. In your copy of the Search UI repository, edit the file `frontend/package.json` to replace the version of the `@attivio/suit` library dependency with the location of your local copy. For example, if the line was originally `"@attivio/suit": "0.0.29"` you would change it to something like `"@attivio/suit": "file:///home/myuser/dev/suit"` (substituting, naturally, the path to your local SUIT).
3. The next time you run `mvn install` or run the command `npm install` from the `frontend` directory, you will start seeing your changes to SUIT in the Search UI builds.

If you are making changes that you are submitting to the master SUIT repository via a pull request, once your pull request has been accepted and incorporated, and a new version of SUIT has been published to NPM, you can use that new version in the dependency instead of the URL.

**IMPORTANT:** If you are building Search UI on a Windows system, and you are using a version of Search UI prior to 1.0.2, you should not use Maven's `clean` command. There is a bug in Maven that affects running this command (including with other commands such as `mvn clean install`, etc.) that can inadvertently delete your entire SUIT project when it tries to clean up the `node_modules` directory. Starting with version 1.0.2, Search UI no longer cleans the `node_modules` directory, so running `mvn clean` is OK. This issue doen't affect Linux build systems. Again, **on Windows build systems, do not use `mvn clean`**.

**Note:** You may or may not want to commit the changes to the `package.json` file to your local repository. If you do, you can set the URL so that it's relative to the Search UI directory (e.g., `"file:///../../suit"` or similar) and if you always clone both the Search UI and SUIT repositories as siblings, this will work on any build machine.

**Note:** You should also note that NPM has a feature called `link` which allows a similar change to a local dependency without having to alter the `package.json` file. However, using it will not work when using Maven to build the Search UI because the Maven build uses its own copy of NPM and the link functionality adds the link to the version of NPM installed on the computer it's run on. Therefore, when building, NPM still uses the version of SUIT in the online NPM respository. You can read more about the link command [here](https://docs.npmjs.com/cli/link).

### Watching for Changes

In order to avoid constantly repeating the `npm run build` command, you can use the `npm run watch` command in the SUIT project to continuously build the library as changes are made to the source files. This will continue until you press control-C to stop it. (Note that building the module does a complete build every time and so takes a few seconds longer after saving a change than rebuilding the application itself.) Due to the links you've set up, if the application project is also `npm run watch`ing, then each time the SUIT library gets rebuilt, the application rebuild will be triggered.
