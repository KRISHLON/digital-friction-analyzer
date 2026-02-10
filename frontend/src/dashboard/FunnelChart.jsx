import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { api } from '../api';

export default function FunnelChart() {
    const [funnelData, setFunnelData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getFunnels().then(data => {
            setFunnelData(data);
            setLoading(false);
        });
    }, []);

    const data = {
        labels: funnelData.map(d => d.stage),
        datasets: [
            {
                label: 'Users at Stage',
                data: funnelData.map(d => d.count),
                backgroundColor: [
                    'rgba(0, 242, 234, 0.8)',
                    'rgba(121, 40, 202, 0.8)',
                    'rgba(255, 0, 128, 0.8)',
                ],
                borderRadius: 8,
            }
        ],
    };

    const options = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    afterBody: (context) => {
                        const index = context[0].dataIndex;
                        if (index > 0) {
                            const prevCount = funnelData[index - 1].count;
                            const currentCount = funnelData[index].count;
                            const dropoff = prevCount > 0 ? ((1 - currentCount / prevCount) * 100).toFixed(1) : 0;
                            return `Drop-off: ${dropoff}%`;
                        }
                        return '';
                    }
                }
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: '#94a3b8' }
            },
            y: {
                grid: { display: false },
                ticks: { color: '#94a3b8', font: { weight: 'bold' } }
            }
        }
    };

    if (loading) return <div>Loading Funnel...</div>;

    return (
        <div className="card" style={{ 
            background: 'var(--bg-card)', 
            padding: '1.5rem', 
            borderRadius: '16px', 
            border: '1px solid var(--border)',
            height: '300px',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                User Journey Funnel
            </h3>
            <div style={{ flex: 1 }}>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}
