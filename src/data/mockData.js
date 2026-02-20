// ============================================================
// CreatorLedger – Mock Data Layer
// ============================================================

// Helper: generate daily revenue for past N days
function generateDailyRevenue(days = 90) {
    const data = [];
    const now = new Date();
    for (let i = days - 1; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const base = 400 + Math.sin(i * 0.15) * 120;
        data.push({
            date: d.toISOString().slice(0, 10),
            revenue: Math.round(base + Math.random() * 200),
            expenses: Math.round(80 + Math.random() * 100),
        });
    }
    return data;
}

export const dailyRevenue = generateDailyRevenue(90);

// Monthly aggregated revenue
export const monthlyRevenue = [
    { month: 'Aug', revenue: 8420, expenses: 2100 },
    { month: 'Sep', revenue: 9180, expenses: 2340 },
    { month: 'Oct', revenue: 10250, expenses: 2560 },
    { month: 'Nov', revenue: 11730, expenses: 2780 },
    { month: 'Dec', revenue: 13100, expenses: 3020 },
    { month: 'Jan', revenue: 14620, expenses: 3200 },
    { month: 'Feb', revenue: 15840, expenses: 3380 },
];

// Weekly aggregated (last 12 weeks)
export const weeklyRevenue = Array.from({ length: 12 }, (_, i) => ({
    week: `W${i + 1}`,
    revenue: Math.round(3000 + Math.random() * 1200 + i * 100),
    expenses: Math.round(700 + Math.random() * 300),
}));

// Platform breakdown
export const platformRevenue = [
    { platform: 'YouTube', revenue: 6240, color: '#FF0000' },
    { platform: 'Shopify', revenue: 3180, color: '#96BF48' },
    { platform: 'Patreon', revenue: 2410, color: '#F96854' },
    { platform: 'Instagram', revenue: 1340, color: '#E1306C' },
    { platform: 'Stripe', revenue: 1120, color: '#635BFF' },
    { platform: 'TikTok', revenue: 890, color: '#00F2EA' },
    { platform: 'Substack', revenue: 660, color: '#FF6719' },
];

// Revenue stream categories
export const revenueStreams = [
    { name: 'Ad Revenue', value: 5820, color: '#00D4AA' },
    { name: 'Digital Products', value: 3400, color: '#7C5CFC' },
    { name: 'Memberships', value: 2410, color: '#F96854' },
    { name: 'Affiliate Income', value: 1680, color: '#FFB020' },
    { name: 'Sponsorships', value: 1340, color: '#38BDF8' },
    { name: 'Donations', value: 890, color: '#FB7185' },
    { name: 'E-commerce', value: 300, color: '#96BF48' },
];

// Summary metrics
export const summaryMetrics = {
    totalRevenue: 15840,
    netProfit: 12460,
    growthPercent: 8.3,
    revenueGoal: 20000,
    revenueGoalProgress: 79.2,
    monthlyBurnRate: 3380,
    profitMargin: 78.7,
    healthScore: 82,
};

