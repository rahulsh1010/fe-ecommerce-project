import { useEffect, useState } from 'react';
import { BarChart } from './BarChart';
import { LineChart } from './LineChart';
import { PieChart } from './PieChart';
import { RowData } from '../Table/DataTable';  // Import RowData from DataTable

// Import Chart.js components
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components for chart types (Bar, Line, Pie, etc.)
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

// Card style for the chart container
const chartCardStyle = {
    // border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '20px',
    // margin: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

// Set the height and width of each chart
const chartStyle = {
    height: '400px', // Height of the chart
    width: '100%',   // Full width of the container
};

export const Charts = ({ data }: { data: RowData[] }) => {
    const [selectedChart, setSelectedChart] = useState<'bar' | 'line' | 'pie'>('bar'); // Default to BarChart

    // Function to handle chart selection
    const handleChartChange = (chart: 'bar' | 'line' | 'pie') => {
        setSelectedChart(chart);
    };

    // Clean up any previous charts when component unmounts or updates
    useEffect(() => {
        // Ensure the chart instance is destroyed properly
        return () => {
            // Optional: Logic to destroy the chart if you're using custom charts
            // For `react-chartjs-2`, this is usually handled automatically
        };
    }, [selectedChart]);

    return (
        <div>
            {/* Chart Selector Buttons */}
            <div>
                <button onClick={() => handleChartChange('bar')}>Bar Chart</button>
                <button onClick={() => handleChartChange('line')}>Line Chart</button>
                <button onClick={() => handleChartChange('pie')}>Pie Chart</button>
            </div>

            {/* Card for the selected chart */}
            {selectedChart === 'bar' && (
                <div style={chartCardStyle}>
                    <h3>Total Revenue by Category</h3>
                    <div style={chartStyle}>
                        <BarChart data={data} />
                    </div>
                </div>
            )}

            {selectedChart === 'line' && (
                <div style={chartCardStyle}>
                    <h3>Monthly Order Trends</h3>
                    <div style={chartStyle}>
                        <LineChart data={data} />
                    </div>
                </div>
            )}

            {selectedChart === 'pie' && (
                <div style={chartCardStyle}>
                    <h3>Order Status Distribution</h3>
                    <div style={chartStyle}>
                        <PieChart data={data} />
                    </div>
                </div>
            )}
        </div>
    );
};
