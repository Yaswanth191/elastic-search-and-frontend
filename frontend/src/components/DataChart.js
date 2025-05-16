import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';

const DataChart = ({ title, data, loading, type }) => {
  if (loading || !data) {
    return <div className="chart-container">Loading chart data...</div>;
  }

  const chartData = data.map(item => ({
    name: item.key_as_string || item.key,
    value: item.avg_value?.value || item.doc_count
  }));

  return (
    <div className="chart-container">
      <h3>{title}</h3>
      {type === 'bar' ? (
        <BarChart width={500} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      ) : (
        <LineChart width={500} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#82ca9d" />
        </LineChart>
      )}
    </div>
  );
};

export default DataChart;