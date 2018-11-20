import expect from 'expect';
import AuthUtils from 'src/util/AuthUtils';
import ObjectUtils from 'src/util/ObjectUtils';

describe('Test AuthUtils', () => {
  it('Properly converts non-first-class-citizen objects in the config into Maps', () => {
    expect(AuthUtils.mappify(testConfig)).toEqual(mappifiedConfig);
  });
  // it('Pulls error message from valid object', () => {
  //   const obj = {
  //     message: 'Bad things happened',
  //   };
  //   expect(Search.getErrorMessage(obj)).toEqual('Bad things happened');
  // });
  // it('Pulls generic error message from bad object', () => {
  //   const obj = {
  //     key: 'value',
  //     otherKey: 'value',
  //   };
  //   expect(Search.getErrorMessage(obj)).toEqual('There was an error executing the query.');
  // });
  
  // configure
  // logout
  // obfuscate
  // passwordMatches
  // findUser
  // login
  // saveLoggedInUser
  // hasPermission
  // isLoggedIn
  // getSavedUser
  // getLoggedInUserInfo
  // getLoggedInUserId
  // getUserName
  // validateUsers
  // validateConfiguration
  // getEntityColors
  // getConfig


const testConfig = {
  ALL: {
    searchEngineType: 'attivio',
    baseUri: '/searchui',
    basename: '/searchui',
    authType: 'SAML',
    loginPage: 'locallogin',
    defaultRealm: 'aie',
    entityFields: {
      people: 'People',
      company: 'Companies',
      location: 'Locations',
      languages: 'Languages',
      date: 'Date',
      keyphrases: 'Key Phrases',
    },
    entityColors: {
      location: '#007dbc',
      company: '#ed7a23',
      people: '#fedd0e',
      product: '#db2e75',
      religion: '#ef8baa',
      jobtitle: '#fcb62c',
      phonenum: '#c32026',
      email: '#a04ba0',
      url: '#767676',
      utm: '#e6e6e6',
      time: '#934900',
      extracteddate: '#d3cba9',
      keyphrase: '#037f70',
      hashtags: '#0caa93',
      mentions: '#38e5cc',
      creditcard: '#1b7735',
      money: '#6fbe44',
      nationality: '#77d5f3',
      distance: '#075484',
      coordinate: '#caeefa',
    },
    fields: [
      '*',
    ],
    title: 'title',
    uri: 'uri',
    table: 'table',
    latitude: 'latitude',
    longitude: 'longitude',
    mimetype: 'mimetype',
    sourcePath: 'sourcepath',
    previewImageUri: 'img.uri.preview',
    thumbnailImageUri: 'img.uri.thumbnail',
    moreLikeThisQuery: 'morelikethisquery',
    teaser: 'SCOPETEASER(text, fragment=true, numFragments=4, fragmentScope=sentence)',
    text: 'SCOPETEASER(text, fragment=true, numFragments=1, fragmentSize=2147483647)',
    mapboxKey: '',
  },
  SearchUIApp: {
    pageTitle: 'Attivio Search UI',
  },
  Masthead: {
    logoUri: 'img/attivio-logo-reverse.png',
    logoAlt: 'Attivio Home',
    homeRoute: '/',
    applicationName: 'Cognitive Search',
  },
  SearchBar: {
    placeholder: 'Search\u2026',
    placeholderAdvanced: 'Enter an advanced query\u2026',
    allowVoice: true,
    allowLanguageSelect: true,
    autoCompleteUri: '/rest/autocompleteApi/richCgi/dictionaryProvider',
  },
  FacetSearchBar: {
    showSearchBar: false,
    placeholder: 'Search values\u2026',
    buttonLabel: 'Search',
    maxValues: 5,
    showExportButton: false,
    exportButtonLabel: 'Export',
  },
  Searcher: {
    searchWorkflow: 'search',
    resultsPerPage: 10,
    facets: [
      'position',
      'keyphrases(maxbuckets=15)',
      'table',
      'tags',
      'company',
      'people',
      'location',
      'date(sortby=VALUE,maxbuckets=60,dateIntervals=auto)',
    ],
    facetFinderCount: 20,
    queryFilter: '',
    locale: '',
    highlightResults: 'all',
    joinRollupMode: 'tree',
    businessCenterProfile: null,
  },
  SearchUILandingPage: {
    logoUri: null,
    logoWidth: null,
    logoHeight: null,
    logoAltText: null,
  },
  SearchUISearchPage: {
    relevancyModels: [
    ],
    pieChartFacets: [
    ],
    barChartFacets: [
    ],
    columnChartFacets: [
    ],
    barListFacets: [
      'sentiment.score',
    ],
    tagCloudFacets: [
      'keyphrases',
    ],
    timeSeriesFacets: [
      'date',
    ],
    sentimentFacets: [
      'sentiment',
    ],
    geoMapFacets: [
      'position',
    ],
    maxFacetBuckets: 15,
    orderHint: [
      'position',
      'keyphrases',
      'date',
      'table',
    ],
    showScores: false,
    debugViewToggle: true,
    sortableFields: [
      'title',
      'table',
      'size',
      'creationdate',
      'date',
      'guid',
      'linkcount',
      'socialsecurity',
      'zipcode',
    ],
  },
  SearchUIInsightsPage: {
    pieChartFacets: [
      'table',
    ],
    barChartFacets: [
    ],
    columnChartFacets: [
    ],
    barListFacets: [
      'sentiment.score',
    ],
    tagCloudFacets: [
      'keyphrases',
    ],
    timeSeriesFacets: [
      'date',
    ],
    sentimentFacets: [
      'sentiment',
    ],
    geoMapFacets: [
      'position',
    ],
    maxFacetBuckets: 15,
  },
  Document360Page: {
    showMoreLikeThisResults: true,
    insightGraphLinkingFields: [
      'people',
      'company',
      'location',
      'author',
      'cc',
      'to',
    ],
    maxLinkedDocs: 3,
    includeAllTables: false,
    nestedMap: {
      hello: 1,
      goodbye: 12,
      fred: [3, 4, 5, 6],
    },
  },
};

const mappifiedConfig = {
  ALL: {
    searchEngineType: 'attivio',
    baseUri: '/searchui',
    basename: '/searchui',
    authType: 'SAML',
    loginPage: 'locallogin',
    defaultRealm: 'aie',
    entityFields: ObjectUtils.toMap({
      people: 'People',
      company: 'Companies',
      location: 'Locations',
      languages: 'Languages',
      date: 'Date',
      keyphrases: 'Key Phrases',
    }),
    entityColors: ObjectUtils.toMap({
      location: '#007dbc',
      company: '#ed7a23',
      people: '#fedd0e',
      product: '#db2e75',
      religion: '#ef8baa',
      jobtitle: '#fcb62c',
      phonenum: '#c32026',
      email: '#a04ba0',
      url: '#767676',
      utm: '#e6e6e6',
      time: '#934900',
      extracteddate: '#d3cba9',
      keyphrase: '#037f70',
      hashtags: '#0caa93',
      mentions: '#38e5cc',
      creditcard: '#1b7735',
      money: '#6fbe44',
      nationality: '#77d5f3',
      distance: '#075484',
      coordinate: '#caeefa',
    }),
    fields: [
      '*',
    ],
    title: 'title',
    uri: 'uri',
    table: 'table',
    latitude: 'latitude',
    longitude: 'longitude',
    mimetype: 'mimetype',
    sourcePath: 'sourcepath',
    previewImageUri: 'img.uri.preview',
    thumbnailImageUri: 'img.uri.thumbnail',
    moreLikeThisQuery: 'morelikethisquery',
    teaser: 'SCOPETEASER(text, fragment=true, numFragments=4, fragmentScope=sentence)',
    text: 'SCOPETEASER(text, fragment=true, numFragments=1, fragmentSize=2147483647)',
    mapboxKey: '',
  },
  SearchUIApp: {
    pageTitle: 'Attivio Search UI',
  },
  Masthead: {
    logoUri: 'img/attivio-logo-reverse.png',
    logoAlt: 'Attivio Home',
    homeRoute: '/',
    applicationName: 'Cognitive Search',
  },
  SearchBar: {
    placeholder: 'Search\u2026',
    placeholderAdvanced: 'Enter an advanced query\u2026',
    allowVoice: true,
    allowLanguageSelect: true,
    autoCompleteUri: '/rest/autocompleteApi/richCgi/dictionaryProvider',
  },
  FacetSearchBar: {
    showSearchBar: false,
    placeholder: 'Search values\u2026',
    buttonLabel: 'Search',
    maxValues: 5,
    showExportButton: false,
    exportButtonLabel: 'Export',
  },
  Searcher: {
    searchWorkflow: 'search',
    resultsPerPage: 10,
    facets: [
      'position',
      'keyphrases(maxbuckets=15)',
      'table',
      'tags',
      'company',
      'people',
      'location',
      'date(sortby=VALUE,maxbuckets=60,dateIntervals=auto)',
    ],
    facetFinderCount: 20,
    queryFilter: '',
    locale: '',
    highlightResults: 'all',
    joinRollupMode: 'tree',
    businessCenterProfile: null,
  },
  SearchUILandingPage: {
    logoUri: null,
    logoWidth: null,
    logoHeight: null,
    logoAltText: null,
  },
  SearchUISearchPage: {
    relevancyModels: [
    ],
    pieChartFacets: [
    ],
    barChartFacets: [
    ],
    columnChartFacets: [
    ],
    barListFacets: [
      'sentiment.score',
    ],
    tagCloudFacets: [
      'keyphrases',
    ],
    timeSeriesFacets: [
      'date',
    ],
    sentimentFacets: [
      'sentiment',
    ],
    geoMapFacets: [
      'position',
    ],
    maxFacetBuckets: 15,
    orderHint: [
      'position',
      'keyphrases',
      'date',
      'table',
    ],
    showScores: false,
    debugViewToggle: true,
    sortableFields: [
      'title',
      'table',
      'size',
      'creationdate',
      'date',
      'guid',
      'linkcount',
      'socialsecurity',
      'zipcode',
    ],
  },
  SearchUIInsightsPage: {
    pieChartFacets: [
      'table',
    ],
    barChartFacets: [
    ],
    columnChartFacets: [
    ],
    barListFacets: [
      'sentiment.score',
    ],
    tagCloudFacets: [
      'keyphrases',
    ],
    timeSeriesFacets: [
      'date',
    ],
    sentimentFacets: [
      'sentiment',
    ],
    geoMapFacets: [
      'position',
    ],
    maxFacetBuckets: 15,
  },
  Document360Page: {
    showMoreLikeThisResults: true,
    insightGraphLinkingFields: [
      'people',
      'company',
      'location',
      'author',
      'cc',
      'to',
    ],
    maxLinkedDocs: 3,
    includeAllTables: false,
    nestedMap: ObjectUtils.toMap({
      hello: 1,
      goodbye: 12,
      fred: [3, 4, 5, 6],
    }),
  },
};
