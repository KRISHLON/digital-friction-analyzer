import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Services() {
    const [activeTab, setActiveTab] = useState('all');

    const services = [
        { 
            id: 1, 
            title: 'Behavioral Analysis', 
            category: 'data', 
            desc: 'Real-time detection of rage clicks, dead clicks, and navigation loops using advanced browser-side heuristics.', 
            icon: '🔍',
            features: ['Live Event Stream', 'Friction Scoring', 'Pattern Detection']
        },
        { 
            id: 2, 
            title: 'Visual Experience', 
            category: 'creative', 
            desc: 'Aggregate heatmaps and pixel-perfect session replays that show exactly what your users see and do.', 
            icon: '🎨',
            features: ['Heatmap Overlays', 'Interaction Trails', 'Element Topography']
        },
        { 
            id: 3, 
            title: 'AI Insights', 
            category: 'tech', 
            desc: 'Machine-learning driven recommendations to reduce friction and improve conversion rates automatically.', 
            icon: '✨',
            features: ['Predictive A/B testing', 'Automated UX Audits', 'Anomaly Alerts']
        },
        { 
            id: 4, 
            title: 'Enterprise Scalability', 
            category: 'tech', 
            desc: 'Infrastructure designed for high-traffic applications with robust data export and global monitoring.', 
            icon: '🏢',
            features: ['Global Friction Maps', 'Custom Webhooks', 'PDF Reporting']
        },
    ];

    const filtered = activeTab === 'all' ? services : services.filter(s => s.category === activeTab);

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 1rem' }}>
            <header style={{ marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: '800' }}>Solutions & <span style={{ color: 'var(--primary)' }}>Specialized Services</span></h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Comprehensive tools for the modern digital ecosystem.</p>
            </header>
            
            <div style={{ marginBottom: '3rem', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {['all', 'data', 'creative', 'tech'].map(tab => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{ 
                            width: 'auto', 
                            padding: '0.75rem 1.75rem',
                            borderRadius: '12px',
                            border: '1px solid var(--border)',
                            background: activeTab === tab ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                            color: activeTab === tab ? '#000' : 'var(--text-primary)',
                            fontWeight: '700',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            transition: 'all 0.3s'
                        }}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))', gap: '2rem', marginBottom: '6rem' }}>
                {filtered.map(service => (
                    <div key={service.id} className="card" style={{ 
                        background: 'rgba(30, 41, 59, 0.3)', 
                        border: '1px solid var(--border)', 
                        borderRadius: '24px', 
                        padding: '2.5rem', 
                        display: 'flex', 
                        flexDirection: 'column',
                        transition: 'transform 0.3s'
                    }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>{service.icon}</div>
                        <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>{service.title}</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>{service.desc}</p>
                        
                        <div style={{ marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {service.features.map(f => (
                                <span key={f} style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', background: 'rgba(0, 242, 234, 0.05)', color: 'var(--primary)', borderRadius: '8px', border: '1px solid rgba(0, 242, 234, 0.1)' }}>
                                    {f}
                                </span>
                            ))}
                        </div>

                        <Link to="/details" style={{ marginTop: 'auto' }}>
                            <button className="secondary" style={{ 
                                background: 'transparent', 
                                border: '1px solid var(--primary)', 
                                color: 'var(--primary)',
                                padding: '1rem',
                                borderRadius: '12px',
                                width: '100%',
                                cursor: 'pointer',
                                fontWeight: '700'
                            }}>Technical Specifications</button>
                        </Link>
                    </div>
                ))}
            </div>

            <section>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>Enterprise Service Tiers</h2>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '32px', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)' }}>
                                <th style={{ padding: '2rem', textAlign: 'left' }}>Feature</th>
                                <th style={{ padding: '2rem' }}>Starter</th>
                                <th style={{ padding: '2rem', color: 'var(--primary)' }}>Pro</th>
                                <th style={{ padding: '2rem' }}>Enterprise</th>
                            </tr>
                        </thead>
                        <tbody>
                            <PricingRow label="Sessions / Month" v1="5k" v2="50k" v3="Unlimited" />
                            <PricingRow label="Data Retention" v1="7 Days" v2="30 Days" v3="1 Year" />
                            <PricingRow label="AI Insights" v1="❌" v2="✅" v3="✅" />
                            <PricingRow label="PDF Exports" v1="❌" v2="✅" v3="✅" />
                            <PricingRow label="Global Heatmaps" v1="❌" v2="❌" v3="✅" />
                            <PricingRow label="Custom Webhooks" v1="❌" v2="❌" v3="✅" />
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

function PricingRow({ label, v1, v2, v3 }) {
    return (
        <tr style={{ borderBottom: '1px solid var(--border)' }}>
            <td style={{ padding: '1.5rem 2rem', textAlign: 'left', fontWeight: 'bold' }}>{label}</td>
            <td style={{ padding: '1.5rem 2rem', color: 'var(--text-secondary)' }}>{v1}</td>
            <td style={{ padding: '1.5rem 2rem', fontWeight: 'bold' }}>{v2}</td>
            <td style={{ padding: '1.5rem 2rem', color: 'var(--text-secondary)' }}>{v3}</td>
        </tr>
    );
}
