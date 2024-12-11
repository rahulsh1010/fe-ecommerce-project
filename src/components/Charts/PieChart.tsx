import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { RowData } from '../Table/DataTable';  // Import RowData from DataTable

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = ({ data }: { data: RowData[] }) => {
    // Get the distribution of order statuses or categories (or any other categorical field)
    const orderStatuses = [...new Set(data.map(item => item["Delivery Status"]))];
    const statusCounts = orderStatuses.map(status =>
        data.filter(item => item["Delivery Status"] === status).length
    );

    const pieChartData = {
        labels: orderStatuses,
        datasets: [
            {
                data: statusCounts,
                backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1'],  // Customize colors as needed
            },
        ],
    };

    return <Pie data={pieChartData} />;
};
