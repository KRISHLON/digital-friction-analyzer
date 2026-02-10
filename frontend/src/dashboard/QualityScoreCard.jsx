import React from 'react';
import { Doughnut } from 'react-chartjs-2';

export default function QualityScoreCard({ score }) {
    const data = {
        labels: ['Quality', 'Friction'],
        datasets: [{
            data: [score, 100 - score],
            backgroundColor: ['#10b981', '#1f2937'],
            borderWidth: 0,
            cutout: '80%'
        }]
    };

    const options = {
        plugins: { tooltip: { enabled: false } },
        rotation: -90,
        circumference: 180,
        maintainAspectRatio: false
    };

    return (
        <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
            <h3 style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' }}>SESSION QUALITY SCORE</h3>
            <div style={{ position: 'relative', height: '150px' }}>
                <Doughnut data={data} options={options} />
                <div style={{ 
                    position: 'absolute', top: '60%', left: '50%', transform: 'translate(-50%, -50%)',
                    fontSize: '2rem', fontWeight: 'bold', color: '#fff' 
                }}>
                    {Math.round(score)}
                </div>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '-1rem' }}>
                Reflects smoothness of user completion.
            </p>
        </div>
    );
}
