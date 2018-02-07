The Attivio Search UI Toolkit allows you to create custom web application for searching your Attivio index.

You can choose to use the out-of-the-box components as is, you can create your own custom components, or anywhere in between, based on what your needs are.

## Compatibility

### Attivio Platform

The Search UI Toolkit will work with version 5.5.1 or greater of the Attivio platform, out of the box. It will also work with version 5.5.0 of the platform, provided a patch has been applied that is at least version XXX.

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

The toolkit supplies you with many custom React components that you can put together to create your application, particularly components which allow your users to search the Attivio index and display their results. It also includes templates for search-related pages which can serve as the basis for your own application, either as-is, as templates that you tweak for your own purposes, or as sample code you can use to see how the components work together (in addition to the documentation of the individual components). The Attivio components are all documented in the sections that follow, divided up into functional areas.

In addition to the custom components in the toolkit, the toolkit leverages several additional libraries to provide the functionality your applications need. While these third-party components are documented externally, the way they are used by the toolkit is described here.

## Styling

The toolkit is built using styles based on those developed by Twiter’s Bootstrap project. The CSS styles defined by the Bootstrap (see [their documentation](http://getbootstrap.com/)) can be used in your custom components by assigning them in the components’ `className` property. Any Attivio-specific CSS styles can also be used in the same way. In addition, since the project uses the LESS compiler to build the CSS for the application, you can change the style sheets globally by editing the variables defined in a few files. These are `<PROJECT_ROOT>/src/style/bootstrap/variables.less` and `<PROJECT_ROOT>/src/style/bootstrap/attivio-variables.less`. See the comments in these files for more details.