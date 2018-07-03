const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader'],
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
        }),
      },

    ],
  },
};

const mergedWebpackConfig = merge(nwbWebpackConfig, ourWebpackConfig);

module.exports = {
  title: 'Attivio SUIT Component Reference',
  verbose: true,
  assetsDir: 'docs/static',
  template: 'docs/template.ejs',
  ignore: [], // Add any componets we want to exclude here
  defaultExample: false,
  showUsage: true,
  styleguideDir: 'styleguide',
  editorConfig: {
    theme: 'ambiance', // see http://codemirror.net/demo/theme.html
  },
  styles: {},

  sections: [
    {
      name: 'Introduction',
      content: 'docs/introduction.md',
    },
    {
      name: 'Components',
      sections: [
        {
          name: 'Search Controls',
          content: 'docs/searchControls.md',
          components: () => {
            return [
              'src/components/MiniSearchUI.js',
              'src/components/NavbarFilter.js',
              'src/components/NavbarSearch.js',
              'src/components/SearchBar.js',
              'src/components/SearchDebugToggle.js',
              'src/components/Searcher.js',
              'src/components/SearchInputField.js',
              'src/components/SearchLanguagePicker.js',
              'src/components/SearchResultsPager.js',
              'src/components/SearchResultsPerPage.js',
            ];
          },
        },
        {
          name: 'Search Results — Documents',
          content: 'docs/searchResultsDocuments.md',
          components: () => {
            return [
              'src/components/DataPairs.js',
              'src/components/DocumentEntityList.js',
              'src/components/DocumentPreview.js',
              'src/components/DocumentThumbnail.js',
              'src/components/DocumentType.js',
              'src/components/RelevancyScore.js',
              'src/components/SearchResult.js',
              'src/components/SearchResultBody.js',
              'src/components/SearchResults.js',
              'src/components/SearchResultsCount.js',
              'src/components/SearchResultsEmpty.js',
              'src/components/SearchResultsError.js',
              'src/components/SearchResultsSummary.js',
              'src/components/SearchResultTags.js',
              'src/components/SearchResultTitle.js',
              'src/components/SentimentBar.js',
              'src/components/SpellCheckMessage.js',
            ];
          },
        },
        {
          name: 'Search Results — Facets',
          content: 'docs/searchResultsFacets.md',
          components: () => {
            return [
              'src/components/BarChartFacetContents.js',
              'src/components/Facet.js',
              'src/components/FacetInsights.js',
              'src/components/FacetResults.js',
              'src/components/ListWithBarsFacetContents.js',
              'src/components/MapFacetContents.js',
              'src/components/MoreListFacetContents.js',
              'src/components/PieChartFacetContents.js',
              'src/components/SearchResultsFacetFilters.js',
              'src/components/SentimentFacetContents.js',
              'src/components/TagCloudFacetContents.js',
              'src/components/TimeSeriesFacetContents.js',
            ];
          },
        },
        {
          name: 'Search Results — Other',
          content: 'docs/searchResultsOther.md',
          components: () => {
            return [
              'src/components/Doc360Breadcrumbs.js',
              'src/components/ExpertCard.js',
              'src/components/ExpertDetails.js',
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
          content: 'docs/navigation.md',
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
          content: 'docs/input.md',
          components: () => {
            return [
              'src/components/CardPicker.js',
              'src/components/CardPickerCard.js',
              'src/components/DataPairs.js',
              'src/components/DatePicker.js',
              'src/components/DropdownButton.js',
              'src/components/Masthead.js',
              'src/components/Menu.js',
              'src/components/ListEditor.js',
              'src/components/LoginForm.js',
              'src/components/NavbarButton.js',
              'src/components/NavbarFilter.js',
              'src/components/NavbarOr.js',
              'src/components/NavbarPager.js',
              'src/components/SmallTabs.js',
              'src/components/StarRating.js',
              'src/components/StringListEditor.js',
              'src/components/Toggle.js',
              'src/components/ToggleSwitch.js',
              'src/components/Wizard.js',
              'src/components/WizardSteps.js',
            ];
          },
        },
        {
          name: 'Display',
          content: 'docs/display.md',
          components: () => {
            return [
              'src/components/Accordion.js',
              'src/components/Card.js',
              'src/components/ChartTrends.js',
              'src/components/Code.js',
              'src/components/CollapsiblePanel.js',
              'src/components/DefaultImage.js',
              'src/components/FormattedDate.js',
              'src/components/GridLayout.js',
              'src/components/Header360.js',
              'src/components/LabeledData.js',
              'src/components/Masthead.js',
              'src/components/MastheadUser.js',
              'src/components/MoreList.js',
              'src/components/Navbar.js',
              'src/components/NetworkDiagram.js',
              'src/components/ProfilePhoto.js',
              'src/components/Scrollable.js',
              'src/components/SecondaryNavBar.js',
              'src/components/SeparatedList.js',
              'src/components/SqlLog.js',
              'src/components/StarRating.js',
              'src/components/Subheader360.js',
              'src/components/TabPanel.js',
              'src/components/TagCloud.js',
              'src/components/TimeSeries.js',
            ];
          },
        },
        {
          name: 'No Examples',
          content: 'docs/withoutExamples.md',
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
          content: 'docs/misc.md',
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
      content: 'docs/extra.md',
    },
  ],
  require: [
    path.join(__dirname, 'docs/style/main.less'),
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
    const fullMdPath = path.resolve(dir, '../../docs/components', mdName);
    return fullMdPath;
  },
  webpackConfig: mergedWebpackConfig,
};
