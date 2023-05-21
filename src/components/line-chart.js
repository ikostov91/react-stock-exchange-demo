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
import { useSelector } from 'react-redux';

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
  const { selectedCompany, chartData, chartLoading } = useSelector((state) => state.appReducer);

  const data = {
    labels: chartData.map(x => x.label),
    datasets: [
      {
        label: selectedCompany?.label || '',
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
    <ChartWrapper hasData={!!chartData.length} isLoading={chartLoading}>
      <Line
        height={100}
        data={data}
        options={chartOptions}
      />
    </ChartWrapper>
  )
};

export default LineChart;
