import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { api } from '../api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function FrictionChart() {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        api.getScores().then(setScores);
    }, []);

    const data = {
        labels: scores.map(s => s.screen_name),
        datasets: [
            {
                label: 'Avg Friction Score (Higher is Better)',
                data: scores.map(s => s.avg_score),
                backgroundColor: 'rgba(37, 99, 235, 0.5)',
                borderColor: 'rgba(37, 99, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Screen Friction Analysis' },
        },
        scales: {
            y: { beginAtZero: true, max: 100 }
        }
    };

    return (
        <div className="card" style={{ marginBottom: '20px' }}>
            <Bar options={options} data={data} />
        </div>
    );
}
