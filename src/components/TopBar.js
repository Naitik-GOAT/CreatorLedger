'use client';

import { Bell, Search, ChevronDown } from 'lucide-react';

export default function TopBar() {
    return (
        <header style={styles.topbar}>
            {/* Search */}
            <div style={styles.searchWrap}>
                <Search size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                <input
                    type="text"
                    placeholder="Search revenue, platforms, insights..."
                    style={styles.searchInput}
                />
                <kbd style={styles.kbd}>⌘K</kbd>
            </div>

            {/* Right section */}
            <div style={styles.right}>
                {/* Notification */}
                <button style={styles.notifBtn} aria-label="Notifications">
                    <Bell size={18} />
                    <span style={styles.notifDot} />
                </button>

                {/* User */}
                <div style={styles.userWrap}>
                    <div style={styles.avatar}>CL</div>
                    <div>
                        <div style={styles.userName}>Naitik G.</div>
                        <div style={styles.userPlan}>Pro Plan</div>
                    </div>
                    <ChevronDown size={14} style={{ color: 'var(--text-tertiary)' }} />
                </div>
            </div>
        </header>
    );
}

const styles = {
    topbar: {
        position: 'fixed',
        top: 0,
        left: 'var(--sidebar-width)',
        right: 0,
        height: 'var(--topbar-height)',
        background: 'rgba(10, 14, 23, 0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 28px',
        zIndex: 40,
    },
    searchWrap: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: 'var(--bg-input)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '8px 14px',
        width: 380,
        maxWidth: '50%',
    },
    searchInput: {
        flex: 1,
        border: 'none',
        background: 'transparent',
        color: 'var(--text-primary)',
        fontSize: '0.85rem',
        outline: 'none',
    },
    kbd: {
        fontSize: '0.65rem',
        fontWeight: 600,
        color: 'var(--text-muted)',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '4px',
        padding: '2px 6px',
        whiteSpace: 'nowrap',
    },
    right: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
    },
    notifBtn: {
        position: 'relative',
        padding: '8px',
        background: 'transparent',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--text-secondary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    notifDot: {
        position: 'absolute',
        top: 6,
        right: 6,
        width: 7,
        height: 7,
        borderRadius: '50%',
        background: 'var(--color-danger)',
        border: '2px solid var(--bg-sidebar)',
    },
    userWrap: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '6px 12px',
        background: 'var(--bg-input)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-full)',
        cursor: 'pointer',
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.72rem',
        fontWeight: 700,
        color: '#000',
    },
    userName: {
        fontSize: '0.82rem',
        fontWeight: 600,
        color: 'var(--text-primary)',
    },
    userPlan: {
        fontSize: '0.65rem',
        color: 'var(--accent-primary)',
        fontWeight: 500,
    },
};
