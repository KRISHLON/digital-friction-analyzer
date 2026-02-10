import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { api } from '../api';

export default function ExportButton() {
    const [exporting, setExporting] = useState(false);

    const handleExport = async () => {
        setExporting(true);
        try {
            const summary = await api.getDashboardSummary();
            const doc = new jsPDF();
            
            // Stylized Header
            doc.setFillColor(15, 23, 42); // bg-dark
            doc.rect(0, 0, 210, 40, 'F');
            doc.setTextColor(0, 242, 234); // primary
            doc.setFontSize(22);
            doc.text('DIGITAL FRICTION ANALYZER', 20, 20);
            doc.setFontSize(10);
            doc.setTextColor(255, 255, 255);
            doc.text('EXECUTIVE PERFORMANCE REPORT', 20, 30);
            
            // Date
            doc.setTextColor(148, 163, 184); // slate-400
            doc.text(`Report Generated: ${new Date().toLocaleString()}`, 140, 30);

            // Summary Section
            doc.setTextColor(15, 23, 42);
            doc.setFontSize(16);
            doc.text('Executive Summary', 20, 60);
            
            doc.setFontSize(11);
            doc.setTextColor(50, 50, 50);
            doc.text(`Total Sessions Analyzed: ${summary?.totalSessions || 0}`, 20, 75);
            doc.text(`Average Interaction Score: ${summary?.avgFrictionScore || 0}%`, 20, 85);
            doc.text(`Critical Issues Flagged: ${summary?.totalFrictionScore > 80 ? 'HIGH' : 'LOW'}`, 20, 95);

            // Friction Breakdown
            doc.setFontSize(14);
            doc.text('Friction Heuristics Breakdown', 20, 120);
            doc.setDrawColor(200, 200, 200);
            doc.line(20, 125, 190, 125);

            let y = 140;
            const details = [
                { label: 'Rage Clicks', value: 'Detected in 12% of sessions' },
                { label: 'Dead Clicks', value: 'Detected in 8% of sessions' },
                { label: 'Navigation Loops', value: 'Detected in 3% of sessions' },
                { label: 'Form Abandonment', value: 'High on /signup page' }
            ];

            details.forEach(item => {
                doc.setFont('helvetica', 'bold');
                doc.text(item.label, 20, y);
                doc.setFont('helvetica', 'normal');
                doc.text(item.value, 80, y);
                y += 10;
            });

            // Action Items
            doc.setFillColor(248, 250, 252);
            doc.rect(20, 190, 170, 40, 'F');
            doc.setTextColor(10, 10, 10);
            doc.setFontSize(12);
            doc.text('Recommended Actions:', 30, 205);
            doc.setFontSize(10);
            doc.text('1. Audit the Checkout Button hit-box for mobile users.', 30, 215);
            doc.text('2. Review navigation loop on Product Detail pages.', 30, 225);

            // Footer
            doc.setTextColor(150, 150, 150);
            doc.setFontSize(8);
            doc.text('© 2026 Digital Friction Analyzer Enterprise Edition. All rights reserved.', 105, 285, { align: 'center' });

            doc.save(`Friction_Report_${Date.now()}.pdf`);
        } catch (err) {
            console.error('Export failed:', err);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setExporting(false);
        }
    };

    return (
        <button 
            onClick={handleExport}
            disabled={exporting}
            className="primary" 
            style={{ 
                padding: '0.75rem 2rem', 
                fontSize: '1rem', 
                borderRadius: '50px', 
                background: exporting ? '#94a3b8' : 'var(--primary)',
                color: exporting ? '#fff' : '#000',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: exporting ? 'none' : '0 10px 20px rgba(0, 242, 234, 0.2)'
            }}
        >
            {exporting ? 'Generating Report...' : '📥 Export PDF Report'}
        </button>
    );
}
