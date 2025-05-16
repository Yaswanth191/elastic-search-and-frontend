const { elasticClient } = require('../config/elasticsearch');

exports.searchData = async (req, res) => {
  try {
    const { query, category, from = 0, size = 10 } = req.query;
    
    const searchQuery = {
      index: 'sample_data',
      from: parseInt(from),
      size: parseInt(size),
      body: {
        query: {
          bool: {
            must: []
          }
        },
        sort: [{ timestamp: { order: 'desc' } }]
      }
    };

    if (query) {
      searchQuery.body.query.bool.must.push({
        multi_match: {
          query,
          fields: ['description'],
          fuzziness: 'AUTO'
        }
      });
    }

    if (category) {
      searchQuery.body.query.bool.must.push({
        term: { category }
      });
    }

    if (searchQuery.body.query.bool.must.length === 0) {
      searchQuery.body.query = { match_all: {} };
    }

    const result = await elasticClient.search(searchQuery);
    res.json(result.body.hits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAggregatedData = async (req, res) => {
  try {
    const result = await elasticClient.search({
      index: 'sample_data',
      size: 0,
      body: {
        aggs: {
          by_category: {
            terms: { field: 'category' },
            aggs: {
              avg_value: { avg: { field: 'value' } }
            }
          },
          value_over_time: {
            date_histogram: {
              field: 'timestamp',
              calendar_interval: 'hour',
              min_doc_count: 1
            },
            aggs: {
              avg_value: { avg: { field: 'value' } }
            }
          }
        }
      }
    });

    res.json(result.body.aggregations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};