const { createMemoryHistory } = require('history');

const historyMock = createMemoryHistory({
  initialEntries: ['/'],
  initialIndex: 0,
  keyLength: 6,
  getUserConfirmation: null
});

export default historyMock;
