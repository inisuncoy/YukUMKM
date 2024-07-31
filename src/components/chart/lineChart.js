import React from 'react';
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  LineController,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Registrasikan komponen-komponen Chart.js
Chart.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  LineController,
  Title,
  Tooltip,
  Legend
);

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const LineChart = ({ income, expense }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Pemasukan',
        backgroundColor: '#6366F1',
        borderColor: '#6366F1',
        data: income,
      },
      {
        label: 'Pengeluaran',
        backgroundColor: ' #FF3D00',
        borderColor: ' #FF3D00',
        data: expense,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
      },
      y: {
        min: 0,
        max: 10000000,
        display: true,
        ticks: {
          callback: function (value) {
            return 'Rp. ' + value.toLocaleString();
          },
        },
      },
    },
  };
  return (
    <div style={{ position: 'relative', width: '100%', height: '400px' }}>
      <Line options={options} data={data} />
    </div>
  );
};

export default LineChart;
