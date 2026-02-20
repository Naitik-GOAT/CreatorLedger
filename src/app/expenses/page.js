'use client';

import { useState } from 'react';
import { expenses, summaryMetrics } from '@/data/mockData';
import {
    Plus, Upload, DollarSign, TrendingDown, PieChart,
    Flame, X,
} from 'lucide-react';

const categories = ['Software', 'Equipment', 'Marketing', 'Contractors', 'Travel', 'Subscriptions', 'Taxes', 'Other'];

export default function ExpensesPage() {
    const [showForm, setShowForm] = useState(false);
    const [expenseList, setExpenseList] = useState(expenses);
    const [form, setForm] = useState({ description: '', amount: '', category: 'Software', date: '' });

    const totalExpenses = expenseList.reduce((s, e) => s + e.amount, 0);
    const netProfit = summaryMetrics.totalRevenue - totalExpenses;
    const profitMargin = ((netProfit / summaryMetrics.totalRevenue) * 100).toFixed(1);

    // Category totals
    const categoryTotals = {};
    expenseList.forEach((e) => {
        categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
    });

    function handleAdd() {
        if (!form.description || !form.amount) return;
        setExpenseList([
            { id: Date.now(), ...form, amount: parseFloat(form.amount), date: form.date || new Date().toISOString().slice(0, 10) },
            ...expenseList,
        ]);
        setForm({ description: '', amount: '', category: 'Software', date: '' });
        setShowForm(false);
    }

    return (
        <div className="animate-fade-in">
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1>Expenses</h1>
                    <p>Track your business expenses and calculate profit.</p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-secondary"><Upload size={15} /> Import CSV</button>
                    <button className="btn btn-primary" onClick={() => setShowForm(true)}><Plus size={15} /> Add Expense</button>
                </div>
            </div>

            {/* Stats */}
            <div className="stats-grid stagger" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                <div className="stat-card">
                    <div className="stat-label">Total Expenses</div>
                    <div className="stat-value" style={{ color: 'var(--color-danger)' }}>${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Net Profit</div>
                    <div className="stat-value" style={{ color: 'var(--accent-primary)' }}>${netProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Profit Margin</div>
                    <div className="stat-value">{profitMargin}%</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Monthly Burn Rate</div>
                    <div className="stat-value" style={{ color: 'var(--color-warning)' }}>${totalExpenses.toLocaleString()}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6, fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>
                        <Flame size={12} /> per month
                    </div>
                </div>
            </div>

            {/* Category Breakdown */}
            <div className="grid-2" style={{ marginBottom: 24 }}>
                <div className="card">
                    <div className="section-title"><PieChart size={18} color="var(--accent-secondary)" /> By Category</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {Object.entries(categoryTotals)
                            .sort((a, b) => b[1] - a[1])
                            .map(([cat, total]) => {
                                const pct = ((total / totalExpenses) * 100).toFixed(0);
                                return (
                                    <div key={cat}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                            <span style={{ fontSize: '0.82rem', fontWeight: 500 }}>{cat}</span>
                                            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>${total.toLocaleString('en-US', { minimumFractionDigits: 2 })} ({pct}%)</span>
                                        </div>
                                        <div className="progress-bar" style={{ height: 6 }}>
                                            <div className="progress-fill" style={{ width: `${pct}%`, background: 'var(--accent-secondary)' }} />
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>

                {/* Cash Flow Summary */}
                <div className="card">
                    <div className="section-title"><TrendingDown size={18} color="var(--color-warning)" /> Cash Flow</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', background: 'var(--bg-input)', borderRadius: 'var(--radius-md)' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Revenue</span>
                            <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-primary)' }}>+${summaryMetrics.totalRevenue.toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', background: 'var(--bg-input)', borderRadius: 'var(--radius-md)' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Expenses</span>
                            <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-danger)' }}>-${totalExpenses.toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', background: 'var(--accent-primary-dim)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(0,212,170,0.2)' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Net Cash Flow</span>
                            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-primary)' }}>+${netProfit.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Expense Table */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenseList.map((e) => (
                            <tr key={e.id}>
                                <td>{e.date}</td>
                                <td style={{ fontWeight: 500 }}>{e.description}</td>
                                <td><span className="badge badge-purple">{e.category}</span></td>
                                <td style={{ fontWeight: 600, color: 'var(--color-danger)' }}>-${e.amount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Expense Modal */}
            {showForm && (
                <div className="modal-backdrop" onClick={() => setShowForm(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <div className="modal-title">Add Expense</div>
                            <button className="btn-icon" onClick={() => setShowForm(false)}><X size={18} /></button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            <div>
                                <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>Description</label>
                                <input className="input" placeholder="e.g. Adobe Creative Cloud"
                                    value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                <div>
                                    <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>Amount ($)</label>
                                    <input className="input" type="number" placeholder="0.00"
                                        value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>Date</label>
                                    <input className="input" type="date"
                                        value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>Category</label>
                                <select className="select" style={{ width: '100%' }}
                                    value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <button className="btn btn-primary" style={{ marginTop: 8 }} onClick={handleAdd}>
                                <Plus size={15} /> Add Expense
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
