import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const [chartData, setChartData] = useState([{
    label: 'Point 1',
    data: 1
  }, {
    label: 'Point 2',
    data: 2
  }, {
    label: 'Point 3',
    data: 3
  }]);

  const data = {
    labels: chartData.map(x => x.label),
    datasets: [
      {
        label: 'Dataset',
        data: chartData.map(x => x.data),
        borderColor: '#012661',
        backgroundColor: '#012661',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    animation: { duration: 500 },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: 'black',
        }
      }
    },
    plugins: {
      legend: {
        display: true
      }
    }
  };

  return (
    <Line
      height={100}
      data={data}
      options={chartOptions}
    />
  )
};

export default LineChart;
