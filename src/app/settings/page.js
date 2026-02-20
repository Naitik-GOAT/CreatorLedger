'use client';

import { useState } from 'react';
import {
    User, Shield, CreditCard, Database, Users,
    Bell, Moon, Globe, Lock, Mail, Camera,
    Check, ChevronRight,
} from 'lucide-react';

const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'data', label: 'Data', icon: Database },
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <h1>Settings</h1>
                <p>Manage your account, security, and preferences.</p>
            </div>

            <div style={{ display: 'flex', gap: 24 }}>
                {/* Settings Nav */}
                <div style={{ width: 220, flexShrink: 0 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                                    display: 'flex', alignItems: 'center', gap: 10,
                                    padding: '10px 14px', fontSize: '0.85rem', fontWeight: isActive ? 600 : 500,
                                    border: 'none', borderRadius: 'var(--radius-md)',
                                    background: isActive ? 'var(--accent-primary-dim)' : 'transparent',
                                    color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                    cursor: 'pointer', textAlign: 'left', width: '100%',
                                    transition: 'all 150ms ease',
                                }}>
                                    <Icon size={17} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Settings Content */}
                <div style={{ flex: 1 }}>
                    {activeTab === 'profile' && (
                        <div className="card animate-fade-in">
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 20 }}>Profile Settings</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28 }}>
                                <div style={{
                                    width: 80, height: 80, borderRadius: '50%',
                                    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.5rem', fontWeight: 800, color: '#000', position: 'relative',
                                }}>
                                    NG
                                    <button style={{
                                        position: 'absolute', bottom: -2, right: -2,
                                        width: 28, height: 28, borderRadius: '50%',
                                        background: 'var(--bg-card)', border: '2px solid var(--border-color)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        cursor: 'pointer', color: 'var(--text-secondary)',
                                    }}>
                                        <Camera size={12} />
                                    </button>
                                </div>
                                <div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>Naitik Gupta</div>
                                    <div style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)' }}>naitik@example.com</div>
                                    <div className="badge badge-success" style={{ marginTop: 6 }}>Pro Plan</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                                    <div>
                                        <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>Full Name</label>
                                        <input className="input" defaultValue="Naitik Gupta" />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>Email</label>
                                        <input className="input" defaultValue="naitik@example.com" type="email" />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>Business Name (optional)</label>
                                    <input className="input" placeholder="Your creator brand name" />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>Currency</label>
                                    <select className="select" style={{ width: '100%' }}>
                                        <option>USD ($)</option>
                                        <option>EUR (€)</option>
                                        <option>GBP (£)</option>
                                        <option>INR (₹)</option>
                                    </select>
                                </div>
                                <button className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: 8 }}>
                                    <Check size={15} /> Save Changes
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="card animate-fade-in">
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 20 }}>Security</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {/* 2FA */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'var(--bg-input)', borderRadius: 'var(--radius-md)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <Lock size={20} color="var(--accent-primary)" />
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>Two-Factor Authentication</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Add an extra layer of security</div>
                                        </div>
                                    </div>
                                    <div style={{
                                        width: 44, height: 24, borderRadius: 12, background: 'var(--accent-primary)',
                                        position: 'relative', cursor: 'pointer',
                                    }}>
                                        <div style={{
                                            width: 20, height: 20, borderRadius: '50%', background: '#fff',
                                            position: 'absolute', top: 2, right: 2,
                                            transition: 'all 200ms ease',
                                        }} />
                                    </div>
                                </div>

                                {/* Password */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'var(--bg-input)', borderRadius: 'var(--radius-md)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <Shield size={20} color="var(--accent-secondary)" />
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>Change Password</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Last changed 30 days ago</div>
                                        </div>
                                    </div>
                                    <button className="btn btn-secondary" style={{ fontSize: '0.78rem' }}>Update</button>
                                </div>

                                {/* Sessions */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'var(--bg-input)', borderRadius: 'var(--radius-md)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <Globe size={20} color="var(--color-info)" />
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>Active Sessions</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>2 sessions active</div>
                                        </div>
                                    </div>
                                    <button className="btn btn-secondary" style={{ fontSize: '0.78rem' }}>Manage</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'billing' && (
                        <div className="card animate-fade-in">
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 20 }}>Billing & Subscription</h3>
                            <div style={{
                                padding: '20px', background: 'linear-gradient(135deg, rgba(0,212,170,0.1), rgba(124,92,252,0.08))',
                                borderRadius: 'var(--radius-lg)', border: '1px solid rgba(0,212,170,0.2)', marginBottom: 20,
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div className="badge badge-success" style={{ marginBottom: 6 }}>Current Plan</div>
                                        <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>Pro Plan</div>
                                        <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>$29/month • Next billing: Mar 1, 2026</div>
                                    </div>
                                    <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-primary)' }}>$29<span style={{ fontSize: '0.8rem', fontWeight: 400, color: 'var(--text-tertiary)' }}>/mo</span></div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', background: 'var(--bg-input)', borderRadius: 'var(--radius-md)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <CreditCard size={18} color="var(--text-secondary)" />
                                        <span style={{ fontSize: '0.85rem' }}>Payment Method</span>
                                    </div>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>•••• 4242</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', background: 'var(--bg-input)', borderRadius: 'var(--radius-md)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <Mail size={18} color="var(--text-secondary)" />
                                        <span style={{ fontSize: '0.85rem' }}>Billing Email</span>
                                    </div>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>naitik@example.com</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'team' && (
                        <div className="card animate-fade-in">
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 20 }}>Team Access</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {[
                                    { name: 'Naitik Gupta', email: 'naitik@example.com', role: 'Owner' },
                                    { name: 'Sarah Chen', email: 'sarah@example.com', role: 'Editor' },
                                ].map((member, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px', background: 'var(--bg-input)', borderRadius: 'var(--radius-md)' }}>
                                        <div style={{
                                            width: 38, height: 38, borderRadius: '50%',
                                            background: i === 0 ? 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' : 'var(--bg-card)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '0.75rem', fontWeight: 700,
                                            color: i === 0 ? '#000' : 'var(--text-secondary)',
                                        }}>
                                            {member.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{member.name}</div>
                                            <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>{member.email}</div>
                                        </div>
                                        <span className={`badge ${member.role === 'Owner' ? 'badge-success' : 'badge-info'}`}>{member.role}</span>
                                    </div>
                                ))}
                                <button className="btn btn-secondary" style={{ alignSelf: 'flex-start', marginTop: 8 }}>
                                    <Users size={15} /> Invite Member
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'data' && (
                        <div className="card animate-fade-in">
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 20 }}>Data Management</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                <div style={{ padding: '16px', background: 'var(--bg-input)', borderRadius: 'var(--radius-md)' }}>
                                    <div style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: 4 }}>Export Data</div>
                                    <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', marginBottom: 12 }}>Download all your revenue data, expenses, and insights as CSV or PDF.</div>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <button className="btn btn-secondary" style={{ fontSize: '0.78rem' }}>Export CSV</button>
                                        <button className="btn btn-secondary" style={{ fontSize: '0.78rem' }}>Export PDF</button>
                                    </div>
                                </div>
                                <div style={{ padding: '16px', background: 'rgba(244,63,94,0.05)', border: '1px solid rgba(244,63,94,0.15)', borderRadius: 'var(--radius-md)' }}>
                                    <div style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: 4, color: 'var(--color-danger)' }}>Delete Account</div>
                                    <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', marginBottom: 12 }}>Permanently delete your account and all associated data.</div>
                                    <button className="btn btn-danger" style={{ fontSize: '0.78rem' }}>Delete Account</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
