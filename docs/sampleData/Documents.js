// @flow
import SearchDocument from '../../src/api/SearchDocument';

// We don't need to lint the JSON data...
/* eslint-disable quote-props,comma-dangle,quotes,max-len */
const documentsJson =
  [
    {
      "fields": {
        ".score": [
          0.99652886
        ],
        ".id": [
          "http://www.bbc.co.uk/news/world-us-canada-40745235"
        ],
        ".zone": [
          "default"
        ],
        "title": [
          "Trade zone North America"
        ],
        "teaser": [
          "In August, Canada, the US and Mexico will sit down to begin to renegotiate Nafta."
        ],
        "language": [
          "English"
        ],
        "languages": [
          "English"
        ],
        "uri": [
          "http://www.bbc.co.uk/news/world-us-canada-40745235"
        ],
        "size": [
          480
        ],
        "table": [
          "news"
        ],
        "date": [
          "2017-08-14T16:03:48.000-0400"
        ],
        "tags": [
          "Foo"
        ],
        "text": [
          "In August, Canada, the US and Mexico will sit down to begin to renegotiate Nafta."
        ],
        "sourcepath": [
          "/home/lvaldez/dev/attivio/aie_5.5.1/conf/factbook/content/news.csv"
        ],
        "filename": [
          "news.csv"
        ],
        "parentid": [
          "news-NEWS-http://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml"
        ],
        "ancestorids": [
          "news-NEWS-http://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml"
        ],
        "source_s": [
          "BBC"
        ],
        "processing.feedback.level": [
          "WARN"
        ],
        "processing.feedback.message": [
          "Received 2 values for single value field table: news, news"
        ],
        "processing.feedback.component": [
          "index.writer"
        ],
        "processing.feedback.code": [
          "INDEX_ENGINE-36"
        ],
        "country": [
          "Canada"
        ],
        "sentiment": [
          "neg"
        ],
        "sentiment.score": [
          0.89892125
        ],
        "security.read": [
          "anonymous:anonymous"
        ]
      },
      "signal": {
        "principal": "Anonymous:Administrator:Administrator",
        "docId": "http://www.bbc.co.uk/news/world-us-canada-40745235",
        "docOrdinal": 1,
        "featureVector": "table_news=1.0,freshness=0.28346974,title=0.0584691,content=0.38349086",
        "query": "America",
        "locale": "en",
        "relevancyModelName": "default",
        "relevancyModelVersion": 0,
        "relevancyModelNames": [
          "default"
        ],
        "queryTimestamp": 1505504165774,
        "signalTimestamp": 1505504165832,
        "type": "click",
        "weight": 1.0,
        "ttl": true
      }
    },
    {
      "fields": {
        ".score": [
          0.3471789
        ],
        ".id": [
          "country-/home/lvaldez/dev/attivio/aie_5.5.1/conf/factbook/content/countries/ho.xml"
        ],
        ".zone": [
          "default"
        ],
        "title": [
          "Honduras"
        ],
        "teaser": [
          "Once part of Spain's vast empire in the New World, Honduras became an independent nation in 1821. After two and a half decades of mostly military rule, a freely elected civilian government came to power in 1982. During the 1980s, Honduras proved a haven for anti-Sandinista contras fighting the Marxist Nicaraguan Government and an ally to Salvadoran Government forces fighting leftist guerrillas. the country was devastated by Hurricane Mitch in 1998, which killed about 5,600 people and caused approximately $2 billion in damage."
        ],
        "language": [
          "English"
        ],
        "languages": [
          "English"
        ],
        "uri": [
          "https://www.cia.gov/library/publications/the-world-factbook/geos/ho.html"
        ],
        "size": [
          4647
        ],
        "table": [
          "country"
        ],
        "date": [
          "2017-08-14T16:03:48.000-0400"
        ],
        "text": [
          "Once part of Spain's vast empire in the New World, Honduras became an independent nation in 1821. After two and a half decades of mostly military rule, a freely elected civilian government came to power in 1982. During the 1980s, Honduras proved a haven for anti-Sandinista contras fighting the Marxist Nicaraguan Government and an ally to Salvadoran Government forces fighting leftist guerrillas. the country was devastated by Hurricane Mitch in 1998, which killed about 5,600 people and caused approximately $2 billion in damage."
        ],
        "position": [
          {
            "x": -86.5,
            "y": 15.0,
            "longitude": -86.5,
            "latitude": 15.0
          }
        ],
        "latitude": [
          15.0
        ],
        "longitude": [
          -86.5
        ],
        "sourcepath": [
          "/home/lvaldez/dev/attivio/aie_5.5.1/conf/factbook/content/countries/ho.xml"
        ],
        "filename": [
          "ho.xml"
        ],
        "people": [
          "Mitch"
        ],
        "location": [
          "Central America, Bordering the Caribbean Sea, Between Guatemala and Nicaragua and Bordering the Gulf Of Fonseca (North Pacific Ocean), Between El Salvador and Nicaragua",
          "Honduras",
          "Spain",
          "New World, Honduras",
          "Central America",
          "Western Hemisphere",
          "US"
        ],
        "company": [
          "Sandinista",
          "Central America Free Trade Agreement",
          "CAFTA",
          "Indebted Poor Countries",
          "HIPC"
        ],
        "nationality": [
          "Nicaraguan",
          "Salvadoran"
        ],
        "religion": [
          "Roman Catholic",
          "Protestant"
        ],
        "time": [
          "a half decades"
        ],
        "numbers": [
          "1821",
          "two",
          "1982",
          "1998",
          "5,600",
          "2 billion",
          "second",
          "one",
          "three"
        ],
        "img.uri.thumbnail": [
          "/factbook_resources/flags/ho-flag.gif"
        ],
        "img.uri.preview": [
          "/factbook_resources/maps/ho-map.gif"
        ],
        "morelikethisquery": [
          "OR(\"honduras\",\"government\",\"economy\",\"fighting\",\"america\",\"countries\",\"poorest\",\"country\",\"growing\",\"exports\",\"central\",\"heavily\",\"trade\",\"equivalent\",\"half\",\"contras\",\"nation\",\"salvadoran\",\"companies\",\"collections\",\"central america\",\"growing remittance\",\"relies heavily\",\"trade agreement\",\"half decades\",\"natural disasters\",\"state energy\",\"poorest country\",\"commodity prices\",\"hurricane mitch\",\"independent nation\",\"growth remains\",\"extraordinarily unequal\",\"military rule\",\"remains dependent\",\"fiscal deficit\",\"marxist nicaraguan\",\"debt relief\",\"massive unemployment\",\"freely elected\",minimum=13)"
        ],
        "processing.feedback.level": [
          "ERROR"
        ],
        "processing.feedback.message": [
          "Uncaught exception processing document"
        ],
        "processing.feedback.component": [
          "indexer.applyTriggers"
        ],
        "processing.feedback.code": [
          "TRIGGER-9"
        ],
        "country": [
          "Honduras"
        ],
        "economy": [
          "Honduras, the second poorest country in Central America and one of the poorest countries in the Western Hemisphere, with an extraordinarily unequal distribution of income and massive unemployment, is banking on expanded trade under the US-Central America Free Trade Agreement (CAFTA) and on debt relief under the Heavily Indebted Poor Countries (HIPC) initiative. Despite improvements in tax collections, the government's fiscal deficit is growing due to increases in current expenditures and financial losses from the state energy and telephone companies. Honduras is the fastest growing remittance destination in the region with inflows representing over a quarter of GDP, equivalent to nearly three-quarters of exports. the economy relies heavily on a narrow range of exports, notably bananas and coffee, making it vulnerable to natural disasters and shifts in commodity prices, however, investments in the maquila and non-traditional export sectors are slowly diversifying the economy. Growth remains dependent on the economy of the US, its largest trading partner, and on reduction of the high crime rate, as a means of attracting and maintaining investment."
        ],
        "map": [
          "Central America and the Caribbean"
        ],
        "climate": [
          "Subtropical in Lowlands, Temperate in Mountains"
        ],
        "terrain": [
          "Mostly Mountains in Interior, Narrow Coastal Plains"
        ],
        "resource": [
          "Timber",
          "Gold",
          "Silver",
          "Copper",
          "Lead",
          "Zinc",
          "Iron Ore",
          "Antimony",
          "Coal",
          "Fish",
          "Hydropower"
        ],
        "spokenLanguage": [
          "Spanish",
          "Amerindian Dialects"
        ],
        "ethnicity": [
          "Mestizo",
          "Amerindian",
          "Black",
          "White"
        ],
        "agriprod": [
          "Bananas",
          "Coffee",
          "Citrus",
          "Beef",
          "Timber",
          "Shrimp",
          "Tilapia",
          "Lobster",
          "Corn",
          "African Palm"
        ],
        "industry": [
          "Sugar",
          "Coffee",
          "Textiles",
          "Clothing",
          "Wood Products"
        ],
        "laborForce": [
          2812000
        ],
        "unemploymentRate": [
          27.8
        ],
        "inflationRate": [
          6.4
        ],
        "publicDebt": [
          29.3
        ],
        "gdp.purchasePowerParity": [
          2.46899999E10
        ],
        "gdp.officialExchangeRate": [
          1.00600003E10
        ],
        "gdp.growthRate": [
          6.0
        ],
        "gdp.growthRatePerCapita": [
          3300.0
        ],
        "keyphrases": [
          "Central America"
        ],
        "sentiment": [
          "pos"
        ],
        "sentiment.score": [
          1.0
        ],
        "entity.sentiment.pos": [
          "1982",
          "New World, Honduras",
          "Us"
        ],
        "entity.sentiment.pos.score": [
          0.5863142,
          0.6131362,
          1.1482245
        ],
        "sonar.run.number": [
          1505503566080
        ],
        "sonar.create.date": [
          "2017-09-15T15:26:20.000-0400"
        ],
        "sonar.update.date": [
          "2017-09-15T15:26:20.000-0400"
        ],
        "sonar.content": [
          "Honduras",
          "Once part of Spain's vast empire in the New World, Honduras became an independent nation in 1821. After two and a half decades of mostly military rule, a freely elected civilian government came to power in 1982. During the 1980s, Honduras proved a haven for anti-Sandinista contras fighting the Marxist Nicaraguan Government and an ally to Salvadoran Government forces fighting leftist guerrillas. the country was devastated by Hurricane Mitch in 1998, which killed about 5,600 people and caused approximately $2 billion in damage.",
          "Mitch",
          "Central America, Bordering the Caribbean Sea, Between Guatemala and Nicaragua and Bordering the Gulf Of Fonseca (North Pacific Ocean), Between El Salvador and Nicaragua",
          "Honduras",
          "Spain",
          "New World, Honduras",
          "Central America",
          "Western Hemisphere",
          "US",
          "Sandinista",
          "Central America Free Trade Agreement",
          "CAFTA",
          "Indebted Poor Countries",
          "HIPC"
        ],
        "security.read": [
          "anonymous:anonymous"
        ]
      },
      "signal": {
        "principal": "Anonymous:Administrator:Administrator",
        "docId": "country-/home/lvaldez/dev/attivio/aie_5.5.1/conf/factbook/content/countries/ho.xml",
        "docOrdinal": 2,
        "featureVector": "table_country=1.0,freshness=0.28346974,content=0.31883192",
        "query": "America",
        "locale": "en",
        "relevancyModelName": "default",
        "relevancyModelVersion": 0,
        "relevancyModelNames": [
          "default"
        ],
        "queryTimestamp": 1505504165774,
        "signalTimestamp": 1505504165832,
        "type": "click",
        "weight": 1.0,
        "ttl": true
      }
    },
    {
      "fields": {
        ".score": [
          0.32236373
        ],
        ".id": [
          "country-/home/lvaldez/dev/attivio/aie_5.5.1/conf/factbook/content/countries/cj.xml"
        ],
        ".zone": [
          "default"
        ],
        "title": [
          "Cayman Islands"
        ],
        "teaser": [
          "The Cayman Islands were colonized from Jamaica by the British during the 18th and 19th centuries, and were administered by Jamaica after 1863. in 1959, the islands became a territory within the Federation of the West Indies, but when the Federation dissolved in 1962, the Cayman Islands chose to remain a British dependency."
        ],
        "language": [
          "English"
        ],
        "languages": [
          "English"
        ],
        "uri": [
          "https://www.cia.gov/library/publications/the-world-factbook/geos/cj.html"
        ],
        "size": [
          3709
        ],
        "table": [
          "country"
        ],
        "date": [
          "2017-08-14T16:03:48.000-0400"
        ],
        "text": [
          "The Cayman Islands were colonized from Jamaica by the British during the 18th and 19th centuries, and were administered by Jamaica after 1863. in 1959, the islands became a territory within the Federation of the West Indies, but when the Federation dissolved in 1962, the Cayman Islands chose to remain a British dependency."
        ],
        "position": [
          {
            "x": -80.5,
            "y": 19.5,
            "longitude": -80.5,
            "latitude": 19.5
          }
        ],
        "latitude": [
          19.5
        ],
        "longitude": [
          -80.5
        ],
        "sourcepath": [
          "/home/lvaldez/dev/attivio/aie_5.5.1/conf/factbook/content/countries/cj.xml"
        ],
        "filename": [
          "cj.xml"
        ],
        "location": [
          "Caribbean, Three Island (Grand Cayman, Cayman Brac, Little Cayman) Group in Caribbean Sea, 240 Km South Of Cuba and 268 Km Northwest Of Jamaica",
          "Cayman Islands",
          "Jamaica",
          "West Indies",
          "North America",
          "US"
        ],
        "company": [
          "Federation",
          "Caymanians"
        ],
        "nationality": [
          "British"
        ],
        "religion": [
          "United Church",
          "Anglican",
          "Baptist",
          "Church Of God",
          "Other Protestant",
          "Roman Catholic"
        ],
        "numbers": [
          "1863",
          "1959",
          "1962",
          "68,000",
          "2003",
          "500",
          "800",
          "5,000",
          "1997",
          "70",
          "75",
          "2.1 million",
          "90",
          "one"
        ],
        "img.uri.thumbnail": [
          "/factbook_resources/flags/cj-flag.gif"
        ],
        "img.uri.preview": [
          "/factbook_resources/maps/cj-map.gif"
        ],
        "morelikethisquery": [
          "OR(\"islands\",\"cayman\",\"british\",\"jamaica\",\"highest\",\"tourist\",\"federation\",\"outputs\",\"half\",\"goods\",\"registered\",\"accounting\",\"colonized\",\"america\",\"companies\",\"west\",\"funds\",\"administered\",\"dissolved\",\"stock\",\"cayman islands\",\"foreign currency\",\"federation dissolved\",\"british dependency\",\"west indies\",\"caymanians enjoy\",\"arrivals exceeded\",\"currency earnings\",\"north america\",\"highest standards\",\"financial center\",\"total tourist\",\"tourist arrivals\",\"luxury market\",\"tourist industry\",\"highest outputs\",\"islands chose\",\"direct taxation\",\"mutual funds\",\"offshore financial\",minimum=13)"
        ],
        "processing.feedback.level": [
          "ERROR"
        ],
        "processing.feedback.message": [
          "Uncaught exception processing document"
        ],
        "processing.feedback.component": [
          "indexer.applyTriggers"
        ],
        "processing.feedback.code": [
          "TRIGGER-9"
        ],
        "country": [
          "Cayman Islands"
        ],
        "economy": [
          "With no direct taxation, the islands are a thriving offshore financial center. More than 68,000 companies were registered in the Cayman Islands as of 2003, including almost 500 banks, 800 insurers, and 5,000 mutual funds. a stock exchange was opened in 1997. Tourism is also a mainstay, accounting for about 70% of GDP and 75% of foreign currency earnings. the tourist industry is aimed at the luxury market and caters mainly to visitors from North America. Total tourist arrivals exceeded 2.1 million in 2003, with about half from the US. About 90% of the islands' food and consumer goods must be imported. the Caymanians enjoy one of the highest outputs per capita and one of the highest standards of living in the world."
        ],
        "map": [
          "Central America and the Caribbean"
        ],
        "climate": [
          "Tropical Marine",
          "Warm, Rainy Summers (May To October) and Cool, Relatively Dry Winters (November To April)"
        ],
        "terrain": [
          "Low-Lying Limestone Base Surrounded By Coral Reefs"
        ],
        "resource": [
          "Fish",
          "Climate and Beaches That Foster Tourism"
        ],
        "spokenLanguage": [
          "English"
        ],
        "ethnicity": [
          "Mixed",
          "White",
          "Black",
          "Expatriates Of Various Ethnic Groups"
        ],
        "agriprod": [
          "Vegetables",
          "Fruit",
          "Livestock",
          "Turtle Farming"
        ],
        "industry": [
          "Tourism",
          "Banking",
          "Insurance and Finance",
          "Construction",
          "Construction Materials",
          "Furniture"
        ],
        "laborForce": [
          23450
        ],
        "unemploymentRate": [
          4.4
        ],
        "inflationRate": [
          4.4
        ],
        "gdp.purchasePowerParity": [
          1.93900006E9
        ],
        "gdp.growthRate": [
          0.9
        ],
        "gdp.growthRatePerCapita": [
          43800.0
        ],
        "keyphrases": [
          "Cayman Islands"
        ],
        "sentiment": [
          "pos"
        ],
        "sentiment.score": [
          1.0
        ],
        "entity.sentiment.pos": [
          "Caymanians",
          "One"
        ],
        "entity.sentiment.pos.score": [
          0.5510329,
          0.73328227
        ],
        "sonar.run.number": [
          1505503566080
        ],
        "sonar.create.date": [
          "2017-09-15T15:26:19.000-0400"
        ],
        "sonar.update.date": [
          "2017-09-15T15:26:19.000-0400"
        ],
        "sonar.content": [
          "Cayman Islands",
          "The Cayman Islands were colonized from Jamaica by the British during the 18th and 19th centuries, and were administered by Jamaica after 1863. in 1959, the islands became a territory within the Federation of the West Indies, but when the Federation dissolved in 1962, the Cayman Islands chose to remain a British dependency.",
          "Caribbean, Three Island (Grand Cayman, Cayman Brac, Little Cayman) Group in Caribbean Sea, 240 Km South Of Cuba and 268 Km Northwest Of Jamaica",
          "Cayman Islands",
          "Jamaica",
          "West Indies",
          "North America",
          "US",
          "Federation",
          "Caymanians"
        ],
        "security.read": [
          "anonymous:anonymous"
        ]
      },
      "signal": {
        "principal": "Anonymous:Administrator:Administrator",
        "docId": "country-/home/lvaldez/dev/attivio/aie_5.5.1/conf/factbook/content/countries/cj.xml",
        "docOrdinal": 3,
        "featureVector": "table_country=1.0,freshness=0.28346974,content=0.29401675",
        "query": "America",
        "locale": "en",
        "relevancyModelName": "default",
        "relevancyModelVersion": 0,
        "relevancyModelNames": [
          "default"
        ],
        "queryTimestamp": 1505504165774,
        "signalTimestamp": 1505504165832,
        "type": "click",
        "weight": 1.0,
        "ttl": true
      }
    },
    {
      "fields": {
        ".score": [
          0.30886945
        ],
        ".id": [
          "country-/home/lvaldez/dev/attivio/aie_5.5.1/conf/factbook/content/countries/es.xml"
        ],
        ".zone": [
          "default"
        ],
        "title": [
          "El Salvador"
        ],
        "teaser": [
          "El Salvador achieved independence from Spain in 1821 and from the Central American Federation in 1839. a 12-year civil war, which cost about 75,000 lives, was brought to a close in 1992 when the government and leftist rebels signed a treaty that provided for military and political reforms."
        ],
        "language": [
          "English"
        ],
        "languages": [
          "English"
        ],
        "uri": [
          "https://www.cia.gov/library/publications/the-world-factbook/geos/es.html"
        ],
        "size": [
          4715
        ],
        "table": [
          "country"
        ],
        "date": [
          "2017-08-14T16:03:48.000-0400"
        ],
        "text": [
          "El Salvador achieved independence from Spain in 1821 and from the Central American Federation in 1839. a 12-year civil war, which cost about 75,000 lives, was brought to a close in 1992 when the government and leftist rebels signed a treaty that provided for military and political reforms."
        ],
        "position": [
          {
            "x": -88.91666666666667,
            "y": 13.833333333333334,
            "longitude": -88.91666666666667,
            "latitude": 13.833333333333334
          }
        ],
        "latitude": [
          13.833333333333334
        ],
        "longitude": [
          -88.91666666666667
        ],
        "sourcepath": [
          "/home/lvaldez/dev/attivio/aie_5.5.1/conf/factbook/content/countries/es.xml"
        ],
        "filename": [
          "es.xml"
        ],
        "location": [
          "Central America, Bordering the North Pacific Ocean, Between Guatemala and Honduras",
          "El Salvador",
          "Spain",
          "Central America, El Salvador",
          "Central America",
          "US"
        ],
        "company": [
          "Central American Federation",
          "Dominican Republic Free Trade Agreement",
          "CAFTA",
          "Millennium Challenge Corporation"
        ],
        "religion": [
          "Roman Catholic",
          "Other"
        ],
        "time": [
          "12-year",
          "five-year"
        ],
        "numbers": [
          "1821",
          "1839",
          "75,000",
          "1992",
          "third",
          "2006",
          "first",
          "2001",
          "461 million"
        ],
        "img.uri.thumbnail": [
          "/factbook_resources/flags/es-flag.gif"
        ],
        "img.uri.preview": [
          "/factbook_resources/maps/es-map.gif"
        ],
        "morelikethisquery": [
          "OR(\"salvador\",\"government\",\"central\",\"trade\",\"growth\",\"year\",\"america\",\"signed\",\"economy\",\"policy\",\"services\",\"economic\",\"country\",\"remittances\",\"export\",\"offset\",\"region\",\"exports\",\"equivalent\",\"disciplined\",\"central america\",\"trade deficit\",\"fiscal policy\",\"salvador leads\",\"disciplined fiscal\",\"export income\",\"trade agreement\",\"recent years\",\"dominican republic\",\"achieved independence\",\"lost control\",\"million compact\",\"enterprise development\",\"challenge corporation\",\"civil war\",\"largest economy\",\"promoting textile\",\"traditional exports\",\"oil prices\",\"year civil\",minimum=13)"
        ],
        "processing.feedback.level": [
          "ERROR"
        ],
        "processing.feedback.message": [
          "Uncaught exception processing document"
        ],
        "processing.feedback.component": [
          "indexer.applyTriggers"
        ],
        "processing.feedback.code": [
          "TRIGGER-9"
        ],
        "country": [
          "El Salvador"
        ],
        "economy": [
          "The smallest country in Central America, El Salvador has the third largest economy, but growth has been modest in recent years. Robust growth in non-traditional exports have offset declines in the maquila exports, while remittances and external aid offset the trade deficit from high oil prices and strong import demand for consumer and intermediate goods. El Salvador leads the region in remittances per capita with inflows equivalent to nearly all export income. Implementation in 2006 of the Central America-Dominican Republic Free Trade Agreement (CAFTA), which El Salvador was the first to ratify, has strengthened an already positive export trend. With the adoption of the US dollar as its currency in 2001, El Salvador lost control over monetary policy and must concentrate on maintaining a disciplined fiscal policy. the current government has pursued economic diversification, with some success in promoting textile production, international port services, and tourism through tax incentives. It is committed to opening the economy to trade and investment, and has embarked on a wave of privatizations extending to telecom, electricity distribution, banking, and pension funds. in late 2006, the government and the Millennium Challenge Corporation signed a five-year, $461 million compact to stimulate economic growth and reduce poverty in the country's northern region through investments in education, public services, enterprise development, and transportation infrastructure."
        ],
        "map": [
          "Central America and the Caribbean"
        ],
        "climate": [
          "Tropical",
          "Rainy Season (May To October)",
          "Dry Season (November To April)",
          "Tropical On Coast",
          "Temperate in Uplands"
        ],
        "terrain": [
          "Mostly Mountains With Narrow Coastal Belt and Central Plateau"
        ],
        "resource": [
          "Hydropower",
          "Geothermal Power",
          "Petroleum",
          "Arable Land"
        ],
        "spokenLanguage": [
          "Spanish",
          "Nahua"
        ],
        "ethnicity": [
          "Mestizo",
          "White",
          "Amerindian"
        ],
        "agriprod": [
          "Coffee",
          "Sugar",
          "Corn",
          "Rice",
          "Beans",
          "Oilseed",
          "Cotton",
          "Sorghum",
          "Beef",
          "Dairy Products",
          "Shrimp"
        ],
        "industry": [
          "Food Processing",
          "Beverages",
          "Petroleum",
          "Chemicals",
          "Fertilizer",
          "Textiles",
          "Furniture",
          "Light Metals"
        ],
        "laborForce": [
          2870000
        ],
        "unemploymentRate": [
          6.6
        ],
        "inflationRate": [
          4.9
        ],
        "publicDebt": [
          37.9
        ],
        "gdp.purchasePowerParity": [
          3.5969999E10
        ],
        "gdp.officialExchangeRate": [
          2.02300006E10
        ],
        "gdp.growthRate": [
          4.7
        ],
        "gdp.growthRatePerCapita": [
          5200.0
        ],
        "keyphrases": [
          "Central America"
        ],
        "sentiment": [
          "pos"
        ],
        "sentiment.score": [
          1.0
        ],
        "entity.sentiment.pos": [
          "1992",
          "12-Year"
        ],
        "entity.sentiment.pos.score": [
          0.7101191,
          0.7714821
        ],
        "entity.sentiment.neg": [
          "El Salvador"
        ],
        "entity.sentiment.neg.score": [
          0.73270184
        ],
        "sonar.run.number": [
          1505503566080
        ],
        "sonar.create.date": [
          "2017-09-15T15:26:19.000-0400"
        ],
        "sonar.update.date": [
          "2017-09-15T15:26:19.000-0400"
        ],
        "sonar.content": [
          "El Salvador",
          "El Salvador achieved independence from Spain in 1821 and from the Central American Federation in 1839. a 12-year civil war, which cost about 75,000 lives, was brought to a close in 1992 when the government and leftist rebels signed a treaty that provided for military and political reforms.",
          "Central America, Bordering the North Pacific Ocean, Between Guatemala and Honduras",
          "El Salvador",
          "Spain",
          "Central America, El Salvador",
          "Central America",
          "US",
          "Central American Federation",
          "Dominican Republic Free Trade Agreement",
          "CAFTA",
          "Millennium Challenge Corporation"
        ],
        "security.read": [
          "anonymous:anonymous"
        ]
      },
      "signal": {
        "principal": "Anonymous:Administrator:Administrator",
        "docId": "country-/home/lvaldez/dev/attivio/aie_5.5.1/conf/factbook/content/countries/es.xml",
        "docOrdinal": 4,
        "featureVector": "table_country=1.0,freshness=0.28346974,content=0.28052247",
        "query": "America",
        "locale": "en",
        "relevancyModelName": "default",
        "relevancyModelVersion": 0,
        "relevancyModelNames": [
          "default"
        ],
        "queryTimestamp": 1505504165774,
        "signalTimestamp": 1505504165832,
        "type": "click",
        "weight": 1.0,
        "ttl": true
      }
    },
    {
      "fields": {
        ".score": [
          0.30886945
        ],
        ".id": [
          "country-/home/lvaldez/dev/attivio/aie_5.5.1/conf/factbook/content/countries/bl.xml"
        ],
        ".zone": [
          "default"
        ],
        "title": [
          "Bolivia"
        ],
        "teaser": [
          "Bolivia, named after independence fighter Simon BOLIVAR, broke away from Spanish rule in 1825; much of its subsequent history has consisted of a series of nearly 200 coups and countercoups. Democratic civilian rule was established in 1982, but leaders have faced difficult problems of deep-seated poverty, social unrest, and illegal drug production. in December 2005, Bolivians elected Movement Toward Socialism leader Evo MORALES president - by the widest margin of any leader since the restoration of civilian rule in 1982 - after he ran on a promise to change the country's traditional political class and empower the nation's poor majority. However, since taking office, his controversial strategies have exacerbated racial and economic tensions between the Amerindian populations of the Andean west and the non-indigenous communities of the eastern lowlands."
        ],
        "language": [
          "English"
        ],
        "languages": [
          "English"
        ],
        "uri": [
          "https://www.cia.gov/library/publications/the-world-factbook/geos/bl.html"
        ],
        "size": [
          5250
        ],
        "table": [
          "country"
        ],
        "date": [
          "2017-08-14T16:03:48.000-0400"
        ],
        "text": [
          "Bolivia, named after independence fighter Simon BOLIVAR, broke away from Spanish rule in 1825; much of its subsequent history has consisted of a series of nearly 200 coups and countercoups. Democratic civilian rule was established in 1982, but leaders have faced difficult problems of deep-seated poverty, social unrest, and illegal drug production. in December 2005, Bolivians elected Movement Toward Socialism leader Evo MORALES president - by the widest margin of any leader since the restoration of civilian rule in 1982 - after he ran on a promise to change the country's traditional political class and empower the nation's poor majority. However, since taking office, his controversial strategies have exacerbated racial and economic tensions between the Amerindian populations of the Andean west and the non-indigenous communities of the eastern lowlands."
        ],
        "position": [
          {
            "x": -65.0,
            "y": -17.0,
            "longitude": -65.0,
            "latitude": -17.0
          }
        ],
        "latitude": [
          -17.0
        ],
        "longitude": [
          -65.0
        ],
        "sourcepath": [
          "/home/lvaldez/dev/attivio/aie_5.5.1/conf/factbook/content/countries/bl.xml"
        ],
        "filename": [
          "bl.xml"
        ],
        "people": [
          "Simon BOLIVAR",
          "Evo MORALES"
        ],
        "location": [
          "Central South America, Southwest Of Brazil",
          "Bolivia",
          "Latin America"
        ],
        "company": [
          "Democratic",
          "Movement Toward Socialism",
          "G8"
        ],
        "jobtitle": [
          "president"
        ],
        "nationality": [
          "Spanish",
          "Bolivians"
        ],
        "religion": [
          "Roman Catholic",
          "Protestant"
        ],
        "numbers": [
          "1825",
          "200",
          "1982",
          "one",
          "2003",
          "-05",
          "2005",
          "five",
          "2006",
          "12",
          "2007"
        ],
        "img.uri.thumbnail": [
          "/factbook_resources/flags/bl-flag.gif"
        ],
        "img.uri.preview": [
          "/factbook_resources/maps/bl-map.gif"
        ],
        "morelikethisquery": [
          "OR(\"bolivia\",\"economic\",\"higher\",\"rule\",\"leader\",\"required\",\"america\",\"controversial\",\"latin\",\"poverty\",\"state\",\"energy\",\"large\",\"natural\",\"investment\",\"gdp\",\"government\",\"civilian\",\"surplus\",\"tensions\",\"energy company\",\"state energy\",\"latin america\",\"civilian rule\",\"private investment\",\"natural gas\",\"export bolivia\",\"exports pushed\",\"large deficits\",\"poor majority\",\"economic tensions\",\"controversial strategies\",\"public sector\",\"political instability\",\"amerindian populations\",\"sector debt\",\"exacerbated racial\",\"higher earnings\",\"large northern\",\"significantly reduced\",minimum=13)"
        ],
        "processing.feedback.level": [
          "ERROR",
          "WARN"
        ],
        "processing.feedback.message": [
          "Uncaught exception processing document",
          "Illegal field value for field 'extracteddate': Invalid ISO-8601 date 'December 2005'"
        ],
        "processing.feedback.component": [
          "indexer.applyTriggers",
          "index.writer"
        ],
        "processing.feedback.code": [
          "TRIGGER-9",
          "SCHEMA-2"
        ],
        "country": [
          "Bolivia"
        ],
        "economy": [
          "Bolivia is one of the poorest and least developed countries in Latin America. Following a disastrous economic crisis during the early 1980s, reforms spurred private investment, stimulated economic growth, and cut poverty rates in the 1990s. the period 2003-05 was characterized by political instability, racial tensions, and violent protests against plans - subsequently abandoned - to export Bolivia's newly discovered natural gas reserves to large northern hemisphere markets. in 2005, the government passed a controversial hydrocarbons law that imposed significantly higher royalties and required foreign firms then operating under risk-sharing contracts to surrender all production to the state energy company, which was made the sole exporter of natural gas. the law also required that the state energy company regain control over the five companies that were privatized during the 1990s - a process that is still underway. in 2006, higher earnings for mining and hydrocarbons exports pushed the current account surplus to about 12% of GDP and the government's higher tax take produced a fiscal surplus after years of large deficits. Debt relief from the G8 - announced in 2005 - also has significantly reduced Bolivia's public sector debt burden. Private investment as a share of GDP, however, remains among the lowest in Latin America, and inflation reached double-digit levels in 2007."
        ],
        "map": [
          "South America"
        ],
        "climate": [
          "Varies With Altitude",
          "Humid and Tropical To Cold and Semiarid"
        ],
        "terrain": [
          "Rugged Andes Mountains With a Highland Plateau (Altiplano), Hills, Lowland Plains Of the Amazon Basin"
        ],
        "resource": [
          "Tin",
          "Natural Gas",
          "Petroleum",
          "Zinc",
          "Tungsten",
          "Antimony",
          "Silver",
          "Iron",
          "Lead",
          "Gold",
          "Timber",
          "Hydropower"
        ],
        "spokenLanguage": [
          "Spanish",
          "Quechua",
          "Aymara"
        ],
        "ethnicity": [
          "Quechua",
          "Mestizo",
          "Aymara",
          "White"
        ],
        "agriprod": [
          "Soybeans",
          "Coffee",
          "Coca",
          "Cotton",
          "Corn",
          "Sugarcane",
          "Rice",
          "Potatoes",
          "Timber"
        ],
        "industry": [
          "Mining",
          "Smelting",
          "Petroleum",
          "Food and Beverages",
          "Tobacco",
          "Handicrafts",
          "Clothing"
        ],
        "laborForce": [
          4793000
        ],
        "unemploymentRate": [
          8.0
        ],
        "inflationRate": [
          12.0
        ],
        "publicDebt": [
          46.2
        ],
        "gdp.purchasePowerParity": [
          3.978E10
        ],
        "gdp.officialExchangeRate": [
          1.28E10
        ],
        "gdp.growthRate": [
          4.0
        ],
        "gdp.growthRatePerCapita": [
          4400.0
        ],
        "keyphrases": [
          "Civilian Rule",
          "Latin America",
          "Natural Gas"
        ],
        "sentiment": [
          "pos"
        ],
        "sentiment.score": [
          1.0
        ],
        "entity.sentiment.pos": [
          "Natural Gas"
        ],
        "entity.sentiment.pos.score": [
          0.98305076
        ],
        "entity.sentiment.neg": [
          "Civilian Rule",
          "1982"
        ],
        "entity.sentiment.neg.score": [
          0.8797327,
          1.7173733
        ],
        "sonar.run.number": [
          1505503566080
        ],
        "sonar.create.date": [
          "2017-09-15T15:26:19.000-0400"
        ],
        "sonar.update.date": [
          "2017-09-15T15:26:19.000-0400"
        ],
        "sonar.content": [
          "Bolivia",
          "Bolivia, named after independence fighter Simon BOLIVAR, broke away from Spanish rule in 1825; much of its subsequent history has consisted of a series of nearly 200 coups and countercoups. Democratic civilian rule was established in 1982, but leaders have faced difficult problems of deep-seated poverty, social unrest, and illegal drug production. in December 2005, Bolivians elected Movement Toward Socialism leader Evo MORALES president - by the widest margin of any leader since the restoration of civilian rule in 1982 - after he ran on a promise to change the country's traditional political class and empower the nation's poor majority. However, since taking office, his controversial strategies have exacerbated racial and economic tensions between the Amerindian populations of the Andean west and the non-indigenous communities of the eastern lowlands.",
          "Simon BOLIVAR",
          "Evo MORALES",
          "Central South America, Southwest Of Brazil",
          "Bolivia",
          "Latin America",
          "Democratic",
          "Movement Toward Socialism",
          "G8"
        ],
        "security.read": [
          "anonymous:anonymous"
        ]
      },
      "signal": {
        "principal": "Anonymous:Administrator:Administrator",
        "docId": "country-/home/lvaldez/dev/attivio/aie_5.5.1/conf/factbook/content/countries/bl.xml",
        "docOrdinal": 5,
        "featureVector": "table_country=1.0,freshness=0.28346974,content=0.28052247",
        "query": "America",
        "locale": "en",
        "relevancyModelName": "default",
        "relevancyModelVersion": 0,
        "relevancyModelNames": [
          "default"
        ],
        "queryTimestamp": 1505504165774,
        "signalTimestamp": 1505504165832,
        "type": "click",
        "weight": 1.0,
        "ttl": true
      }
    },
    {
      "fields": {
        ".score": [
          0.30886945
        ],
        ".id": [
          "country-/home/lvaldez/dev/attivio/aie_5.5.1/conf/factbook/content/countries/br.xml"
        ],
        ".zone": [
          "default"
        ],
        "title": [
          "Brazil"
        ],
        "teaser": [
          "Following three centuries under the rule of Portugal, Brazil became an independent nation in 1822 and a republic in 1889. By far the largest and most populous country in South America, Brazil overcame more than half a century of military intervention in the governance of the country when in 1985 the military regime peacefully ceded power to civilian rulers. Brazil continues to pursue industrial and agricultural growth and development of its interior. Exploiting vast natural resources and a large labor pool, it is today South America's leading economic power and a regional leader. Highly unequal income distribution remains a pressing problem."
        ],
        "language": [
          "English"
        ],
        "languages": [
          "English"
        ],
        "uri": [
          "https://www.cia.gov/library/publications/the-world-factbook/geos/br.html"
        ],
        "size": [
          5671
        ],
        "table": [
          "country"
        ],
        "date": [
          "2017-08-14T16:03:48.000-0400"
        ],
        "text": [
          "Following three centuries under the rule of Portugal, Brazil became an independent nation in 1822 and a republic in 1889. By far the largest and most populous country in South America, Brazil overcame more than half a century of military intervention in the governance of the country when in 1985 the military regime peacefully ceded power to civilian rulers. Brazil continues to pursue industrial and agricultural growth and development of its interior. Exploiting vast natural resources and a large labor pool, it is today South America's leading economic power and a regional leader. Highly unequal income distribution remains a pressing problem."
        ],
        "position": [
          {
            "x": -55.0,
            "y": -10.0,
            "longitude": -55.0,
            "latitude": -10.0
          }
        ],
        "latitude": [
          -10.0
        ],
        "longitude": [
          -55.0
        ],
        "sourcepath": [
          "/home/lvaldez/dev/attivio/aie_5.5.1/conf/factbook/content/countries/br.xml"
        ],
        "filename": [
          "br.xml"
        ],
        "location": [
          "Eastern South America, Bordering the Atlantic Ocean",
          "Brazil",
          "Portugal",
          "South America"
        ],
        "company": [
          "DA"
        ],
        "nationality": [
          "South American"
        ],
        "religion": [
          "Roman Catholic",
          "Protestant",
          "Spiritualist",
          "Bantu",
          "Other",
          "Unspecified",
          "None"
        ],
        "time": [
          "three centuries",
          "a century"
        ],
        "numbers": [
          "1822",
          "1889",
          "1985",
          "2001",
          "-03",
          "2004",
          "three",
          "2003",
          "2007",
          "first",
          "1992",
          "2006",
          "second"
        ],
        "img.uri.thumbnail": [
          "/factbook_resources/flags/br-flag.gif"
        ],
        "img.uri.preview": [
          "/factbook_resources/maps/br-map.gif"
        ],
        "morelikethisquery": [
          "OR(\"brazil\",\"debt\",\"growth\",\"south\",\"surpluses\",\"economic\",\"country\",\"real\",\"america\",\"large\",\"economy\",\"commodity\",\"current\",\"power\",\"silva\",\"lula\",\"high\",\"agricultural\",\"military\",\"fiscal\",\"south america\",\"account surpluses\",\"debt burden\",\"current account\",\"economic reforms\",\"tight fiscal\",\"world markets\",\"fiscal policy\",\"ran record\",\"record trade\",\"gains coupled\",\"developed agricultural\",\"driven current\",\"macroeconomic policies\",\"brazil overcame\",\"resumed appreciating\",\"income distribution\",\"silva announced\",\"commodity prices\",\"yielded increases\",minimum=13)"
        ],
        "processing.feedback.level": [
          "ERROR"
        ],
        "processing.feedback.message": [
          "Uncaught exception processing document"
        ],
        "processing.feedback.component": [
          "indexer.applyTriggers"
        ],
        "processing.feedback.code": [
          "TRIGGER-9"
        ],
        "country": [
          "Brazil"
        ],
        "economy": [
          "Characterized by large and well-developed agricultural, mining, manufacturing, and service sectors, Brazil's economy outweighs that of all other South American countries and is expanding its presence in world markets. Having weathered 2001-03 financial turmoil, capital inflows are regaining strength and the currency has resumed appreciating. the appreciation has slowed export volume growth, but since 2004, Brazil's growth has yielded increases in employment and real wages. the resilience in the economy stems from commodity-driven current account surpluses, and sound macroeconomic policies that have bolstered international reserves to historically high levels, reduced public debt, and allowed a significant decline in real interest rates. a floating exchange rate, an inflation-targeting regime, and a tight fiscal policy are the three pillars of the economic program. From 2003 to 2007, Brazil ran record trade surpluses and recorded its first current account surpluses since 1992. Productivity gains coupled with high commodity prices contributed to the surge in exports. Brazil improved its debt profile in 2006 by shifting its debt burden toward real denominated and domestically held instruments. LULA DA SILVA restated his commitment to fiscal responsibility by maintaining the country's primary surplus during the 2006 election. Following his second inauguration, LULA DA SILVA announced a package of further economic reforms to reduce taxes and increase investment in infrastructure. the government's goal of achieving strong growth while reducing the debt burden is likely to create inflationary pressures."
        ],
        "map": [
          "South America"
        ],
        "climate": [
          "Mostly Tropical, But Temperate in South"
        ],
        "terrain": [
          "Mostly Flat To Rolling Lowlands in North",
          "Some Plains, Hills, Mountains, and Narrow Coastal Belt"
        ],
        "resource": [
          "Bauxite",
          "Gold",
          "Iron Ore",
          "Manganese",
          "Nickel",
          "Phosphates",
          "Platinum",
          "Tin",
          "Uranium",
          "Petroleum",
          "Hydropower",
          "Timber"
        ],
        "spokenLanguage": [
          "Portuguese",
          "Spanish",
          "English",
          "French"
        ],
        "ethnicity": [
          "White",
          "Mulatto",
          "Black",
          "Other",
          "Unspecified"
        ],
        "agriprod": [
          "Coffee",
          "Soybeans",
          "Wheat",
          "Rice",
          "Corn",
          "Sugarcane",
          "Cocoa",
          "Citrus",
          "Beef"
        ],
        "industry": [
          "Textiles",
          "Shoes",
          "Chemicals",
          "Cement",
          "Lumber",
          "Iron Ore",
          "Tin",
          "Steel",
          "Aircraft",
          "Motor Vehicles and Parts",
          "Other Machinery and Equipment"
        ],
        "laborForce": [
          99470000
        ],
        "unemploymentRate": [
          9.8
        ],
        "inflationRate": [
          4.1
        ],
        "publicDebt": [
          43.9
        ],
        "gdp.purchasePowerParity": [
          1.83799998E12
        ],
        "gdp.officialExchangeRate": [
          1.26900004E12
        ],
        "gdp.growthRate": [
          4.9
        ],
        "gdp.growthRatePerCapita": [
          9700.0
        ],
        "keyphrases": [
          "Account Surpluses",
          "Debt Burden"
        ],
        "sentiment": [
          "pos"
        ],
        "sentiment.score": [
          1.0
        ],
        "entity.sentiment.pos": [
          "South American",
          "Three Centuries",
          "Brazil"
        ],
        "entity.sentiment.pos.score": [
          0.7909356,
          0.7928542,
          1.5727439
        ],
        "sonar.run.number": [
          1505503566080
        ],
        "sonar.create.date": [
          "2017-09-15T15:26:19.000-0400"
        ],
        "sonar.update.date": [
          "2017-09-15T15:26:19.000-0400"
        ],
        "sonar.content": [
          "Brazil",
          "Following three centuries under the rule of Portugal, Brazil became an independent nation in 1822 and a republic in 1889. By far the largest and most populous country in South America, Brazil overcame more than half a century of military intervention in the governance of the country when in 1985 the military regime peacefully ceded power to civilian rulers. Brazil continues to pursue industrial and agricultural growth and development of its interior. Exploiting vast natural resources and a large labor pool, it is today South America's leading economic power and a regional leader. Highly unequal income distribution remains a pressing problem.",
          "Eastern South America, Bordering the Atlantic Ocean",
          "Brazil",
          "Portugal",
          "South America",
          "DA"
        ],
        "security.read": [
          "anonymous:anonymous"
        ]
      },
      "signal": {
        "principal": "Anonymous:Administrator:Administrator",
        "docId": "country-/home/lvaldez/dev/attivio/aie_5.5.1/conf/factbook/content/countries/br.xml",
        "docOrdinal": 6,
        "featureVector": "table_country=1.0,freshness=0.28346974,content=0.28052247",
        "query": "America",
        "locale": "en",
        "relevancyModelName": "default",
        "relevancyModelVersion": 0,
        "relevancyModelNames": [
          "default"
        ],
        "queryTimestamp": 1505504165774,
        "signalTimestamp": 1505504165832,
        "type": "click",
        "weight": 1.0,
        "ttl": true
      }
    },
    {
      "fields": {
        ".score": [
          0.29025266
        ],
        ".id": [
          "country-/home/lvaldez/dev/attivio/aie_5.5.1/conf/factbook/content/countries/tb.xml"
        ],
        ".zone": [
          "default"
        ],
        "title": [
          "Saint Barthelemy"
        ],
        "teaser": [
          "Discovered in 1493 by Christopher COLUMBUS who named it for his brother Bartolomeo, St. Barthelemy was first settled by the French in 1648. in 1784, the French sold the island to Sweden, who renamed the largest town Gustavia, after the Swedish King GUSTAV III, and made it a free port; the island prospered as a trade and supply center during the colonial wars of the 18th century. France repurchased the island in 1878 and placed it under the administration of Guadeloupe. St. Barthelemy retained its free port status along with various Swedish appelations such as Swedish street and town names, and the three-crown symbol on the coat of arms. in 2003, the populace of the island voted to secede from Guadeloupe and in 2007, the island became a French overseas collectivity."
        ],
        "language": [
          "English"
        ],
        "languages": [
          "English"
        ],
        "uri": [
          "https://www.cia.gov/library/publications/the-world-factbook/geos/tb.html"
        ],
        "size": [
          3198
        ],
        "table": [
          "country"
        ],
        "date": [
          "2017-08-14T16:03:48.000-0400"
        ],
        "text": [
          "Discovered in 1493 by Christopher COLUMBUS who named it for his brother Bartolomeo, St. Barthelemy was first settled by the French in 1648. in 1784, the French sold the island to Sweden, who renamed the largest town Gustavia, after the Swedish King GUSTAV III, and made it a free port; the island prospered as a trade and supply center during the colonial wars of the 18th century. France repurchased the island in 1878 and placed it under the administration of Guadeloupe. St. Barthelemy retained its free port status along with various Swedish appelations such as Swedish street and town names, and the three-crown symbol on the coat of arms. in 2003, the populace of the island voted to secede from Guadeloupe and in 2007, the island became a French overseas collectivity."
        ],
        "position": [
          {
            "x": -63.416666666666664,
            "y": 18.5,
            "longitude": -63.416666666666664,
            "latitude": 18.5
          }
        ],
        "latitude": [
          18.5
        ],
        "longitude": [
          -63.416666666666664
        ],
        "sourcepath": [
          "/home/lvaldez/dev/attivio/aie_5.5.1/conf/factbook/content/countries/tb.xml"
        ],
        "filename": [
          "tb.xml"
        ],
        "people": [
          "Christopher COLUMBUS",
          "Bartolomeo",
          "Gustavia",
          "GUSTAV III"
        ],
        "location": [
          "Located Approximately 125 Miles Northwest Of Guadeloupe",
          "Saint Barthelemy",
          "St. Barthelemy",
          "Sweden",
          "France",
          "Guadeloupe",
          "North America",
          "Brazil",
          "Portugal"
        ],
        "jobtitle": [
          "King"
        ],
        "nationality": [
          "French",
          "Swedish"
        ],
        "religion": [
          "Roman Catholic",
          "Protestant",
          "Jehovah"
        ],
        "numbers": [
          "1493",
          "first",
          "1648",
          "1784",
          "1878",
          "three",
          "2003",
          "2007",
          "70,000",
          "130,000"
        ],
        "img.uri.thumbnail": [
          "/factbook_resources/flags/tb-flag.gif"
        ],
        "img.uri.preview": [
          "/factbook_resources/maps/tb-map.gif"
        ],
        "morelikethisquery": [
          "OR(\"island\",\"barthelemy\",\"french\",\"swedish\",\"tourism\",\"free\",\"high\",\"town\",\"visitors\",\"port\",\"guadeloupe\",\"saint\",\"resources\",\"luxury\",\"symbol\",\"named\",\"year\",\"administration\",\"goods\",\"voted\",\"free port\",\"saint barthelemy\",\"swedish street\",\"public sectors\",\"king gustav\",\"inhibits mass\",\"luxury hotels\",\"port status\",\"gustav iii\",\"visitors primarily\",\"largest town\",\"water resources\",\"french sold\",\"north america\",\"swedish appelations\",\"villas host\",\"town names\",\"significant investment\",\"attracts labor\",\"town gustavia\",minimum=13)"
        ],
        "processing.feedback.level": [
          "ERROR"
        ],
        "processing.feedback.message": [
          "Uncaught exception processing document"
        ],
        "processing.feedback.component": [
          "indexer.applyTriggers"
        ],
        "processing.feedback.code": [
          "TRIGGER-9"
        ],
        "country": [
          "Saint Barthelemy"
        ],
        "economy": [
          "The economy of Saint Barthelemy is based upon high-end tourism and duty-free luxury commerce, serving visitors primarily from North America. the luxury hotels and villas host 70,000 visitors each year with another 130,000 arriving by boat. the relative isolation and high cost of living inhibits mass tourism. the construction and public sectors also enjoy significant investment in support of tourism. With limited fresh water resources, all food must be imported, as must all energy resources and most manufactured goods. Employment is strong and attracts labor from Brazil and Portugal."
        ],
        "map": [
          "Central America and the Caribbean"
        ],
        "climate": [
          "Tropical, With Practically No Variation in Temperature",
          "Has Two Seasons (Dry and Humid)"
        ],
        "terrain": [
          "Hilly, Almost Completely Surrounded By Shallow-Water Reefs, With 20 Beaches"
        ],
        "resource": [
          "Has Few Natural Resouces",
          "Its Beaches Being the Most Important"
        ],
        "spokenLanguage": [
          "French",
          "English"
        ],
        "ethnicity": [
          "White",
          "Creole",
          "Black",
          "Guadeloupe Mestizo"
        ],
        "keyphrases": [
          "Saint Barthelemy"
        ],
        "sentiment": [
          "pos"
        ],
        "sentiment.score": [
          1.0
        ],
        "entity.sentiment.pos": [
          "1878",
          "1784",
          "French"
        ],
        "entity.sentiment.pos.score": [
          0.9291252,
          1.0048546,
          1.666083
        ],
        "sonar.run.number": [
          1505503566080
        ],
        "sonar.create.date": [
          "2017-09-15T15:26:20.000-0400"
        ],
        "sonar.update.date": [
          "2017-09-15T15:26:20.000-0400"
        ],
        "sonar.content": [
          "Saint Barthelemy",
          "Discovered in 1493 by Christopher COLUMBUS who named it for his brother Bartolomeo, St. Barthelemy was first settled by the French in 1648. in 1784, the French sold the island to Sweden, who renamed the largest town Gustavia, after the Swedish King GUSTAV III, and made it a free port; the island prospered as a trade and supply center during the colonial wars of the 18th century. France repurchased the island in 1878 and placed it under the administration of Guadeloupe. St. Barthelemy retained its free port status along with various Swedish appelations such as Swedish street and town names, and the three-crown symbol on the coat of arms. in 2003, the populace of the island voted to secede from Guadeloupe and in 2007, the island became a French overseas collectivity.",
          "Christopher COLUMBUS",
          "Bartolomeo",
          "Gustavia",
          "GUSTAV III",
          "Located Approximately 125 Miles Northwest Of Guadeloupe",
          "Saint Barthelemy",
          "St. Barthelemy",
          "Sweden",
          "France",
          "Guadeloupe",
          "North America",
          "Brazil",
          "Portugal"
        ],
        "security.read": [
          "anonymous:anonymous"
        ]
      },
      "signal": {
        "principal": "Anonymous:Administrator:Administrator",
        "docId": "country-/home/lvaldez/dev/attivio/aie_5.5.1/conf/factbook/content/countries/tb.xml",
        "docOrdinal": 7,
        "featureVector": "table_country=1.0,freshness=0.28346974,content=0.26190567",
        "query": "America",
        "locale": "en",
        "relevancyModelName": "default",
        "relevancyModelVersion": 0,
        "relevancyModelNames": [
          "default"
        ],
        "queryTimestamp": 1505504165774,
        "signalTimestamp": 1505504165832,
        "type": "click",
        "weight": 1.0,
        "ttl": true
      }
    },
    {
      "fields": {
        ".score": [
          0.27534983
        ],
        ".id": [
          "country-/home/lvaldez/dev/attivio/aie_5.5.1/conf/factbook/content/countries/bq.xml"
        ],
        ".zone": [
          "default"
        ],
        "title": [
          "Navassa Island"
        ],
        "teaser": [
          "This uninhabited island was claimed by the US in 1857 for its guano. Mining took place between 1865 and 1898. the lighthouse, built in 1917, was shut down in 1996 and administration of Navassa Island transferred from the Coast Guard to the Department of the Interior. a 1998 scientific expedition to the island described it as a unique preserve of Caribbean biodiversity; the following year it became a National Wildlife Refuge and annual scientific expeditions have continued."
        ],
        "language": [
          "English"
        ],
        "languages": [
          "English"
        ],
        "uri": [
          "https://www.cia.gov/library/publications/the-world-factbook/geos/bq.html"
        ],
        "size": [
          1796
        ],
        "table": [
          "country"
        ],
        "date": [
          "2017-08-14T16:03:48.000-0400"
        ],
        "text": [
          "This uninhabited island was claimed by the US in 1857 for its guano. Mining took place between 1865 and 1898. the lighthouse, built in 1917, was shut down in 1996 and administration of Navassa Island transferred from the Coast Guard to the Department of the Interior. a 1998 scientific expedition to the island described it as a unique preserve of Caribbean biodiversity; the following year it became a National Wildlife Refuge and annual scientific expeditions have continued."
        ],
        "position": [
          {
            "x": -75.03333333333333,
            "y": 18.416666666666668,
            "longitude": -75.03333333333333,
            "latitude": 18.416666666666668
          }
        ],
        "latitude": [
          18.416666666666668
        ],
        "longitude": [
          -75.03333333333333
        ],
        "sourcepath": [
          "/home/lvaldez/dev/attivio/aie_5.5.1/conf/factbook/content/countries/bq.xml"
        ],
        "filename": [
          "bq.xml"
        ],
        "location": [
          "Caribbean, Island in the Caribbean Sea, 35 Miles West Of Tiburon Peninsula Of Haiti",
          "Navassa Island",
          "US"
        ],
        "company": [
          "Coast Guard",
          "Department",
          "National Wildlife Refuge"
        ],
        "nationality": [
          "Caribbean"
        ],
        "numbers": [
          "1857",
          "1865",
          "1898",
          "1917",
          "1996",
          "1998"
        ],
        "img.uri.thumbnail": [
          "/factbook_resources/flags/bq-flag.gif"
        ],
        "img.uri.preview": [
          "/factbook_resources/maps/bq-map.gif"
        ],
        "morelikethisquery": [
          "OR(\"island\",\"navassa\",\"scientific\",\"refuge\",\"shut\",\"commercial\",\"transferred\",\"lighthouse\",\"year\",\"administration\",\"claimed\",\"guard\",\"expedition\",\"expeditions\",\"interior\",\"caribbean\",\"guano\",\"annual\",\"national\",\"place\",\"navassa island\",\"annual scientific\",\"national wildlife\",\"scientific expedition\",\"scientific expeditions\",\"uninhabited island\",\"unique preserve\",\"subsistence fishing\",\"coast guard\",\"commercial trawling\",\"caribbean biodiversity\",\"trawling occur\",\"wildlife refuge\",\"island transferred\",\"refuge waters\",minimum=11)"
        ],
        "processing.feedback.level": [
          "ERROR"
        ],
        "processing.feedback.message": [
          "Uncaught exception processing document"
        ],
        "processing.feedback.component": [
          "indexer.applyTriggers"
        ],
        "processing.feedback.code": [
          "TRIGGER-9"
        ],
        "country": [
          "Navassa Island"
        ],
        "economy": [
          "Subsistence fishing and commercial trawling occur within refuge waters."
        ],
        "map": [
          "Central America and the Caribbean"
        ],
        "climate": [
          "Marine, Tropical"
        ],
        "terrain": [
          "Raised Coral and Limestone Plateau, Flat To Undulating",
          "Ringed By Vertical White Cliffs (9 To 15 M High)"
        ],
        "resource": [
          "Guano"
        ],
        "keyphrases": [
          "Navassa Island"
        ],
        "sentiment": [
          "pos"
        ],
        "sentiment.score": [
          1.0
        ],
        "entity.sentiment.pos": [
          "Caribbean",
          "Navassa Island"
        ],
        "entity.sentiment.pos.score": [
          0.7504615,
          1.768503
        ],
        "sonar.run.number": [
          1505503566080
        ],
        "sonar.create.date": [
          "2017-09-15T15:26:19.000-0400"
        ],
        "sonar.update.date": [
          "2017-09-15T15:26:19.000-0400"
        ],
        "sonar.content": [
          "Navassa Island",
          "This uninhabited island was claimed by the US in 1857 for its guano. Mining took place between 1865 and 1898. the lighthouse, built in 1917, was shut down in 1996 and administration of Navassa Island transferred from the Coast Guard to the Department of the Interior. a 1998 scientific expedition to the island described it as a unique preserve of Caribbean biodiversity; the following year it became a National Wildlife Refuge and annual scientific expeditions have continued.",
          "Caribbean, Island in the Caribbean Sea, 35 Miles West Of Tiburon Peninsula Of Haiti",
          "Navassa Island",
          "US",
          "Coast Guard",
          "Department",
          "National Wildlife Refuge"
        ],
        "security.read": [
          "anonymous:anonymous"
        ]
      },
      "signal": {
        "principal": "Anonymous:Administrator:Administrator",
        "docId": "country-/home/lvaldez/dev/attivio/aie_5.5.1/conf/factbook/content/countries/bq.xml",
        "docOrdinal": 8,
        "featureVector": "table_country=1.0,freshness=0.28346974,content=0.24700285",
        "query": "America",
        "locale": "en",
        "relevancyModelName": "default",
        "relevancyModelVersion": 0,
        "relevancyModelNames": [
          "default"
        ],
        "queryTimestamp": 1505504165774,
        "signalTimestamp": 1505504165832,
        "type": "click",
        "weight": 1.0,
        "ttl": true
      }
    },
    {
      "fields": {
        ".score": [
          0.26225734
        ],
        ".id": [
          "country-/home/lvaldez/dev/attivio/aie_5.5.1/conf/factbook/content/countries/fr.xml"
        ],
        ".zone": [
          "default"
        ],
        "title": [
          "France"
        ],
        "teaser": [
          "Although ultimately a victor in World Wars I and II, France suffered extensive losses in its empire, wealth, manpower, and rank as a dominant nation-state. Nevertheless, France today is one of the most modern countries in the world and is a leader among European nations. Since 1958, it has constructed a hybrid presidential-parliamentary governing system resistant to the instabilities experienced in earlier more purely parliamentary administrations. in recent years, its reconciliation and cooperation with Germany have proved central to the economic integration of Europe, including the introduction of a common exchange currency, the euro, in January 1999. At present, France is at the forefront of efforts to develop the EU's military capabilities to supplement progress toward an EU foreign policy."
        ],
        "language": [
          "English"
        ],
        "languages": [
          "English"
        ],
        "uri": [
          "https://www.cia.gov/library/publications/the-world-factbook/geos/fr.html"
        ],
        "size": [
          8862
        ],
        "table": [
          "country"
        ],
        "date": [
          "2017-08-14T16:03:48.000-0400"
        ],
        "text": [
          "Although ultimately a victor in World Wars I and II, France suffered extensive losses in its empire, wealth, manpower, and rank as a dominant nation-state. Nevertheless, France today is one of the most modern countries in the world and is a leader among European nations. Since 1958, it has constructed a hybrid presidential-parliamentary governing system resistant to the instabilities experienced in earlier more purely parliamentary administrations. in recent years, its reconciliation and cooperation with Germany have proved central to the economic integration of Europe, including the introduction of a common exchange currency, the euro, in January 1999. At present, France is at the forefront of efforts to develop the EU's military capabilities to supplement progress toward an EU foreign policy."
        ],
        "position": [
          {
            "x": 2.0,
            "y": 46.0,
            "longitude": 2.0,
            "latitude": 46.0
          }
        ],
        "latitude": [
          46.0
        ],
        "longitude": [
          2.0
        ],
        "sourcepath": [
          "/home/lvaldez/dev/attivio/aie_5.5.1/conf/factbook/content/countries/fr.xml"
        ],
        "filename": [
          "fr.xml"
        ],
        "location": [
          "Western Europe, Bordering the Bay Of Biscay and English Channel, Between Belgium and Spain, Southeast Of the Uk; Bordering the Mediterranean Sea, Between Italy and Spain",
          "Northern South America, Bordering the North Atlantic Ocean, Between Brazil and Suriname",
          "Caribbean, Islands Between the Caribbean Sea and the North Atlantic Ocean, Southeast Of Puerto Rico",
          "Caribbean, Island Between the Caribbean Sea and North Atlantic Ocean, North Of Trinidad and Tobago",
          "Southern Africa, Island in the Indian Ocean, East Of Madagascar",
          "France",
          "II, France",
          "Germany",
          "Europe",
          "EU"
        ],
        "company": [
          "Air France",
          "France Telecom",
          "Renault",
          "Thales"
        ],
        "nationality": [
          "European"
        ],
        "religion": [
          "Roman Catholic",
          "Protestant",
          "Jewish",
          "Muslim",
          "Unaffiliated"
        ],
        "numbers": [
          "one",
          "1958",
          "2007",
          "2008",
          "50",
          "2005",
          "3",
          "first",
          "8",
          "75 million",
          "third"
        ],
        "img.uri.thumbnail": [
          "/factbook_resources/flags/fr-flag.gif"
        ],
        "img.uri.preview": [
          "/factbook_resources/maps/fr-map.gif"
        ],
        "morelikethisquery": [
          "OR(\"france\",\"government\",\"world\",\"years\",\"recent\",\"economy\",\"labor\",\"reform\",\"gdp\",\"foreign\",\"modern\",\"europe\",\"maintains\",\"extensive\",\"tax\",\"efforts\",\"income\",\"public\",\"parliamentary\",\"social\",\"recent years\",\"labor reform\",\"reduced unemployment\",\"budget deficit\",\"modern economy\",\"france today\",\"supplement progress\",\"widespread opposition\",\"world wars\",\"parliamentary governing\",\"tax policies\",\"government launched\",\"governing system\",\"social equity\",\"large companies\",\"tax burden\",\"largest income\",\"income disparity\",\"modern countries\",\"fully privatized\",minimum=13)"
        ],
        "processing.feedback.level": [
          "ERROR",
          "WARN"
        ],
        "processing.feedback.message": [
          "Uncaught exception processing document",
          "Illegal field value for field 'extracteddate': Invalid ISO-8601 date 'January 1999'"
        ],
        "processing.feedback.component": [
          "indexer.applyTriggers",
          "index.writer"
        ],
        "processing.feedback.code": [
          "TRIGGER-9",
          "SCHEMA-2"
        ],
        "country": [
          "France"
        ],
        "economy": [
          "France is in the midst of transition from a well-to-do modern economy that has featured extensive government ownership and intervention to one that relies more on market mechanisms. the government has partially or fully privatized many large companies, banks, and insurers, and has ceded stakes in such leading firms as Air France, France Telecom, Renault, and Thales. It maintains a strong presence in some sectors, particularly power, public transport, and defense industries. the telecommunications sector is gradually being opened to competition. France's leaders remain committed to a capitalism in which they maintain social equity by means of laws, tax policies, and social spending that reduce income disparity and the impact of free markets on public health and welfare. Widespread opposition to labor reform has in recent years hampered the government's ability to revitalize the economy. in 2007, the government launched divisive labor reform efforts that will continue into 2008. France's tax burden remains one of the highest in Europe (nearly 50% of GDP in 2005). France brought the budget deficit within the eurozone's 3%-of-GDP limit for the first time in 2007 and has reduced unemployment to roughly 8%. With at least 75 million foreign tourists per year, France is the most visited country in the world and maintains the third largest income in the world from tourism."
        ],
        "map": [
          "Europe",
          "South America",
          "Central America and the Caribbean",
          "Central America and the Caribbean",
          "World"
        ],
        "climate": [
          "Generally Cool Winters and Mild Summers, But Mild Winters and Hot Summers Along the Mediterranean",
          "Occasional Strong, Cold, Dry, North-To-Northwesterly Wind Known As Mistral",
          "Tropical",
          "Hot, Humid",
          "Little Seasonal Temperature Variation",
          "Subtropical Tempered By Trade Winds",
          "Moderately High Humidity",
          "Rainy Season (June To October)",
          "Vulnerable To Devastating Cyclones (Hurricanes) Every Eight Years On Average",
          "Tropical, But Temperature Moderates With Elevation",
          "Cool and Dry (May To November), Hot and Rainy (November To April)"
        ],
        "terrain": [
          "Mostly Flat Plains or Gently Rolling Hills in North and West",
          "Remainder Is Mountainous, Especially Pyrenees in South, Alps in East",
          "Low-Lying Coastal Plains Rising To Hills and Small Mountains",
          "Basse-Terre Is Volcanic in Origin With Interior Mountains",
          "Grande-Terre Is Low Limestone Formation",
          "Most Of the Seven Other Islands Are Volcanic in Origin",
          "Mountainous With Indented Coastline",
          "Dormant Volcano",
          "Mostly Rugged and Mountainous",
          "Fertile Lowlands Along Coast"
        ],
        "resource": [
          "Coal",
          "Iron Ore",
          "Bauxite",
          "Zinc",
          "Uranium",
          "Antimony",
          "Arsenic",
          "Potash",
          "Feldspar",
          "Fluorspar",
          "Gypsum",
          "Timber",
          "Fish",
          "Gold Deposits",
          "Petroleum",
          "Kaolin",
          "Niobium",
          "Tantalum",
          "Clay"
        ],
        "spokenLanguage": [
          "French",
          "Rapidly Declining Regional Dialects and Languages"
        ],
        "ethnicity": [
          "Celtic and Latin With Teutonic",
          "Slavic",
          "North African",
          "Indochinese",
          "Basque Minorities"
        ],
        "agriprod": [
          "Wheat",
          "Cereals",
          "Sugar Beets",
          "Potatoes",
          "Wine Grapes",
          "Beef",
          "Dairy Products",
          "Fish"
        ],
        "industry": [
          "Machinery",
          "Chemicals",
          "Automobiles",
          "Metallurgy",
          "Aircraft",
          "Electronics",
          "Textiles",
          "Food Processing",
          "Tourism"
        ],
        "laborForce": [
          27760000
        ],
        "unemploymentRate": [
          8.0
        ],
        "inflationRate": [
          1.5
        ],
        "publicDebt": [
          66.6
        ],
        "gdp.purchasePowerParity": [
          2.06699993E12
        ],
        "gdp.officialExchangeRate": [
          2.5150001E12
        ],
        "gdp.growthRate": [
          1.8
        ],
        "gdp.growthRatePerCapita": [
          33800.0
        ],
        "keyphrases": [
          "Labor Reform"
        ],
        "sentiment": [
          "pos"
        ],
        "sentiment.score": [
          1.0
        ],
        "entity.sentiment.pos": [
          "Third",
          "One",
          "France"
        ],
        "entity.sentiment.pos.score": [
          0.7207287,
          1.2557491,
          2.1886268
        ],
        "sonar.run.number": [
          1505503566080
        ],
        "sonar.create.date": [
          "2017-09-15T15:26:19.000-0400"
        ],
        "sonar.update.date": [
          "2017-09-15T15:26:19.000-0400"
        ],
        "sonar.content": [
          "France",
          "Although ultimately a victor in World Wars I and II, France suffered extensive losses in its empire, wealth, manpower, and rank as a dominant nation-state. Nevertheless, France today is one of the most modern countries in the world and is a leader among European nations. Since 1958, it has constructed a hybrid presidential-parliamentary governing system resistant to the instabilities experienced in earlier more purely parliamentary administrations. in recent years, its reconciliation and cooperation with Germany have proved central to the economic integration of Europe, including the introduction of a common exchange currency, the euro, in January 1999. At present, France is at the forefront of efforts to develop the EU's military capabilities to supplement progress toward an EU foreign policy.",
          "Western Europe, Bordering the Bay Of Biscay and English Channel, Between Belgium and Spain, Southeast Of the Uk; Bordering the Mediterranean Sea, Between Italy and Spain",
          "Northern South America, Bordering the North Atlantic Ocean, Between Brazil and Suriname",
          "Caribbean, Islands Between the Caribbean Sea and the North Atlantic Ocean, Southeast Of Puerto Rico",
          "Caribbean, Island Between the Caribbean Sea and North Atlantic Ocean, North Of Trinidad and Tobago",
          "Southern Africa, Island in the Indian Ocean, East Of Madagascar",
          "France",
          "II, France",
          "Germany",
          "Europe",
          "EU",
          "Air France",
          "France Telecom",
          "Renault",
          "Thales"
        ],
        "security.read": [
          "anonymous:anonymous"
        ]
      },
      "signal": {
        "principal": "Anonymous:Administrator:Administrator",
        "docId": "country-/home/lvaldez/dev/attivio/aie_5.5.1/conf/factbook/content/countries/fr.xml",
        "docOrdinal": 9,
        "featureVector": "table_country=1.0,freshness=0.28346974,content=0.23391037",
        "query": "America",
        "locale": "en",
        "relevancyModelName": "default",
        "relevancyModelVersion": 0,
        "relevancyModelNames": [
          "default"
        ],
        "queryTimestamp": 1505504165774,
        "signalTimestamp": 1505504165832,
        "type": "click",
        "weight": 1.0,
        "ttl": true
      }
    },
    {
      "fields": {
        ".score": [
          0.25252903
        ],
        ".id": [
          "country-/home/lvaldez/dev/attivio/aie_5.5.1/conf/factbook/content/countries/gt.xml"
        ],
        ".zone": [
          "default"
        ],
        "title": [
          "Guatemala"
        ],
        "teaser": [
          "The Mayan civilization flourished in Guatemala and surrounding regions during the first millennium A.D. After almost three centuries as a Spanish colony, Guatemala won its independence in 1821. During the second half of the 20th century, it experienced a variety of military and civilian governments, as well as a 36-year guerrilla war. in 1996, the government signed a peace agreement formally ending the conflict, which had left more than 100,000 people dead and had created, by some estimates, some 1 million refugees."
        ],
        "language": [
          "English"
        ],
        "languages": [
          "English"
        ],
        "uri": [
          "https://www.cia.gov/library/publications/the-world-factbook/geos/gt.html"
        ],
        "size": [
          5071
        ],
        "table": [
          "country"
        ],
        "date": [
          "2017-08-14T16:03:48.000-0400"
        ],
        "text": [
          "The Mayan civilization flourished in Guatemala and surrounding regions during the first millennium A.D. After almost three centuries as a Spanish colony, Guatemala won its independence in 1821. During the second half of the 20th century, it experienced a variety of military and civilian governments, as well as a 36-year guerrilla war. in 1996, the government signed a peace agreement formally ending the conflict, which had left more than 100,000 people dead and had created, by some estimates, some 1 million refugees."
        ],
        "position": [
          {
            "x": -90.25,
            "y": 15.5,
            "longitude": -90.25,
            "latitude": 15.5
          }
        ],
        "latitude": [
          15.5
        ],
        "longitude": [
          -90.25
        ],
        "sourcepath": [
          "/home/lvaldez/dev/attivio/aie_5.5.1/conf/factbook/content/countries/gt.xml"
        ],
        "filename": [
          "gt.xml"
        ],
        "location": [
          "Central America, Bordering the North Pacific Ocean, Between El Salvador and Mexico, and Bordering the Gulf Of Honduras (Caribbean Sea) Between Honduras and Belize",
          "Guatemala",
          "Central American",
          "Argentina",
          "Brazil",
          "Chile",
          "US",
          "United States",
          "Central America"
        ],
        "company": [
          "Central American Free Trade Agreement",
          "CAFTA"
        ],
        "nationality": [
          "Spanish"
        ],
        "religion": [
          "Roman Catholic",
          "Protestant",
          "Indigenous Mayan Beliefs"
        ],
        "time": [
          "three centuries",
          "36-year",
          "36 years"
        ],
        "numbers": [
          "first",
          "1821",
          "second",
          "1996",
          "100,000",
          "1 million",
          "one",
          "one-fourth",
          "two-fifths",
          "56",
          "two-thirds"
        ],
        "img.uri.thumbnail": [
          "/factbook_resources/flags/gt-flag.gif"
        ],
        "img.uri.preview": [
          "/factbook_resources/maps/gt-map.gif"
        ],
        "morelikethisquery": [
          "OR(\"guatemala\",\"half\",\"government\",\"exports\",\"central\",\"american\",\"agreement\",\"investment\",\"gdp\",\"peace\",\"force\",\"increased\",\"foreign\",\"sector\",\"sugar\",\"income\",\"war\",\"trade\",\"equivalent\",\"year\",\"central american\",\"income equivalent\",\"trade deficit\",\"exports benefiting\",\"government signed\",\"trade agreement\",\"international donors\",\"important reforms\",\"income remains\",\"inflows serving\",\"expatriate community\",\"surrounding regions\",\"drug trafficking\",\"civil war\",\"civilian governments\",\"curtailing drug\",\"macroeconomic stabilization\",\"sector accounts\",\"spurred increased\",\"guerrilla war\",minimum=13)"
        ],
        "processing.feedback.level": [
          "ERROR",
          "WARN"
        ],
        "processing.feedback.message": [
          "Uncaught exception processing document",
          "Illegal field value for field 'extracteddate': Invalid ISO-8601 date '1 July 2006'"
        ],
        "processing.feedback.component": [
          "indexer.applyTriggers",
          "index.writer"
        ],
        "processing.feedback.code": [
          "TRIGGER-9",
          "SCHEMA-2"
        ],
        "country": [
          "Guatemala"
        ],
        "economy": [
          "Guatemala is the most populous of the Central American countries with a GDP per capita roughly one-half that of Argentina, Brazil, and Chile. the agricultural sector accounts for about one-fourth of GDP, two-fifths of exports, and half of the labor force. Coffee, sugar, and bananas are the main products, with sugar exports benefiting from increased global demand for ethanol. the 1996 signing of peace accords, which ended 36 years of civil war, removed a major obstacle to foreign investment, and Guatemala since then has pursued important reforms and macroeconomic stabilization. On 1 July 2006, the Central American Free Trade Agreement (CAFTA) entered into force between the US and Guatemala and has since spurred increased investment in the export sector. the distribution of income remains highly unequal with about 56% of the population below the poverty line. Other ongoing challenges include increasing government revenues, negotiating further assistance from international donors, upgrading both government and private financial operations, curtailing drug trafficking and rampant crime, and narrowing the trade deficit. Given Guatemala's large expatriate community in the United States, it is the top remittance recipient in Central America, with inflows serving as a primary source of foreign income equivalent to nearly two-thirds of exports."
        ],
        "map": [
          "Central America and the Caribbean"
        ],
        "climate": [
          "Tropical",
          "Hot, Humid in Lowlands",
          "Cooler in Highlands"
        ],
        "terrain": [
          "Mostly Mountains With Narrow Coastal Plains and Rolling Limestone Plateau"
        ],
        "resource": [
          "Petroleum",
          "Nickel",
          "Rare Woods",
          "Fish",
          "Chicle",
          "Hydropower"
        ],
        "spokenLanguage": [
          "Spanish",
          "Amerindian Languages"
        ],
        "ethnicity": [
          "Mestizo and European",
          "K",
          "Kaqchikel",
          "Mam",
          "Q",
          "Other Mayan",
          "Indigenous Non",
          "Other"
        ],
        "agriprod": [
          "Sugarcane",
          "Corn",
          "Bananas",
          "Coffee",
          "Beans",
          "Cardamom",
          "Cattle",
          "Sheep",
          "Pigs",
          "Chickens"
        ],
        "industry": [
          "Sugar",
          "Textiles and Clothing",
          "Furniture",
          "Chemicals",
          "Petroleum",
          "Metals",
          "Rubber",
          "Tourism"
        ],
        "laborForce": [
          3958000
        ],
        "unemploymentRate": [
          3.2
        ],
        "inflationRate": [
          6.6
        ],
        "publicDebt": [
          23.3
        ],
        "gdp.purchasePowerParity": [
          6.7449999E10
        ],
        "gdp.officialExchangeRate": [
          3.13499996E10
        ],
        "gdp.growthRate": [
          5.6
        ],
        "gdp.growthRatePerCapita": [
          5400.0
        ],
        "sentiment": [
          "pos"
        ],
        "sentiment.score": [
          1.0
        ],
        "entity.sentiment.pos": [
          "Guatemala",
          "36 Years",
          "1996"
        ],
        "entity.sentiment.pos.score": [
          0.9275722,
          1.238652,
          1.5202101
        ],
        "sonar.run.number": [
          1505503566080
        ],
        "sonar.create.date": [
          "2017-09-15T15:26:20.000-0400"
        ],
        "sonar.update.date": [
          "2017-09-15T15:26:20.000-0400"
        ],
        "sonar.content": [
          "Guatemala",
          "The Mayan civilization flourished in Guatemala and surrounding regions during the first millennium A.D. After almost three centuries as a Spanish colony, Guatemala won its independence in 1821. During the second half of the 20th century, it experienced a variety of military and civilian governments, as well as a 36-year guerrilla war. in 1996, the government signed a peace agreement formally ending the conflict, which had left more than 100,000 people dead and had created, by some estimates, some 1 million refugees.",
          "Central America, Bordering the North Pacific Ocean, Between El Salvador and Mexico, and Bordering the Gulf Of Honduras (Caribbean Sea) Between Honduras and Belize",
          "Guatemala",
          "Central American",
          "Argentina",
          "Brazil",
          "Chile",
          "US",
          "United States",
          "Central America",
          "Central American Free Trade Agreement",
          "CAFTA"
        ],
        "security.read": [
          "anonymous:anonymous"
        ]
      },
      "signal": {
        "principal": "Anonymous:Administrator:Administrator",
        "docId": "country-/home/lvaldez/dev/attivio/aie_5.5.1/conf/factbook/content/countries/gt.xml",
        "docOrdinal": 10,
        "featureVector": "table_country=1.0,freshness=0.28346974,content=0.22418204",
        "query": "America",
        "locale": "en",
        "relevancyModelName": "default",
        "relevancyModelVersion": 0,
        "relevancyModelNames": [
          "default"
        ],
        "queryTimestamp": 1505504165774,
        "signalTimestamp": 1505504165832,
        "type": "click",
        "weight": 1.0,
        "ttl": true
      }
    }
  ];

/* eslint-enable quote-props */

const documents = documentsJson.map((documentJson) => {
  return SearchDocument.fromJson(documentJson);
});

const fieldsCopy = new Map(documents[9].fields);
const docWithChildren = new SearchDocument(fieldsCopy);
docWithChildren.children = documents.slice(0, 9);

const sampleDocs = {
  rawDocuments: documents,
  honduras: documents[1],
  caymans: documents[2],
  elsalvador: documents[3],
  bolivia: documents[4],
  docWithChildren,
};

export default sampleDocs;
