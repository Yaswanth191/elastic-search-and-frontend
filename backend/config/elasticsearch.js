const { Client } = require('@elastic/elasticsearch');
require('dotenv').config();

const elasticClient = new Client({
  node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
  auth: {
    username: process.env.ELASTIC_USERNAME || 'elastic',
    password: process.env.ELASTIC_PASSWORD || 'changeme'
  }
});

// Create index if it doesn't exist
async function initialize() {
  try {
    const indexExists = await elasticClient.indices.exists({ index: 'sample_data' });
    if (!indexExists) {
      await elasticClient.indices.create({
        index: 'sample_data',
        body: {
          mappings: {
            properties: {
              timestamp: { type: 'date' },
              value: { type: 'float' },
              category: { type: 'keyword' },
              description: { type: 'text' }
            }
          }
        }
      });

      // Insert sample data
      const sampleData = Array.from({ length: 100 }, (_, i) => ({
        timestamp: new Date(Date.now() - i * 3600000),
        value: Math.random() * 100,
        category: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
        description: `Sample item ${i}`
      }));

      const body = sampleData.flatMap(doc => [
        { index: { _index: 'sample_data' } },
        doc
      ]);

      await elasticClient.bulk({ body });
    }
  } catch (error) {
    console.error('Elasticsearch initialization error:', error);
  }
}

module.exports = { elasticClient, initialize };