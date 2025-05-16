import React from 'react';

const DataTable = ({ data = [], loading }) => {
  if (loading) {
    return <div>Loading data...</div>;
  }

  if (!data.length) {
    return <div>No data found.</div>;
  }

  return (
    <div className="data-table">
      <h3>Search Results</h3>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Value</th>
            <th>Category</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{new Date(item._source.timestamp).toLocaleString()}</td>
              <td>{item._source.value.toFixed(2)}</td>
              <td>{item._source.category}</td>
              <td>{item._source.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