// Revenue transactions
export const revenueTransactions = [
    { id: 1, date: '2026-02-18', platform: 'YouTube', type: 'Ad Revenue', gross: 412.30, net: 371.07, fees: 41.23, currency: 'USD' },
    { id: 2, date: '2026-02-18', platform: 'Patreon', type: 'Memberships', gross: 285.00, net: 270.75, fees: 14.25, currency: 'USD' },
    { id: 3, date: '2026-02-17', platform: 'Shopify', type: 'Digital Products', gross: 189.99, net: 183.29, fees: 6.70, currency: 'USD' },
    { id: 4, date: '2026-02-17', platform: 'Instagram', type: 'Sponsorships', gross: 500.00, net: 500.00, fees: 0, currency: 'USD' },
    { id: 5, date: '2026-02-16', platform: 'TikTok', type: 'Ad Revenue', gross: 67.80, net: 67.80, fees: 0, currency: 'USD' },
    { id: 6, date: '2026-02-16', platform: 'Stripe', type: 'Digital Products', gross: 249.00, net: 241.78, fees: 7.22, currency: 'USD' },
    { id: 7, date: '2026-02-15', platform: 'YouTube', type: 'Memberships', gross: 180.00, net: 162.00, fees: 18.00, currency: 'USD' },
    { id: 8, date: '2026-02-15', platform: 'Substack', type: 'Memberships', gross: 420.00, net: 399.00, fees: 21.00, currency: 'USD' },
    { id: 9, date: '2026-02-14', platform: 'Amazon Associates', type: 'Affiliate Income', gross: 312.44, net: 312.44, fees: 0, currency: 'USD' },
    { id: 10, date: '2026-02-14', platform: 'Shopify', type: 'E-commerce', gross: 89.99, net: 86.79, fees: 3.20, currency: 'USD' },
    { id: 11, date: '2026-02-13', platform: 'YouTube', type: 'Ad Revenue', gross: 523.10, net: 470.79, fees: 52.31, currency: 'USD' },
    { id: 12, date: '2026-02-13', platform: 'Patreon', type: 'Memberships', gross: 285.00, net: 270.75, fees: 14.25, currency: 'USD' },
    { id: 13, date: '2026-02-12', platform: 'Instagram', type: 'Ad Revenue', gross: 142.50, net: 142.50, fees: 0, currency: 'USD' },
    { id: 14, date: '2026-02-12', platform: 'Gumroad', type: 'Digital Products', gross: 79.00, net: 72.68, fees: 6.32, currency: 'USD' },
    { id: 15, date: '2026-02-11', platform: 'YouTube', type: 'Sponsorships', gross: 2500.00, net: 2500.00, fees: 0, currency: 'USD' },
    { id: 16, date: '2026-02-11', platform: 'Twitch', type: 'Donations', gross: 45.00, net: 45.00, fees: 0, currency: 'USD' },
    { id: 17, date: '2026-02-10', platform: 'Stripe', type: 'Digital Products', gross: 149.00, net: 144.67, fees: 4.33, currency: 'USD' },
    { id: 18, date: '2026-02-10', platform: 'TikTok', type: 'Ad Revenue', gross: 89.20, net: 89.20, fees: 0, currency: 'USD' },
    { id: 19, date: '2026-02-09', platform: 'Ko-fi', type: 'Donations', gross: 35.00, net: 35.00, fees: 0, currency: 'USD' },
    { id: 20, date: '2026-02-09', platform: 'YouTube', type: 'Ad Revenue', gross: 398.75, net: 358.88, fees: 39.87, currency: 'USD' },
];

// Expense entries
export const expenses = [
    { id: 1, date: '2026-02-18', category: 'Software', description: 'Adobe Creative Cloud', amount: 54.99 },
    { id: 2, date: '2026-02-17', category: 'Equipment', description: 'Camera Lens – Sony 24-70mm', amount: 1298.00 },
    { id: 3, date: '2026-02-15', category: 'Marketing', description: 'Facebook Ads Campaign', amount: 250.00 },
    { id: 4, date: '2026-02-14', category: 'Contractors', description: 'Video Editor – January', amount: 800.00 },
    { id: 5, date: '2026-02-12', category: 'Software', description: 'Notion Team Plan', amount: 10.00 },
    { id: 6, date: '2026-02-10', category: 'Subscriptions', description: 'TubeBuddy Pro', amount: 7.50 },
    { id: 7, date: '2026-02-08', category: 'Travel', description: 'Uber to Studio', amount: 24.30 },
    { id: 8, date: '2026-02-05', category: 'Equipment', description: 'Ring Light', amount: 45.99 },
    { id: 9, date: '2026-02-03', category: 'Contractors', description: 'Thumbnail Designer', amount: 150.00 },
    { id: 10, date: '2026-02-01', category: 'Software', description: 'Canva Pro', amount: 12.99 },
];

