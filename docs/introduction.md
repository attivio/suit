The Attivio Search UI Toolkit allows you to create custom web application for searching your Attivio index.

You can choose to use the out-of-the-box components as is, you can create your own custom components, or anywhere in between, based on what your needs are.

## Compatibility

### Attivio Platform

The Search UI Toolkit will work with version 5.5.1 or greater of the Attivio platform, out of the box. It will also work with version 5.5.0 of the platform, provided a patch has been applied that is at least version 303.

### Web Browsers
The Search UI Toolkit creates applications which should work in all modern browsers. This includes the following desktop browsers:
* Google Chrome, version 50 or higher
* Mozilla Firefox, version XXX or higher
* Apple Safari, version 9 or higher
* Microsoft Internet Explorer, version 11 or higher
* Microsoft Edge, version 38 or higher

Many of the features of the toolkit will also work on mobile devices without much effort.

## Components

The toolkit is built on top of the popular [React UI framework](https://github.com/facebook/react) created by Facebook and used by many popular websites (here’s a [partial list](https://github.com/facebook/react/wiki/sites-using-react)).

The toolkit supplies you with many custom React components that you can put together to create your application, particularly components which allow your users to search the Attivio index and display their results. It also includes, in the separate Search UI repository, templates for search-related pages which can serve as the basis for your own application, either as-is, as templates that you tweak for your own purposes, or as sample code you can use to see how the components work together (in addition to the documentation of the individual components). The Attivio components comprising SUIT are documented in this guide.

In addition to the custom components in the toolkit, the toolkit leverages several additional libraries to provide the functionality your applications need. These include the [React Bootstrap library](https://react-bootstrap.github.io/), the [React Highcharts library](https://github.com/kirjs/react-highcharts), and the [React Mapbox GL library](https://github.com/alex3165/react-mapbox-gl). Since they are already being added as dependencies of SUIT, you can feel free to use them as well, which will help provide a more cohesive look and feel and won't adding much (or any) overhead to your application. Please refer to the documentation for these libraries for details on their components' usage.

## Styling

The toolkit is built using styles based on those developed by Twiter’s Bootstrap project. The CSS styles defined by the Bootstrap project (see [their documentation](http://getbootstrap.com/)) can be used in your custom components by assigning them via the `className` property. Any Attivio-specific CSS styles can also be used in the same way. In addition, since the project uses the LESS compiler to build the CSS for the application, you can change the style sheets globally by editing the variables defined in a few files. These are `<PROJECT_ROOT>/src/style/bootstrap/variables.less` and `<PROJECT_ROOT>/src/style/bootstrap/attivio-variables.less`. See the comments in these files for more details.

Note that for maximum flexibility, the LESS files for the project are contained in the Search UI repository, at the application level, rather than in the SUIT project directly.
