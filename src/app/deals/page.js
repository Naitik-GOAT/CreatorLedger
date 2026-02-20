'use client';

import { useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { brandDeals } from '@/data/mockData';
import { Handshake, Plus, TrendingUp, DollarSign, Eye, MousePointer, X } from 'lucide-react';

function fmt(v) { return '$' + v.toLocaleString(); }

function ChartTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    return (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '10px 14px', fontSize: '0.8rem' }}>
            <div style={{ color: 'var(--text-tertiary)', marginBottom: 4 }}>{label}</div>
            {payload.map((p, i) => (
                <div key={i} style={{ color: p.color, fontWeight: 600 }}>{p.name}: {typeof p.value === 'number' && p.name !== 'CPM' ? fmt(p.value) : p.value}</div>
            ))}
        </div>
    );
}

const roiColors = ['#00D4AA', '#7C5CFC', '#38BDF8', '#FFB020', '#F96854'];

export default function DealsPage() {
    const [showForm, setShowForm] = useState(false);

    const totalValue = brandDeals.reduce((s, d) => s + d.value, 0);
    const avgROI = Math.round(brandDeals.reduce((s, d) => s + d.roi, 0) / brandDeals.length);
    const bestDeal = brandDeals.reduce((b, d) => (d.roi > b.roi ? d : b), brandDeals[0]);

    return (
        <div className="animate-fade-in">
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1>Brand Deal ROI Tracker</h1>
                    <p>Track and compare performance across all your brand partnerships.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowForm(true)}><Plus size={15} /> Add Deal</button>
            </div>

            {/* Stats */}
            <div className="stats-grid stagger" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                <div className="stat-card">
                    <div className="stat-label">Total Deal Value</div>
                    <div className="stat-value">{fmt(totalValue)}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Average ROI</div>
                    <div className="stat-value" style={{ color: 'var(--accent-primary)' }}>{avgROI}%</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Best Performing</div>
                    <div className="stat-value" style={{ fontSize: '1.3rem' }}>{bestDeal.brand}</div>
                    <div className="stat-change positive"><TrendingUp size={12} /> {bestDeal.roi}% ROI</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Active Deals</div>
                    <div className="stat-value">{brandDeals.length}</div>
                </div>
            </div>

            {/* ROI Chart */}
            <div className="chart-container">
                <div className="chart-title" style={{ marginBottom: 16 }}>ROI by Brand Deal</div>
                <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={brandDeals} margin={{ left: 0, right: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                        <XAxis dataKey="brand" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                        <Tooltip content={<ChartTooltip />} />
                        <Bar dataKey="roi" name="ROI %" radius={[6, 6, 0, 0]} barSize={40}>
                            {brandDeals.map((_, i) => <Cell key={i} fill={roiColors[i % roiColors.length]} />)}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Deals Table */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Brand</th>
                            <th>Platform</th>
                            <th>Deal Value</th>
                            <th>Views</th>
                            <th>Clicks</th>
                            <th>Conversions</th>
                            <th>CPM</th>
                            <th>ROI</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brandDeals.map((deal) => (
                            <tr key={deal.id}>
                                <td style={{ fontWeight: 600 }}>{deal.brand}</td>
                                <td><span className="badge badge-info">{deal.platform}</span></td>
                                <td style={{ fontWeight: 600 }}>{fmt(deal.value)}</td>
                                <td>{deal.views.toLocaleString()}</td>
                                <td>{deal.clicks.toLocaleString()}</td>
                                <td>{deal.conversions.toLocaleString()}</td>
                                <td>${deal.cpm.toFixed(1)}</td>
                                <td>
                                    <span className={`badge ${deal.roi >= 150 ? 'badge-success' : deal.roi >= 100 ? 'badge-warning' : 'badge-danger'}`}>
                                        {deal.roi}%
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Deal Modal */}
            {showForm && (
                <div className="modal-backdrop" onClick={() => setShowForm(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <div className="modal-title">Add Brand Deal</div>
                            <button className="btn-icon" onClick={() => setShowForm(false)}><X size={18} /></button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            <div>
                                <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>Brand Name</label>
                                <input className="input" placeholder="e.g. NordVPN" />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                <div>
                                    <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>Deal Value ($)</label>
                                    <input className="input" type="number" placeholder="0" />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>Platform</label>
                                    <select className="select" style={{ width: '100%' }}>
                                        <option>YouTube</option>
                                        <option>Instagram</option>
                                        <option>TikTok</option>
                                        <option>Twitter</option>
                                    </select>
                                </div>
                            </div>
                            <button className="btn btn-primary" style={{ marginTop: 8 }}><Plus size={15} /> Add Deal</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
