import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from '@/lib/prisma'

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const userId = session.user.id

        // Fetch metrics
        const metrics = await prisma.metric.findMany({
            where: { userId },
            orderBy: { date: 'asc' },
        })

        // Fetch Insights
        const insights = await prisma.aIInsight.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 5
        })

        // Calculate aggregates
        const totalRevenue = metrics.reduce((acc, curr) => acc + curr.revenue, 0)
        const totalExpenses = metrics.reduce((acc, curr) => acc + curr.expenses, 0)
        const netProfit = totalRevenue - totalExpenses
        const profitMargin = totalRevenue > 0 ? Math.round((netProfit / totalRevenue) * 100) : 0

        // In a real app we'd compare to previous month, mock growth here for simplicity based on metrics
        const growthPercent = 12
        const revenueGoal = 100000
        const revenueGoalProgress = Math.min(Math.round((totalRevenue / (revenueGoal || 1)) * 100), 100)

        const platformData = metrics.reduce((acc, curr) => {
            acc[curr.platform] = (acc[curr.platform] || 0) + curr.revenue
            return acc
        }, {})

        const platformRevenue = Object.entries(platformData).map(([platform, revenue]) => {
            const colors = {
                youtube: '#FF0000',
                tiktok: '#00F2FE',
                instagram: '#E1306C',
                sponsorships: '#00D4AA',
                patreon: '#F96854'
            }
            return {
                platform: platform.charAt(0).toUpperCase() + platform.slice(1),
                revenue,
                color: colors[platform.toLowerCase()] || '#94a3b8'
            }
        }).sort((a, b) => b.revenue - a.revenue)

        // Process revenue streams for pie chart
        const revenueStreams = platformRevenue.map(p => ({
            name: p.platform,
            value: p.revenue,
            color: p.color
        }));

        return NextResponse.json({
            summaryMetrics: {
                totalRevenue,
                netProfit,
                profitMargin,
                growthPercent,
                revenueGoal,
                revenueGoalProgress,
            },
            metrics,
            platformRevenue,
            revenueStreams,
            aiInsights: insights
        })
    } catch (error) {
        console.error("Dashboard API Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
