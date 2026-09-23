import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { Sidebar } from '@/components/layout/Sidebar'
import { Topbar } from '@/components/layout/Topbar'
import { MobileNav } from '@/components/layout/MobileNav'
import { NavigationProvider } from '@/components/layout/NavigationContext'
import { MobileDrawer } from '@/components/layout/MobileDrawer'
import { prisma } from '@/lib/prisma'
import { formatarHora } from '@/lib/utils'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) {
    redirect('/login')
  }

  const encontroAtual = await prisma.encontro.findFirst({
    where: { status: { in: ['em_andamento', 'inscricoes_abertas', 'planejamento'] } },
    orderBy: { data_inicio: 'desc' },
  })

  // Atividade em andamento no momento
  const atividadeEmAndamento = await prisma.atividade.findFirst({
    where: {
      ...(encontroAtual ? { encontro_id: encontroAtual.id } : {}),
      status: 'em_andamento',
    },
  })

  const todosEncontros = await prisma.encontro.findMany({
    orderBy: { data_inicio: 'desc' },
  })

  return (
      <NavigationProvider>
        <div className="min-h-screen bg-noite text-texto flex flex-col lg:flex-row">
          <Sidebar user={session.user} encontroAtual={encontroAtual} encontros={todosEncontros} />

          <div className="flex flex-1 flex-col lg:pl-64">
            {atividadeEmAndamento && (
              <div className="bg-cobre/10 border-b border-cobre/20 px-4 py-2 flex items-center justify-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cobre opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cobre"></span>
                </span>
                <span className="text-sm font-medium text-cobre">
                  Agora: {atividadeEmAndamento.titulo} ({formatarHora(atividadeEmAndamento.inicio_planejado)})
                </span>
              </div>
            )}

            <Topbar user={session.user} encontroAtual={encontroAtual} />

            <main className="flex-1 overflow-y-auto p-4 lg:p-8 pb-24 lg:pb-8">
              {children}
            </main>
          </div>

          <MobileNav user={session.user} encontroAtual={encontroAtual} />
          <MobileDrawer user={session.user} encontroAtual={encontroAtual} />
        </div>
      </NavigationProvider>
  )
}
