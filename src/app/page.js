import Link from 'next/link';
import { ArrowRight, BarChart3, Brain, TrendingUp, Wallet, ShieldAlert, Target, RefreshCw, Lock, Zap, FileText, Users } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="landing-page-container">
      {/* Navbar */}
      <nav className="landing-navbar">
        <div className="landing-logo">
          <span style={{ color: "var(--text-primary)", fontWeight: "700" }}>Creator</span>
          <span style={{ color: "var(--accent-primary)", fontWeight: "700", marginLeft: "4px" }}>Ledger</span>
        </div>
        <div className="landing-nav-links">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="#features" className="nav-link active">Features</Link>
          <Link href="#pricing" className="nav-link">Pricing</Link>
          <Link href="#integrations" className="nav-link">Integrations</Link>
        </div>
        <div className="landing-nav-actions">
          <Link href="/login" className="login-link">Login</Link>
          <Link href="/dashboard" className="btn btn-primary landing-btn">Get Started</Link>
        </div>
      </nav>

      <main className="landing-main">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-badge">
            <div className="pulse-dot"></div>
            Financial OS for Creators
          </div>
          <h1 className="hero-title">
            Run Your Creator Business<br />
            <span className="text-gradient">Like a Real Business.</span>
          </h1>
          <p className="hero-subtitle">
            CreatorLedger helps creators track, forecast, and optimize revenue across all<br />
            platforms. One dashboard. Every stream. Full clarity.
          </p>
          <div className="hero-actions">
            <Link href="/dashboard" className="btn btn-primary btn-lg landing-btn">
              Get Started <ArrowRight size={18} />
            </Link>
            <Link href="#pricing" className="btn btn-glass btn-lg">
              View Pricing
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">40+</div>
              <div className="stat-label">Platforms supported</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">12,000+</div>
              <div className="stat-label">Creators on waitlist</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">8 types</div>
              <div className="stat-label">Revenue streams tracked</div>
            </div>
          </div>
        </section>

        {/* Built for creator businesses */}
        <section id="features" className="features-section">
          <div className="features-header">
            <h2 className="section-title-large">Built for creator businesses</h2>
            <p className="section-subtitle">
              Every feature was designed for the specific financial challenges that creators face —<br />
              not retrofitted from enterprise software.
            </p>
          </div>

          <div className="features-list">
            {/* Feature 1 */}
            <div className="feature-card-large group">
              <div className="feature-content">
                <div className="feature-icon-wrapper">
                  <BarChart3 size={24} color="var(--accent-primary)" />
                </div>
                <h3 className="feature-card-title">Multi-Platform Revenue Tracking</h3>
                <p className="feature-card-desc">
                  Aggregate income from all your monetization sources — YouTube, Shopify, Patreon, TikTok, and more — into a single normalized view. Every dollar accounted for, regardless of where it originated.
                </p>
              </div>
              <div className="feature-bullets-box">
                <ul className="feature-bullets">
                  <li><div className="bullet-dot"></div> Unified revenue timeline</li>
                  <li><div className="bullet-dot"></div> Currency normalization</li>
                  <li><div className="bullet-dot"></div> Daily automatic sync</li>
                </ul>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="feature-card-large group">
              <div className="feature-content">
                <div className="feature-icon-wrapper">
                  <Brain size={24} color="var(--accent-primary)" />
                </div>
                <h3 className="feature-card-title">AI Revenue Insights</h3>
                <p className="feature-card-desc">
                  The AI advisor analyzes your revenue patterns, platform mix, and growth trajectory to surface actionable recommendations. It thinks like a digital CFO — except it works around the clock.
                </p>
              </div>
              <div className="feature-bullets-box">
                <ul className="feature-bullets">
                  <li><div className="bullet-dot"></div> Growth opportunity detection</li>
                  <li><div className="bullet-dot"></div> Content-to-revenue correlation</li>
                  <li><div className="bullet-dot"></div> Platform diversification analysis</li>
                </ul>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="feature-card-large group">
              <div className="feature-content">
                <div className="feature-icon-wrapper">
                  <TrendingUp size={24} color="var(--accent-primary)" />
                </div>
                <h3 className="feature-card-title">Forecasting & Growth Predictions</h3>
                <p className="feature-card-desc">
                  Using time-series modeling and seasonal pattern recognition, CreatorLedger projects your next month, quarter, and annual revenue with confidence ranges based on your actual data.
                </p>
              </div>
              <div className="feature-bullets-box">
                <ul className="feature-bullets">
                  <li><div className="bullet-dot"></div> 1-month, 3-month, 12-month projections</li>
                  <li><div className="bullet-dot"></div> Confidence range modeling</li>
                  <li><div className="bullet-dot"></div> Seasonal pattern detection</li>
                </ul>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="feature-card-large group">
              <div className="feature-content">
                <div className="feature-icon-wrapper">
                  <Wallet size={24} color="var(--accent-primary)" />
                </div>
                <h3 className="feature-card-title">Profit & Expense Tracking</h3>
                <p className="feature-card-desc">
                  Track your real business costs — software, equipment, contractors, marketing — to understand your true profit margin. Input expenses manually or import via CSV.
                </p>
              </div>
              <div className="feature-bullets-box">
                <ul className="feature-bullets">
                  <li><div className="bullet-dot"></div> Expense categorization</li>
                  <li><div className="bullet-dot"></div> Net profit calculation</li>
                  <li><div className="bullet-dot"></div> Burn rate tracking</li>
                </ul>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="feature-card-large group">
              <div className="feature-content">
                <div className="feature-icon-wrapper">
                  <ShieldAlert size={24} color="var(--accent-primary)" />
                </div>
                <h3 className="feature-card-title">Risk Detection Alerts</h3>
                <p className="feature-card-desc">
                  Identify platform concentration risks, revenue stagnation, and income volatility early. CreatorLedger monitors your financial health and alerts you before small problems become big ones.
                </p>
              </div>
              <div className="feature-bullets-box">
                <ul className="feature-bullets">
                  <li><div className="bullet-dot"></div> Platform dependency warnings</li>
                  <li><div className="bullet-dot"></div> RPM & CPM drop alerts</li>
                  <li><div className="bullet-dot"></div> Revenue stagnation detection</li>
                </ul>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="feature-card-large group">
              <div className="feature-content">
                <div className="feature-icon-wrapper">
                  <Target size={24} color="var(--accent-primary)" />
                </div>
                <h3 className="feature-card-title">Financial Health Score</h3>
                <p className="feature-card-desc">
                  A composite 0-100 score calculated from diversification, growth consistency, profit margin, and revenue volatility. Track your financial fitness over time and benchmark against your own goals.
                </p>
              </div>
              <div className="feature-bullets-box">
                <ul className="feature-bullets">
                  <li><div className="bullet-dot"></div> Real-time score updates</li>
                  <li><div className="bullet-dot"></div> Score breakdown by dimension</li>
                  <li><div className="bullet-dot"></div> Historical trend view</li>
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* Secondary Features Grid */}
        <section className="secondary-features-section">
          <h2 className="section-title-medium">Plus everything else you need</h2>
          <div className="secondary-features-grid">
            <div className="secondary-feature-card">
              <div className="sec-icon">
                <RefreshCw size={20} color="var(--accent-primary)" />
              </div>
              <h4 className="sec-title">Daily auto-sync</h4>
              <p className="sec-desc">All connected platforms sync every 24 hours automatically.</p>
            </div>
            <div className="secondary-feature-card">
              <div className="sec-icon">
                <Lock size={20} color="var(--accent-primary)" />
              </div>
              <h4 className="sec-title">Read-only OAuth</h4>
              <p className="sec-desc">We never store credentials. All access is read-only.</p>
            </div>
            <div className="secondary-feature-card">
              <div className="sec-icon">
                <Zap size={20} color="var(--accent-primary)" />
              </div>
              <h4 className="sec-title">Brand Deal ROI</h4>
              <p className="sec-desc">Track deal value, engagement, and calculate true CPM.</p>
            </div>
            <div className="secondary-feature-card">
              <div className="sec-icon">
                <FileText size={20} color="var(--accent-primary)" />
              </div>
              <h4 className="sec-title">Tax estimation</h4>
              <p className="sec-desc">Estimate quarterly tax reserves based on net income.</p>
            </div>
            <div className="secondary-feature-card">
              <div className="sec-icon">
                <Users size={20} color="var(--accent-primary)" />
              </div>
              <h4 className="sec-title">Team access</h4>
              <p className="sec-desc">Invite your accountant or manager as a collaborator.</p>
            </div>
            <div className="secondary-feature-card">
              <div className="sec-icon">
                <Target size={20} color="var(--accent-primary)" />
              </div>
              <h4 className="sec-title">Revenue goals</h4>
              <p className="sec-desc">Set monthly income targets and track progress daily.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
