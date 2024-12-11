import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { RowData } from '../Table/DataTable';  // Import RowData from DataTable

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend);

export const LineChart = ({ data }: { data: RowData[] }) => {
    const months = [...new Set(data.map(item => new Date(item["Date of Sale"]).toLocaleString('default', { month: 'short' })))];
    const monthlySales = months.map(month =>
        data
            .filter(item => new Date(item["Date of Sale"]).toLocaleString('default', { month: 'short' }) === month)
            .reduce((sum, curr) => sum + parseFloat(curr["Total Sale Value"]), 0)
    );

    const lineChartData = {
        labels: months,
        datasets: [
            {
                label: 'Monthly Sales',
                data: monthlySales,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
            },
        ],
    };

    return <Line data={lineChartData} />;
};
