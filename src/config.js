module.exports = {
  // Node.js app
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',

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
    discovery: {
      username:
        process.env.WATSON_DISCOVERY_USERNAME ||
        'c8a98ed7-fdb8-4e3d-aa54-d8ca23238a04',
      password: process.env.WATSON_DISCOVERY_PASSWORD || 'rXaCCQnDQLlM',
      url:
        process.env.WATSON_DISCOVERY_URL ||
        'https://gateway.watsonplatform.net/discovery/api',
      collection: process.env.WATSON_DISCOVERY_COLLECTION || 'news',
      environment: process.env.WATSON_DISCOVERY_ENVIRONMENT || 'system',
      version_date: process.env.WATSON_DISCOVERY_VERSION_DATE || '2017-11-07',
    },
  },
};