// AI Insights
export const aiInsights = [
    {
        id: 1,
        severity: 'high',
        category: 'Risk',
        title: 'High Platform Concentration',
        description: 'You are 68% dependent on YouTube ad revenue. If YouTube changes its monetization policy, your income could drop significantly. Consider diversifying into digital products or memberships.',
        metric: 'YouTube: 68% of total revenue',
        action: 'Launch a digital product this quarter',
        icon: 'alert-triangle',
    },
    {
        id: 2,
        severity: 'medium',
        category: 'Growth',
        title: 'Instagram Monetization Gap',
        description: 'Your Instagram engagement is up 24% this month, but monetization has not scaled proportionally. Consider adding affiliate links to your Stories or launching Instagram-exclusive content.',
        metric: 'Engagement +24%, Revenue +3%',
        action: 'Add affiliate links to top-performing Stories',
        icon: 'trending-up',
    },
    {
        id: 3,
        severity: 'low',
        category: 'Optimization',
        title: 'Shopify Revenue Correlation',
        description: 'Your Shopify revenue spikes an average of 3 days after YouTube uploads. Consider timing product promotions with your upload schedule for maximum conversion.',
        metric: '3-day lag between upload and purchase spike',
        action: 'Schedule product promos with video releases',
        icon: 'zap',
    },
    {
        id: 4,
        severity: 'medium',
        category: 'Platform Focus',
        title: 'TikTok Growth Potential',
        description: 'TikTok is your fastest-growing platform (+42% MoM) but contributes only 5.6% of revenue. This platform is reaching critical mass — consider dedicating more content to it.',
        metric: 'TikTok: +42% growth, 5.6% of revenue',
        action: 'Increase TikTok posting frequency to 5x/week',
        icon: 'rocket',
    },
    {
        id: 5,
        severity: 'high',
        category: 'Risk',
        title: 'Profit Margin Compression',
        description: 'Your profit margin has decreased from 82% to 78.7% over the past 3 months. Contractor costs are rising faster than revenue growth. Review your outsourcing budget.',
        metric: 'Margin: 82% → 78.7% (3 months)',
        action: 'Audit contractor costs this month',
        icon: 'alert-triangle',
    },
    {
        id: 6,
        severity: 'low',
        category: 'Growth',
        title: 'Affiliate Income Rising',
        description: 'Affiliate income is your fastest-growing revenue stream at +31% month-over-month. Your Amazon Associates links are converting well. Consider expanding to more product categories.',
        metric: 'Affiliate: +31% MoM',
        action: 'Expand to 2 more affiliate programs',
        icon: 'trending-up',
    },
];

// Risk alerts
export const riskAlerts = [
    { id: 1, level: 'critical', title: 'Platform Concentration Risk', description: '68% of revenue from a single platform (YouTube)', time: '2 hours ago' },
    { id: 2, level: 'warning', title: 'RPM Declining', description: 'YouTube RPM dropped 12% this month compared to last month.', time: '1 day ago' },
    { id: 3, level: 'info', title: 'Seasonal Pattern Detected', description: 'Revenue typically dips 8-12% in March based on historical data.', time: '3 days ago' },
];

// Forecast data
export const forecastData = (() => {
    const data = [];
    const baseMonths = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
    let base = 15840;
    for (let i = 0; i < 12; i++) {
        const growth = base * (0.04 + Math.random() * 0.04);
        base = Math.round(base + growth);
        const variance = Math.round(base * 0.07);
        data.push({
            month: baseMonths[i],
            projected: base,
            optimistic: base + variance,
            pessimistic: base - variance,
        });
    }
    return data;
})();

export const forecastSummary = {
    nextMonth: { value: forecastData[0].projected, confidence: 93 },
    threeMonth: { value: forecastData[2].projected, confidence: 85 },
    twelveMonth: { value: forecastData[11].projected, confidence: 68 },
};

// Brand deals
export const brandDeals = [
    { id: 1, brand: 'NordVPN', value: 3500, platform: 'YouTube', views: 125000, clicks: 4200, conversions: 380, cpm: 28, roi: 214 },
    { id: 2, brand: 'Skillshare', value: 2000, platform: 'YouTube', views: 98000, clicks: 2800, conversions: 210, cpm: 20.4, roi: 156 },
    { id: 3, brand: 'Squarespace', value: 1500, platform: 'Instagram', views: 45000, clicks: 1200, conversions: 95, cpm: 33.3, roi: 112 },
    { id: 4, brand: 'Audible', value: 1200, platform: 'YouTube', views: 80000, clicks: 1900, conversions: 140, cpm: 15, roi: 98 },
    { id: 5, brand: 'Surfshark', value: 800, platform: 'TikTok', views: 250000, clicks: 5100, conversions: 290, cpm: 3.2, roi: 245 },
];

