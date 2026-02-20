'use client';

import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { forecastData, forecastSummary } from '@/data/mockData';
import { TrendingUp, Target, BarChart3, Zap, Calendar } from 'lucide-react';

function fmt(v) { return '$' + v.toLocaleString(); }

function ChartTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    return (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '10px 14px', fontSize: '0.8rem' }}>
            <div style={{ color: 'var(--text-tertiary)', marginBottom: 4 }}>{label}</div>
            {payload.map((p, i) => (
                <div key={i} style={{ color: p.color, fontWeight: 600 }}>{p.name}: {fmt(p.value)}</div>
            ))}
        </div>
    );
}

export default function ForecastPage() {
    const fs = forecastSummary;

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <h1>Revenue Forecast</h1>
                <p>AI-powered projections based on your revenue trends and seasonal patterns.</p>
            </div>

            {/* Projection Cards */}
            <div className="stats-grid stagger" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <div className="stat-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <div className="stat-label">Next Month</div>
                            <div className="stat-value" style={{ color: 'var(--accent-primary)' }}>{fmt(fs.nextMonth.value)}</div>
                            <div className="stat-change positive" style={{ marginTop: 8 }}>
                                <Target size={12} /> {fs.nextMonth.confidence}% confidence
                            </div>
                        </div>
                        <div style={{ width: 42, height: 42, borderRadius: 'var(--radius-md)', background: 'var(--accent-primary-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Calendar size={20} color="var(--accent-primary)" />
                        </div>
                    </div>
                </div>
                <div className="stat-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <div className="stat-label">3-Month Projection</div>
                            <div className="stat-value">{fmt(fs.threeMonth.value)}</div>
                            <div className="stat-change positive" style={{ marginTop: 8 }}>
                                <BarChart3 size={12} /> {fs.threeMonth.confidence}% confidence
                            </div>
                        </div>
                        <div style={{ width: 42, height: 42, borderRadius: 'var(--radius-md)', background: 'var(--accent-secondary-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <TrendingUp size={20} color="var(--accent-secondary)" />
                        </div>
                    </div>
                </div>
                <div className="stat-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <div className="stat-label">12-Month Projection</div>
                            <div className="stat-value">{fmt(fs.twelveMonth.value)}</div>
                            <div className="stat-change positive" style={{ marginTop: 8 }}>
                                <Zap size={12} /> {fs.twelveMonth.confidence}% confidence
                            </div>
                        </div>
                        <div style={{ width: 42, height: 42, borderRadius: 'var(--radius-md)', background: 'rgba(255,176,32,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Zap size={20} color="var(--color-warning)" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Forecast Chart */}
            <div className="chart-container">
                <div className="chart-header">
                    <div className="chart-title">12-Month Revenue Forecast</div>
                    <div className="badge badge-success">AI-Powered</div>
                </div>
                <ResponsiveContainer width="100%" height={380}>
                    <AreaChart data={forecastData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                        <defs>
                            <linearGradient id="projGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#00D4AA" stopOpacity={0.3} />
                                <stop offset="100%" stopColor="#00D4AA" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="optGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#7C5CFC" stopOpacity={0.15} />
                                <stop offset="100%" stopColor="#7C5CFC" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                        <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={{ stroke: 'rgba(255,255,255,0.06)' }} tickLine={false} />
                        <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                        <Tooltip content={<ChartTooltip />} />
                        <Legend iconType="circle" iconSize={8} formatter={(val) => <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{val}</span>} />
                        <Area type="monotone" dataKey="optimistic" stroke="#7C5CFC" strokeWidth={1} strokeDasharray="4 4" fill="url(#optGrad)" name="Optimistic" />
                        <Area type="monotone" dataKey="projected" stroke="#00D4AA" strokeWidth={2.5} fill="url(#projGrad)" name="Projected" />
                        <Area type="monotone" dataKey="pessimistic" stroke="#F43F5E" strokeWidth={1} strokeDasharray="4 4" fill="none" name="Pessimistic" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Forecast Details */}
            <div className="grid-2">
                <div className="card">
                    <div className="section-title"><TrendingUp size={18} color="var(--accent-primary)" /> Growth Analysis</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {[
                            { label: 'Average Monthly Growth', value: '6.2%', color: 'var(--accent-primary)' },
                            { label: 'Growth Acceleration', value: 'Increasing', color: 'var(--accent-primary)' },
                            { label: 'Revenue Volatility', value: 'Low (±7%)', color: 'var(--color-info)' },
                            { label: 'Seasonal Impact', value: '-8% in March', color: 'var(--color-warning)' },
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: 'var(--bg-input)', borderRadius: 'var(--radius-md)' }}>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.label}</span>
                                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: item.color }}>{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card">
                    <div className="section-title"><Target size={18} color="var(--color-warning)" /> Monthly Projections</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {forecastData.slice(0, 6).map((m, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: 'var(--bg-input)', borderRadius: 'var(--radius-md)' }}>
                                <span style={{ fontSize: '0.82rem', fontWeight: 600, width: 36 }}>{m.month}</span>
                                <div style={{ flex: 1 }}>
                                    <div className="progress-bar" style={{ height: 6 }}>
                                        <div className="progress-fill" style={{ width: `${(m.projected / forecastData[11].projected) * 100}%` }} />
                                    </div>
                                </div>
                                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-primary)', minWidth: 80, textAlign: 'right' }}>{fmt(m.projected)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
