// src/components/LineChart.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
import { useSelector } from "react-redux";
  

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
  

const LineChart = () => {
  const {userandpost}=useSelector(store=>store.admin);
  const count1=Array(12).fill(0);
  const count2=Array(12).fill(0);

  userandpost?.postcreatedbymonth?.map((item)=>{
    count2[item._id - 1 ]=item.count;
  })

  userandpost?.usercreatedbymonth?.map((item)=>{
    count1[item._id - 1]=item.count;
  })
  // Data for the Line Chart
  const data = {
    labels: ["January", "February", "March", "April", "May", "June","July","August","September","October","November","December"],
    datasets: [
      {
        label: "users created by month",
        data: count1,
        borderColor: "rgba(75, 192, 192, 1)", // Line color
        backgroundColor: "rgba(75, 192, 192, 0.3)", // Fill under the line
        pointBackgroundColor: "rgba(75, 192, 192, 1)", // Point color
        pointBorderColor: "#fff", // Border color of the points
        pointHoverRadius: 8, // Hover effect size
        borderWidth: 2, // Thickness of the line
        tension: 0.4, // Curved line effect
        fill: true, // Fill the area under the line
      },
      {
        label: " posts created by month",
        data: count2,
        borderColor: "#0f0", // Line color
        backgroundColor: "rgba(75, 192, 192, 0.3)", // Fill under the line
        pointBackgroundColor: "rgba(75, 192, 192, 1)", // Point color
        pointBorderColor: "#fff", // Border color of the points
        pointHoverRadius: 8, // Hover effect size
        borderWidth: 2, // Thickness of the line
        tension: 0.4, // Curved line effect
        fill: true, // Fill the area under the line
      },
    ],
  };

  // Options for the Line Chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "users and post ",
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide vertical grid lines
        },
      },
      y: {
        grid: {
          color: "rgba(200, 200, 200, 0.2)", // Custom grid color
        },
        beginAtZero: true, // Start from 0
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
