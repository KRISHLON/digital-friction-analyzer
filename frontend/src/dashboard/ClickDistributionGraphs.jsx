import React, { useEffect, useState } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ClickDistributionGraphs() {
    const [data, setData] = useState({ pie: [], line: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/dashboard/charts');
                const json = await res.json();
                setData(json);
            } catch (e) { console.error(e); }
        };
        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    const pieChartOptions = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#94a3b8',
                    font: { size: 12 }
                }
            }
        }
    };

    const lineChartOptions = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#94a3b8',
                    font: { size: 12 }
                }
            }
        },
        scales: {
            x: {
                ticks: { color: '#94a3b8' },
                grid: { color: 'rgba(148, 163, 184, 0.1)' }
            },
            y: {
                ticks: { color: '#94a3b8' },
                grid: { color: 'rgba(148, 163, 184, 0.1)' }
            }
        }
    };

    const pieData = {
        labels: data.pie.map(d => d.page_url),
        datasets: [{
            data: data.pie.map(d => d.count),
            backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
        }]
    };

    const lineData = {
        labels: data.line.map(d => `Session ${d.session_id.substring(0,4)}`),
        datasets: [{
            label: 'Clicks per Session',
            data: data.line.map(d => d.count),
            borderColor: '#8b5cf6',
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            tension: 0.3
        }]
    };

    const cardStyle = {
        background: 'var(--bg-card)',
        backdropFilter: 'blur(20px)',
        padding: '1.5rem',
        borderRadius: '16px',
        border: '1px solid var(--border)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
    };

    const headingStyle = {
        color: '#f1f5f9',
        fontSize: '1.125rem',
        fontWeight: '600',
        marginBottom: '1rem'
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', margin: '1.5rem 0' }}>
            <div style={cardStyle}>
                <h3 style={headingStyle}>Clicks per Page</h3>
                <div style={{ height: '300px', display: 'flex', justifyContent: 'center' }}>
                    <Pie data={pieData} options={pieChartOptions} />
                </div>
            </div>
            <div style={cardStyle}>
                <h3 style={headingStyle}>Session Activity Timeline</h3>
                <div style={{ height: '300px' }}>
                    <Line data={lineData} options={lineChartOptions} />
                </div>
            </div>
        </div>
    );
}
