'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import { Lock } from 'lucide-react';

const publicRoutes = ['/', '/login', '/signup'];
const premiumRoutes = ['/forecast', '/insights', '/tax', '/deals', '/expenses', '/revenue'];

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (!publicRoutes.includes(pathname) && status === 'unauthenticated') {
      router.push('/login');
    }
  }, [pathname, status, router]);

  if (publicRoutes.includes(pathname)) {
    return <main>{children}</main>;
  }

  // Optional loading screen or empty screen while checking auth
  if (status === 'loading') {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a' }}>Loading...</div>;
  }

  // Prevent flash of protected content before redirect
  if (status === 'unauthenticated') {
    return null;
  }

  const isPremiumRoute = premiumRoutes.includes(pathname);

  return (
    <div className="app-layout">
      <Sidebar />
      <TopBar />
      <main className="main-content">
        {isPremiumRoute ? (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', textAlign: 'center', padding: '0 20px' }}>
            <div style={{ width: 64, height: 64, background: 'rgba(255, 176, 32, 0.1)', color: '#FFB020', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
              <Lock size={32} />
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 12 }}>Premium Feature</h2>
            <p style={{ color: '#a1a1aa', maxWidth: 400, margin: '0 auto 24px', lineHeight: 1.6 }}>
              This feature is not available in the free mode. Upgrade to CreatorLedger Pro to unlock advanced analytics, forecasting, tax estimation, and more.
            </p>
            <button className="btn" style={{ background: 'linear-gradient(135deg, #FFB020, #F59E0B)', color: '#000', border: 'none', fontWeight: 700, padding: '12px 24px', borderRadius: '12px' }}>
              Upgrade to Pro
            </button>
          </div>
        ) : (
          children
        )}
      </main>
    </div>
  );
}
