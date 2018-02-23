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

### Updting Your Application Project

Next, edit the package.json file in your application project to change the version of the @attivio/suit library that's included. Instead of the standard version number, use a file URL to point to the location in your local file system where you have the SUIT library project cloned. For example, you might set it to "file:///Users/yourname/dev/suit" if that's where you put your SUIT source tree. Finally, once you’ve done this, re-run the `npm install` command to make sure the application is using your version.

### Watching for Changes

In order to not need to constantly repeat the `npm run build` command, you can use the `npm run watch` command in the SUIT project to continuously build the library as changes are made to the source files. This will continue until you press control-C to stop it. (Note that building the module does a complete build every time and so takes a few seonds longer after saving a change than rebuilding the application itself.)
