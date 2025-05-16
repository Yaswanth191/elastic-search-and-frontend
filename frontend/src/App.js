import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import './styles.css';

function App() {
  const [data, setData] = useState([]);
  const [aggregations, setAggregations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3001/api/data/search?query=${searchQuery}&category=${categoryFilter}`
        );
        const result = await response.json();
        // Map the array of hits to just the _source objects for easier use
        setData(result.map(hit => hit._source));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAggregations = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/data/aggregations');
        const result = await response.json();
        setAggregations(result);
      } catch (error) {
        console.error('Error fetching aggregations:', error);
      }
    };

    fetchData();
    fetchAggregations();
  }, [searchQuery, categoryFilter]);

  return (
    <div className="app">
      <h1>Elasticsearch Dashboard</h1>
      <Dashboard 
        data={data} 
        aggregations={aggregations} 
        loading={loading}
        onSearch={setSearchQuery}
        onCategoryFilter={setCategoryFilter}
      />
    </div>
  );
}

export default App;
