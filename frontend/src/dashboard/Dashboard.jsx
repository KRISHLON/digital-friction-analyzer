import { useState, useEffect } from 'react';
import { api } from '../api';
import SummaryCards from './SummaryCards';
import RealTimeMetrics from './RealTimeMetrics';
import HeatmapOverlay from './HeatmapOverlay';
import TopElements from './TopElements';
import IssueList from './IssueList';
import ExportButton from './ExportButton';
import ClickDistributionGraphs from './ClickDistributionGraphs';
import ExtendedMetrics from './ExtendedMetrics';
import FunnelChart from './FunnelChart';
import AIInsights from './AIInsights';
import GeoFrictionMap from './GeoFrictionMap';
import DeviceBrowserPulse from './DeviceBrowserPulse';
import ABSimulator from './ABSimulator';
import AccessibilityAuditor from './AccessibilityAuditor';
import AcademicDashboard from './AcademicDashboard';
import AdvancedMetricsDashboard from './AdvancedMetricsDashboard';

export default function Dashboard() {
    const [summary, setSummary] = useState(null);
    const [activeTab, setActiveTab] = useState('Summary');

    useEffect(() => {
        api.getDashboardSummary().then(setSummary);
    }, []);

    const tabStyle = (tabName) => ({
        padding: '0.75rem 0',
        color: activeTab === tabName ? 'var(--primary)' : 'var(--text-secondary)',
        borderBottom: activeTab === tabName ? '2px solid var(--primary)' : '2px solid transparent',
        fontWeight: 'bold',
        fontSize: '0.8rem',
        textTransform: 'uppercase',
        cursor: 'pointer',
        transition: 'all 0.3s'
    });

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', padding: '1rem' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <header style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>💎</div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '700', margin: 0, color: 'var(--text-primary)' }}>
                        Enterprise <span style={{ color: 'var(--primary)' }}>Friction Analyzer</span>
                    </h1>
                </header>

                <SummaryCards data={summary} />

                <div style={{ marginBottom: '2.5rem', borderBottom: '1px solid var(--border)', display: 'flex', gap: '2.5rem' }}>
                    {['Summary', 'Insights', 'Distribution', 'Audits', 'Behavioral', 'Analytics'].map(tab => (
                        <div key={tab} style={tabStyle(tab)} onClick={() => setActiveTab(tab)}>{tab}</div>
                    ))}
                </div>

                {activeTab === 'Summary' && (
                    <>
                        <RealTimeMetrics />
                        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                            <FunnelChart />
                            <ClickDistributionGraphs />
                        </div>
                        <IssueList />
                    </>
                )}

                {activeTab === 'Insights' && (
                    <>
                        <AIInsights />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
                            <ABSimulator />
                            <AccessibilityAuditor />
                        </div>
                    </>
                )}

                {activeTab === 'Distribution' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <GeoFrictionMap />
                        <DeviceBrowserPulse />
                        <div style={{ gridColumn: '1 / -1' }}>
                            <ExtendedMetrics />
                        </div>
                    </div>
                )}

                {activeTab === 'Audits' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                        <HeatmapOverlay />
                        <TopElements />
                    </div>
                )}

                {activeTab === 'Behavioral' && (
                    <AcademicDashboard />
                )}

                {activeTab === 'Analytics' && (
                    <AdvancedMetricsDashboard />
                )}
                
                <footer style={{ marginTop: '4rem', textAlign: 'center', padding: '2rem', borderTop: '1px solid var(--border)' }}>
                    <ExportButton />
                    <div style={{ marginTop: '1.5rem' }}>
                        <a href="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>← Return to Home Page</a>
                    </div>
                </footer>
            </div>
        </div>
    );
}
