import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1rem' }}>
            <div style={{ padding: '6rem 0', textAlign: 'center', position: 'relative' }}>
                {/* Friction Pulse Animation */}
                <div style={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                    width: '600px', 
                    height: '600px', 
                    background: 'radial-gradient(circle, rgba(0, 242, 234, 0.05) 0%, transparent 70%)',
                    zIndex: -1,
                    animation: 'pulseGlow 8s infinite ease-in-out'
                }}></div>

                <h1 style={{ fontSize: '4.5rem', marginBottom: '1.5rem', fontWeight: '800', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
                    Stop Losing Users to <br />
                    <span style={{ color: 'var(--primary)', background: 'linear-gradient(45deg, var(--primary), #7928ca)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Digital Friction
                    </span>
                </h1>
                
                {/* Live Interaction Counter */}
                <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '20px', fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 'bold' }}>
                        <span className="live-dot" style={{ display: 'inline-block', width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%', marginRight: '0.5rem' }}></span>
                        12,842 Live events analyzed today
                    </div>
                </div>

                <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', marginBottom: '3.5rem', maxWidth: '800px', margin: '0 auto 3.5rem', lineHeight: '1.6' }}>
                    The next generation of user experience monitoring. We don't just track clicks—we analyze the psychology behind every interaction to build smoother, faster digital journeys.
                </p>
                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/signup">
                        <button style={{ padding: '1.25rem 3rem', fontSize: '1.2rem', backgroundColor: 'var(--primary)', color: '#000', border: 'none', borderRadius: '14px', fontWeight: 'bold', cursor: 'pointer', transition: 'transform 0.2s' }}>
                            Get Started Free
                        </button>
                    </Link>
                    <Link to="/details">
                        <button style={{ padding: '1.25rem 3rem', fontSize: '1.2rem', backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)', border: '1px solid var(--border)', borderRadius: '14px', fontWeight: 'bold', cursor: 'pointer' }}>
                            How it Works
                        </button>
                    </Link>
                </div>
            </div>

            {/* Trusted By Ticker */}
            <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', marginBottom: '6rem', opacity: 0.7, position: 'relative' }}>
                <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '2rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Trusted by innovative teams</p>
                
                <div className="ticker-container" style={{ display: 'flex', width: '200%' }}>
                     <div className="ticker-content" style={{ display: 'flex', gap: '4rem', animation: 'ticker 20s linear infinite' }}>
                        {['Acme Corp', 'GlobalTech', 'Nebula Inc', 'Stark Industries', 'Wayne Enterprises', 'Cyberdyne Systems'].map((company, i) => (
                             <span key={i} style={{ fontSize: '1.8rem', fontWeight: '700', color: '#555' }}>{company}</span>
                        ))}
                         {/* Duplicate for seamless loop */}
                        {['Acme Corp', 'GlobalTech', 'Nebula Inc', 'Stark Industries', 'Wayne Enterprises', 'Cyberdyne Systems'].map((company, i) => (
                             <span key={`dup-${i}`} style={{ fontSize: '1.8rem', fontWeight: '700', color: '#555' }}>{company}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Session Replay Teaser (Animated) */}
            <section style={{ margin: '6rem 0' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                     <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Session Replay Technology</h2>
                     <p style={{ color: 'var(--text-secondary)' }}>Watch users struggle in real-time with our lightweight vector engine.</p>
                </div>
                <div style={{ 
                    background: '#0f172a', 
                    borderRadius: '24px', 
                    border: '1px solid var(--border)', 
                    height: '400px', 
                    position: 'relative', 
                    overflow: 'hidden',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                }}>
                    {/* Simulated Content */}
                    <div style={{ padding: '2rem', opacity: 0.3 }}>
                        <div style={{ height: '20px', width: '200px', background: '#334155', borderRadius: '4px', marginBottom: '1rem' }}></div>
                        <div style={{ height: '10px', width: '80%', background: '#1e293b', borderRadius: '4px', marginBottom: '0.5rem' }}></div>
                        <div style={{ height: '10px', width: '60%', background: '#1e293b', borderRadius: '4px', marginBottom: '2rem' }}></div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ height: '150px', width: '30%', background: '#1e293b', borderRadius: '8px' }}></div>
                            <div style={{ height: '150px', width: '30%', background: '#1e293b', borderRadius: '8px' }}></div>
                            <div style={{ height: '150px', width: '30%', background: '#1e293b', borderRadius: '8px' }}></div>
                        </div>
                    </div>

                    {/* Animated Cursor Path */}
                    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                        <path 
                            d="M 100 200 Q 300 100 500 250 T 900 200" 
                            fill="none" 
                            stroke="var(--primary)" 
                            strokeWidth="3"
                            strokeDasharray="1000"
                            strokeDashoffset="1000"
                            style={{ animation: 'dash 3s linear infinite' }} 
                        />
                        <circle cx="0" cy="0" r="8" fill="var(--primary)" style={{ offsetPath: 'path("M 100 200 Q 300 100 500 250 T 900 200")', animation: 'moveAlong 3s linear infinite' }}>
                             <animate attributeName="r" values="8;12;8" dur="1s" repeatCount="indefinite" />
                        </circle>
                    </svg>

                    {/* Teaser Overlay */}
                    <div style={{ 
                        position: 'absolute', 
                        bottom: '2rem', 
                        right: '2rem', 
                        background: 'rgba(0,0,0,0.8)', 
                        padding: '1rem', 
                        borderRadius: '12px', 
                        border: '1px solid var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)'
                    }}>
                        <div style={{ width: '10px', height: '10px', background: '#22c55e', borderRadius: '50%', boxShadow: '0 0 10px #22c55e' }}></div>
                        <span style={{ color: '#fff', fontSize: '0.9rem', fontFamily: 'monospace' }}>LIVE REPLAY: 98% Compression</span>
                    </div>
                </div>
            </section>

            <section style={{ margin: '4rem 0' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>The Frictionless Workflow</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Automated insights from capture to visualization.</p>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
                    <StepCard step="01" title="Capture" desc="Our lightweight SDK silently records every micro-interaction without affecting page performance." />
                    <StepCard step="02" title="Identify" desc="Advanced heuristics detect rage clicks, hesitations, and abandonment patterns in real-time." />
                    <StepCard step="03" title="Analyze" desc="Data is processed through our engine to calculate comprehensive friction scores per screen." />
                    <StepCard step="04" title="Optimize" desc="Get actionable insights and metrics to improve conversion rates and user satisfaction." />
                </div>
            </section>

            {/* Testimonials */}
            <section style={{ margin: '6rem 0', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>Loved by Developers</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <Testimonial quote="FrictionApp helped us find a critical bug in our checkout flow that was costing us $10k/month." author="Sarah J., CTO" role="FinTech Startup" />
                    <Testimonial quote="The session replay is smoother than any other tool we've used. And the AI insights are spot on." author="Mike T., Lead Dev" role="SaaS Platform" />
                    <Testimonial quote="Implemented in 5 minutes. The friction scores gave us immediate clarity on where to focus." author="Alex R., PM" role="E-commerce Giant" />
                </div>
            </section>

            <section style={{ margin: '8rem 0', background: 'rgba(0, 242, 234, 0.03)', padding: '4rem', borderRadius: '32px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Why It Matters</h2>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <li style={{ display: 'flex', gap: '1rem' }}>
                                <span style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>✓</span>
                                <div>
                                    <strong style={{ display: 'block' }}>Reduce Churn</strong>
                                    <span style={{ color: 'var(--text-secondary)' }}>Identify the exact moment users get frustrated and leave.</span>
                                </div>
                            </li>
                            <li style={{ display: 'flex', gap: '1rem' }}>
                                <span style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>✓</span>
                                <div>
                                    <strong style={{ display: 'block' }}>Improve Conversion</strong>
                                    <span style={{ color: 'var(--text-secondary)' }}>Streamline complex forms and navigation paths effortlessly.</span>
                                </div>
                            </li>
                            <li style={{ display: 'flex', gap: '1rem' }}>
                                <span style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>✓</span>
                                <div>
                                    <strong style={{ display: 'block' }}>Data-Driven Design</strong>
                                    <span style={{ color: 'var(--text-secondary)' }}>Base your UI decisions on actual behavioral data, not guesses.</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--border)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                        <code style={{ color: 'var(--primary)', fontSize: '0.9rem' }}>
                            // Integration is simple <br />
                            import FrictionSDK from 'friction-app'; <br /><br />
                            FrictionSDK.init('YOUR_API_KEY'); <br />
                            FrictionSDK.track();
                        </code>
                    </div>
                </div>
            </section>
        </div>
    );
}

function StepCard({ step, title, desc }) {
    return (
        <div style={{ padding: '2rem', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border)', textAlign: 'left', transition: 'transform 0.2s', cursor: 'default' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
        >
            <div style={{ fontSize: '3rem', fontWeight: '800', color: 'rgba(255,255,255,0.05)', marginBottom: '-1rem' }}>{step}</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', position: 'relative' }}>{title}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>{desc}</p>
        </div>
    );
}

function Testimonial({ quote, author, role }) {
    return (
         <div style={{ padding: '2rem', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border)', textAlign: 'left', cursor: 'grab' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg-card)'; }}
         >
            <p style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '1.5rem', color: '#cbd5e1' }}>"{quote}"</p>
            <div>
                <strong style={{ display: 'block', color: '#fff' }}>{author}</strong>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{role}</span>
            </div>
         </div>
    );
}

// Add CSS keyframes for the SVG animations
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    @keyframes dash {
        to {
            stroke-dashoffset: 0;
        }
    }
    @keyframes moveAlong {
        0% { offset-distance: 0%; }
        100% { offset-distance: 100%; }
    }
    @keyframes ticker {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); } 
    }
`;
document.head.appendChild(styleSheet);
