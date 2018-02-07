## Getting Started

### Prerequisites

In order to develop with the toolkit, you will need to have some tools in place. The most important one is Node.js, which allows you to run JavaScript code on your computer, outside of a web browser. Node.js also incldues the Node Package Manager, which deals with downloading and making available all of the project’s dependencies. In addition, while you can use any text editor for developing your applications, you’ll probably want to download and use an editor which has specific features designed for working with JavaScript and, more specifically, React code.

#### Node.js

You can obtain Node.js from the [project’s website](https://nodejs.org/). Download the version for your platform and install it as directed. You should install at least version 6.11. While you won’t be using Node.js directly, many of the tools used for building and debugging your project require it. In addition, the installation will also provide the Node Package Manager, or NPM, which will manage your dependencies and your build process.

#### Recommended Editors

The following editors all have special functionality (either built-in or provided by plug-ins) for working with JavaScript projects, including some of the technologies used by the Attivio Search UI Toolkit, such as Node/NPM, React, Flow, and ESLint. See the documentation for each editor for more information about how to configure it and what plug-ins you might want to add.

* [Visual Studio Code](https://code.visualstudio.com/)
* [Atom](https://atom.io/)
* [Sublime Text](https://www.sublimetext.com/3)
* [WebStorm](https://www.jetbrains.com/webstorm/)

### Installing the Toolkit

Installing the Attivio Search UI Toolkit is straightforward. You need to simply clone or fork the starter project on GitHub.

The starter project is at https://git.attivio.com/lvaldez/reactbase.

Once you have a copy of the project locally, navigate to the project’s directory and run this command to pull down all of the dependencies from the Internet. It will take a minute or two, depending on your connection speed.

`npm install`

Once you have done that, you can run this command to start a development server and see your application in action, at http://localhost:8080.

`npm start`

If you have an instance of the Attivio platform running on your local machine, then you will be able to use the resulting application to search your index as-is. If not, you will need to edit the URL in XXX to point to your Attivio instance.

### Development Process

The development server you started with `npm start` is the most convenient way to work on your application. In addition to providing a simple web server for your project, it will watch your project directory for changes to the source files. If anything changes, it will reprocess (compile, transpile, copy, etc., depending on the type of file) the sources and make them avaialble via the server so you can see your changes immediately. In this way, you can edit the project in your editor of choice and see the results in your web browser without needing to go through a tedious cycle.

### Building

In addition to running the development server, which encapsulates the build process but doesn’t produce the output files needed to deploy your web application, you can run the following command to produce a self-contained application.

`npm run build`

Once complete, the products of the build process will be placed into the project’s `dist` directory, from which you can copy them to your server.

#### Serving from Attivio

If you wish to have the project served from your Attivio instance’s nodes, you can run the following command, which will perform a build and then package the resulting code up in a module that can be installed into your Attivio instance and deployed with your project there.

`npm run package`

#### Validation

The project also includes some other scripts you can run to help validate your code, to help ensure you don’t have any problems that you would otherwise only discover at runtime.

`npm run flow` will start the Flow server and check for problems with the types of arguments to functions as well as the types of properties passed to your components. See the [Flow documentation](https://flow.org/) for details.

`npm run lint` will run the ESLint tool on your code to validate that it conforms to a set of rules for best practices which will help you avoid errors. By default, a slightly modified version of the configuration used by AirBnB is used, but you can change this by editing the .eslintrc.js file in the project. See the [ESLint documentation](https://eslint.org/) for details.
