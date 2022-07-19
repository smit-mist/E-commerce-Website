import React from "react";
import Sidebar from "./Sidebar.jsx";
import "./dashboard.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";


import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,ArcElement,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line, Doughnut } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,ArcElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const Dashboard = () => {
    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
          {
            label: "TOTAL AMOUNT",
            backgroundColor: ["tomato"],
            hoverBackgroundColor: ["rgb(197, 72, 49)"],
            data: [0, 23],
          },
        ],
      };
    
      

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [56, 70],
      },
    ],
  };
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹ 2000
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>20</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>100</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>6</p>
            </Link>
          </div>
        </div>
        <div className="lineChart">
          <Line data={lineState}/>
        </div>

        
        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
