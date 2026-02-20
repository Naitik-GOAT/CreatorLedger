'use client';

import { useState } from 'react';
import { taxEstimates } from '@/data/mockData';
import { Calculator, DollarSign, Calendar, PiggyBank, Globe } from 'lucide-react';

function fmt(v) { return '$' + v.toLocaleString(); }

const countries = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'India', 'Brazil'];

export default function TaxPage() {
    const [country, setCountry] = useState(taxEstimates.country);
    const t = taxEstimates;

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <h1>Tax Estimator</h1>
                <p>Estimate your tax obligations and plan quarterly payments.</p>
            </div>

            {/* Country Selector */}
            <div className="card" style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
                <Globe size={20} color="var(--accent-secondary)" />
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: 4 }}>Tax Jurisdiction</div>
                    <select className="select" style={{ width: '100%', maxWidth: 300 }} value={country} onChange={(e) => setCountry(e.target.value)}>
                        {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Annual Income</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent-primary)' }}>{fmt(t.annualIncome)}</div>
                </div>
            </div>

            {/* Tax Summary Stats */}
            <div className="stats-grid stagger" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                <div className="stat-card">
                    <div className="stat-label">Federal Tax</div>
                    <div className="stat-value" style={{ color: 'var(--color-danger)' }}>{fmt(t.federalTax)}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">State Tax</div>
                    <div className="stat-value" style={{ color: 'var(--color-warning)' }}>{fmt(t.stateTax)}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Self-Employment Tax</div>
                    <div className="stat-value" style={{ color: 'var(--accent-secondary)' }}>{fmt(t.selfEmploymentTax)}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Effective Rate</div>
                    <div className="stat-value">{t.effectiveRate}%</div>
                </div>
            </div>

            <div className="grid-2" style={{ marginTop: 24 }}>
                {/* Tax Breakdown */}
                <div className="card">
                    <div className="section-title"><Calculator size={18} color="var(--accent-secondary)" /> Tax Breakdown</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {[
                            { label: 'Gross Annual Income', value: fmt(t.annualIncome), color: 'var(--accent-primary)' },
                            { label: 'Federal Income Tax', value: `-${fmt(t.federalTax)}`, color: 'var(--color-danger)' },
                            { label: 'State Income Tax', value: `-${fmt(t.stateTax)}`, color: 'var(--color-warning)' },
                            { label: 'Self-Employment Tax', value: `-${fmt(t.selfEmploymentTax)}`, color: 'var(--accent-secondary)' },
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: 'var(--bg-input)', borderRadius: 'var(--radius-md)' }}>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.label}</span>
                                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: item.color }}>{item.value}</span>
                            </div>
                        ))}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.2)', borderRadius: 'var(--radius-md)' }}>
                            <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>Total Estimated Tax</span>
                            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-danger)' }}>{fmt(t.totalTax)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', background: 'var(--accent-primary-dim)', border: '1px solid rgba(0,212,170,0.2)', borderRadius: 'var(--radius-md)' }}>
                            <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>After-Tax Income</span>
                            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-primary)' }}>{fmt(t.annualIncome - t.totalTax)}</span>
                        </div>
                    </div>
                </div>

                {/* Quarterly Payments + Reserve */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    <div className="card">
                        <div className="section-title"><Calendar size={18} color="var(--color-warning)" /> Quarterly Payments</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {t.quarterlyPayments.map((q, i) => (
                                <div key={i} style={{
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    padding: '14px 16px', background: 'var(--bg-input)', borderRadius: 'var(--radius-md)',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <div style={{
                                            width: 32, height: 32, borderRadius: 'var(--radius-sm)',
                                            background: i === 0 ? 'rgba(255,176,32,0.15)' : 'var(--bg-card)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '0.75rem', fontWeight: 700, color: i === 0 ? 'var(--color-warning)' : 'var(--text-tertiary)',
                                        }}>
                                            Q{i + 1}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>{q.quarter}</div>
                                            {i === 0 && <div style={{ fontSize: '0.65rem', color: 'var(--color-warning)' }}>Due next</div>}
                                        </div>
                                    </div>
                                    <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{fmt(q.amount)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card" style={{ background: 'linear-gradient(135deg, rgba(0,212,170,0.08), rgba(124,92,252,0.05))', borderColor: 'rgba(0,212,170,0.2)' }}>
                        <div className="section-title"><PiggyBank size={18} color="var(--accent-primary)" /> Monthly Tax Reserve</div>
                        <div style={{ textAlign: 'center', padding: '10px 0' }}>
                            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent-primary)', marginBottom: 6 }}>{fmt(t.suggestedReserve)}</div>
                            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Set aside this amount each month for taxes</div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', marginTop: 8 }}>
                                Based on {t.effectiveRate}% effective tax rate
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
