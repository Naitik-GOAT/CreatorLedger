'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    async function handleLogin(e) {
        e.preventDefault();
        setLoading(true);
        setError('');

        const res = await signIn('credentials', {
            redirect: false,
            email,
            password
        });

        if (res?.error) {
            setError('Invalid email or password. Please try again.');
            setLoading(false);
        } else {
            router.push('/dashboard');
        }
    }

    return (
        <div style={styles.page}>
            <div style={styles.bgGlow1} />
            <div style={styles.bgGlow2} />

            <div style={styles.container}>
                <div style={styles.card}>
                    <div style={styles.header}>
                        <div style={styles.logo}>
                            <span style={styles.logoMark}></span>
                            CreatorLedger
                        </div>
                        <h1 style={styles.title}>Welcome back</h1>
                        <p style={styles.subtitle}>Log in to access your financial dashboard.</p>
                    </div>

                    <button
                        onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                        style={styles.googleBtn}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginRight: 10 }}>
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </button>

                    <div style={styles.divider}>
                        <div style={styles.dividerLine} />
                        <span style={styles.dividerText}>or</span>
                        <div style={styles.dividerLine} />
                    </div>

                    {error && <div style={styles.errorMessage}>{error}</div>}

                    <form onSubmit={handleLogin} style={styles.form}>
                        <div style={styles.field}>
                            <label style={styles.label}>Email Address</label>
                            <div style={styles.inputWrapper}>
                                <Mail size={18} style={styles.inputIcon} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    style={styles.input}
                                    required
                                />
                            </div>
                        </div>

                        <div style={styles.field}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <label style={styles.label}>Password</label>
                                <a href="#" style={styles.forgotLink}>Forgot?</a>
                            </div>
                            <div style={styles.inputWrapper}>
                                <Lock size={18} style={styles.inputIcon} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    style={styles.input}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={styles.eyeBtn}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !email || !password}
                            style={{
                                ...styles.submitBtn,
                                opacity: (loading || !email || !password) ? 0.7 : 1,
                                cursor: (loading || !email || !password) ? 'not-allowed' : 'pointer',
                            }}
                        >
                            {loading ? <div style={styles.spinner} /> : 'Sign In'}
                        </button>
                    </form>

                    <p style={styles.footerText}>
                        Don't have an account?{' '}
                        <Link href="/signup" style={styles.footerLink}>
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

const styles = {
    page: {
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        fontFamily: '"Inter", sans-serif',
        overflow: 'hidden',
    },
    bgGlow1: {
        position: 'absolute',
        top: '10%',
        left: '-10%',
        width: '60vw',
        height: '60vw',
        background: 'radial-gradient(circle, rgba(0, 212, 170, 0.08) 0%, transparent 60%)',
        filter: 'blur(60px)',
        zIndex: 0,
    },
    bgGlow2: {
        position: 'absolute',
        bottom: '-10%',
        right: '-10%',
        width: '50vw',
        height: '50vw',
        background: 'radial-gradient(circle, rgba(124, 92, 252, 0.08) 0%, transparent 60%)',
        filter: 'blur(60px)',
        zIndex: 0,
    },
    container: {
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: '440px',
        padding: '0 20px',
    },
    card: {
        background: 'rgba(20, 20, 20, 0.65)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '24px',
        padding: '48px 40px',
        boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
    },
    header: {
        textAlign: 'center',
        marginBottom: '32px',
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        fontSize: '1.25rem',
        fontWeight: '700',
        color: '#fff',
        marginBottom: '24px',
    },
    logoMark: {
        width: '28px',
        height: '28px',
        background: 'linear-gradient(135deg, #00D4AA, #00B894)',
        borderRadius: '8px',
        display: 'inline-block',
    },
    title: {
        fontSize: '1.75rem',
        fontWeight: '700',
        color: '#fff',
        margin: '0 0 8px 0',
        letterSpacing: '-0.02em',
    },
    subtitle: {
        fontSize: '0.95rem',
        color: '#a1a1aa',
        margin: 0,
    },
    googleBtn: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px 16px',
        background: '#fff',
        color: '#000',
        border: 'none',
        borderRadius: '12px',
        fontSize: '0.95rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'transform 0.1s ease, box-shadow 0.2s ease',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    divider: {
        display: 'flex',
        alignItems: 'center',
        margin: '28px 0',
    },
    dividerLine: {
        flex: 1,
        height: '1px',
        background: 'rgba(255,255,255,0.1)',
    },
    dividerText: {
        padding: '0 12px',
        fontSize: '0.85rem',
        color: '#71717a',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    },
    errorMessage: {
        background: 'rgba(239, 68, 68, 0.1)',
        color: '#ef4444',
        padding: '12px',
        borderRadius: '8px',
        fontSize: '0.85rem',
        marginBottom: '20px',
        border: '1px solid rgba(239, 68, 68, 0.2)',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    label: {
        fontSize: '0.85rem',
        fontWeight: '500',
        color: '#e4e4e7',
    },
    inputWrapper: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    inputIcon: {
        position: 'absolute',
        left: '14px',
        color: '#71717a',
        pointerEvents: 'none',
    },
    input: {
        width: '100%',
        padding: '12px 14px 12px 42px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        color: '#fff',
        fontSize: '0.95rem',
        outline: 'none',
        transition: 'all 0.2s ease',
    },
    eyeBtn: {
        position: 'absolute',
        right: '12px',
        background: 'none',
        border: 'none',
        color: '#71717a',
        cursor: 'pointer',
        padding: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    forgotLink: {
        fontSize: '0.8rem',
        color: '#00D4AA',
        textDecoration: 'none',
        fontWeight: '500',
    },
    submitBtn: {
        marginTop: '8px',
        background: '#fff',
        color: '#000',
        padding: '14px',
        borderRadius: '12px',
        border: 'none',
        fontSize: '0.95rem',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease',
    },
    spinner: {
        width: '20px',
        height: '20px',
        border: '2px solid rgba(0,0,0,0.1)',
        borderTopColor: '#000',
        borderRadius: '50%',
        animation: 'spin 0.6s linear infinite',
    },
    footerText: {
        marginTop: '32px',
        textAlign: 'center',
        fontSize: '0.9rem',
        color: '#a1a1aa',
    },
    footerLink: {
        color: '#00D4AA',
        textDecoration: 'none',
        fontWeight: '600',
    },
};
