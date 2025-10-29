import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardCharts = ({ eventStats, deptStats }) => {
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#4b5563',
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                },
            },
            title: {
                display: true,
                font: {
                    size: 18,
                    weight: 'bold',
                },
                color: '#1e293b',
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                titleFont: { size: 16 },
                bodyFont: { size: 14 },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#4b5563',
                    font: {
                        size: 12,
                    },
                    stepSize: 1,
                },
                grid: {
                    color: '#e5e7eb',
                },
            },
            x: {
                ticks: {
                    color: '#4b5563',
                    font: {
                        size: 12,
                    },
                },
                grid: {
                    display: false,
                },
            },
        },
    };

    const deptData = {
        labels: deptStats.map(d => d.dept),
        datasets: [{
            label: 'Registrations per Department',
            data: deptStats.map(d => d.registrations),
            backgroundColor: 'rgba(102, 126, 234, 0.6)',
            borderColor: 'rgba(102, 126, 234, 1)',
            borderWidth: 2,
            borderRadius: 5,
        }],
    };

    return (
        <div className="grid grid-cols-1 gap-8 mb-10">
            <div className="tool-section chart-container">
                <Bar options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins.title, text: 'Department Registrations' } } }} data={deptData} />
            </div>
        </div>
    );
};

export default DashboardCharts;