// Connected platforms
export const connectedPlatforms = [
    { id: 'youtube', name: 'YouTube', category: 'Video', connected: true, lastSync: '2 min ago', monthlyRevenue: 6240, icon: '📺' },
    { id: 'instagram', name: 'Instagram', category: 'Social', connected: true, lastSync: '15 min ago', monthlyRevenue: 1340, icon: '📸' },
    { id: 'tiktok', name: 'TikTok', category: 'Video', connected: true, lastSync: '1 hr ago', monthlyRevenue: 890, icon: '🎵' },
    { id: 'patreon', name: 'Patreon', category: 'Membership', connected: true, lastSync: '30 min ago', monthlyRevenue: 2410, icon: '❤️' },
    { id: 'shopify', name: 'Shopify', category: 'E-commerce', connected: true, lastSync: '5 min ago', monthlyRevenue: 3180, icon: '🛒' },
    { id: 'stripe', name: 'Stripe', category: 'Payment', connected: true, lastSync: '10 min ago', monthlyRevenue: 1120, icon: '💳' },
    { id: 'substack', name: 'Substack', category: 'Membership', connected: true, lastSync: '1 hr ago', monthlyRevenue: 660, icon: '✉️' },
];

export const availablePlatforms = [
    // Video
    { id: 'twitch', name: 'Twitch', category: 'Video', icon: '🎮' },
    { id: 'kick', name: 'Kick', category: 'Video', icon: '🟢' },
    { id: 'rumble', name: 'Rumble', category: 'Video', icon: '📹' },
    // Social
    { id: 'facebook', name: 'Facebook', category: 'Social', icon: '👤' },
    { id: 'x', name: 'X (Twitter)', category: 'Social', icon: '🐦' },
    { id: 'snapchat', name: 'Snapchat', category: 'Social', icon: '👻' },
    { id: 'pinterest', name: 'Pinterest', category: 'Social', icon: '📌' },
    // Payment
    { id: 'paypal', name: 'PayPal', category: 'Payment', icon: '💰' },
    { id: 'gumroad', name: 'Gumroad', category: 'Payment', icon: '🏪' },
    { id: 'lemonsqueezy', name: 'Lemon Squeezy', category: 'Payment', icon: '🍋' },
    { id: 'paddle', name: 'Paddle', category: 'Payment', icon: '🏓' },
    // Course
    { id: 'kajabi', name: 'Kajabi', category: 'Course', icon: '🎓' },
    { id: 'teachable', name: 'Teachable', category: 'Course', icon: '📚' },
    { id: 'podia', name: 'Podia', category: 'Course', icon: '🎯' },
    // Membership
    { id: 'kofi', name: 'Ko-fi', category: 'Membership', icon: '☕' },
    { id: 'buymeacoffee', name: 'Buy Me a Coffee', category: 'Membership', icon: '🧋' },
    { id: 'ghost', name: 'Ghost', category: 'Membership', icon: '👻' },
    // Affiliate
    { id: 'amazon', name: 'Amazon Associates', category: 'Affiliate', icon: '📦' },
    { id: 'impact', name: 'Impact', category: 'Affiliate', icon: '💥' },
    { id: 'shareasale', name: 'ShareASale', category: 'Affiliate', icon: '🤝' },
    { id: 'cj', name: 'CJ Affiliate', category: 'Affiliate', icon: '🔗' },
    { id: 'clickbank', name: 'ClickBank', category: 'Affiliate', icon: '🏦' },
    // Gaming
    { id: 'epic', name: 'Epic Creator Code', category: 'Gaming', icon: '🎮' },
    { id: 'roblox', name: 'Roblox DevEx', category: 'Gaming', icon: '🧱' },
    { id: 'steam', name: 'Steam', category: 'Gaming', icon: '🎲' },
];

// Tax estimation
export const taxEstimates = {
    annualIncome: 190080,
    country: 'United States',
    federalTax: 38016,
    stateTax: 11404,
    selfEmploymentTax: 14536,
    totalTax: 63956,
    effectiveRate: 33.6,
    quarterlyPayments: [
        { quarter: 'Q1 (Apr 15)', amount: 15989 },
        { quarter: 'Q2 (Jun 15)', amount: 15989 },
        { quarter: 'Q3 (Sep 15)', amount: 15989 },
        { quarter: 'Q4 (Jan 15)', amount: 15989 },
    ],
    suggestedReserve: 5330,
};
