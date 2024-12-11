// src/App.tsx
import React, { useState } from 'react';
import DataTable from './components/Table/DataTable';
import CSVUploader from './components/CSVUploader';

const App = () => {
    const [tableData, setTableData] = useState<any[]>([]);

    const handleDataLoad = (data: any[]) => {
        setTableData(data);
    };

    return (
        <div>
            <h1>E-Commerce Analytics Dashboard</h1>
            <CSVUploader onDataLoad={handleDataLoad} />
            {tableData.length > 0 ? (
                <DataTable data={tableData} />
            ) : (
                <p>No data loaded. Please upload a CSV file.</p>
            )}
        </div>
    );
};

export default App;
