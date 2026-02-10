export default function SummaryCards({ data }) {
    if (!data) return <div style={{ color: 'var(--text-secondary)' }}>Loading utilization metrics...</div>;

    const resources = [
        { 
            label: 'CPU (NCPUS)', 
            percentage: data.avgFrictionScore || 69.5, 
            provisioned: 1254, 
            quota: 2000, 
            color: '#3fb950' 
        },
        { 
            label: 'DISK (GIB)', 
            percentage: data.abandonmentRate || 17.8, 
            provisioned: 840, 
            quota: 2000, 
            color: '#3b82f6' 
        },
        { 
            label: 'MEMORY (GIB)', 
            percentage: (data.totalSessions % 100) || 48.6, 
            provisioned: 1254, 
            quota: 2000, 
            color: '#8b5cf6' 
        }
    ];

    return (
        <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Capacity Available ℹ️
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {resources.map((res, i) => (
                    <div key={i} className="card" style={{ padding: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: '500' }}>
                                <span style={{ color: res.color }}>⚙️</span> {res.label}
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                                {res.percentage}<span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginLeft: '2px' }}>%</span>
                            </div>
                        </div>
                        
                        <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden', display: 'flex', marginBottom: '1rem' }}>
                            <div style={{ width: `${res.percentage}%`, background: res.color, height: '100%' }}></div>
                            <div style={{ width: '10%', background: 'rgba(255,255,255,0.1)', height: '100%' }}></div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                            <div>
                                <div style={{ textTransform: 'uppercase' }}>Provisioned</div>
                                <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{res.provisioned}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ textTransform: 'uppercase' }}>Quota</div>
                                <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{res.quota}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
