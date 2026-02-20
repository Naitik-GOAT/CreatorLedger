'use client';

import { useState } from 'react';
import { connectedPlatforms, availablePlatforms } from '@/data/mockData';
import {
    Link2, Check, ExternalLink, RefreshCw, X,
} from 'lucide-react';

const categories = ['All', 'Video', 'Social', 'Payment', 'E-commerce', 'Membership', 'Course', 'Affiliate', 'Gaming'];

export default function PlatformsPage() {
    const [filter, setFilter] = useState('All');
    const [showModal, setShowModal] = useState(null);
    const [connecting, setConnecting] = useState(false);

    const filtered = filter === 'All'
        ? availablePlatforms
        : availablePlatforms.filter((p) => p.category === filter);

    function handleConnect(platform) {
        setShowModal(platform);
        setConnecting(true);
        setTimeout(() => setConnecting(false), 2000);
    }

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <h1>Platform Connections</h1>
                <p>Connect your monetization platforms to aggregate all revenue.</p>
            </div>

            {/* Connected Platforms */}
            <div className="section-title" style={{ marginBottom: 16 }}>
                <Check size={18} color="var(--accent-primary)" /> Connected ({connectedPlatforms.length})
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, marginBottom: 36 }} className="stagger">
                {connectedPlatforms.map((p) => (
                    <div key={p.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div style={{
                            width: 48, height: 48, borderRadius: 'var(--radius-md)',
                            background: 'var(--bg-input)', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
                        }}>
                            {p.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{p.name}</div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>
                                Synced {p.lastSync} • <span style={{ color: 'var(--accent-primary)' }}>${p.monthlyRevenue.toLocaleString()}/mo</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 6 }}>
                            <button className="btn-icon" title="Refresh"><RefreshCw size={14} /></button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Available Platforms */}
            <div className="section-title" style={{ marginBottom: 10 }}>
                <Link2 size={18} color="var(--accent-secondary)" /> Available Platforms
            </div>

            {/* Category Filter */}
            <div className="tabs" style={{ width: 'fit-content', marginBottom: 20 }}>
                {categories.map((c) => (
                    <button
                        key={c}
                        className={`tab ${filter === c ? 'active' : ''}`}
                        onClick={() => setFilter(c)}
                    >
                        {c}
                    </button>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
                {filtered.map((p) => (
                    <div key={p.id} className="card" style={{ textAlign: 'center', padding: '20px 16px', cursor: 'pointer' }}
                        onClick={() => handleConnect(p)}>
                        <div style={{ fontSize: '2rem', marginBottom: 8 }}>{p.icon}</div>
                        <div style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: 4 }}>{p.name}</div>
                        <div className="badge badge-purple" style={{ marginBottom: 10 }}>{p.category}</div>
                        <button className="btn btn-primary" style={{ width: '100%', fontSize: '0.75rem', padding: '8px 12px' }}>
                            <ExternalLink size={13} /> Connect
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal-backdrop" onClick={() => setShowModal(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <div className="modal-title">Connect {showModal.name}</div>
                            <button className="btn-icon" onClick={() => setShowModal(null)}><X size={18} /></button>
                        </div>
                        {connecting ? (
                            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                <div style={{
                                    width: 48, height: 48, border: '3px solid var(--border-color)',
                                    borderTopColor: 'var(--accent-primary)', borderRadius: '50%',
                                    animation: 'spin 1s linear infinite', margin: '0 auto 16px',
                                }} />
                                <style jsx>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Connecting to {showModal.name}...</div>
                                <div style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', marginTop: 4 }}>Redirecting to OAuth...</div>
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '30px 0' }}>
                                <div style={{
                                    width: 56, height: 56, borderRadius: '50%',
                                    background: 'var(--accent-primary-dim)', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
                                }}>
                                    <Check size={28} color="var(--accent-primary)" />
                                </div>
                                <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 4 }}>Connected!</div>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: 20 }}>
                                    {showModal.name} has been successfully connected. Revenue data will sync shortly.
                                </div>
                                <button className="btn btn-primary" onClick={() => setShowModal(null)}>Done</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
