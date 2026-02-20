'use client';

import { useState } from 'react';
import { aiInsights } from '@/data/mockData';
import {
    Brain, AlertTriangle, TrendingUp, Zap, Rocket,
    ChevronRight, Lightbulb, Target, Shield,
} from 'lucide-react';

const categoryIcons = {
    Risk: AlertTriangle,
    Growth: TrendingUp,
    Optimization: Zap,
    'Platform Focus': Rocket,
};

const categoryColors = {
    Risk: 'var(--color-danger)',
    Growth: 'var(--accent-primary)',
    Optimization: 'var(--color-info)',
    'Platform Focus': 'var(--accent-secondary)',
};

const filters = ['All', 'Risk', 'Growth', 'Optimization', 'Platform Focus'];

export default function InsightsPage() {
    const [filter, setFilter] = useState('All');
    const [expanded, setExpanded] = useState(null);

    const filtered = filter === 'All' ? aiInsights : aiInsights.filter((i) => i.category === filter);

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                        width: 48, height: 48, borderRadius: 'var(--radius-lg)',
                        background: 'linear-gradient(135deg, var(--accent-secondary), #9F7AEA)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <Brain size={24} color="#fff" />
                    </div>
                    <div>
                        <h1>AI Strategic Advisor</h1>
                        <p>Your digital CFO — powered by revenue intelligence.</p>
                    </div>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="stats-grid stagger" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
                {[
                    { icon: AlertTriangle, label: 'Risk Alerts', value: aiInsights.filter(i => i.category === 'Risk').length, color: 'var(--color-danger)', bg: 'rgba(244,63,94,0.15)' },
                    { icon: TrendingUp, label: 'Growth Ops', value: aiInsights.filter(i => i.category === 'Growth').length, color: 'var(--accent-primary)', bg: 'var(--accent-primary-dim)' },
                    { icon: Lightbulb, label: 'Optimizations', value: aiInsights.filter(i => i.category === 'Optimization').length, color: 'var(--color-info)', bg: 'rgba(56,189,248,0.15)' },
                    { icon: Target, label: 'Platform Tips', value: aiInsights.filter(i => i.category === 'Platform Focus').length, color: 'var(--accent-secondary)', bg: 'var(--accent-secondary-dim)' },
                ].map((s, i) => (
                    <div key={i} className="stat-card" style={{ textAlign: 'center' }}>
                        <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                            <s.icon size={20} color={s.color} />
                        </div>
                        <div className="stat-value" style={{ fontSize: '1.5rem' }}>{s.value}</div>
                        <div className="stat-label" style={{ marginTop: 4 }}>{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="tabs" style={{ width: 'fit-content' }}>
                {filters.map((f) => (
                    <button key={f} className={`tab ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
                ))}
            </div>

            {/* Insights Feed */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {filtered.map((insight) => {
                    const Icon = categoryIcons[insight.category] || Zap;
                    const color = categoryColors[insight.category] || 'var(--text-secondary)';
                    const isExpanded = expanded === insight.id;

                    return (
                        <div key={insight.id} className="card" style={{ cursor: 'pointer', borderLeft: `3px solid ${color}` }}
                            onClick={() => setExpanded(isExpanded ? null : insight.id)}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                                <div style={{
                                    width: 44, height: 44, borderRadius: 'var(--radius-md)',
                                    background: `${color}22`, display: 'flex',
                                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                }}>
                                    <Icon size={22} color={color} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <span style={{ fontSize: '1rem', fontWeight: 700 }}>{insight.title}</span>
                                            <span className={`badge ${insight.severity === 'high' ? 'badge-danger' :
                                                    insight.severity === 'medium' ? 'badge-warning' : 'badge-success'
                                                }`}>{insight.severity}</span>
                                            <span className="badge badge-purple">{insight.category}</span>
                                        </div>
                                        <ChevronRight size={18} style={{
                                            transform: isExpanded ? 'rotate(90deg)' : 'none',
                                            transition: 'transform 200ms ease',
                                            color: 'var(--text-tertiary)',
                                        }} />
                                    </div>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                        {insight.description}
                                    </p>

                                    {isExpanded && (
                                        <div style={{ marginTop: 16, display: 'flex', gap: 12 }} className="animate-fade-in">
                                            <div style={{ flex: 1, padding: '14px', background: 'var(--bg-input)', borderRadius: 'var(--radius-md)' }}>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Key Metric</div>
                                                <div style={{ fontSize: '0.88rem', fontWeight: 600, color }}>{insight.metric}</div>
                                            </div>
                                            <div style={{ flex: 1, padding: '14px', background: 'var(--bg-input)', borderRadius: 'var(--radius-md)' }}>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Suggested Action</div>
                                                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--accent-primary)' }}>{insight.action}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
