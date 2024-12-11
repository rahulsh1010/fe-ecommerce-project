// src/components/CSVUploader.tsx
import React, { useState } from 'react';
import { parseCSV } from '../utils/csvHandler';

interface CSVUploaderProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onDataLoad: (data: any[]) => void;
}

const CSVUploader: React.FC<CSVUploaderProps> = ({ onDataLoad }) => {
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const data = await parseCSV(file);
                // console.log(data);
                
                onDataLoad(data); // Pass parsed data to the parent component
                setError(null);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                setError('Failed to parse CSV file.');
            }
        }
    };

    return (
        <div>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default CSVUploader;
