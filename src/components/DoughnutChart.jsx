import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ style, data }) => {
  const chartData = {
    labels: ['Lucro', 'Perda'],
    datasets: [
      {
        data: data,
        backgroundColor: ['#02BF44', '#FF3531'],
        hoverBackgroundColor: ['#02BF44', '#FF3531'],
        borderWidth: 0
      },
    ]
  };

  return (
    <Doughnut style={style} data={chartData} options={{
      cutoutPercentage: 100,
    }} />
  );
};

export default DoughnutChart;
