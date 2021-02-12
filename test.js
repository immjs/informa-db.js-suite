(async () => {
  const { DbSuite } = require('.');
  const TestDb = await new DbSuite(require('path').join(__dirname, 'something.json'), {
    features: {
      multiInstancing: true,
    },
  });
})()