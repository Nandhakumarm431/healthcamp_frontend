import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MonthlyCampPatientChart = ({ data }) => {
  // Get a unique list of all camp names
  const allCamps = Array.from(new Set(data.flatMap(item => item.camps.map(camp => camp.name))));

  // Preprocess data to ensure each month has a count for every camp
  const chartData = {
    labels: data.map(item => item.month),
    datasets: allCamps.map(campName => {
      const campColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`;
      return {
        label: campName,
        data: data.map(monthData => {
          const camp = monthData.camps.find(c => c.name === campName);
          return camp ? camp.patientCount : 0;
        }),
        backgroundColor: campColor,
        borderColor: campColor.replace('0.2', '1'),
        borderWidth: 1,
      };
    }),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Month-wise Dummy Camp and Patient Counts',
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default MonthlyCampPatientChart;
