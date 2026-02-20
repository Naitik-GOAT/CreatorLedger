'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [agreed, setAgreed] = useState(false);
    const router = useRouter();

    const passStrength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
    const strengthLabels = ['', 'Weak', 'Good', 'Strong'];
    const strengthColors = ['', '#ef4444', '#f59e0b', '#00D4AA'];

    async function handleSignup(e) {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Something went wrong');
            }

            // Immediately login after successful signup
            const loginRes = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (loginRes?.error) {
                setError('Signup successful, but login failed. Please go to login page.');
                setLoading(false);
            } else {
                router.push('/dashboard');
            }
        } catch (err) {
            setError(err.message);
            setLoading(false);
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
                        <h1 style={styles.title}>Create your account</h1>
                        <p style={styles.subtitle}>Start tracking your true creator revenue.</p>
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
                        Sign up with Google
                    </button>

                    <div style={styles.divider}>
                        <div style={styles.dividerLine} />
                        <span style={styles.dividerText}>or</span>
                        <div style={styles.dividerLine} />
                    </div>

                    {error && <div style={styles.errorMessage}>{error}</div>}

                    <form onSubmit={handleSignup} style={styles.form}>
                        <div style={styles.field}>
                            <label style={styles.label}>Full Name</label>
                            <div style={styles.inputWrapper}>
                                <User size={18} style={styles.inputIcon} />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder="Your full name"
                                    style={styles.input}
                                    required
                                />
                            </div>
                        </div>

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
                            <label style={styles.label}>Password</label>
                            <div style={styles.inputWrapper}>
                                <Lock size={18} style={styles.inputIcon} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Create a strong password"
                                    style={styles.input}
                                    required
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={styles.eyeBtn}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

                            {password.length > 0 && (
                                <div style={{ marginTop: 6 }}>
                                    <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                                        {[1, 2, 3].map((lvl) => (
                                            <div key={lvl} style={{
                                                height: 3,
                                                flex: 1,
                                                borderRadius: 2,
                                                background: passStrength >= lvl ? strengthColors[passStrength] : 'rgba(255,255,255,0.1)',
                                                transition: 'background 200ms ease',
                                            }} />
                                        ))}
                                    </div>
                                    <div style={{ fontSize: '0.7rem', color: strengthColors[passStrength], fontWeight: 500 }}>
                                        {strengthLabels[passStrength]}
                                    </div>
                                </div>
                            )}
                        </div>

                        <label style={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                style={styles.checkbox}
                            />
                            <span>I agree to the <a href="#" style={styles.link}>Terms of Service</a> and <a href="#" style={styles.link}>Privacy Policy</a></span>
                        </label>

                        <button
                            type="submit"
                            disabled={loading || !name || !email || !password || !agreed}
                            style={{
                                ...styles.submitBtn,
                                opacity: (loading || !name || !email || !password || !agreed) ? 0.7 : 1,
                                cursor: (loading || !name || !email || !password || !agreed) ? 'not-allowed' : 'pointer',
                            }}
                        >
                            {loading ? <div style={styles.spinner} /> : 'Create Account'}
                        </button>
                    </form>

                    <p style={styles.footerText}>
                        Already have an account?{' '}
                        <Link href="/login" style={styles.footerLink}>
                            Sign in
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
        top: '-10%',
        right: '-10%',
        width: '60vw',
        height: '60vw',
        background: 'radial-gradient(circle, rgba(124, 92, 252, 0.08) 0%, transparent 60%)',
        filter: 'blur(60px)',
        zIndex: 0,
    },
    bgGlow2: {
        position: 'absolute',
        bottom: '-10%',
        left: '-10%',
        width: '50vw',
        height: '50vw',
        background: 'radial-gradient(circle, rgba(0, 212, 170, 0.08) 0%, transparent 60%)',
        filter: 'blur(60px)',
        zIndex: 0,
    },
    container: {
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: '440px',
        padding: '20px',
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
    checkboxLabel: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px',
        fontSize: '0.8rem',
        color: '#a1a1aa',
        cursor: 'pointer',
        lineHeight: 1.5,
        marginTop: '4px',
    },
    checkbox: {
        width: '16px',
        height: '16px',
        accentColor: '#00D4AA',
        cursor: 'pointer',
        marginTop: '2px',
        flexShrink: 0,
    },
    link: {
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
