import React, { useEffect, useState } from 'react';
import { api } from '../api';

export default function RealTimeMetrics() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await api.getStats();
                setStats(data);
            } catch (e) {
                console.error(e);
            }
        };

        fetchStats();
        const interval = setInterval(fetchStats, 2000);
        return () => clearInterval(interval);
    }, []);

    if (!stats) return <div style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem' }}>Loading real-time stats...</div>;

    const cards = [
        { label: 'Total Sessions', value: stats.totalSessions, color: '#8b5cf6' },
        { label: 'Total Clicks', value: stats.totalClicks, color: '#3b82f6' },
        { label: 'Avg Clicks/Session', value: stats.avgClicksPerSession, color: '#10b981' },
        { label: 'Most Clicked Page', value: stats.mostClickedPage, color: '#f59e0b' }
    ];

    const cardStyle = () => {
        return {
            background: 'var(--bg-card)',
            backdropFilter: 'blur(20px)',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid var(--border)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            textAlign: 'center',
            transition: 'all 0.3s'
        };
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
            {cards.map((card, i) => (
                <div key={i} style={cardStyle()}>
                    <h3 style={{ 
                        fontSize: '0.875rem',
                        color: '#94a3b8',
                        margin: '0 0 0.75rem 0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontWeight: '500'
                    }}>
                        {card.label}
                    </h3>
                    <p style={{ 
                        fontSize: '2rem',
                        fontWeight: '700',
                        margin: 0,
                        color: card.color,
                        textShadow: `0 0 20px ${card.color}40`
                    }}>
                        {card.value}
                    </p>
                </div>
            ))}
        </div>
    );
}
