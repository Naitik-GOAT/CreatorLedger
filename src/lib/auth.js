import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import InstagramProvider from "next-auth/providers/instagram"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "test@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                })
                if (!user || !user.password) {
                    return null
                }
                const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
                if (!isPasswordValid) return null
                return { id: user.id, email: user.email, name: user.name }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        InstagramProvider({
            clientId: process.env.INSTAGRAM_CLIENT_ID || '',
            clientSecret: process.env.INSTAGRAM_CLIENT_SECRET || ''
        })
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.sub
            }
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET || "super-secret-key",
    pages: { signIn: '/auth/signin' },
}
