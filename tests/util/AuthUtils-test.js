import expect from 'expect';
import AuthUtils from 'src/util/AuthUtils';
import ObjectUtils from 'src/util/ObjectUtils';

describe('Test AuthUtils', () => {
  it('Can do Jetty-style obfuscation', () => {
    expect(AuthUtils.obfuscate('SecretPassword123')).toEqual('1fof1j1u1igh1vgt1vn61y101sgo1v1p1ym71v2p1siu1y0q1vnw1vg11idp1iz01fmn'); // eslint-disable-line max-len
  });

  it('Can validate hashed passwords', () => {
    expect(AuthUtils.passwordMatches('', '')).toBeTruthy();
    expect(AuthUtils.passwordMatches('SecretPassword123', 'OBF:1fof1j1u1igh1vgt1vn61y101sgo1v1p1ym71v2p1siu1y0q1vnw1vg11idp1iz01fmn')).toBeTruthy(); // eslint-disable-line max-len
    expect(AuthUtils.passwordMatches('SecretPassword123', 'MD5:512d9845442e46f891bafc22f06b171e')).toBeTruthy(); // eslint-disable-line max-len
  });

  it('Can determine the proper username to display from a user object', () => {
    const user1 = {
      $: {
        name: 'Fred',
        password: 'OBF:1fof1j1u1igh1vgt1vn61y101sgo1v1p1ym71v2p1siu1y0q1vnw1vg11idp1iz01fmn',
        roles: [
          'AIE_ADMIN',
        ],
      },
    };
    const user2 = {
      userId: 'fjohnson',
      firstName: 'Fred',
      lastName: 'Johnson',
      email: 'fjohnson@example.comn',
      fullName: 'Fred Johnson',
    };
    const user3 = {
      userId: 'fjohnson',
      firstName: 'Fred',
      lastName: 'Johnson',
      email: 'fjohnson@example.comn',
      saml: true,
    };
    const user4 = {
      userId: 'fjohnson',
      firstName: 'Fred',
      email: 'fjohnson@example.comn',
      saml: true,
    };
    const user5 = {
      userId: 'fjohnson',
      lastName: 'Johnson',
      email: 'fjohnson@example.comn',
      saml: true,
    };
    const user6 = {
      userId: 'fjohnson',
      email: 'fjohnson@example.comn',
      saml: true,
    };

    expect(AuthUtils.getUserName(user1)).toEqual('Fred');
    expect(AuthUtils.getUserName(user2)).toEqual('Fred Johnson');
    expect(AuthUtils.getUserName(user3)).toEqual('Fred Johnson');
    expect(AuthUtils.getUserName(user4)).toEqual('Fred');
    expect(AuthUtils.getUserName(user5)).toEqual('Johnson');
    expect(AuthUtils.getUserName(user6)).toEqual('fjohnson');
  });

  it('Properly converts non-first-class-citizen objects in the config into Maps', () => {
    expect(AuthUtils.mappify(testConfig)).toEqual(mappifiedConfig);
  });
});

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
