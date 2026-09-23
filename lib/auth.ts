import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import { authConfig } from '@/auth.config'

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' },
        senha: { label: 'Senha', type: 'password' },
      },
      authorize: async (credentials) => {
        let email = String(credentials?.email || 'admin@getfloripa.com').toLowerCase().trim()
        
        // Mapeamentos amigáveis
        if (email === 'admin@get.com' || email === 'admin@getchurch.com' || email === 'admin') {
          email = 'admin@getfloripa.com'
        }
        if (email === 'lider@get.com' || email === 'lider' || email === 'cartas' || email === 'cartas@get.com') {
          email = 'cartas@getfloripa.com'
        }
        if (email === 'financeiro' || email === 'financeiro@get.com') {
          email = 'financeiro@getfloripa.com'
        }
        if (email === 'servo' || email === 'servo1') {
          email = 'servo1@getfloripa.com'
        }
        if (email === 'checkin') {
          email = 'checkin@getfloripa.com'
        }

        // Buscar usuário pelo e-mail ou prefixo
        let usuario = await prisma.usuario.findFirst({
          where: {
            OR: [
              { email: { equals: email } },
              { email: { startsWith: email.split('@')[0] } },
            ],
          },
          include: { pessoa: true },
        })

        // Fallback para admin caso não encontre o e-mail digitado
        if (!usuario) {
          usuario = await prisma.usuario.findFirst({
            where: { perfis: { contains: 'admin' } },
            include: { pessoa: true },
          })
        }

        if (!usuario) return null

        // Modo teste/demo: sempre autentica com sucesso
        return {
          id: usuario.id,
          email: usuario.email,
          name: usuario.pessoa.nome_preferido || usuario.pessoa.nome_completo.split(' ')[0],
          perfis: usuario.perfis,
          permissoes: usuario.permissoes,
          pessoaId: usuario.pessoa_id,
          nomePessoa: usuario.pessoa.nome_completo,
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET || 'ecd-demo-secret-2026-get-floripa',
})
