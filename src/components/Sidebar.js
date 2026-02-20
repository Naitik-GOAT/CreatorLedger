'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Link2,
    DollarSign,
    Receipt,
    TrendingUp,
    Brain,
    Handshake,
    Calculator,
    Settings,
    Crown,
    Zap,
} from 'lucide-react';

const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/integrations', label: 'Integrations', icon: Link2 },
    { href: '/revenue', label: 'Revenue', icon: DollarSign },
    { href: '/expenses', label: 'Expenses', icon: Receipt },
    { href: '/forecast', label: 'Forecast', icon: TrendingUp },
    { href: '/insights', label: 'AI Insights', icon: Brain },
    { href: '/deals', label: 'Brand Deals', icon: Handshake },
    { href: '/tax', label: 'Tax Estimator', icon: Calculator },
    { href: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside style={styles.sidebar}>
            {/* Logo */}
            <Link href="/" style={styles.logo}>
                <div style={styles.logoIcon}>
                    <Zap size={20} color="#000" />
                </div>
                <div>
                    <div style={styles.logoText}>CreatorLedger</div>
                    <div style={styles.logoTagline}>Financial OS</div>
                </div>
            </Link>

            {/* Navigation */}
            <nav style={styles.nav}>
                <div style={styles.navSection}>MAIN MENU</div>
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            style={{
                                ...styles.navItem,
                                ...(isActive ? styles.navItemActive : {}),
                            }}
                        >
                            <Icon size={18} style={{ opacity: isActive ? 1 : 0.5 }} />
                            <span>{item.label}</span>
                            {isActive && <div style={styles.activeIndicator} />}
                        </Link>
                    );
                })}
            </nav>

            {/* Upgrade CTA */}
            <div style={styles.upgradeCard}>
                <div style={styles.upgradeIcon}>
                    <Crown size={20} color="#FFB020" />
                </div>
                <div style={styles.upgradeTitle}>Upgrade to Pro</div>
                <div style={styles.upgradeDesc}>Unlock AI insights, forecasting & more</div>
                <Link href="/pricing" style={styles.upgradeBtn}>
                    View Plans
                </Link>
            </div>
        </aside>
    );
}

const styles = {
    sidebar: {
        width: 'var(--sidebar-width)',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        background: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        padding: '0 12px',
        zIndex: 50,
        overflowY: 'auto',
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '20px 12px',
        textDecoration: 'none',
        marginBottom: '8px',
    },
    logoIcon: {
        width: 36,
        height: 36,
        borderRadius: 'var(--radius-md)',
        background: 'linear-gradient(135deg, var(--accent-primary), #00B894)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    logoText: {
        fontSize: '1.05rem',
        fontWeight: 800,
        color: 'var(--text-primary)',
        letterSpacing: '-0.02em',
    },
    logoTagline: {
        fontSize: '0.65rem',
        fontWeight: 500,
        color: 'var(--text-tertiary)',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
    },
    nav: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
    },
    navSection: {
        fontSize: '0.65rem',
        fontWeight: 600,
        color: 'var(--text-muted)',
        letterSpacing: '0.1em',
        padding: '16px 12px 8px',
    },
    navItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 12px',
        fontSize: '0.875rem',
        fontWeight: 500,
        color: 'var(--text-secondary)',
        borderRadius: 'var(--radius-md)',
        textDecoration: 'none',
        transition: 'all 150ms ease',
        position: 'relative',
    },
    navItemActive: {
        background: 'var(--accent-primary-dim)',
        color: 'var(--accent-primary)',
        fontWeight: 600,
    },
    activeIndicator: {
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        width: 3,
        height: 20,
        borderRadius: 'var(--radius-full)',
        background: 'var(--accent-primary)',
    },
    upgradeCard: {
        margin: '16px 4px 20px',
        padding: '20px 16px',
        background: 'linear-gradient(135deg, rgba(124, 92, 252, 0.12), rgba(0, 212, 170, 0.08))',
        border: '1px solid rgba(124, 92, 252, 0.2)',
        borderRadius: 'var(--radius-lg)',
        textAlign: 'center',
    },
    upgradeIcon: {
        width: 40,
        height: 40,
        borderRadius: 'var(--radius-full)',
        background: 'rgba(255, 176, 32, 0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 10px',
    },
    upgradeTitle: {
        fontSize: '0.9rem',
        fontWeight: 700,
        color: 'var(--text-primary)',
        marginBottom: 4,
    },
    upgradeDesc: {
        fontSize: '0.72rem',
        color: 'var(--text-tertiary)',
        marginBottom: 14,
        lineHeight: 1.4,
    },
    upgradeBtn: {
        display: 'inline-block',
        padding: '8px 24px',
        fontSize: '0.8rem',
        fontWeight: 700,
        background: 'linear-gradient(135deg, var(--accent-secondary), #9F7AEA)',
        color: '#fff',
        borderRadius: 'var(--radius-full)',
        textDecoration: 'none',
    },
};
