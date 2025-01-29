// src/components/PieChart.jsx
import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";

// Register components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const {userandpost}=useSelector(store=>store.admin);
  // Data for the Pie Chart
  const data = {
    labels: ["male","female"],
    datasets: [
      {
        label: "User",
        data: [userandpost?.maleuser?.length, userandpost?.femaleuser?.length],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          // "rgba(255, 206, 86, 0.6)",
          // "rgba(75, 192, 192, 0.6)",
          // "rgba(153, 102, 255, 0.6)",
          // "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Options for the Pie Chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "User Gender wise",
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
