// src/components/DoughnutChart.jsx
import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
  } from "chart.js";
import { useSelector } from "react-redux";
  
 
  ChartJS.register(ArcElement, Tooltip, Legend);
  

const DoughnutChart = () => {
  
    const {userandpost}=useSelector(store=>store.admin);

  const data = {
    labels: ["Users", "Posts"],
    datasets: [
      {
        label: "Platform Activity",
        data: [userandpost?.user?.length, userandpost?.post?.length ], // Example data
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)", // Green
          "rgba(255, 99, 132, 0.6)", // Red
          "rgba(255, 205, 86, 0.6)", // Yellow
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 205, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Options for the Doughnut Chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Platform Activity Distribution",
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
