import React, { useEffect, useState } from 'react';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import { api } from '../api';

export default function AcademicDashboard() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            const data = await api.getAcademicStats();
            setStats(data);
        };
        fetchStats();
        const interval = setInterval(fetchStats, 5000);
        return () => clearInterval(interval);
    }, []);

    if (!stats) return <div style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem' }}>Loading Academic Insights...</div>;

    const patternData = {
        labels: stats.patterns.map(p => p.primary_pattern),
        datasets: [{
            data: stats.patterns.map(p => p.count),
            backgroundColor: ['#8b5cf6', '#ef4444', '#10b981', '#f59e0b', '#3b82f6'],
            borderWidth: 0
        }]
    };

    const debtData = {
        labels: stats.uxDebt.map(d => d.page_url),
        datasets: [{
            label: 'UX Debt Index',
            data: stats.uxDebt.map(d => d.debt_index),
            backgroundColor: 'rgba(239, 68, 68, 0.6)',
            borderRadius: 8
        }]
    };

    const loadData = {
        labels: stats.cognitiveLoad.map(l => l.page_url),
        datasets: [{
            label: 'Avg Cognitive Load Proxy',
            data: stats.cognitiveLoad.map(l => l.avg_load),
            backgroundColor: 'rgba(59, 130, 246, 0.6)',
            borderRadius: 8
        }]
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            {/* Pattern Analysis */}
            <div className="card" style={cardStyle}>
                <h3 style={titleStyle}>Behavioral Pattern Distribution</h3>
                <div style={{ height: '220px', display: 'flex', justifyContent: 'center' }}>
                    <Doughnut data={patternData} options={{ maintainAspectRatio: false }} />
                </div>
                <p style={descStyle}>Categorizing users based on interaction styles (e.g., Frustrated, Explorer).</p>
            </div>

            {/* UX Debt Leaderboard */}
            <div className="card" style={cardStyle}>
                <h3 style={titleStyle}>UX Debt Index (By Page)</h3>
                <div style={{ height: '220px' }}>
                    <Bar data={debtData} options={barOptions} />
                </div>
                <p style={descStyle}>Accumulated friction normalized by visit frequency.</p>
            </div>

            {/* Cognitive Load Proxy */}
            <div className="card" style={cardStyle}>
                <h3 style={titleStyle}>Cognitive Load Heatmap (Proxy)</h3>
                <div style={{ height: '220px' }}>
                    <Bar data={loadData} options={barOptions} />
                </div>
                <p style={descStyle}>Estimating interaction complexity based on element density.</p>
            </div>

            {/* Friction Escalation Timeline */}
            <div className="card" style={cardStyle}>
                <h3 style={titleStyle}>Recent Friction Escalation</h3>
                <div style={{ overflowY: 'auto', maxHeight: '220px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ color: '#94a3b8', fontSize: '0.75rem', textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                                <th style={{ padding: '0.5rem' }}>Session</th>
                                <th style={{ padding: '0.5rem' }}>Pattern</th>
                                <th style={{ padding: '0.5rem' }}>Friction Level</th>
                                <th style={{ padding: '0.5rem' }}>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.escalation.map((s, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.875rem' }}>
                                    <td style={{ padding: '0.5rem', color: '#fff' }}>{s.id.substring(0, 8)}</td>
                                    <td style={{ padding: '0.5rem' }}>
                                        <span style={{ 
                                            padding: '2px 8px', borderRadius: '4px', background: s.primary_pattern === 'Frustrated' ? '#ef444430' : '#3b82f630', color: s.primary_pattern === 'Frustrated' ? '#f87171' : '#60a5fa'
                                        }}>{s.primary_pattern}</span>
                                    </td>
                                    <td style={{ padding: '0.5rem', color: s.friction_level === 'High' ? '#f87171' : '#10b981' }}>{s.friction_level}</td>
                                    <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>{Math.round(s.total_friction_score)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

const cardStyle = {
    background: 'var(--bg-card)',
    padding: '1.5rem',
    borderRadius: '16px',
    border: '1px solid var(--border)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
};

const titleStyle = {
    marginBottom: '1rem',
    fontSize: '0.875rem',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '1px'
};

const descStyle = {
    marginTop: '1rem',
    fontSize: '0.75rem',
    color: '#64748b',
    textAlign: 'center'
};

const barOptions = {
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
        x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
    }
};
