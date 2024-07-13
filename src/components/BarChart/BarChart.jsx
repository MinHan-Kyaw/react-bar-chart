import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import "./BarChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  // Process data into a flat structure
  const processedData = data.flatMap((yearObj) =>
    Object.entries(yearObj).flatMap(([year, months]) =>
      months.flatMap((monthObj) =>
        Object.entries(monthObj).flatMap(([month, days]) =>
          days.flatMap((dayObj) =>
            Object.entries(dayObj).map(([dateTime, value]) => {
              const [datePart] = dateTime.split(" , ");
              const day = datePart.split("/").pop();
              const date = `${day}`;
              return {
                year,
                month,
                date,
                value,
              };
            })
          )
        )
      )
    )
  );

  // Prepare chart data
  const chartData = {
    labels: processedData.map(
      (item) => `${item.year}/${item.month}/${item.date}`
    ),
    datasets: [
      {
        label: "Values",
        data: processedData.map((item) => item.value),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };
  
  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Data Chart",
      },
      tooltip: {
        callbacks: {
          label: (context) => `Value: ${context.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date and Time",
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="bar-chart-container">
      <div className="bar-chart">
        <Bar
          data={chartData}
          options={options}
          style={{ width: "800px", height: "400px" }}
        />
      </div>
    </div>
  );
};

BarChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default BarChart;
