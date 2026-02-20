'use client';

import { useState } from 'react';
import { revenueTransactions } from '@/data/mockData';
import { Download, Filter, Search, ArrowUpDown } from 'lucide-react';

const platforms = ['All', 'YouTube', 'Patreon', 'Shopify', 'Instagram', 'TikTok', 'Stripe', 'Substack', 'Twitch', 'Ko-fi', 'Amazon Associates', 'Gumroad'];
const types = ['All', 'Ad Revenue', 'Memberships', 'Digital Products', 'Sponsorships', 'Affiliate Income', 'Donations', 'E-commerce'];

export default function RevenuePage() {
    const [platformFilter, setPlatformFilter] = useState('All');
    const [typeFilter, setTypeFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [sortKey, setSortKey] = useState('date');
    const [sortDir, setSortDir] = useState('desc');

    let data = [...revenueTransactions];

    if (platformFilter !== 'All') data = data.filter((r) => r.platform === platformFilter);
    if (typeFilter !== 'All') data = data.filter((r) => r.type === typeFilter);
    if (search) data = data.filter((r) =>
        r.platform.toLowerCase().includes(search.toLowerCase()) ||
        r.type.toLowerCase().includes(search.toLowerCase())
    );

    data.sort((a, b) => {
        const va = a[sortKey], vb = b[sortKey];
        if (typeof va === 'string') return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
        return sortDir === 'asc' ? va - vb : vb - va;
    });

    function toggleSort(key) {
        if (sortKey === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
        else { setSortKey(key); setSortDir('desc'); }
    }

    const totalGross = data.reduce((s, r) => s + r.gross, 0);
    const totalNet = data.reduce((s, r) => s + r.net, 0);
    const totalFees = data.reduce((s, r) => s + r.fees, 0);

    return (
        <div className="animate-fade-in">
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1>Revenue</h1>
                    <p>All your revenue transactions across platforms.</p>
                </div>
                <button className="btn btn-secondary"><Download size={15} /> Export CSV</button>
            </div>

            {/* Summary Stats */}
            <div className="stats-grid stagger" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <div className="stat-card">
                    <div className="stat-label">Total Gross</div>
                    <div className="stat-value" style={{ color: 'var(--accent-primary)' }}>${totalGross.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Total Net</div>
                    <div className="stat-value">${totalNet.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Total Fees</div>
                    <div className="stat-value" style={{ color: 'var(--color-danger)' }}>${totalFees.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                </div>
            </div>

            {/* Filters */}
            <div className="filters-bar">
                <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
                    <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input className="input" style={{ paddingLeft: 36 }} placeholder="Search transactions..."
                        value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <select className="select" value={platformFilter} onChange={(e) => setPlatformFilter(e.target.value)}>
                    {platforms.map((p) => <option key={p} value={p}>{p === 'All' ? 'All Platforms' : p}</option>)}
                </select>
                <select className="select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                    {types.map((t) => <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>)}
                </select>
            </div>

            {/* Table */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <table className="data-table">
                    <thead>
                        <tr>
                            {[
                                { key: 'date', label: 'Date' },
                                { key: 'platform', label: 'Platform' },
                                { key: 'type', label: 'Type' },
                                { key: 'gross', label: 'Gross' },
                                { key: 'net', label: 'Net' },
                                { key: 'fees', label: 'Fees' },
                                { key: 'currency', label: 'Currency' },
                            ].map((col) => (
                                <th key={col.key} onClick={() => toggleSort(col.key)} style={{ cursor: 'pointer', userSelect: 'none' }}>
                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                                        {col.label}
                                        <ArrowUpDown size={11} style={{ opacity: sortKey === col.key ? 1 : 0.3 }} />
                                    </span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr key={row.id}>
                                <td>{row.date}</td>
                                <td><span className="badge badge-info">{row.platform}</span></td>
                                <td style={{ color: 'var(--text-secondary)' }}>{row.type}</td>
                                <td style={{ fontWeight: 600 }}>${row.gross.toFixed(2)}</td>
                                <td style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>${row.net.toFixed(2)}</td>
                                <td style={{ color: row.fees > 0 ? 'var(--color-danger)' : 'var(--text-muted)' }}>
                                    {row.fees > 0 ? `-$${row.fees.toFixed(2)}` : '—'}
                                </td>
                                <td>{row.currency}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
