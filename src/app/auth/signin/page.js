'use client';

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [registeredMsg, setRegisteredMsg] = useState(false);

    // Check for standard JS window.location.search since useSearchParams handles it nicely in client components too
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const searchParams = new URLSearchParams(window.location.search);
            if (searchParams.get('registered') === 'true') {
                setRegisteredMsg(true);
            }
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        setLoading(false);

        if (res?.error) {
            setError("Invalid email or password");
        } else {
            router.push("/dashboard");
        }
    };

    return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-main)" }}>
            <div className="card" style={{ maxWidth: 400, width: "100%", padding: 32 }}>
                <h1 style={{ textAlign: "center", marginBottom: 8 }}>Sign In</h1>
                <p style={{ textAlign: "center", color: "var(--text-secondary)", marginBottom: 24 }}>Welcome back to CreatorLedger</p>

                {error && <div className="alert-bar warning" style={{ marginBottom: 16 }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div>
                        <label style={{ display: "block", marginBottom: 6, fontSize: "0.85rem", color: "var(--text-secondary)" }}>Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: "100%", padding: "10px 12px", borderRadius: "var(--radius-md)", background: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
                            placeholder="test@example.com"
                        />
                    </div>
                    <div>
                        <label style={{ display: "block", marginBottom: 6, fontSize: "0.85rem", color: "var(--text-secondary)" }}>Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: "100%", padding: "10px 12px", borderRadius: "var(--radius-md)", background: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
                            placeholder="password"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "12px", justifyContent: "center", marginTop: 8 }} disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                    </button>

                    <div style={{ display: "flex", alignItems: "center", margin: "16px 0" }}>
                        <div style={{ flex: 1, height: 1, background: "var(--border-color)" }}></div>
                        <span style={{ padding: "0 10px", fontSize: "0.8rem", color: "var(--text-muted)" }}>OR</span>
                        <div style={{ flex: 1, height: 1, background: "var(--border-color)" }}></div>
                    </div>

                    <button type="button" className="btn btn-secondary" style={{ width: "100%", justifyContent: "center" }} onClick={() => signIn('google')}>
                        Continue with Google
                    </button>

                    <div style={{ textAlign: 'center', marginTop: 16, fontSize: '0.85rem', color: "var(--text-secondary)" }}>
                        Don't have an account? <Link href="/auth/signup" style={{ color: "var(--accent-primary)", textDecoration: "none", fontWeight: 600 }}>Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
