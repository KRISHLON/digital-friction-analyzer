import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { api } from '../api';

export default function DeviceBrowserPulse() {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        api.getDeviceStats().then(setStats);
    }, []);

    const deviceData = {
        labels: [...new Set(stats.map(s => s.device_type))],
        datasets: [{
            data: [...new Set(stats.map(s => s.device_type))].map(d => {
                return stats.filter(s => s.device_type === d).reduce((acc, curr) => acc + curr.count, 0);
            }),
            backgroundColor: ['#00f2ea', '#7928ca', '#ff0080'],
            borderWidth: 0
        }]
    };

    return (
        <div className="card" style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                📱 Device & Browser Fidelity
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1rem', alignItems: 'center' }}>
                <div style={{ height: '180px' }}>
                    <Doughnut data={deviceData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
                </div>
                <div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {stats.slice(0, 4).map((s, i) => (
                            <li key={i} style={{ marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                    <span style={{ color: 'var(--text-primary)' }}>{s.browser} on {s.device_type}</span>
                                    <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{s.count} sessions</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
