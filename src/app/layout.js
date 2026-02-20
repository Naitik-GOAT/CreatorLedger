import './globals.css';
import ClientLayout from '@/components/ClientLayout';
import Providers from '@/components/Providers';

export const metadata = {
  title: 'CreatorLedger — The Financial Operating System for Creators',
  description: 'Track, analyze, forecast, and optimize your creator income across all platforms. Revenue aggregation, AI insights, forecasting, and business intelligence.',
  keywords: 'creator economy, revenue tracking, financial dashboard, creator income, youtube analytics',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
