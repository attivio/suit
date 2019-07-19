# Developing with SUIT

This document describes some techniques you may find helpful while developing with the SUIT library project. In general, we hope you will be able to simply include the SUIT library as a dependency in your application project, but there may be times when you need to modify SUIT itself (e.g., if you want to fix a bug or add a new feature), and these guidelines should help.

## Development Environment

You will need to have Node and the Node Package Manager (NPM) installed directly on your developmnent machine to build the SUIT library. Generally, the latest version of these tools should work, but you should be using at least version 8 of Node. Also, while certianly not required, having an IDE designed for working with JavaScript is very useful.

### Node and NPM

You can obtain Node from the [project’s website](nodejs.org). Installing Node on your machine will automatically install NPM as well.

### IDE

You are free to use whatever IDE or code editor you enjoy working with. However, in developing the SUIT library and the Search UI project, we have been using Microsoft’s free Visual Studio Code. You can download it from the [Microsoft website](code.visualstudio.com). It’s very configurable and has a lot of plug-ins available. We, for example, have it configured to automatically run Flow and ESLint on the code as we type, which helps eliminate errors more efficiently.

### Building SUIT

Before building the SUIT library, you will need to install its dependencies using NPM. From the directory where you cloned the repository, run the `npm ci` command. This will pull down all of the library's dependencies from the NPM repository so you'll be able to build SUIT's code locally.

Note that you should not run the `npm install` command to do this as it can create undesired changes in the versions of the dependencies that are used. The `npm ci` command will use the versions as they are set in the package-lock.json file and won't automatically pull down more recent ones, so you know that you're building using the same versions of dependencies that Attivio is using (it's also significantly faster since it doesn't have to do all of the version resolution that `npm install` does). You should, however, use the `npm install <library>@<version>` command when you need to add dependencies to the library (or use `npm remove <library>` to remove them), instead of editing the package.json file directly.

Once you've installed SUIT's dependencies, you can execute the `npm run build` command to do build the SUIT code. Run `npm run fullbuild` to do a build plus all validation steps. You will also need to run `npm run fullbuild` prior to submitting any pull requests to the repoisitory. You can use the `npm run styleguide:serve` command to build and launch the SUIT styleguide where you can see examples of the components and verify that any changes you've made to them work as expected.
all all of SUIT’s dependencies and then execute `npm run build` to create the library’s output in the es and lib directories. Once your application is pointing to your local build of SUIT as described in the next step, you can re-run `npm run build` to update it every time you've made a change.

## Seeing Your SUIT Changes in Search UI

Once you've completed any changes you need to make to the SUIT library, you can submit a pull request to have them incorporated into the main SUIT project. Once they're incorporated, a new version of SUIT will be built and published to the NPM repository, and you can update your copy of Search UI (or other SUIT-based application) to depend on this new version.

### Seeing SUIT Changes Immediately

In the meantime, you can use a feature of NPM to have the application project depend on your local copy of SUIT rather than a version in the NPM repository, by using the path to the cloned SUIT repository as the "version" of the @attivio/suit dependency. To do so:
1. Make sure you've built the SUIT library.
2. In your Search UI's "frontend" directory, update the version of SUIT to use using `npm install @attivio/suit@../../suit`, where "../../suit" is replaced by the path to your instance of the SUIT repository (if you cloned both Search UI and SUIT into the same directory, so "searchui" and "suit" are sibling directories, then the relative path given here will work; if you've renamed them or have them in other locations, you can use a different relative path or even an absolute pth).
3. Be careful about checking the version change to the package.json file into source control as you may not want to do this.

Now that you've set up this path, changes you make to the SUIT code will, once the library is rebuilt, appear in the Search UI you're building.

### Watching for Changes

In order to avoid constantly repeating the `npm run build` command, you can use the `npm run watch` command in the SUIT project to continuously build the library as changes are made to the source files. This will continue until you press control-C to stop it. (Note that building the module does a complete build every time and so takes a few seconds longer after saving a change than rebuilding the application itself.)

### Avoid NPM's Link Functionality

NPM has a function that lets you alias a remote version of a library with a local directory, the `npm link` command. While this technique has the advantage of not changing to the project's package.json file, we recommend that you instead use the path method mentioned above when developing Search UI. This is for two reasons: 1) the aliases are global, so if you're developing multiple SUIT-based applications, this change will apply to them all and 2) more importanty, the change won't affect the version of NPM used when Maven builds the project, whereas the "path-version" solution will work with Maven.

**IMPORTANT:** If you are building Search UI on a Windows system, and you are using a version of Search UI prior to 1.0.2, you should not use Maven's `clean` command. There is a bug in Maven that affects running this command (including with other commands such as `mvn clean install`, etc.) that can inadvertently delete your entire SUIT project when it tries to clean up the `node_modules` directory. Starting with version 1.0.2, Search UI no longer cleans the `node_modules` directory, so running `mvn clean` is OK. This issue doen't affect Linux build systems. Again, **on Windows build systems, do not use `mvn clean`**.
