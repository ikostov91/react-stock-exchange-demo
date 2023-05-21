import { useState, useEffect } from 'react';
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
import ChartWrapper from './chart-wrapper';
import { mapChartData } from '../helpers';

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
  const [chartData, setChartData] = useState([]);

  const dataset = 'BOM504991';

  useEffect(() => {
    fetch(`api/v3/datasets/${process.env.REACT_APP_DATABASE}/${dataset}/data.json?column_index=1&column_index=4&api_key=${process.env.REACT_APP_API_KEY}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      }
    })
      .then(res => res.json())
      .then(dataset => {
        setChartData(mapChartData(dataset));
      })
      .catch((err) => {
        console.error(err);
     });
  }, []);

  const data = {
    labels: chartData.map(x => x.label),
    datasets: [
      {
        label: 'Dataset',
        data: chartData.map(x => x.value),
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
    <ChartWrapper hasData={!!chartData.length}>
      <Line
        height={100}
        data={data}
        options={chartOptions}
      />
    </ChartWrapper>
  )
};

export default LineChart;
