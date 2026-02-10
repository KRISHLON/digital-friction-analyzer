import React, { useEffect, useState } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { api } from '../api';
import QualityScoreCard from './QualityScoreCard';
import MetricScales from './MetricScales';

export default function AdvancedMetricsDashboard() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            const data = await api.getAdvancedStats();
            setStats(data);
        };
        fetchStats();
        const interval = setInterval(fetchStats, 6000);
        return () => clearInterval(interval);
    }, []);

    if (!stats) return <div style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem' }}>Loading Advanced Analytics...</div>;

    // Charts Data


    const userComparisonData = {
        labels: stats.userComparison.map(u => u.is_returning_user ? 'Returning' : 'First-Time'),
        datasets: [{
            label: 'Avg Friction',
            data: stats.userComparison.map(u => u.avg_friction || 0),
            backgroundColor: ['#3b82f6', '#8b5cf6']
        }]
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {/* Quality Score (Tier 1) */}
            <div className="card" style={{ ...cardStyle, background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)' }}>
                <QualityScoreCard score={stats.avgQuality || 100} />
            </div>

            {/* Behavioral Metrics (Tier 2) */}
            <div className="card" style={{ ...cardStyle, gridRow: 'span 2' }}>
                <MetricScales 
                    drift={stats.avgDrift || 0}
                    expectation={stats.avgEntryExpectation || 0}
                    density={stats.avgDensity || 0}
                />
            </div>

            {/* Confidence Gauge (Tier 3) */}
            <div className="card" style={cardStyle}>
                <h3 style={titleStyle}>System Confidence</h3>
                <div style={{ height: '140px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#38bdf8' }}>
                        {Math.round(stats.avgConfidence)}%
                    </div>
                </div>
                <p style={descStyle}>Friction ID Confidence: {(stats.frictionConfidence * 100).toFixed(0)}%</p>
            </div>

            {/* First-Time vs Returning */}
            <div className="card" style={cardStyle}>
                <h3 style={titleStyle}>Returning vs First-Time</h3>
                <div style={{ height: '180px' }}>
                    <Bar data={userComparisonData} options={barOptions} />
                </div>
                <p style={descStyle}>
                    {stats.userComparison[0]?.avg_friction > stats.userComparison[1]?.avg_friction 
                        ? 'Onboarding issue detected' 
                        : 'UX consistent across segments'}
                </p>
            </div>

            {/* Entry-Point Analysis */}
            <div className="card" style={cardStyle}>
                <h3 style={titleStyle}>Entry-Point Friction</h3>
                <div style={{ overflowY: 'auto', maxHeight: '180px' }}>
                    {stats.entryPointFriction.slice(0, 5).map((ep, i) => (
                        <div key={i} style={{ marginBottom: '0.5rem', padding: '0.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '6px' }}>
                            <div style={{ fontSize: '0.875rem', color: '#fff' }}>{ep.entry_page}</div>
                            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                Avg Friction: <strong style={{ color: '#f87171' }}>{Math.round(ep.avg_friction)}</strong> | Visits: {ep.visits}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recovery Rate */}
            <div className="card" style={cardStyle}>
                <h3 style={titleStyle}>Friction Recovery</h3>
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                    <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#10b981' }}>{stats.recoveryRate}%</div>
                    <p style={descStyle}>Sessions recovered from friction</p>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '1rem' }}>
                        {stats.recoveryStats?.recovered} / {stats.recoveryStats?.total} sessions
                    </div>
                </div>
            </div>

            {/* Decision Paralysis */}
            <div className="card" style={cardStyle}>
                <h3 style={titleStyle}>Decision Paralysis Alerts</h3>
                <div style={{ overflowY: 'auto', maxHeight: '180px' }}>
                    {stats.decisionParalysis?.length === 0 && <p style={{ color: '#64748b', fontSize: '0.875rem' }}>No paralysis detected</p>}
                    {stats.decisionParalysis?.slice(0, 5).map((p, i) => (
                        <div key={i} style={{ marginBottom: '0.5rem', padding: '0.5rem', borderLeft: '3px solid #f59e0b', background: 'rgba(245, 158, 11, 0.1)' }}>
                            <div style={{ fontSize: '0.75rem', color: '#fff' }}>Session: {p.id.substring(0, 8)}</div>
                            <div style={{ fontSize: '0.75rem', color: '#f59e0b' }}>Score: {Math.round(p.decision_paralysis_score)}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Click Efficiency */}
            <div className="card" style={cardStyle}>
                <h3 style={titleStyle}>Click Waste Ratio</h3>
                <div style={{ overflowY: 'auto', maxHeight: '180px' }}>
                    {stats.clickEfficiency?.slice(0, 5).map((c, i) => (
                        <div key={i} style={{ marginBottom: '0.5rem', padding: '0.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '6px' }}>
                            <div style={{ fontSize: '0.875rem', color: '#fff' }}>
                                Ratio: <strong style={{ color: c.click_waste_ratio > 5 ? '#f87171' : '#10b981' }}>{c.click_waste_ratio.toFixed(1)}x</strong>
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Session: {c.id.substring(0, 8)}</div>
                        </div>
                    ))}
                </div>
                <p style={descStyle}>Lower is better — efficient navigation</p>
            </div>

            {/* Friction Evolution */}
            <div className="card" style={{ ...cardStyle, gridColumn: 'span 2' }}>
                <h3 style={titleStyle}>Friction Heat Evolution</h3>
                <div style={{ height: '200px' }}>
                    <Line 
                        data={{
                            labels: stats.frictionEvolution.slice(0, 20).reverse().map((_, i) => `T${i}`),
                            datasets: [{
                                label: 'Friction Snapshots',
                                data: stats.frictionEvolution.slice(0, 20).reverse().map(f => f.friction_snapshot),
                                borderColor: '#ef4444',
                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                fill: true,
                                tension: 0.4
                            }]
                        }}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
                                x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
                            },
                            plugins: { legend: { display: false } }
                        }}
                    />
                </div>
                <p style={descStyle}>Time-series visualization of friction accumulation</p>
            </div>

            {/* Complexity Warnings */}
            <div className="card" style={cardStyle}>
                <h3 style={titleStyle}>Page Complexity Warnings</h3>
                <div style={{ overflowY: 'auto', maxHeight: '200px' }}>
                    {stats.complexityWarnings?.length === 0 && <p style={{ color: '#64748b', fontSize: '0.875rem' }}>All pages within threshold</p>}
                    {stats.complexityWarnings?.map((c, i) => (
                        <div key={i} style={{ marginBottom: '0.5rem', padding: '0.5rem', borderLeft: '3px solid #f59e0b', background: 'rgba(245, 158, 11, 0.1)' }}>
                            <div style={{ fontSize: '0.75rem', color: '#fff' }}>{c.screen_name}</div>
                            <div style={{ fontSize: '0.75rem', color: '#f59e0b' }}>Warnings: {c.warning_count}</div>
                        </div>
                    ))}
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
