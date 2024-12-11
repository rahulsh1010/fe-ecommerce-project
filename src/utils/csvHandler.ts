import Papa from 'papaparse';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseCSV = (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true, // Ensure data is parsed as an array of objects
            skipEmptyLines: true,
            complete: (results) => resolve(results.data),
            error: (error) => reject(error),
        });
    });
};
