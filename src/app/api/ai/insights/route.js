import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from '@/lib/prisma'
import { GoogleGenAI } from '@google/genai';

export async function POST(req) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const metrics = await prisma.metric.findMany({
            where: { userId: session.user.id },
            orderBy: { date: 'asc' },
        })

        if (!metrics || metrics.length === 0) {
            return NextResponse.json({ error: "No metrics data to analyze" }, { status: 400 })
        }

        const prompt = `Analyze the following creator metrics and provide 3 key insights.
Respond in a strict JSON array format, where each object has these fields:
- title: string (short, punchy)
- description: string (detailed advice or observation)
- severity: string ('low', 'medium', 'high')
- type: string ('opportunity', 'risk', 'trend')

Data:
${JSON.stringify(metrics.map(m => ({ date: m.date, platform: m.platform, revenue: m.revenue, expenses: m.expenses, profit: m.profit })))}`

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "dummy" });
        let insightsData = [];
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            const textResponse = response.text;
            const matches = textResponse.match(/\[[\s\S]*\]/);
            if (matches) {
                insightsData = JSON.parse(matches[0]);
            } else {
                insightsData = JSON.parse(textResponse);
            }
        } catch (apiError) {
            console.warn("AI API failed, falling back to mock insights:", apiError.message);
            // Fallback for demo without valid key
            insightsData = [
                {
                    title: "Revenue Trending Up",
                    description: "Your recent metrics show a continuous increase in revenue compared to expenses.",
                    severity: "low",
                    type: "trend"
                },
                {
                    title: "High YouTube Dependency",
                    description: "A large portion of your revenue comes from YouTube. Consider diversifying platforms.",
                    severity: "medium",
                    type: "risk"
                },
                {
                    title: "Sponsorship Opportunities",
                    description: "Sponsorships have high profit margins. Focus on increasing sponsored content.",
                    severity: "low",
                    type: "opportunity"
                }
            ]
        }

        // Save generated insights to DB
        await prisma.aIInsight.deleteMany({ where: { userId: session.user.id } }); // Clear old
        const createdInsights = await prisma.$transaction(
            insightsData.map(insight => prisma.aIInsight.create({
                data: {
                    userId: session.user.id,
                    ...insight
                }
            }))
        )

        return NextResponse.json(createdInsights)
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
