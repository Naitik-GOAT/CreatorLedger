import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export function useDashboardData() {
    const { data: session, status } = useSession();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (status === 'unauthenticated') {
            window.location.href = '/auth/signin';
            return;
        }

        if (status !== 'authenticated') return;

        async function fetchData() {
            setLoading(true);
            try {
                const res = await fetch('/api/dashboard');
                if (!res.ok) {
                    if (res.status === 401) {
                        window.location.href = '/auth/signin';
                        return;
                    }
                    throw new Error('Failed to fetch dashboard data');
                }
                const json = await res.json();
                setData(json);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [status]);

    return { session, data, loading, error };
}
