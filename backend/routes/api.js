const { client } = require('../config/elasticsearch');

async function searchData(req, res) {
  const { query = '', category = '' } = req.query;
  try {
    const esQuery = {
      index: 'demo-data',
      body: {
        query: {
          bool: {
            must: query ? [{ match: { description: query } }] : [{ match_all: {} }],
            filter: category ? [{ term: { category: category } }] : []
          }
        }
      }
    };

    const result = await client.search(esQuery);
    res.json(result.hits.hits);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Failed to search data' });
  }
}

async function getAggregatedData(req, res) {
  try {
    const result = await client.search({
      index: 'demo-data',
      body: {
        size: 0,
        aggs: {
          categories: {
            terms: { field: 'category.keyword' }
          }
        }
      }
    });

    res.json(result.aggregations);
  } catch (err) {
    console.error('Aggregation error:', err);
    res.status(500).json({ error: 'Failed to get aggregations' });
  }
}

module.exports = {
  searchData,
  getAggregatedData
};
