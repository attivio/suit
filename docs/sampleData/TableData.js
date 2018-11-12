import Table from '../../src/components/Table';

const Samples = {
  customerEngagementSimpleColumns: [
    new Table.TableColumn('Customer', 'customer'),
    new Table.TableColumn('Engagement', 'engagement'),
    new Table.TableColumn('Self-Service Usage', 'selfServe'),
    new Table.TableColumn('Tickets Created', 'tickets'),
  ],
  customerEngagementRows: [
    {
      id: 'public-aapl',
      customer: 'Apple',
      engagement: 52.80,
      selfServe: 188232,
      tickets: 72,
      engagementHistory: [1, 2, 3, 4, 5],
      selfServeHistory: [1, 2, 3, 4, 5],
      ticketHistory: [1, 2, 3, 4, 5],
    },
    {
      id: 'private-condenast',
      customer: 'Condé Nast',
      engagement: 72.48,
      selfServe: 472321,
      tickets: 47,
      engagementHistory: [1, 2, 3, 4, 5],
      selfServeHistory: [1, 2, 3, 4, 5],
      ticketHistory: [1, 2, 3, 4, 5],
    },
    {
      id: 'public-xom',
      customer: 'Exxon',
      engagement: 128.82,
      selfServe: 12239,
      tickets: 43,
      engagementHistory: [1, 2, 3, 4, 5],
      selfServeHistory: [1, 2, 3, 4, 5],
      ticketHistory: [1, 2, 3, 4, 5],
    },
    {
      id: 'public-msft',
      customer: 'Microsoft',
      engagement: 73.72,
      selfServe: 72382,
      tickets: 29,
      engagementHistory: [1, 2, 3, 4, 5],
      selfServeHistory: [1, 2, 3, 4, 5],
      ticketHistory: [1, 2, 3, 4, 5],
    },
    {
      id: 'public-amzn',
      customer: 'Amazon',
      engagement: 18.87,
      selfServe: 93272,
      tickets: 11,
      engagementHistory: [1, 2, 3, 4, 5],
      selfServeHistory: [1, 2, 3, 4, 5],
      ticketHistory: [1, 2, 3, 4, 5],
    },
    {
      id: 'public-ge',
      customer: 'GE',
      engagement: 75.42,
      selfServe: 134,
      tickets: 4,
      engagementHistory: [1, 2, 3, 4, 5],
      selfServeHistory: [1, 2, 3, 4, 5],
      ticketHistory: [1, 2, 3, 4, 5],
    },
  ],
  experts: {
    columns: [
      new Table.TableColumn('Category', 'category'),
      new Table.TableColumn('Sub-Category', 'subCategory'),
      new Table.TableColumn('Expert', 'expertName'),
    ],
    rows: [
      {
        id: 'fredjones@mycompany.com',
        expertName: 'Fred Jones',
        category: 'Finance',
        subCategory: 'Tax',
        reasons: [
          'Wrote 7 journal articles',
          'Used to close 17 tickets',
          'Is named Fred',
        ],
      },
      {
        id: 'mmcgivens@thelouvre.org',
        expertName: 'Millicent McGivens',
        category: 'Art',
        subCategory: 'Watercolors',
        reasons: [
          'Painted birdies',
          'Painted kitties',
          'Painted puppies',
        ],
      },
      {
        id: 'mzedong@greatwall.co.zh',
        expertName: '毛泽东',
        category: 'Dictatorships',
        subCategory: 'China',
        reasons: [
          'Led a revolution',
          'Founded the People\'s Republic of China',
          'Has a last name that means \'fur\'',
        ],
      },
    ],
  },
};

export default Samples;
