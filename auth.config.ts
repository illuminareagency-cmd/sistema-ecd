import type { NextAuthConfig } from 'next-auth'

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: { strategy: 'jwt' },
  secret: process.env.AUTH_SECRET || 'ecd-demo-secret-2026-get-floripa',
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const publicPaths = ['/login', '/ficha/', '/cartas/', '/telao', '/brand/', '/manifest.json', '/favicon.ico']
      const isPublic = publicPaths.some((p) => nextUrl.pathname.startsWith(p))
      if (isPublic) return true
      if (!isLoggedIn) return false
      return true
    },
    jwt({ token, user }) {
      if (user) {
        token.perfis = (user as any).perfis
        token.permissoes = (user as any).permissoes
        token.pessoaId = (user as any).pessoaId
        token.nomePessoa = (user as any).nomePessoa
      }
      return token
    },
    session({ session, token }) {
      if (token) {
        ;(session.user as any).id = token.sub
        ;(session.user as any).perfis = token.perfis
        ;(session.user as any).permissoes = token.permissoes
        ;(session.user as any).pessoaId = token.pessoaId
        ;(session.user as any).nomePessoa = token.nomePessoa
      }
      return session
    },
  },
  providers: [],
}
