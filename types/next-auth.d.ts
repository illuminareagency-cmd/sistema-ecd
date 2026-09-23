import 'next-auth'

declare module 'next-auth' {
  interface User {
    perfis?: string
    permissoes?: string
    pessoaId?: string
    nomePessoa?: string
  }
  interface Session {
    user: User & {
      id?: string
      perfis?: string
      permissoes?: string
      pessoaId?: string
      nomePessoa?: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    perfis?: string
    permissoes?: string
    pessoaId?: string
    nomePessoa?: string
  }
}
