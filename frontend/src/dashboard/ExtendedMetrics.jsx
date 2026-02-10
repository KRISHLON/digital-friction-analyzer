import { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { api } from '../api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ExtendedMetrics = () => {
    const [frictionData, setFrictionData] = useState([]);
    const [pageMetrics, setPageMetrics] = useState([]);
    const [deadClicks, setDeadClicks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [friction, metrics, clicks] = await Promise.all([
                    api.getFrictionBreakdown(),
                    api.getPageMetrics(),
                    api.getDeadClicks()
                ]);
                
                setFrictionData(Array.isArray(friction) ? friction : []);
                setPageMetrics(Array.isArray(metrics) ? metrics : []);
                setDeadClicks(Array.isArray(clicks) ? clicks : []);
            } catch (err) {
                console.error("Dashboard Data Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: { color: '#94a3b8', font: { size: 12 } }
            }
        },
        scales: {
            x: {
                stacked: true,
                ticks: { color: '#94a3b8' },
                grid: { color: 'rgba(148, 163, 184, 0.05)' }
            },
            y: {
                stacked: true,
                beginAtZero: true,
                ticks: { color: '#94a3b8' },
                grid: { color: 'rgba(148, 163, 184, 0.05)' }
            }
        }
    };

    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
            legend: {
                labels: { color: '#94a3b8', font: { size: 12 } }
            }
        },
        scales: {
            x: {
                ticks: { color: '#94a3b8' },
                grid: { color: 'rgba(148, 163, 184, 0.05)' }
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                suggestedMin: 0,
                title: { display: true, text: 'Time (ms)', color: '#94a3b8' },
                ticks: { color: '#94a3b8' },
                grid: { color: 'rgba(148, 163, 184, 0.1)' }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                suggestedMin: 0,
                suggestedMax: 100,
                grid: { drawOnChartArea: false },
                title: { display: true, text: 'Scroll Depth (%)', color: '#94a3b8' },
                ticks: { color: '#94a3b8' }
            }
        }
    };

    const frictionChartData = {
        labels: frictionData.length > 0 ? frictionData.map(d => d.screen_name) : ['No Data'],
        datasets: [
            {
                label: 'Click Friction',
                data: frictionData.map(d => Math.max(0, 100 - (d.click || 100))),
                backgroundColor: 'rgba(0, 242, 234, 0.7)', 
            },
            {
                label: 'Time Friction',
                data: frictionData.map(d => Math.max(0, 100 - (d.time || 100))),
                backgroundColor: 'rgba(121, 40, 202, 0.7)',
            },
            {
                label: 'Nav Friction',
                data: frictionData.map(d => Math.max(0, 100 - (d.nav || 100))),
                backgroundColor: 'rgba(255, 0, 128, 0.7)',
            },
        ],
    };

    const ttiChartData = {
        labels: pageMetrics.length > 0 ? pageMetrics.map(d => d.page_url) : ['No Data'],
        datasets: [
            {
                label: 'Avg Time to First Click (ms)',
                data: pageMetrics.map(d => d.avg_tti || 0),
                borderColor: '#00f2ea',
                backgroundColor: 'rgba(0, 242, 234, 0.1)',
                yAxisID: 'y',
                tension: 0.3,
                fill: true
            },
             {
                label: 'Avg Max Scroll Depth (%)',
                data: pageMetrics.map(d => d.avg_scroll || 0),
                borderColor: '#7928ca',
                backgroundColor: 'rgba(121, 40, 202, 0.1)',
                yAxisID: 'y1',
                tension: 0.3,
                fill: true
            }
        ],
    };

    const deadClickData = {
        labels: deadClicks.length > 0 ? deadClicks.map(d => d.page_url) : ['No Data'],
        datasets: [
            {
                label: 'Dead Clicks',
                data: deadClicks.map(d => d.count),
                backgroundColor: 'rgba(255, 206, 86, 0.7)',
            }
        ]
    };

    const cardStyle = {
        background: 'var(--bg-card)',
        padding: '1.5rem',
        borderRadius: '16px',
        border: '1px solid var(--border)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        height: '350px',
        display: 'flex',
        flexDirection: 'column'
    };

    if (loading) return <div style={{ color: 'var(--primary)', textAlign: 'center', padding: '2rem' }}>Loading Analytics Data...</div>;

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', margin: '1.5rem 0' }}>
            <div style={cardStyle}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Friction Component Breakdown</h3>
                <div style={{ flex: 1 }}><Bar data={frictionChartData} options={chartOptions} /></div>
            </div>
            
            <div style={cardStyle}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Dead Clicks per Page</h3>
                <div style={{ flex: 1 }}><Bar data={deadClickData} options={chartOptions} /></div>
            </div>
            
            <div style={{ ...cardStyle, gridColumn: '1 / -1', height: '450px' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Interaction Timings & Scroll</h3>
                <div style={{ flex: 1 }}><Line data={ttiChartData} options={lineChartOptions} /></div>
            </div>
        </div>
    );
};

export default ExtendedMetrics;
