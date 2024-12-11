// src/BarChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { RowData } from '../Table/DataTable';  // Import RowData from DataTable

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const BarChart = ({ data }: { data: RowData[] }) => {
    const categories = [...new Set(data.map(item => item.Category))];
    const revenue = categories.map(category =>
        data
            .filter(item => item.Category === category)
            .reduce((sum, curr) => sum + parseFloat(curr["Total Sale Value"]), 0)
    );
console.log(revenue, "rev");

    const barChartData = {
        labels: categories,
        datasets: [
            {
                label: 'Revenue',
                data: revenue,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    return <Bar data={barChartData} />;
};
