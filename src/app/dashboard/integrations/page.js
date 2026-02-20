'use client';

import { useState, useEffect } from 'react';
import { Youtube, Instagram, Twitter, Loader2, Link2, Plus, Zap } from 'lucide-react';
import { useSession, signIn } from 'next-auth/react';

export default function IntegrationsPage() {
    const { data: session } = useSession();
    const [integrations, setIntegrations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchIntegrations() {
            try {
                const res = await fetch('/api/integrations');
                if (res.ok) {
                    const data = await res.json();
                    setIntegrations(data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchIntegrations();
    }, []);

    const handleConnect = async (platformName) => {
        // Map UI names to NextAuth provider IDs
        const providerMap = {
            'YouTube': 'google',
            'Instagram': 'instagram',
            'TikTok': 'tiktok' // Usually custom
        };
        const provider = providerMap[platformName];

        if (provider) {
            signIn(provider, { callbackUrl: '/dashboard/integrations' });
        } else {
            alert(`OAuth config for ${platformName} is not set up fully yet.`);
        }
    };

    const isConnected = (platform) => {
        return integrations.some(i => i.platform.toLowerCase() === platform.toLowerCase());
    };

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}><Loader2 className="animate-spin" size={32} /></div>;

    const platforms = [
        { name: 'YouTube', icon: <Youtube />, color: '#FF0000', desc: 'Sync AdSense revenue, super chats, and sponsorships.' },
        { name: 'Instagram', icon: <Instagram />, color: '#E1306C', desc: 'Track reels bonuses, badges, and branded content.' },
        { name: 'TikTok', icon: <Zap />, color: '#00F2FE', desc: 'Import Creator Fund earnings and TikTok Shop data.' }
    ];

    return (
        <div className="animate-fade-in">
            <div className="page-header" style={{ marginBottom: 32 }}>
                <h1>Integrations</h1>
                <p>Connect your platforms to automatically sync revenue data.</p>
            </div>

            <div className="grid-3 stagger">
                {platforms.map((p, i) => (
                    <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 48, height: 48, borderRadius: '12px', background: `${p.color}15`, color: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {p.icon}
                            </div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{p.name}</h3>
                                <span className={`badge ${isConnected(p.name) ? 'badge-info' : ''}`} style={{ marginTop: 4, display: 'inline-block' }}>
                                    {isConnected(p.name) ? 'Connected' : 'Not Connected'}
                                </span>
                            </div>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', flex: 1, margin: 0 }}>{p.desc}</p>

                        <button
                            className={`btn ${isConnected(p.name) ? 'btn-secondary' : 'btn-primary'}`}
                            style={{ justifyContent: 'center', width: '100%' }}
                            onClick={() => handleConnect(p.name)}
                            disabled={isConnected(p.name)}
                        >
                            {isConnected(p.name) ? <><Link2 size={16} /> Manage Sync</> : <><Plus size={16} /> Connect</>}
                        </button>
                    </div>
                ))}
            </div>

            <div className="card" style={{ marginTop: 32, background: 'linear-gradient(145deg, rgba(0, 212, 170, 0.05) 0%, rgba(0, 0, 0, 0) 100%)', border: '1px solid var(--accent-primary-dim)' }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ padding: 10, background: 'var(--accent-primary-dim)', borderRadius: 'var(--radius-md)', color: 'var(--accent-primary)' }}>
                        <Zap size={24} />
                    </div>
                    <div>
                        <h3 style={{ margin: '0 0 8px 0' }}>Need an API Integration?</h3>
                        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5, maxWidth: 600 }}>
                            We support manual file uploads for platforms not listed above. Download your CSV reports from Patreon, Twitch, or Stripe, and drop them here for instant parsing and syncing.
                        </p>
                        <button className="btn btn-secondary" style={{ marginTop: 16 }}>Upload CSV</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
