'use client';

import { useState } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell, Legend,
} from 'recharts';
import {
    DollarSign, TrendingUp, Target, Wallet, AlertTriangle,
    Brain, ArrowUpRight, BarChart3, Zap, Loader2, RefreshCw
} from 'lucide-react';
import { useDashboardData } from '@/hooks/useDashboardData';

function formatCurrency(val) {
    if (val === undefined || val === null) return '$0';
    return '$' + val.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function ChartTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    return (
        <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 14px',
            fontSize: '0.8rem',
        }}>
            <div style={{ color: 'var(--text-tertiary)', marginBottom: 4 }}>{label}</div>
            {payload.map((p, i) => (
                <div key={i} style={{ color: p.color, fontWeight: 600 }}>
                    {p.name}: {formatCurrency(p.value)}
                </div>
            ))}
        </div>
    );
}

export default function Dashboard() {
    const { session, data, loading, error } = useDashboardData();
    const [period, setPeriod] = useState('daily');
    const [generatingAI, setGeneratingAI] = useState(false);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <Loader2 className="animate-spin" size={40} color="var(--accent-primary)" />
            </div>
        );
    }

    if (error) {
        return <div className="alert-bar warning" style={{ margin: 20 }}>Error: {error}</div>;
    }

    if (!data) return null;

    const { summaryMetrics: m, metrics, platformRevenue, revenueStreams, aiInsights } = data;

    // Empty State Check
    if (!metrics || metrics.length === 0) {
        return (
            <div className="animate-fade-in" style={{ padding: '40px 20px', textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, background: 'var(--accent-primary-dim)', color: 'var(--accent-primary)', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                    <BarChart3 size={32} />
                </div>
                <h2>No Revenue Data Yet</h2>
                <p style={{ color: 'var(--text-secondary)', maxWidth: 400, margin: '0 auto 24px', lineHeight: 1.5 }}>
                    Connect your YouTube, Instagram, or TikTok accounts to start tracking your creator revenue instantly.
                </p>
                <button className="btn btn-primary" onClick={() => window.location.href = '/dashboard/integrations'} style={{ margin: '0 auto' }}>
                    Connect Platforms
                </button>
            </div>
        );
    }

    // Grouping metrics by date for chart
    const chartDataRaw = metrics.map(metric => ({
        date: new Date(metric.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        revenue: metric.revenue,
        expenses: metric.expenses
    }));

    const aggregatedChartData = Array.from(chartDataRaw.reduce((acc, curr) => {
        if (!acc.has(curr.date)) {
            acc.set(curr.date, { date: curr.date, revenue: 0, expenses: 0 });
        }
        const item = acc.get(curr.date);
        item.revenue += curr.revenue;
        item.expenses += curr.expenses;
        return acc;
    }, new Map()).values());

    const handleGenerateAI = async () => {
        setGeneratingAI(true);
        try {
            await fetch('/api/ai/insights', { method: 'POST' });
            window.location.reload();
        } catch (e) {
            console.error(e);
        } finally {
            setGeneratingAI(false);
        }
    };

    return (
        <div className="animate-fade-in">
            {/* Page Header */}
            <div className="page-header" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <div>
                    <h1>Dashboard</h1>
                    <p>Welcome back, {session?.user?.name || 'Creator'}! Here&apos;s your financial overview.</p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-secondary" style={{ fontSize: '0.8rem' }} onClick={handleGenerateAI} disabled={generatingAI}>
                        {generatingAI ? <Loader2 size={15} className="animate-spin" /> : <Brain size={15} />}
                        {generatingAI ? 'Generating...' : 'Regenerate Insights'}
                    </button>
                    <button className="btn btn-secondary" style={{ fontSize: '0.8rem' }}>
                        <BarChart3 size={15} /> Export
                    </button>
                </div>
            </div>

            {/* ── Stats Row ── */}
            <div className="stats-grid stagger">
                {/* Total Revenue */}
                <div className="stat-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <div className="stat-label">Total Revenue</div>
                            <div className="stat-value">{formatCurrency(m.totalRevenue)}</div>
                            <div className="stat-change positive">
                                <ArrowUpRight size={13} /> +{m.growthPercent}%
                            </div>
                        </div>
                        <div style={{ width: 42, height: 42, borderRadius: 'var(--radius-md)', background: 'var(--accent-primary-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <DollarSign size={20} color="var(--accent-primary)" />
                        </div>
                    </div>
                </div>

                {/* Net Profit */}
                <div className="stat-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <div className="stat-label">Net Profit</div>
                            <div className="stat-value">{formatCurrency(m.netProfit)}</div>
                            <div className="stat-change positive">
                                <ArrowUpRight size={13} /> {m.profitMargin}% margin
                            </div>
                        </div>
                        <div style={{ width: 42, height: 42, borderRadius: 'var(--radius-md)', background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Wallet size={20} color="var(--profit-blue)" />
                        </div>
                    </div>
                </div>

                {/* Growth */}
                <div className="stat-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <div className="stat-label">Monthly Growth</div>
                            <div className="stat-value" style={{ color: 'var(--accent-primary)' }}>+{m.growthPercent}%</div>
                            <div className="stat-change positive">
                                <TrendingUp size={13} /> Accelerating
                            </div>
                        </div>
                        <div style={{ width: 42, height: 42, borderRadius: 'var(--radius-md)', background: 'var(--accent-primary-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <TrendingUp size={20} color="var(--accent-primary)" />
                        </div>
                    </div>
                </div>

                {/* Revenue Goal */}
                <div className="stat-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ width: '100%' }}>
                            <div className="stat-label">Revenue Goal</div>
                            <div className="stat-value">{m.revenueGoalProgress}%</div>
                            <div style={{ marginTop: 10 }}>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: `${m.revenueGoalProgress}%` }} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>
                                    <span>{formatCurrency(m.totalRevenue)}</span>
                                    <span>{formatCurrency(m.revenueGoal)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Revenue Chart ── */}
            <div className="chart-container animate-fade-in">
                <div className="chart-header">
                    <div className="chart-title">Revenue Overview</div>
                </div>
                <ResponsiveContainer width="100%" height={320}>
                    <AreaChart data={aggregatedChartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                        <defs>
                            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#00D4AA" stopOpacity={0.3} />
                                <stop offset="100%" stopColor="#00D4AA" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#F43F5E" stopOpacity={0.2} />
                                <stop offset="100%" stopColor="#F43F5E" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                        <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={{ stroke: 'rgba(255,255,255,0.06)' }} tickLine={false} />
                        <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                        <Tooltip content={<ChartTooltip />} />
                        <Area type="monotone" dataKey="revenue" stroke="#00D4AA" strokeWidth={2} fill="url(#revGrad)" name="Revenue" />
                        <Area type="monotone" dataKey="expenses" stroke="#F43F5E" strokeWidth={1.5} fill="url(#expGrad)" name="Expenses" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* ── Platform Comparison + Revenue Breakdown ── */}
            <div className="grid-2" style={{ marginBottom: 24 }}>
                {/* Platform Bar Chart */}
                <div className="chart-container" style={{ marginBottom: 0 }}>
                    <div className="chart-title" style={{ marginBottom: 16 }}>Platform Revenue</div>
                    {platformRevenue.length > 0 ? (
                        <ResponsiveContainer width="100%" height={260}>
                            <BarChart data={platformRevenue} layout="vertical" margin={{ left: 10, right: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                                <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} tickFormatter={(v) => `$${v}`} axisLine={false} tickLine={false} />
                                <YAxis type="category" dataKey="platform" tick={{ fill: '#94a3b8', fontSize: 12 }} width={85} axisLine={false} tickLine={false} />
                                <Tooltip content={<ChartTooltip />} />
                                <Bar dataKey="revenue" name="Revenue" radius={[0, 6, 6, 0]} barSize={22}>
                                    {platformRevenue.map((entry, i) => (
                                        <Cell key={i} fill={entry.color} fillOpacity={0.85} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div style={{ height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>No data available</div>
                    )}
                </div>

                {/* Revenue Streams Donut */}
                <div className="chart-container" style={{ marginBottom: 0 }}>
                    <div className="chart-title" style={{ marginBottom: 16 }}>Revenue Streams</div>
                    {revenueStreams.length > 0 ? (
                        <ResponsiveContainer width="100%" height={260}>
                            <PieChart>
                                <Pie data={revenueStreams} cx="50%" cy="50%" innerRadius={65} outerRadius={100} paddingAngle={3} dataKey="value" nameKey="name" stroke="none">
                                    {revenueStreams.map((entry, i) => (
                                        <Cell key={i} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={<ChartTooltip />} />
                                <Legend iconType="circle" iconSize={8} formatter={(val) => <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{val}</span>} />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div style={{ height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>No data available</div>
                    )}
                </div>
            </div>

            {/* ── AI Insights ── */}
            <div className="card" style={{ marginBottom: 24 }}>
                <div className="section-title">
                    <Brain size={18} color="var(--accent-secondary)" /> AI Insights
                </div>
                {aiInsights && aiInsights.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {aiInsights.map((insight) => (
                            <div key={insight.id} style={{
                                padding: '14px 16px',
                                background: 'var(--bg-input)',
                                borderRadius: 'var(--radius-md)',
                                borderLeft: `3px solid ${insight.severity === 'high' ? 'var(--color-danger)' :
                                    insight.severity === 'medium' ? 'var(--color-warning)' : 'var(--color-info)'
                                    }`,
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{insight.title}</span>
                                    <span className={`badge ${insight.severity === 'high' ? 'badge-danger' :
                                        insight.severity === 'medium' ? 'badge-warning' : 'badge-info'
                                        }`}>{insight.type}</span>
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                    {insight.description}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        No insights generated recently. Click "Regenerate Insights" above to get personalized feedback.
                    </div>
                )}
            </div>
        </div>
    );
}
