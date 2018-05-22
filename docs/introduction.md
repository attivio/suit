This style guide shows ways you might use the components in the Attivio
Search UI Toolkit when developing your own applications. The components
are divided into groups based on their functionality (some components may
appear in multiple groups). You can use the "filter" box in the top-left
corner of the page to find specific components easily.

This page (which is built using the cool tool [react-styleguidist](https://github.com/styleguidist/react-styleguidist))
allows you to see and, to some extent, interact with the components in the library.

For each component, you can see:
* An example of how you would import it into your application's pages or other
componenets (clicking the icon next to the import statement will copy it to the clipboard).
* A description of the component (from the source code) explaining what it is
designed to do and how you might use it.
* A list of the properties of the component, their types, and descriptions. (Note that
due to an iussue in the react-docgen library used by react-styleguidist, all properties
show up in the list as "required" although many are, in fact, optional. See the comments
for a property: if it is described as being optional or having a default value then
it can be omitted.
* One or more examples of the component being used. Each of which includes:
    * A brief description of the example, as necessary.
    * The rendered version of the example component.
    * A "View Code" link that you can click to see the JSX code used to renders the example.
    * Note that you can even edit the code for the example and see the results of your changes in real time.

## Additional Components Available

SUIT makes use of several 3rd-party libraries which are, therefore, also avaialble to your
applications without needing to add any special dependencies. These include the
[React Bootstrap library](https://react-bootstrap.github.io/), the
[React Highcharts library](https://github.com/kirjs/react-highcharts), and the
[React Mapbox GL library](https://github.com/alex3165/react-mapbox-gl).
Using these will help provide a more cohesive look and feel and won't adding much (or any)
overhead to your application. Please refer to the documentation for these libraries for
details on their components' usage.

> One thing to note about the Mapbox library is that you'll need to include a license
> key when configuring your application for it to work. See the Search UI documentation
> for details on providing the key.

## Styling

The toolkit is built using styles based on those developed by Twiter’s Bootstrap project. The CSS styles defined by the Bootstrap project (see [their documentation](http://getbootstrap.com/)) can be used in your custom components by assigning them via the `className` property. Any Attivio-specific CSS styles can also be used in the same way. In addition, since the project uses the LESS compiler to build the CSS for the application, you can change the style sheets globally by editing the variables defined in a few files. These are `<PROJECT_ROOT>/src/style/bootstrap/variables.less` and `<PROJECT_ROOT>/src/style/bootstrap/attivio-variables.less`. See the comments in these files for more details.

Note that for maximum flexibility, the LESS files for the project are contained in the Search UI repository, at the application level, rather than in the SUIT project directly. To change the styles for your application, you should edit them in your clone of that repository.
