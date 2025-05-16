import React from 'react';
import DataChart from './DataChart';
import DataTable from './DataTable';
import SearchBar from './SearchBar';

const Dashboard = ({ data, aggregations, loading, onSearch, onCategoryFilter }) => {
  return (
    <div className="dashboard">
      <SearchBar 
        onSearch={onSearch} 
        onCategoryFilter={onCategoryFilter} 
      />
      
      <div className="dashboard-content">
        <div className="charts-section">
          <DataChart 
            title="Value Over Time" 
            data={aggregations?.value_over_time?.buckets} 
            loading={loading}
            type="line"
          />
          <DataChart 
            title="Average by Category" 
            data={aggregations?.by_category?.buckets} 
            loading={loading}
            type="bar"
          />
        </div>
        
        <div className="table-section">
          <DataTable data={data} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;