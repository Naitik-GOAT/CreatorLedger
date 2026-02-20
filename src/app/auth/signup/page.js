'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "An error occurred during signup.");
            } else {
                // Success! Redirect them to sign in so they can log in
                router.push("/auth/signin?registered=true");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-main)" }}>
            <div className="card animate-fade-in" style={{ maxWidth: 400, width: "100%", padding: 32 }}>
                <h1 style={{ textAlign: "center", marginBottom: 8 }}>Create Account</h1>
                <p style={{ textAlign: "center", color: "var(--text-secondary)", marginBottom: 24 }}>Start tracking your creator revenue instantly.</p>

                {error && <div className="alert-bar warning" style={{ marginBottom: 16 }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div>
                        <label style={{ display: "block", marginBottom: 6, fontSize: "0.85rem", color: "var(--text-secondary)" }}>Name</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ width: "100%", padding: "10px 12px", borderRadius: "var(--radius-md)", background: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label style={{ display: "block", marginBottom: 6, fontSize: "0.85rem", color: "var(--text-secondary)" }}>Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: "100%", padding: "10px 12px", borderRadius: "var(--radius-md)", background: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label style={{ display: "block", marginBottom: 6, fontSize: "0.85rem", color: "var(--text-secondary)" }}>Password</label>
                        <input
                            type="password"
                            required
                            minLength={6}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: "100%", padding: "10px 12px", borderRadius: "var(--radius-md)", background: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
                            placeholder="••••••••"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "12px", justifyContent: "center", marginTop: 8 }} disabled={loading}>
                        {loading ? <Loader2 size={18} className="animate-spin" /> : "Sign Up"}
                    </button>

                    <div style={{ textAlign: 'center', marginTop: 16, fontSize: '0.85rem', color: "var(--text-secondary)" }}>
                        Already have an account? <Link href="/auth/signin" style={{ color: "var(--accent-primary)", textDecoration: "none", fontWeight: 600 }}>Sign In</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
