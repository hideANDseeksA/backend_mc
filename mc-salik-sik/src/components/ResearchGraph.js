import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './ResearchGraph.css'; 


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ResearchGraph = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Number of Research Entries',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/api/Research-graph');
      const result = await response.json();

      const labels = result.map(item => item.year);
      const counts = result.map(item => item.count);

      setData({
        labels: labels,
        datasets: [
          {
            label: 'Number of Research Entries',
            data: counts,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
          },
        ],
      });
    };

    fetchData();
  }, []);

  const options = {
    maintainAspectRatio: false, 
    responsive: true,
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
          precision: 0, 
        },
      },
    },
  };

  return (
    <div className="graph-container">
      <h2>Research Over the Years</h2>
      <div className="chart-wrapper">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default ResearchGraph;
