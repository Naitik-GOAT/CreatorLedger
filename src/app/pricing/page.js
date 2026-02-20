'use client';

import Link from 'next/link';
import { Check, X, Crown, Zap, ArrowRight, ChevronRight } from 'lucide-react';

const features = [
    { name: 'Platform Connections', free: '1 platform', pro: 'Unlimited' },
    { name: 'Revenue History', free: '30 days', pro: 'Unlimited' },
    { name: 'Revenue Graph', free: true, pro: true },
    { name: 'Revenue Forecasting', free: false, pro: true },
    { name: 'AI Insights', free: false, pro: true },
    { name: 'Risk Detection Alerts', free: false, pro: true },
    { name: 'Expense Tracking', free: false, pro: true },
    { name: 'Profit Tracking', free: false, pro: true },
    { name: 'Tax Estimation', free: false, pro: true },
    { name: 'Brand Deal ROI Tracker', free: false, pro: true },
    { name: 'Financial Health Score', free: false, pro: true },
    { name: 'Exportable Reports', free: false, pro: true },
    { name: 'Team Access', free: false, pro: true },
    { name: 'Priority Support', free: false, pro: true },
];

const faqs = [
    { q: 'Can I cancel anytime?', a: 'Yes! You can cancel your Pro subscription at any time. Your access will continue until the end of your billing period.' },
    { q: 'Is my financial data secure?', a: 'Absolutely. We use bank-grade encryption, read-only API scopes, and are GDPR compliant. Your data is never shared with third parties.' },
    { q: 'How does revenue syncing work?', a: 'We connect via official OAuth or API integrations with each platform. Revenue data is pulled daily and normalized into a unified dashboard.' },
    { q: 'Can I export my data?', a: 'Pro users can export all revenue data, expense reports, and insights as CSV or professional PDF reports.' },
];

export default function PricingPage() {
    return (
        <div className="animate-fade-in">
            <div style={{ textAlign: 'center', marginBottom: 48, paddingTop: 20 }}>
                <div className="badge badge-purple" style={{ marginBottom: 16 }}>PRICING</div>
                <h1 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 10 }}>
                    Simple, transparent pricing
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: 500, margin: '0 auto' }}>
                    Start free. Upgrade when you&apos;re ready to unlock the full financial OS.
                </p>
            </div>

            {/* Pricing Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 800, margin: '0 auto 48px' }}>
                {/* Free Plan */}
                <div className="card" style={{ padding: '32px 28px', position: 'relative' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Free</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
                        <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>$0</span>
                        <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>/month</span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: 24, lineHeight: 1.5 }}>
                        Get started with basic revenue tracking for one platform.
                    </p>
                    <button className="btn btn-secondary" style={{ width: '100%', marginBottom: 24 }}>Current Plan</button>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {features.slice(0, 6).map((f, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.82rem' }}>
                                {typeof f.free === 'string' ? (
                                    <>
                                        <Check size={15} color="var(--accent-primary)" />
                                        <span style={{ color: 'var(--text-secondary)' }}>{f.name}: <strong>{f.free}</strong></span>
                                    </>
                                ) : f.free ? (
                                    <>
                                        <Check size={15} color="var(--accent-primary)" />
                                        <span style={{ color: 'var(--text-secondary)' }}>{f.name}</span>
                                    </>
                                ) : (
                                    <>
                                        <X size={15} color="var(--text-muted)" />
                                        <span style={{ color: 'var(--text-muted)' }}>{f.name}</span>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pro Plan */}
                <div className="card" style={{
                    padding: '32px 28px', position: 'relative',
                    background: 'linear-gradient(135deg, rgba(0,212,170,0.06), rgba(124,92,252,0.04))',
                    borderColor: 'rgba(0,212,170,0.3)',
                }}>
                    <div style={{
                        position: 'absolute', top: -12, right: 20,
                        padding: '4px 14px', borderRadius: 'var(--radius-full)',
                        background: 'linear-gradient(135deg, var(--accent-primary), #00B894)',
                        fontSize: '0.7rem', fontWeight: 700, color: '#000',
                    }}>
                        RECOMMENDED
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <Crown size={18} color="var(--color-warning)" />
                        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-warning)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pro</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
                        <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>$29</span>
                        <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>/month</span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: 24, lineHeight: 1.5 }}>
                        The complete financial OS. AI insights, forecasting, and full control.
                    </p>
                    <button className="btn btn-primary" style={{ width: '100%', marginBottom: 24 }}>
                        <Zap size={15} /> Upgrade to Pro
                    </button>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {features.map((f, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.82rem' }}>
                                <Check size={15} color="var(--accent-primary)" />
                                <span style={{ color: 'var(--text-secondary)' }}>
                                    {f.name}{typeof f.pro === 'string' ? `: ${f.pro}` : ''}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ */}
            <div style={{ maxWidth: 700, margin: '0 auto' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 700, textAlign: 'center', marginBottom: 24 }}>
                    Frequently Asked Questions
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {faqs.map((faq, i) => (
                        <details key={i} style={{
                            padding: '16px 20px', background: 'var(--bg-card)',
                            border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)',
                        }}>
                            <summary style={{
                                fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer',
                                listStyle: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            }}>
                                {faq.q}
                                <ChevronRight size={16} style={{ color: 'var(--text-tertiary)' }} />
                            </summary>
                            <p style={{ marginTop: 12, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                {faq.a}
                            </p>
                        </details>
                    ))}
                </div>
            </div>
        </div>
    );
}
