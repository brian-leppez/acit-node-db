module.exports = {
  // Node.js app
  port: process.env.PORT || 3000,
  host: process.env.VCAP_APP_HOST || 'localhost',

  watson: {
    conversation: {
      username:
        process.env.WATSON_CONVERSATION_USERNAME ||
        'b561725d-5b1b-4234-9725-85c2c3c89a98',
      password: process.env.WATSON_CONVERSATION_PASSWORD || 'RvczJqPvZUhI',
      workspace:
        process.env.WATSON_CONVERSATION_WORKSPACE ||
        'ec98a505-4776-45e9-bd24-cc252b368df6',
    },
  },
};
