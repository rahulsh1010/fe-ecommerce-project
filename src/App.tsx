import { useState } from 'react';
import DataTable from './components/Table/DataTable';
import CSVUploader from './components/CSVUploader';

const App = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [tableData, setTableData] = useState<any[]>([]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
