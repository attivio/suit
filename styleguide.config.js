const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const createNwbWebpackConfig = require('create-nwb-webpack-config'); // eslint-disable-line import/no-extraneous-dependencies
const merge = require('webpack-merge');

// Use the webpack configuration that NWB generate since there's no actual
// file for the style guide to use
const nwbWebpackConfig = createNwbWebpackConfig();
const ourWebpackConfig = {
  node: {
    fs: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
      {
        test: /\.png$/,
        loader: 'url-loader?limit=100000',
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader',
      },
      {
        test: /\.svg$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
      {
        test: /\.xml$/,
        loader: 'xml-loader',
        options: {
          trim: true,
          explicitArray: false,
          explicitRoot: false,
        },
      },
    ],
  },
};

const mergedWebpackConfig = merge(nwbWebpackConfig, ourWebpackConfig);

module.exports = {
  title: 'Attivio SUIT Component Reference',
  verbose: true,
  assetsDir: 'documentation/static',
  template: {
    title: 'Attivio SUIT Style Guide',
    head: {
      meta: [
        {
          'http-equiv': 'Content-type',
          content: 'text/html; charset=utf-8',
        },
        {
          charset: 'utf-8',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0',
        },
      ],
      links: [
        {
          rel: 'stylesheet',
          href: 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.37.0/mapbox-gl.css',
        },
        {
          rel: 'stylesheet',
          href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
        },
      ],
    },
    favicon: 'img/',
  },
  ignore: [], // Add any componets we want to exclude here
  defaultExample: false,
  usageMode: 'expand',
  styleguideDir: 'docs/styleguide',
  editorConfig: {
    theme: 'ambiance', // see http://codemirror.net/demo/theme.html
  },
  styles: {},

  sections: [
    {
      name: 'Introduction',
      content: 'documentation/introduction.md',
    },
    {
      name: 'Components',
      sections: [
        {
          name: 'Search Controls',
          content: 'documentation/searchControls.md',
          components: () => {
            return [
              'src/components/MiniSearchUI.js',
              'src/components/NavbarFilter.js',
              'src/components/NavbarResults.js',
              'src/components/NavbarSearch.js',
              'src/components/NavbarSort.js',
              'src/components/SearchBar.js',
              'src/components/SearchButton.js',
              'src/components/SearchDebugToggle.js',
              'src/components/Searcher.js',
              'src/components/SearchInputField.js',
              'src/components/SearchLanguagePicker.js',
              'src/components/SearchRelevancyModel.js',
              'src/components/SearchResultsPager.js',
              'src/components/SearchResultsPerPage.js',
            ];
          },
        },
        {
          name: 'Search Results — Documents',
          content: 'documentation/searchResultsDocuments.md',
          components: () => {
            return [
              'src/components/DebugSearchResult.js',
              'src/components/DocumentEntityList.js',
              'src/components/DocumentPreview.js',
              'src/components/DocumentThumbnail.js',
              'src/components/DocumentType.js',
              'src/components/ListSearchResult.js',
              'src/components/RelevancyScore.js',
              'src/components/SearchResultBody.js',
              'src/components/SearchResults.js',
              'src/components/SearchResultsCount.js',
              'src/components/SearchResultsEmpty.js',
              'src/components/SearchResultsError.js',
              'src/components/SearchResultsSummary.js',
              'src/components/SearchResultTags.js',
              'src/components/SearchResultTitle.js',
              'src/components/SentimentBar.js',
              'src/components/SimpleSearchResult.js',
              'src/components/SpellCheckMessage.js',
            ];
          },
        },
        {
          name: 'Search Results — Facets',
          content: 'documentation/searchResultsFacets.md',
          components: () => {
            return [
              'src/components/BarChartFacetContents.js',
              'src/components/Facet.js',
              'src/components/FacetInsights.js',
              'src/components/FacetResults.js',
              'src/components/FacetSearchBar.js',
              'src/components/HierarchicalFacetContents.js',
              'src/components/ListWithBarsFacetContents.js',
              'src/components/MapFacetContents.js',
              'src/components/MoreListFacetContents.js',
              'src/components/PieChartFacetContents.js',
              'src/components/SearchResultsFacetFilters.js',
              'src/components/SentimentFacetContents.js',
              'src/components/SentimentTagCloudFacetContents.js',
              'src/components/TagCloudFacetContents.js',
              'src/components/TimeSeriesFacetContents.js',
            ];
          },
        },
        {
          name: 'Search Results — Other',
          content: 'documentation/searchResultsOther.md',
          components: () => {
            return [
              'src/components/Doc360Breadcrumbs.js',
              'src/components/ExpertCard.js',
              'src/components/ExpertDetails.js',
              'src/components/ExpertsHeader.js',
              'src/components/KnowledgeGraphPanel.js',
              'src/components/PlacementResult.js',
              'src/components/PlacementResults.js',
              'src/components/SimilarAuthorCard.js',
              'src/components/SimilarDocuments.js',
            ];
          },
        },
        {
          name: 'Navigation',
          content: 'documentation/navigation.md',
          components: () => {
            return [
              // 'src/components/BigButton.js',
              'src/components/Breadcrumbs.js',
              'src/components/MastheadNavTabs.js',
              'src/components/NavigationButton.js',
              'src/components/NavigationHamburgerMenu.js',
            ];
          },
        },
        {
          name: 'Input',
          content: 'documentation/input.md',
          components: () => {
            return [
              'src/components/CardPicker.js',
              'src/components/CardPickerCard.js',
              'src/components/ConfirmationDialog.js',
              'src/components/DataPairs.js',
              'src/components/DatePicker.js',
              'src/components/DisclosureTriangle.js',
              'src/components/DropdownButton.js',
              'src/components/Masthead.js',
              'src/components/Menu.js',
              'src/components/MiniIconButton.js',
              'src/components/ListEditor.js',
              'src/components/LoginForm.js',
              'src/components/LozengeFilter.js',
              'src/components/NavbarButton.js',
              'src/components/NavbarFilter.js',
              'src/components/NavbarOr.js',
              'src/components/Pager.js',
              'src/components/SimpleAutoCompleteInput.js',
              'src/components/SmallTabs.js',
              'src/components/StarRating.js',
              'src/components/StringListEditor.js',
              'src/components/TimeRangePicker.js',
              'src/components/Toggle.js',
              'src/components/ToggleSwitch.js',
              'src/components/Wizard.js',
              'src/components/WizardSteps.js',
            ];
          },
        },
        {
          name: 'Display',
          content: 'documentation/display.md',
          components: () => {
            return [
              'src/components/Accordion.js',
              'src/components/BusyIndicator.js',
              'src/components/Card.js',
              'src/components/ChartTrends.js',
              'src/components/Code.js',
              'src/components/CollapsiblePanel.js',
              'src/components/DateRangeDisplay.js',
              'src/components/DefaultImage.js',
              'src/components/Details.js',
              'src/components/FormattedDate.js',
              'src/components/GridLayout.js',
              'src/components/Header360.js',
              'src/components/HierarchicalList.js',
              'src/components/IfAllowed.js',
              'src/components/LabeledData.js',
              'src/components/LineBarChart.js',
              'src/components/Masthead.js',
              'src/components/MastheadUser.js',
              'src/components/MasterDetails.js',
              'src/components/MoreList.js',
              'src/components/Navbar.js',
              'src/components/NetworkDiagram.js',
              'src/components/Notifiable.js',
              'src/components/ProfilePhoto.js',
              'src/components/Scrollable.js',
              'src/components/SecondaryNavBar.js',
              'src/components/SeparatedList.js',
              'src/components/SentimentTagCloud.js',
              'src/components/SqlLog.js',
              'src/components/StarRating.js',
              'src/components/Subheader360.js',
              'src/components/SwipeViews.js',
              'src/components/Table.js',
              'src/components/TabPanel.js',
              'src/components/TagCloud.js',
              'src/components/TimeSeries.js',
              'src/components/TrianglePanel.js',
            ];
          },
        },
        {
          name: 'No Examples',
          content: 'documentation/withoutExamples.md',
          components: () => {
            return [
              'src/components/AuthRoute.js',
              'src/components/AutoCompleteInput.js',        
              'src/components/Configuration.js',
              'src/components/Logger.js',
            ];
          },
        },
        {
          name: 'Miscelaneous',
          content: 'documentation/misc.md',
          components: () => {
            return [
              'src/components/ContextHelp.js',
              'src/components/DummySearcher.js',
            ];
          },
        },
      ],
    },
    {
      name: 'Extra',
      content: 'documentation/extra.md',
    },
  ],
  require: [
    path.join(__dirname, 'documentation/style/main.less'),
  ],
  getComponentPathLine(componentPath) {
    const name = path.basename(componentPath, '.js');
    // const dir = path.dirname(componentPath);
    return `import { ${name} } from '@attivio/suit';`;
  },
  getExampleFilename(componentPath) {
    const name = path.basename(componentPath, '.js');
    const mdName = `${name}.md`;
    const dir = path.dirname(componentPath);
    const fullMdPath = path.resolve(dir, '../../documentation/components', mdName);
    return fullMdPath;
  },
  webpackConfig: mergedWebpackConfig,
};
