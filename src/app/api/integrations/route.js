import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from '@/lib/prisma'

export async function GET(req) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const integrations = await prisma.platformIntegration.findMany({
            where: { userId: session.user.id }
        })
        return NextResponse.json(integrations)
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}

export async function POST(req) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const { platform, accessToken, refreshToken } = await req.json()

        const integration = await prisma.platformIntegration.upsert({
            where: {
                userId_platform: {
                    userId: session.user.id,
                    platform: platform
                }
            },
            update: {
                accessToken,
                refreshToken
            },
            create: {
                userId: session.user.id,
                platform,
                accessToken,
                refreshToken
            }
        })

        return NextResponse.json(integration)
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
